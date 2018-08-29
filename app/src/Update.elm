port module Update exposing(
      update, processUrl
    , imageRead
    , onUrlChange
    , getInfoFromOutside
    , getTimeInOneSecond
    , getViewPort
  )

import Json.Encode as Encode
import Json.Decode as Decode exposing(Decoder, Value)
import Html.Attributes
import Html
import VirtualDom exposing (Handler(..))
import Keyboard exposing (Key(..))
import Keyboard.Arrows
import Debounce exposing(Debounce)
import Task
import List.Extra
import Time
import Browser.Dom as Dom
import Http
import Process


import Utility

import FileUploadCredentials as Credentials exposing(FileData, Image)
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import ImageManager
import AppUtility
import ImageManager exposing (ImageMsg(..))
import Mail



import Model exposing(
      Msg(..)
    , Model
    , AppMode(..)
    , ImageMode(..)
    , SignupMode(..)
    , ToolPanelState(..)
    , DeleteDocumentState(..)
    , ImageAccessibility(..)
    , InfoForElm(..)
    , ErrorResponse(..)
    , PreferencesPanelState(..)
    , initialModel
  )

import User exposing(
   Token
   , UserMsg(..)
   , User
   , BigUser
   )

import UrlAppParser exposing(Route(..))

import Configuration
import SystemDocument
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..), printUrl)
import DocumentList exposing(
     DocumentList
        , DocListMsg(..)
        , findDocuments
        , documentListLength
     )
import DocumentView exposing(view, DocViewMsg(..))
import DocumentListView exposing(DocListViewMsg(..))
import DocumentDictionary exposing(DocumentDictionary, DocDictMsg(..))
import Query 


port readImage : Value -> Cmd msg
port uploadImage : Value -> Cmd msg
port imageRead : (Value -> msg) -> Sub msg
port sendCredentials : Value -> Cmd msg 
port sendPdfFileName : Value -> Cmd msg
port sendDocumentForPrinting : Value -> Cmd msg
port onUrlChange : (String -> msg) -> Sub msg
port pushUrl : String -> Cmd msg


-- OUTSIDE

port infoForOutside : GenericOutsideData -> Cmd msg

port infoForElm : (GenericOutsideData -> msg) -> Sub msg


type InfoForOutside =
    DocumentData Encode.Value
  | DocumentListData Encode.Value
  | AskToReconnectDocument Encode.Value
  | AskToReconnectDocumentList Encode.Value
  | UserData Encode.Value 
  | AskToReconnectUser Encode.Value
  | AskToEraseLocalStorage Encode.Value
  


type alias GenericOutsideData =
    { tag : String, data : Encode.Value }


sendInfoOutside : InfoForOutside -> Cmd msg
sendInfoOutside info =
    case info of
        DocumentData value ->
            infoForOutside { tag = "DocumentData", data = value }

        DocumentListData value ->
            infoForOutside { tag = "DocumentListData", data = value }

        UserData value ->
            infoForOutside { tag = "UserData", data = value }

        AskToReconnectDocument value ->
            infoForOutside { tag = "AskToReconnectDocument", data = Encode.null }

        AskToReconnectDocumentList value ->
            infoForOutside { tag = "AskToReconnectDocumentList", data = Encode.null }

        AskToReconnectUser value ->
            infoForOutside { tag = "AskToReconnectUser", data = Encode.null }

        AskToEraseLocalStorage value ->
            infoForOutside { tag = "AskToEraseLocalStorage", data = Encode.null }

bigUserCmd2 maybeCurrentUser =
  case maybeCurrentUser of 
      Nothing -> Cmd.none 
      Just user -> Cmd.map UserMsg <| User.getBigUserRecord (User.userId user)

getInfoFromOutside : (InfoForElm -> msg) -> (String -> msg) -> Sub msg
getInfoFromOutside tagger onError =
    infoForElm
        (\outsideInfo ->
            case outsideInfo.tag of
                "ReconnectDocument" ->
                    case Decode.decodeValue Document.decodeDocumentFromOutside outsideInfo.data of
                        Ok result ->
                            tagger <| DocumentDataFromOutside result

                        Err e ->(
                            onError <| "No doc to retrieve" )

                "ReconnectDocumentList" ->
                    case Decode.decodeValue DocumentList.intListDecoder outsideInfo.data of
                        Ok result ->
                            tagger <| DocumentListDataFromOutside result

                        Err e ->(
                            onError <| "No doc to retrieve" )

                "ReconnectUser" ->
                    case Decode.decodeValue User.decodeUserFromOutside outsideInfo.data of
                        Ok result ->
                            tagger <| UserDataFromOutside result

                        Err e -> 
                            onError <| ""  --   "Bad decode (getInfoFromOutside)"  ++ (Decode.errorToString e))
                _ ->
                    onError <| "Unexpected info from outside"
        )

-- link : msg -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
-- link href attrs children =
--   Html.a (preventDefaultOn "click" (Decode.succeed (href, True)) :: attrs) children
processInfoForElm : Model -> InfoForElm -> (Model, Cmd Msg)
processInfoForElm model infoForElm_ =
  case infoForElm_ of 
    DocumentDataFromOutside document -> 
       ({model |    currentDocument = document  
                  , documentList = DocumentList.make document []
                  , message = "!got doc from outside"
            }
            , Cmd.none 
          )  
    UserDataFromOutside user -> 
        ({model |   maybeCurrentUser = Just user 
                  , maybeToken = Just (User.getToken user)
                  , message = "You are reconnected"
            }
            , bigUserCmd2 (Just user)
          ) 
    DocumentListDataFromOutside intList ->
      ({ model | documentIdList = intList }
      , Cmd.map DocListMsg  (DocumentList.retrievDocumentsFromIntList model.maybeCurrentUser intList) )



saveDocToLocalStorage : Document -> Cmd msg
saveDocToLocalStorage document =
    sendInfoOutside (DocumentData (Document.encodeDocumentForOutside document))

saveDocumentListToLocalStorage : DocumentList -> Cmd msg
saveDocumentListToLocalStorage documentList =
    sendInfoOutside (DocumentListData (DocumentList.documentListEncoder documentList))


sendMaybeUserDataToLocalStorage : Maybe User -> Cmd msg
sendMaybeUserDataToLocalStorage maybeUser =
  case maybeUser of 
    Nothing -> Cmd.none 
    Just user ->  sendInfoOutside (UserData (User.encodeUserForOutside user))

eraseLocalStorage : Cmd msg
eraseLocalStorage =
    sendInfoOutside (AskToEraseLocalStorage Encode.null)





-- DEBOUNCE

-- This defines how the debouncer should work.
-- Choose the strategy for your use case.
debounceConfig : Debounce.Config Msg
debounceConfig =
  { strategy = Debounce.later Configuration.debounceDelay
  , transform = DebounceMsg
  }

updateEditorContentCmd : String -> Cmd Msg
updateEditorContentCmd str =
    Task.perform UpdateEditorContent (Task.succeed str)



-- NAVIGATION

processUrl : String -> Cmd Msg 
processUrl urlString = 
    case  UrlAppParser.toRoute urlString of 
      NotFound -> 
        Cmd.batch [
            sendInfoOutside (AskToReconnectDocument Encode.null)
            , sendInfoOutside (AskToReconnectDocumentList Encode.null)
            ,  sendInfoOutside (AskToReconnectUser Encode.null)
        ]
        
      DocumentIdRef docId -> 
        Cmd.batch [
            sendInfoOutside (AskToReconnectUser Encode.null)
            --, sendInfoOutside (AskToReconnectDocumentList Encode.null)
            , Cmd.map DocMsg (Document.getDocumentById docId Nothing)
            , Cmd.map DocListMsg (DocumentList.findDocuments Nothing <| "id=" ++ (String.fromInt docId))  
        ]

      HomeRef username -> 
        Cmd.batch [
            sendInfoOutside (AskToReconnectUser Encode.null)
            , Cmd.map DocListMsg (DocumentList.findDocuments Nothing ("key=home&authorname=" ++ username)) 
        ]

      InternalRef str ->
          Cmd.none


idFromDocInfo str = 
  str |> String.toInt |> Maybe.withDefault 0



preventDefaultOn : String -> Decoder msg -> Html.Attribute msg
preventDefaultOn string decoder =
    VirtualDom.on string
        (Custom
            (decoder
                |> Decode.map
                    (\msg ->
                        { message = msg
                        , stopPropagation = True
                        , preventDefault = True
                        }
                    )
            )
        )

-- KEY COMMANDS



keyGateway : Model -> List Key -> ( Model, Cmd Msg )
keyGateway model pressedKeys =
    if model.previousKey == Control then
        respondToContolCommand model pressedKeys
    else
       ( { model | previousKey = headKey pressedKeys }, Cmd.none )


respondToContolCommand : Model -> List Key -> ( Model, Cmd Msg )
respondToContolCommand model pressedKeys =
    let
        newModel =
            { model | previousKey = headKey pressedKeys }
    in
        handleKey newModel (headKey pressedKeys) 


handleKey : Model -> Key -> (Model, Cmd Msg)
handleKey model key = 
  case key of 
    Enter -> doSearch model
    Character "s" -> saveCurrentDocument model
    Character "=" -> saveCurrentDocument model
    Character "w" -> changeMode model Writing
    Character "r" -> changeMode model Reading
    Character "i" -> changeMode model ImageEditing
    Character "a" -> changeMode model DisplayAuthors
    Character "h" -> goHome model
    Character "/" -> getPublicDocumentsRawQuery model "random=public"
    Character "e" -> toggleToolPanelState model
    Character "n" -> doNewDocument model
    Character "p" -> printDocument model
    Character "0" -> goToStart model

    _ -> (model, Cmd.none)




doSearch : Model -> (Model, Cmd Msg)
doSearch model = 
  case model.appMode of 
        Reading -> 
          case model.maybeCurrentUser of 
            Nothing -> getPublicDocuments model model.searchQueryString 
            Just _ -> 
              case String.contains "shared" model.searchQueryString of 
                True -> getUserDocuments model (model.searchQueryString)
                False -> getUserDocuments model (model.searchQueryString ++ ", docs=any")
        Writing -> getUserDocuments model model.searchQueryString 
        ImageEditing -> searchForImages model
        Admin -> searchForUsers model
        DisplayAuthors -> searchForUsers model

-- UPDATE

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        AcceptPassword str ->
            ( { model | password = str }, Cmd.none )

        AcceptEmail str ->
            ( { model | email = str }, Cmd.none )

        AcceptUserName str ->
            ( { model | username = str }, Cmd.none )

        AcceptSearchQuery searchQueryString -> 
            ( { model | searchQueryString = searchQueryString }, Cmd.none )

        AcceptDocumenTitle str ->
          let 
            currentDocument = model.currentDocument 
            nextDocument = {currentDocument | title = str }
          in
            ( { model | documentTitle = str, currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        AcceptDocumentTagString str ->
          let 
            currentDocument = model.currentDocument 
            nextTags = str |> String.split "," |> List.map String.trim
            nextDocument = {currentDocument | tags = nextTags  }
          in 
            ( { model | tagString = str, currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        AcceptSharingString str ->
          let 
            currentDocument = model.currentDocument 
            nextAccessDict = str |> Document.stringToAccessDict
            nextDocument = {currentDocument | access = nextAccessDict  }
          in 
            ( { model | sharingString = str, currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )


        AcceptImageName str -> 
            ( { model | imageName = str }, Cmd.none )

        UserMsg (ReceiveToken result)->
          case result of 
            Ok token -> 
              let 
                maybeToken = Just token  
                maybeCurrentUser = User.maybeUserFromEmailAndToken model.email (User.stringFromToken token)
                bigUserCmd = case maybeCurrentUser of 
                  Nothing -> Cmd.none 
                  Just user -> Cmd.map UserMsg <| User.getBigUserRecord (User.userId user)
              in 
               ({ model | 
                    maybeToken = maybeToken
                  , maybeCurrentUser = maybeCurrentUser
                  , message = "Signed in"
                  , email = ""
                  , password = ""
                  , username = ""
                }
                ,  Cmd.batch [
                    sendMaybeUserDataToLocalStorage maybeCurrentUser 
                  , bigUserCmd
                 ]
                ) 
            Err err -> 
               let 
                 errorMessage = String.trim <| httpErrorHandler err
                 errorResponse = if errorMessage == "Incorrect email or password" then
                       ShowPasswordReset
                    else if errorMessage == "Account not verified" then
                       ShowVerifyAccount
                    else 
                       NoErrorResponse
               in
                ({model | message = errorMessage, errorResponse = errorResponse},   Cmd.none  )
            
        UserMsg (RespondToNewUser result)->
          case result of 
            Ok token -> 
              let 
                maybeToken = Just token
                maybeCurrentUser = User.maybeUserFromEmailAndToken model.email (User.stringFromToken token)
              in 
               ({ model | 
                    maybeToken = maybeToken
                  , maybeCurrentUser = maybeCurrentUser
                  , message = "Signed up"
                  , email = ""
                  , password = ""
                  , username = ""
                  , currentDocument = SystemDocument.newUser 
                }
                ,  sendMaybeUserDataToLocalStorage maybeCurrentUser ) 
            Err err -> 
                ({model | message = httpErrorHandler err },   Cmd.none  ) 

        DocMsg (ReceiveDocument result) ->
          case result of 
            Ok documentRecord -> 
               ({ model | currentDocument = documentRecord.document}, 
                Cmd.batch [ 
                   loadTexMacrosForDocument documentRecord.document model
                ]
                )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocMsg (AcknowledgeDocumentDeleted result) ->
          case result of 
            Ok reply -> 
              let 
                documents = DocumentList.documents model.documentList
                idOfDocumentToDelete = String.toInt reply |> Maybe.withDefault 0
                indexOfDocumentToDelete = List.Extra.findIndex (\doc -> doc.id == idOfDocumentToDelete) documents |> Maybe.withDefault 0
                maybeDocumentAboveDeleteDocument = List.Extra.getAt (indexOfDocumentToDelete - 1) documents
                maybeDocumentBelowDeleteDocument = List.Extra.getAt (indexOfDocumentToDelete + 1) documents
                maybeDocumentToSelect = case maybeDocumentAboveDeleteDocument of 
                                      Just document -> Just document 
                                      Nothing -> case maybeDocumentBelowDeleteDocument of 
                                         Just document -> Just document 
                                         Nothing -> Nothing                      
                documentSelectedId = case maybeDocumentToSelect of 
                                        Just document -> document.id 
                                        Nothing -> 0
                documentSelected = case maybeDocumentToSelect of 
                   Just doc -> doc 
                   Nothing -> Document.basicDocument
                nextDocumentList_ = DocumentList.select maybeDocumentToSelect model.documentList                        
              in 
               ({ model | message = "Document deleted: " ++ (String.fromInt indexOfDocumentToDelete) ++ ", Document selected: " ++ (String.fromInt documentSelectedId) 
                  , currentDocument = documentSelected 
                  , toolPanelState = HideToolPanel
                  , documentList = DocumentList.deleteItemInDocumentListAt idOfDocumentToDelete nextDocumentList_
              
                },  Cmd.none)
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocMsg (NewDocumentCreated result) ->
          case result of 
            Ok documentRecord -> 
              let   
                nextDocument = documentRecord.document
                selectedDocId_ = Document.selectedDocId nextDocument
                cmd = Cmd.map DocMsg (Document.attachDocumentToMasterBelowCmd  (User.getTokenStringFromMaybeUser model.maybeCurrentUser) selectedDocId_ nextDocument model.maybeMasterDocument)
                nextDocumentList_ = DocumentList.nextDocumentList selectedDocId_ nextDocument model.documentList    
              in  
               ({ model | currentDocument = nextDocument
                         , documentList = nextDocumentList_
                },  cmd)
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocMsg (AcknowledgeUpdateOfDocument result) -> 
           case result of 
             Ok documentRecord -> 
               (model ,  Cmd.none)
             Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (RestoreDocumentList result)->
          case result of 
            Ok documentList -> 
              let 
                currentDocumentId = model.documentIdList.selected
                maybeCurrentDocument = List.Extra.find (\doc -> doc.id == currentDocumentId) (DocumentList.documents documentList)
                currentDocument = maybeCurrentDocument |> Maybe.withDefault Document.basicDocument
                nextMaybeMasterDocument = case currentDocument.docType of 
                  Standard -> Nothing 
                  Master -> Just currentDocument
              in
               ({ model |       
                  documentList = DocumentList.select maybeCurrentDocument documentList
                 , currentDocument = currentDocument
                 , maybeMasterDocument = nextMaybeMasterDocument
                 }
                 ,  Cmd.batch [
                       loadTexMacrosForDocument currentDocument model
                      , saveDocumentListToLocalStorage documentList  
                     ]
                  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (ReceiveDocumentListWithSelectedId result)->
          case result of 
            Ok documentList -> 
              let 
                idOfSelectedDocument = model.selectedDocumentId 
                documents_  = DocumentList.documents documentList
                indexOfSelectedDocument = List.Extra.findIndex (\doc -> doc.id == idOfSelectedDocument) documents_ |> Maybe.withDefault 0
                selectedDocument = List.Extra.getAt indexOfSelectedDocument documents_ |> Maybe.withDefault Document.basicDocument
              in
               ({ model | 
                   documentList = DocumentList.select (Just selectedDocument) documentList
                 , currentDocument = selectedDocument  
                 }
                 ,  Cmd.batch [
                       loadTexMacrosForDocument selectedDocument model
                      , saveDocumentListToLocalStorage documentList  
                      , pushDocument selectedDocument
                     ]
                  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (ReceiveDocumentList result)->
          case result of 
            Ok documentList -> 
              let 
                currentDocument = DocumentList.getFirst documentList
                (nextMaybeMasterDocument, loadTexMacrosForMasterDocument) = case currentDocument.docType of 
                  Standard -> (Nothing, Cmd.none) 
                  Master -> (Just currentDocument, loadTexMacrosForDocument currentDocument model)
              in
               ({ model | 
                   documentList = DocumentList.selectFirst documentList
                 , currentDocument = DocumentList.getFirst documentList
                 , maybeMasterDocument = nextMaybeMasterDocument
                 }
                 ,  Cmd.batch [
                        loadTexMacrosForDocument currentDocument model
                      , loadTexMacrosForMasterDocument
                      , saveDocumentListToLocalStorage documentList 
                      , pushDocument currentDocument
                     ]
                  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (ReceiveDocumentListAndPreserveCurrentSelection result)->
          case result of 
            Ok documentList -> 
              let 
                currentDocument = DocumentList.getFirst documentList
                nextMaybeMasterDocument = case currentDocument.docType of 
                  Standard -> Nothing 
                  Master -> Just currentDocument
                nextDocumentList_ = DocumentList.select (Just model.currentDocument) documentList
              in
                ({ model | 
                      documentList = nextDocumentList_
                    , maybeMasterDocument = nextMaybeMasterDocument 
                    }
                    , Cmd.batch [
                          saveDocumentListToLocalStorage documentList
                        , loadTexMacrosForDocument currentDocument model
                      ]  
                )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )


        DocListViewMsg (SetCurrentDocument document) -> -- ###
            let  
              documentList = DocumentList.select (Just document) model.documentList
              masterDocLoaded = case document.docType of
                Standard -> model.masterDocLoaded
                Master -> True
              loadMasterCommand = case document.docType of 
                Standard -> Cmd.none
                Master ->   Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser document.id)
            in
               ({ model | 
                   currentDocument = document
                 , masterDocLoaded = masterDocLoaded
                 , deleteDocumentState = DeleteIsOnSafety
                 , documentList = documentList
                 , currentDocumentDirty = False
                 , counter = model.counter + 1

                 }
                 , Cmd.batch[
                        loadMasterCommand
                      , saveDocToLocalStorage document
                      , saveDocumentListToLocalStorage documentList 
                      , loadTexMacrosForDocument document model
                      , pushDocument document
                 ]
               )

        DocViewMsg (LoadMaster docId) ->
           ({model | masterDocLoaded = True}, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser docId))

        DocViewMsg (LoadMasterWithSelection childId docId) ->
           ({ model | selectedDocumentId = childId, masterDocLoaded = True},  Cmd.map DocListMsg (DocumentList.loadMasterDocumentAndSelect model.maybeCurrentUser docId))

        DocViewMsg (LoadMasterWithCurrentSelection docId) ->
         ({model | appMode = Reading, toolPanelState = HideToolPanel, masterDocLoaded = True} , Cmd.map DocListMsg (DocumentList.loadMasterDocumentWithCurrentSelection model.maybeCurrentUser docId))

        SignIn ->
          signIn model

        SignOut ->
          signOutCurrentUser model  

        -- Handler: RespondToNewUser
        RegisterUser ->
          case String.length model.password < 8 of 
            True -> 
              ({model | message = "Password must have at least 8 characters"}, Cmd.none)
            False -> 
              (model, Cmd.map UserMsg (User.registerUser model.email model.username "anon" model.password)  )   

        SetSignupMode signupMode_  ->
           ({ model | signupMode = signupMode_}, Cmd.none )  

        
        GetDocumentById id ->
           (model, Cmd.map DocMsg (Document.getDocumentById id (readToken model.maybeToken)))

        GetPublicDocuments query ->
           ({ model | 
               appMode = Reading
             , toolPanelState = HideToolPanel
            }
            , Cmd.batch [
                  Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse query))
                , saveCurrentDocumentIfDirty model
            ]
            )

        GetPublicDocumentsRawQuery query ->
           getPublicDocumentsRawQuery model query 

        GetImages query ->
          (model, Cmd.map FileMsg <| Credentials.getImages "" query)

        DocViewMsg (GetPublicDocumentsRawQuery2 query) ->
           ({ model | appMode = Reading, toolPanelState = HideToolPanel, currentDocumentDirty = False}, 
             Cmd.batch [
                 Cmd.map DocListMsg (DocumentList.findDocuments Nothing query)
               , saveCurrentDocumentIfDirty model
             ]
            )
        
        GetUserDocuments query ->
          case model.maybeCurrentUser of 
            Nothing -> ( model, Cmd.none)
            Just user ->
             ({ model | toolPanelState = HideToolPanel }, Cmd.map DocListMsg (DocumentList.findDocuments (Just user) (Query.parse query)))
        
        LoadMasterDocument idString ->
              case String.toInt idString  of 
                Nothing ->  ( model, Cmd.none)
                Just id -> 
                 ( {model | masterDocLoaded = True}, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser id ))

        DocDictMsg (PutDocumentInDictionaryAsTexMacros result) -> 
          case result of 
            Ok documentRecord -> 
              let 
                dict = model.documentDictionary
                doc = documentRecord.document
              in
                 ({ model | documentDictionary = DocumentDictionary.put "texmacros" doc dict },   Cmd.none  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )
        GoToStart ->
          goToStart model  

        Model.GoHome ->
          goHome model

        GoToUsersHomePage bigUser ->
          let 
            queryString = "authorname=" ++ bigUser.username ++ "&key=home"
          in 
            ( {model | appMode = Reading
                    , toolPanelState = HideToolPanel
              }
              , Cmd.map DocListMsg (DocumentList.findDocuments Nothing queryString)
            )

        ChangeMode nextAppMode ->
          changeMode model nextAppMode
         

        DebounceMsg msg_ ->
            let
                (debounce, cmd) =
                    Debounce.update debounceConfig (Debounce.takeLast updateEditorContentCmd) msg_ model.debounce

                tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                ({ model | debounce = debounce
                         , debounceCounter = model.debounceCounter + 1
                         --, message = "debounce: " ++ (String.fromInt model.debounceCounter)
                  }
                         , Cmd.batch [
                    cmd  
                  , saveDocToLocalStorage model.currentDocument
                  ]
                )  

        GetContent str ->
            let
                (debounce, cmd) =
                   Debounce.push debounceConfig str model.debounce
            in
                ({ model
                    | sourceText = str
                    , currentDocumentDirty = True 
                    , debounce = debounce
                    }
                    , cmd)

        UpdateEditorContent str -> 
          let  
            currentDocument = model.currentDocument 
            nextCurrentDocument = { currentDocument | content = str }
            nextDocumentList = DocumentList.updateDocument nextCurrentDocument model.documentList
          in  
            ( {model | currentDocument = nextCurrentDocument, documentList = nextDocumentList}, Cmd.none )

        SaveCurrentDocument time ->
          let  
              tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser
          in 
            case model.currentDocument.docType of
              Master -> ({model | message = "Autosave (no, M)"} , getTime) -- do not autosave master documents ###
              Standard -> 
                ( { model |   currentDocumentDirty = False
                            , message = "Autosaved doc " ++ (String.fromInt model.debounceCounter)
                            , documentList = DocumentList.updateDocument model.currentDocument model.documentList 
                        }
                  , Cmd.batch [saveCurrentDocumentIfDirty model, getTime ])

        UpdateCurrentDocument ->
          saveCurrentDocument model


        Outside infoForElm_ ->
           processInfoForElm model infoForElm_
           
        ToggleToolPanelState -> 
          toggleToolPanelState model 

        NewDocument -> 
           doNewDocument model

        NewChildDocument -> 
          (model, Cmd.map DocMsg (newChildDocument model))

        SetDocumentTextType textType -> 
          let  
            document = model.currentDocument 
            nextDocument = { document | textType = textType }
          in 
           ( { model | currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none)

        SetDocumentType docType ->
           let  
            document = model.currentDocument 
            nextDocument = { document | docType = docType }
          in 
           ( { model | currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none)

        GetViewport viewport -> 
           ({model | viewport = viewport }, Cmd.none)


        DeleteCurrentDocument ->
          let 
            tokenString = (User.getTokenStringFromMaybeUser model.maybeCurrentUser)
          in 
            case model.deleteDocumentState of 
              DeleteIsOnSafety -> 
                  ({model | deleteDocumentState = DeleteIsArmed}, Cmd.none)
              DeleteIsArmed ->  
                  ({model | deleteDocumentState = DeleteIsOnSafety}, (Cmd.map DocMsg (Document.deleteDocument tokenString model.currentDocument)))


        CancelDeleteCurrentDocument ->
          ({model | deleteDocumentState = DeleteIsOnSafety}, Cmd.none )

        LogErr error ->
            ( model, Cmd.none ) -- ## startup errors
            
        KeyMsg keyMsg ->
          let 
            pressedKeys = Keyboard.update keyMsg model.pressedKeys
          in 
            keyGateway model pressedKeys
            
        GetUserManual ->
          (model, Cmd.map DocMsg (Document.getDocumentById Configuration.userManualId Nothing))

        UrlChanged str ->
            case UrlAppParser.toRoute str of 
              DocumentIdRef id -> 
                selectDocumentWithId id model
              _ -> (model, Cmd.none)

        SetDocumentPublic value ->
          let 
            currentDocument = model.currentDocument 
            nextCurrentDocument = {currentDocument | public = value }
          in 
            ( { model | currentDocument = nextCurrentDocument}, Cmd.none)

        Test ->
           (model, Cmd.map ImageMsg <| ImageManager.getImageList model.currentDocument)

        ReadImage v ->
          let 
            maybeFileData = case (Decode.decodeValue Credentials.decodeFileData v) of
              Ok fileData -> Just fileData
              Err _ -> Nothing
            fileInfo = case maybeFileData of 
              Nothing ->  Credentials.fileInfoTestRecord
              Just fileData -> 
                { filename = fileData.name 
                  , mimetype = fileData.mimetype
                  , bucket = "noteimages"
                  , path = (User.usernameFromMaybeUser model.maybeCurrentUser) 
                }
            path_ = (User.usernameFromMaybeUser model.maybeCurrentUser) ++ "/" ++ fileInfo.filename
            cmd = Credentials.getS3PresignedUrl (stringFromMaybeToken  model.maybeToken) "noteimages" path_ fileInfo.mimetype

          in
            ({model | message = fileInfo.filename, maybeFileData = maybeFileData, fileValue = v }, Cmd.map FileMsg cmd )


        FileMsg (Credentials.ReceiveFileCredentials result) -> 
          let 
            cmd = case result of 
              Ok credentialsWrapper -> 
                 sendCredentials (Credentials.encodeCredentialsWrapper credentialsWrapper)
              Err _ ->
                 Cmd.none
          in
            (model, cmd)

        FileMsg (Credentials.ReceivePresignedUrl result) ->
          let 
            v = case model.maybeFileData of 
              Nothing -> Encode.null
              Just fileData -> Credentials.encodeFileData fileData
          in 
            case result of 
              Ok url -> 
                ({ model | message = "psurl: " ++ url, psurl = url }, 
                  Cmd.batch [  readImage (Credentials.encodeFileValueWithUrl model.fileValue url)
                           , uploadImage (Credentials.encodeFileValueWithUrl model.fileValue url)
                          ]
                )
              Err err -> 
                  ({model | message = handleHttpError err}, Cmd.none)

        ImageRead v ->
          let 
            nextImageString = Decode.decodeValue Decode.string v |> Result.toMaybe
          in 
            ( { model | maybeImageString = nextImageString, message = "ImageRead" }, Cmd.map UserMsg <| User.incrementMediaCountForMaybeUser model.maybeCurrentUser   )

        DocMsg (ReceiveWorkerReply result) ->
          case result of 
            Ok pdfFileName -> ( { model | message = pdfFileName }, sendPdfFileName (Document.encodeString pdfFileName)  )
            Err err -> ( { model | message = httpErrorHandler err }, Cmd.none)
       
        DocMsg (ReceiveLatexExportText result) ->
            case result of 
            Ok str -> ( { model | message = "Export file: " ++ (String.fromInt (String.length str)) }, Cmd.map DocMsg <| Document.sendToWorker str )
            Err err -> ( { model | message = httpErrorHandler err }, Cmd.none )

        SessionStatus t ->
          let 
            sessionExpired = 
              case model.maybeCurrentUser of 
                Nothing -> True 
                Just user -> User.sessionIsExpired t user
            sessionString =
              case sessionExpired of 
                True -> "Not signed in"
                False ->  "UTC " ++ toUtcString t         
          in 
            case (sessionExpired, model.maybeCurrentUser) of 
                (True, Just _) -> signOutCurrentUser model 
                (_, _) -> ( {model | message = sessionString}, Cmd.none) -- ###


      
        PrintDocument -> 
          case model.currentDocument.textType of 
            MiniLatex ->  printLatex model 
            _ -> 
              (model, sendDocumentForPrinting (Document.encodeString (Document.printUrl model.currentDocument)))

        ImageMsg (ReceiveImageList result) ->
            case result of 
            Ok imageList -> ( { model | message = "Images: " ++ (String.fromInt (List.length imageList)) }
                   , Cmd.map ImageMsg (ImageManager.processImageList imageList))
            Err err -> ( { model | message = httpErrorHandler err }, Cmd.none )
            

        ImageMsg (ReceiveImageListReply result) ->
            case result of 
            Ok str -> ( { model | message = "RIL: " ++ str},  Cmd.none )
            Err err -> ( { model | message = httpErrorHandler err }, Cmd.none )
            -- Err err -> ( { model | message = "RIL Error" }, Cmd.none )

        UserMsg (ListUsers result) ->
          case result of 
              Ok userList -> ({model | userList = userList, message = "Users: " ++ (String.fromInt <| List.length userList)}, Cmd.none)
              Err error ->  
                  ({model | message = httpErrorHandler error}, Cmd.none)

        GetUsers -> 
          searchForUsers model

        UserMsg (AcknowledgeMediaCountIncrement result) -> 
          case result of 
            Ok reply -> ({model | message = reply}, Cmd.none )
            Err error -> ({model | message = httpErrorHandler error }, Cmd.none )

        MakeImage -> 
          case model.maybeCurrentUser of 
            Nothing -> (model, Cmd.none)
            Just user -> (model, 
              Cmd.map FileMsg <| Credentials.makeImage 
                 (User.getTokenString user) 
                 model.imageName (AppUtility.imageUrlAtS3 model) 
                 (imageAccessbilityToBool model.imageAccessibility)
                 (User.userId user) 
              )
          
        FileMsg (Credentials.ReceiveMakeImageAcknowledgement result) -> 
          case result of 
            Ok reply -> ({model | message = reply}, Cmd.none)
            Err error -> ({model | message = handleHttpError error}, Cmd.none)

        FileMsg (Credentials.ReceiveImageList result) ->
          case result of 
            Ok imageList -> ({model | imageList = imageList, message = "Images: " ++ (String.fromInt <| List.length imageList)}, Cmd.none)
            Err error -> ({model | message = handleHttpError error}, Cmd.none)

        SelectImage image ->
          ({model | message = "Image: " ++ image.name, maybeCurrentImage = Just image, imageMode = ViewImage}, Cmd.none)
          
        SelectImageLoader -> 
         ({model | imageMode = LoadImage}, Cmd.none)
        
        ToggleImageAccessibility ->
          case model.imageAccessibility of 
            PublicImage ->  ({model | imageAccessibility = PrivateImage}, Cmd.none)
            PrivateImage ->  ({model | imageAccessibility = PublicImage}, Cmd.none)

        AcceptEmailSubject str ->
          ({model | emailSubject = str}, Cmd.none)

        AcceptEmailText str ->
          ({model | emailText = str}, Cmd.none)

        SendEmail -> 
          ({ model | message = "Sending email"}, 
             Cmd.map MailMsg <| Mail.sendEmailToUsers 
              ( User.getTokenStringFromMaybeUser model.maybeCurrentUser) 
                model.userList 
                model.emailSubject 
                model.emailText
              )
        MailMsg (Mail.AcknowledgeEmailSent result)-> 
          case result of 
            Ok reply -> ({model | message = reply}, Cmd.none)
            Err error -> ({model | message = "Error sending mail"}, Cmd.none)

        TogglePreferencesPanel ->
          case model.preferencesPanelState of 
             PreferencesPanelOff -> ({model | preferencesPanelState = PreferencesPanelOn },Cmd.none)
             PreferencesPanelOn -> ({model | preferencesPanelState = PreferencesPanelOff },Cmd.none)

        UserMsg (ReceiveBigUserRecord result) ->
           case result of 
             (Ok bigUserRecord) -> ({model | blurb = bigUserRecord.user.blurb, message = bigUserRecord.user.blurb, maybeBigUser = Just bigUserRecord.user}, Cmd.none)
             Err error -> ({model | blurb = "No blurb", message = httpErrorHandler error}, Cmd.none)

        GetBigUser ->
          case model.maybeCurrentUser of 
            Nothing ->
              (model, Cmd.none)
            Just user ->   
              (model, Cmd.map UserMsg <| User.getBigUserRecord (User.userId user))

        UpdateBigUser ->
          case model.maybeBigUser of 
            Nothing -> (model, Cmd.none)
            Just bigUser -> 
              let 
                nextBigUser = {bigUser | blurb = model.blurb}
              in 
                (model, Cmd.map UserMsg <| User.updateBigUser (User.getTokenStringFromMaybeUser model.maybeCurrentUser) nextBigUser)

        UserMsg (AcknowlegeBigUserUpdate result) ->
           case result of 
             Ok reply -> ({ model | message = reply}, Cmd.none)
             Err error -> ({model | message = httpErrorHandler error}, Cmd.none)

        AcceptBlurb str ->
          ({model | blurb = str}, Cmd.none)

        ToggleUserPublicPrivate ->
          case model.maybeBigUser of 
            Nothing -> (model, Cmd.none)
            Just bigUser ->
              case bigUser.public of  
                True -> 
                  ({model | maybeBigUser = Just {bigUser |  public = False}}, Cmd.none)
                False ->
                  ({model | maybeBigUser = Just {bigUser |  public = True}}, Cmd.none)

        Search -> 
          doSearch model
              
  
-- UPDATE END

-- HELPERS

imageAccessbilityToBool : ImageAccessibility -> Bool 
imageAccessbilityToBool imageAccessibility = 
  case imageAccessibility of 
    PublicImage -> True 
    PrivateImage -> False

imageQuery : Model -> String -> String 
imageQuery model basicQuery = 
  case model.maybeCurrentUser of 
    Nothing -> "123XY.uuk#m!!t"
    Just user -> 
      case basicQuery == "" of 
        True -> Query.parse <| "user_id=" ++ (String.fromInt <| User.userId user)
        False -> 
          case basicQuery == "random" of 
            True -> Query.parse <| "random=yes"
            False -> Query.parse <| "user_id=" ++ (String.fromInt <| User.userId user) ++ "&" ++ (Query.stringToQueryString "name" basicQuery)



{-| Handler: ListUsers
-}

searchForUsersCmdWithQuery : String -> Model -> Cmd Msg 
searchForUsersCmdWithQuery searchQueryString model = 
  Cmd.map UserMsg (User.getUsers <| searchQueryString)
  


searchForUsersCmd : Model -> Cmd Msg 
searchForUsersCmd model = 
  case (String.contains "=" model.searchQueryString) of 
    True ->  Cmd.map UserMsg (User.getUsers <| model.searchQueryString)
    False -> Cmd.map UserMsg (User.getUsers <| "is_user=" ++ model.searchQueryString)
  


searchForUsers : Model -> (Model, Cmd Msg)
searchForUsers model = 
  ( model, searchForUsersCmd model) 

searchForImages : Model -> (Model, Cmd Msg)
searchForImages model = 
  let 
    queryString = case model.searchQueryString == "" of 
      True -> ""
      False -> model.searchQueryString
  in
  ( model, Cmd.map FileMsg (Credentials.getImages "" (imageQuery model queryString)))

goToStart model = 
  let  
    doc = Document.basicDocument  
  in 
    ({model | currentDocument = { doc | title = "Welcome!" }
          , currentDocumentDirty = False
          , appMode = Reading
      }
      , saveCurrentDocumentIfDirty model  
    )

printDocument : Model -> (Model, Cmd Msg)
printDocument model = 
  case model.currentDocument.textType of 
    MiniLatex -> printLatex model
    _ -> (model, sendDocumentForPrinting (Document.encodeString (Document.printUrl model.currentDocument))) 

printLatex : Model -> (Model, Cmd Msg)
printLatex model = 
  (model, 
      Cmd.batch [
          Cmd.map DocMsg <| Document.getExportLatex model.currentDocument
        , Cmd.map ImageMsg <| ImageManager.getImageList model.currentDocument
      ]
  )


doNewDocument : Model -> (Model, Cmd Msg)
doNewDocument model = 
  case model.maybeCurrentUser of 
    Nothing -> (model, Cmd.none)
    Just _ -> 
      ({ model | toolPanelState = ShowToolPanel
              , documentTitle = "NEW DOCUMENT"
              , currentDocumentDirty = False}, 
          Cmd.batch[ 
              Cmd.map DocMsg (newDocument model)
            , saveCurrentDocumentIfDirty model
          ] 
      )

toggleToolPanelState : Model -> (Model, Cmd Msg)
toggleToolPanelState model = 
  case model.maybeCurrentUser of 
    Nothing -> (model, Cmd.none)
    Just _ -> 
      let  
          nextToolPanelState = 
            case model.toolPanelState of 
              HideToolPanel -> ShowToolPanel
              ShowToolPanel -> HideToolPanel
          nextModel = case nextToolPanelState of 
              HideToolPanel -> 
                let 
                  docList_ = model.documentList
                  nextDocList_ = DocumentList.updateDocument model.currentDocument docList_
                in
                  { model | toolPanelState = nextToolPanelState, documentList = nextDocList_ }  
              ShowToolPanel -> 
                { model | 
                  documentTitle  = model.currentDocument.title
                , toolPanelState = nextToolPanelState
                , deleteDocumentState = DeleteIsOnSafety
                , appMode = Writing
                }
      in 
        ( nextModel , Cmd.none)

getPublicDocumentsRawQuery : Model -> String -> (Model, Cmd Msg)
getPublicDocumentsRawQuery model query = 
  ({ model | appMode = Reading
      , toolPanelState = HideToolPanel
      , masterDocLoaded = False
      , currentDocumentDirty = False 
    }, 
    Cmd.batch [ 
        Cmd.map DocListMsg (DocumentList.findDocuments Nothing query)
      , saveCurrentDocumentIfDirty model
    ]
             
  )

goHome : Model -> (Model, Cmd Msg)
goHome model = 
  case model.maybeCurrentUser of 
    Nothing -> 
        let 
          doc = Document.basicDocument  
        in 
          ( { model | currentDocument = { doc | title = "Welcome!" }
              , currentDocumentDirty = False
            }
            , saveCurrentDocumentIfDirty model
          )
    Just user -> 
        let 
          queryString = "authorname=" ++ User.username user ++ "&key=home"
        in 
          ( {model | appMode = Reading
                  , toolPanelState = HideToolPanel
            }
            , Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser queryString)
          )

changeMode : Model -> AppMode -> (Model, Cmd Msg)
changeMode model nextAppMode = 
  let 
    nextToolPaneState = if nextAppMode == Reading then 
                      HideToolPanel 
                    else
                      model.toolPanelState
    cmd = case nextAppMode of 
      ImageEditing ->
        case model.imageList == [] of 
          True ->  Cmd.map FileMsg (Credentials.getImages "" (imageQuery model ""))
          False -> Cmd.none
      DisplayAuthors ->
        case model.userList == [] of 
          True -> searchForUsersCmdWithQuery "created=3000" model 
          False -> Cmd.none
      Admin ->
        case model.userList == [] of 
          True -> searchForUsersCmdWithQuery "created=7" model 
          False -> Cmd.none
      _ -> Cmd.none
    searchQueryString = case nextAppMode of 
      Admin -> "created=7"
      _ -> ""
  in 
    ({model | appMode = nextAppMode, searchQueryString = searchQueryString, toolPanelState = nextToolPaneState}, cmd)

signOutCurrentUser : Model -> (Model, Cmd Msg)
signOutCurrentUser model = 
  let 
    freshModel = initialModel "" model.windowWidth model.windowHeight  SystemDocument.signedOut
  in 
    ({ freshModel | maybeCurrentUser = Nothing
            , maybeToken = Nothing
            , message = "Signed out"
            , currentDocumentDirty = False}, 
        Cmd.batch [
            eraseLocalStorage  
          , saveCurrentDocumentIfDirty model    
        ]
            
    ) 

getTime : Cmd Msg
getTime = 
    Time.now 
        |> Task.perform SessionStatus

getTimeInOneSecond =
  Process.sleep (1000)
    |> Task.andThen (\_ -> Time.now)
    |> Task.perform (\time -> SessionStatus time)

getBigUserInOneSecond = 
  Process.sleep (1000)
    |> Task.perform (\_ -> Time.now)
 




toUtcString : Time.Posix -> String
toUtcString time =
  (String.fromInt (Time.toHour Time.utc time) |> String.padLeft 2 '0')
  ++ ":" ++
  (String.fromInt (Time.toMinute Time.utc time) |> String.padLeft 2 '0')
  ++ ":" ++
  (String.fromInt (Time.toSecond Time.utc time) |> String.padLeft 2 '0')
  

saveCurrentDocumentIfDirty : Model -> Cmd Msg
saveCurrentDocumentIfDirty model = 
  case model.currentDocumentDirty of 
    False ->  Cmd.none
    True -> 
      let 
        token = User.getTokenStringFromMaybeUser model.maybeCurrentUser 
      in
         Cmd.map DocMsg <| Document.saveDocument token model.currentDocument 
        

signIn model =
  case String.length model.password < 8 of 
    True -> ({model | message = "Password must contain at least 8 characters"}, Cmd.none)
    False ->
      let 
          basicDoc = Document.basicDocument
          startupDoc = SystemDocument.signIn
          freshModel = initialModel "" model.windowWidth model.windowHeight  startupDoc
      in 
          (freshModel, Cmd.map UserMsg (User.getTokenCmd model.email model.password)  ) 

loadTexMacrosForDocument : Document -> Model -> Cmd Msg 
loadTexMacrosForDocument document model =
  Cmd.map  DocDictMsg 
     <| DocumentDictionary.loadTexMacros (readToken model.maybeToken) document document.tags model.documentDictionary 

selectDocumentWithId : Int -> Model -> (Model, Cmd Msg)
selectDocumentWithId  id model = 
  let 
      documents_  = model.documentList
      documentList = DocumentList.documents documents_
      indexOfSelectedDocument = List.Extra.findIndex (\doc -> doc.id == id) documentList |> Maybe.withDefault 0
      selectedDocument = List.Extra.getAt indexOfSelectedDocument documentList |> Maybe.withDefault Document.basicDocument
    in
      ({ model | 
          documentList = DocumentList.select (Just selectedDocument) documents_
        , currentDocument = selectedDocument 
        , counter = model.counter + 1 
        }
        ,  Cmd.batch [
              loadTexMacrosForDocument selectedDocument model
            , saveDocumentListToLocalStorage documents_  
            ]
        )


pushDocument : Document -> Cmd Msg
pushDocument document =
  pushUrl <| "/" ++ (String.fromInt document.id)


headKey : List Key -> Key
headKey keyList =
    List.head keyList |> Maybe.withDefault F20

getPublicDocuments : Model -> String -> (Model, Cmd Msg)
getPublicDocuments model queryString =
     ({ model |  appMode = Reading
               , toolPanelState = HideToolPanel
               ,  masterDocLoaded = False 
               , currentDocumentDirty = False
            }
            , Cmd.batch [
                Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse queryString))
              , saveCurrentDocumentIfDirty model
            ]
      )

            

getUserDocuments : Model -> String -> (Model, Cmd Msg)   
getUserDocuments model queryString =
  ({ model | toolPanelState = HideToolPanel
       , masterDocLoaded = False
       , currentDocumentDirty = False } 
    , Cmd.batch [
        Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser (Query.parse queryString))
      , saveCurrentDocumentIfDirty model
    ]
  )


newDocument : Model ->Cmd DocMsg
newDocument model =
  case model.maybeCurrentUser of 
    Nothing -> Cmd.none
    Just user -> newDocumentForUser user model

newDocumentForUser : User -> Model -> Cmd DocMsg
newDocumentForUser user model =  
  let  
    headDocument = DocumentList.getFirst  model.documentList
    parentId = case headDocument.docType of 
      Master -> headDocument.id 
      Standard -> 0 
    selectedDocumentId = case  DocumentList.selected model.documentList of 
       Nothing -> 0 
       Just selectedDoc -> selectedDoc.id
  in  
    Document.createDocument (User.getTokenString user) (makeNewDocument user )

makeNewDocument : User -> Document
makeNewDocument user =
    let
        newDocument_ = SystemDocument.newDocument
    in
       { newDocument_ | 
            authorId =  User.userId user
          , authorName = User.username user
          , title = "NEW DOCUMENT"
        }
  

newChildDocument : Model ->Cmd DocMsg
newChildDocument model =
  case model.maybeCurrentUser of 
    Nothing -> Cmd.none
    Just user -> newDocumentForUserWithParent user model

newDocumentForUserWithParent : User -> Model -> Cmd DocMsg
newDocumentForUserWithParent user model =  
  let  
    headDocument = DocumentList.getFirst  model.documentList
    parentId = case headDocument.docType of 
      Master -> headDocument.id 
      Standard -> 0 
    parentTitle = case headDocument.docType of 
      Master -> headDocument.title 
      Standard -> "" 
    selectedDocumentId = case  DocumentList.selected model.documentList of 
       Nothing -> 0 
       Just selectedDoc -> selectedDoc.id
  in  
    Document.createDocument (User.getTokenString user) (makeNewDocumentWithParent parentId parentTitle selectedDocumentId user )
  

makeNewDocumentWithParent : Int -> String -> Int -> User -> Document
makeNewDocumentWithParent parentId parentTitle selectedDocumentId user =
    let
        newDocument_ = Document.basicDocument
    in
       { newDocument_ | 
            title = "New Child Document"
          , authorId =  User.userId user
          , authorName = User.username user
          , parentId = parentId
          , parentTitle = parentTitle
          , content = "New Child Document of " ++ parentTitle ++ ", placeUnder:" ++ (String.fromInt selectedDocumentId)
        }




displayCurrentMasterDocument model = 
  case model.maybeMasterDocument of 
    Nothing -> "Master: none"
    Just doc -> "Master: " ++ (String.fromInt doc.id) 

getViewPort : Cmd Msg
getViewPort = Task.perform GetViewport Dom.getViewport

saveCurrentDocument : Model -> (Model, Cmd Msg) -- ###
saveCurrentDocument model = 
  case model.currentDocument.docType of
    Master -> saveCurrentMasterDocument model
    Standard -> 
      let  
          tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser 
          currentDocument = model.currentDocument 
          tags = model.tagString |> String.split "," |> List.map String.trim
          nextTags = case tags == [] of 
            True -> currentDocument.tags 
            False -> tags
          nextDocumentTitle = case model.documentTitle == "" of
            True ->  currentDocument.title
            False -> model.documentTitle
          nextCurrentDocument = { currentDocument | title = nextDocumentTitle, tags = nextTags}
          nextDocumentList = DocumentList.updateDocument currentDocument model.documentList
      in 
          ( { model | currentDocumentDirty = False 
                    , message = "(s)" ++ (digest nextCurrentDocument.content)
                    , currentDocument = nextCurrentDocument
                    , documentList = nextDocumentList}
            , Cmd.map DocMsg <| Document.saveDocument tokenString nextCurrentDocument )

digest str = 
  str 
    |> String.replace "\n" ""
    |> (\x -> (String.left 3 x) ++ "..." ++( String.right 3 x))

saveCurrentMasterDocument : Model -> (Model, Cmd Msg) -- ###
saveCurrentMasterDocument model = 
    let  
        tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser
    in 
        ( { model |  currentDocumentDirty = False
                    , message = "(m)" ++ (digest model.currentDocument.content)
                    , documentList = DocumentList.updateDocument model.currentDocument model.documentList 
                }
          , Cmd.batch [ -- saveCurrentDocumentIfDirty model
                       Cmd.map DocMsg <| Document.saveDocument tokenString model.currentDocument 
                      , getTime 
                      , Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser model.currentDocument.id) -- ###!!!
                  ])

httpErrorHandler : Http.Error -> String
httpErrorHandler error = 
  case error of 
    Http.BadPayload errorString response ->
      errorString  
        |> Utility.getEnclosedText "{" "}"
        |> String.split ":"
        |> List.drop 1 
        |> List.head
        |> Maybe.withDefault ""
        |> String.replace "\"" "" 
        -- |> (\x -> "Bad payload: " ++ x)
      -- Debug.toString response
    Http.BadUrl str -> "Bad url: " ++ str 
    Http.Timeout -> "timeout"
    Http.NetworkError -> "Network error"
    Http.BadStatus resp -> "Bad status: " ++ "darn!"



handleHttpError : Http.Error -> String 
handleHttpError error = 
  case error of 
    Http.BadUrl str -> str 
    Http.Timeout -> "timeout"
    Http.NetworkError -> "Network error"
    Http.BadStatus resp -> "Bad status ("  ++ (String.fromInt resp.status.code)  ++ "): " ++ resp.status.message -- (decodeResponse resp) --  ++ "darn! " 
    Http.BadPayload str1 resp -> "Bad payload: " ++ str1  ++ ", payload = " ++ "bad payload"
      
