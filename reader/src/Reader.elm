port module Main exposing (main)

{- This app retrieves and displays weather data from openweathermap.org. -}

import Browser
import Browser.Dom as Dom
import Task
import Html exposing(Html)
import Html.Attributes exposing(src, type_, value)
import Html.Events exposing(on)
import Http
import Debounce exposing(Debounce)
import Time exposing(Posix)
import List.Extra
import Keyboard exposing (Key(..))
import Keyboard.Arrows

import Url
import UrlAppParser exposing(Route(..))

import Json.Encode as Encode
import Json.Decode as Decode exposing(Decoder, Value)
import VirtualDom exposing (Handler(..))

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Element.Border as Border
import Element.Lazy

import Widget exposing(..)

import Configuration
import SystemDocument
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User)
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
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
import FileUploadCredentials as Credentials




main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions 
        }


-- TYPES


type alias Flags =
    {
      width : Int
    , height : Int
    , location : String  
    }

type alias Model =
    {   message  : String
      , password : String
      , username : String
      , email : String
      , signupMode : SignupMode
      , maybeToken    : Maybe Token
      , maybeCurrentUser : Maybe User
      , searchQueryString  : String
      , currentDocument : Document
      , selectedDocumentId : Int
      , maybeMasterDocument : Maybe Document
      , documentList : DocumentList 
      , documentIdList : DocumentList.IntList
      , documentDictionary : DocumentDictionary
      , counter : Int
      , debounceCounter : Int 
      , appMode : AppMode
      , debounce : Debounce String
      , sourceText : String
      , currentDocumentDirty : Bool
      , autosaveDuration : Float
      , toolPanelState : ToolPanelState
      , documentTitle : String
      , tagString : String 
      , windowWidth : Int  
      , windowHeight : Int  
      , maybeViewport : Maybe Dom.Viewport
      , deleteDocumentState : DeleteDocumentState
      , pressedKeys : List Key
      , previousKey : Key
      , locationHref : String
      , masterDocLoaded : Bool
      , maybeImageString : Maybe String
    }

type DeleteDocumentState = DeleteIsOnSafety | DeleteIsArmed

type AppMode = 
  Reading | Writing | ImageEditing
  
type ToolPanelState = 
  ShowToolPanel | HideToolPanel

type SignupMode = RegistrationMode | SigninMode 

-- MSG

type Msg
    = NoOp
    | Test
    | AcceptPassword String
    | AcceptEmail String
    | AcceptUserName String 
    | AcceptSearchQuery String
    | AcceptDocumenTitle String
    | AcceptDocumentTagString String
    | SignIn
    | SignOut
    | RegisterUser
    | SetSignupMode SignupMode 
    | GetDocumentById Int
    | GetPublicDocuments String
    | GetPublicDocumentsRawQuery String
    | GetUserDocuments String
    | LoadMasterDocument String
    | UserMsg User.UserMsg
    | DocMsg Document.DocMsg
    | FileMsg Credentials.FileMsg
    | DocListMsg DocumentList.DocListMsg
    | DocListViewMsg DocumentListView.DocListViewMsg
    | DocViewMsg DocumentView.DocViewMsg
    | DocDictMsg DocumentDictionary.DocDictMsg
    | GoToStart
    | GoHome
    | ChangeMode AppMode
    | DebounceMsg Debounce.Msg
    | GetContent String
    | UpdateEditorContent String 
    | SaveCurrentDocument Posix
    | UpdateCurrentDocument
    | Outside InfoForElm
    | LogErr String
    | ToggleToolPanelState 
    | NewDocument
    | NewChildDocument
    | SetDocumentTextType TextType
    | SetDocumentType DocType
    | GetViewport Dom.Viewport
    | DeleteCurrentDocument
    | CancelDeleteCurrentDocument
    | KeyMsg Keyboard.Msg
    | GetUserManual
    | UrlChanged String
    | SetDocumentPublic Bool
    | ReadImage Value
    | ImageRead Value
    

-- NAVIGATION

port onUrlChange : (String -> msg) -> Sub msg

port pushUrl : String -> Cmd msg


-- link : msg -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
-- link href attrs children =
--   Html.a (preventDefaultOn "click" (Decode.succeed (href, True)) :: attrs) children

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




-- DEBOUNCE

-- This defines how the debouncer should work.
-- Choose the strategy for your use case.
debounceConfig : Debounce.Config Msg
debounceConfig =
  { strategy = Debounce.later 250
  , transform = DebounceMsg
  }

updateEditorContentCmd : String -> Cmd Msg
updateEditorContentCmd str =
    Task.perform UpdateEditorContent (Task.succeed str)


-- INIT

initialModel : String -> Int -> Int -> Document -> Model 
initialModel locationHref windowWidth windowHeight document =
    {   message = "App started"
            , password = ""
            , username = ""
            , email = ""
            , signupMode = SigninMode
            , searchQueryString = ""
            , maybeToken = Nothing
            , maybeCurrentUser = Nothing
            , currentDocument = document
            , selectedDocumentId = 0
            , maybeMasterDocument = Nothing 
            , documentList = DocumentList.empty
            , documentIdList = DocumentList.emptyIntList  
            , documentDictionary = DocumentDictionary.empty
            , counter = 0
            , debounceCounter = 0
            , debounce = Debounce.init
            , appMode = Reading 
            , sourceText = ""
            , currentDocumentDirty = False
            , autosaveDuration = Configuration.autosaveDuration
            , toolPanelState = HideToolPanel
            , documentTitle = ""
            , tagString = ""
            , windowWidth = windowWidth
            , windowHeight = windowHeight
            , maybeViewport = Nothing
            , deleteDocumentState = DeleteIsOnSafety
            , pressedKeys = []
            , previousKey = F20
            , locationHref = locationHref
            , masterDocLoaded = False
            , maybeImageString = Nothing
        }

init : Flags -> ( Model, Cmd Msg )
init flags = 
    ( initialModel flags.location flags.width flags.height  SystemDocument.welcome 
    , Cmd.batch [ 
        -- focusSearchBox
       processUrl flags.location

    ])

processUrl : String -> Cmd Msg 
processUrl urlString = 
    case  UrlAppParser.toRoute urlString of 
      NotFound -> 
        Cmd.batch [
            sendInfoOutside (AskToReconnectDocument Encode.null)
          , sendInfoOutside (AskToReconnectDocumentList Encode.null)
          , sendInfoOutside (AskToReconnectUser Encode.null)
        ]
        
      DocumentIdRef docId -> 
        Cmd.batch [
            sendInfoOutside (AskToReconnectUser Encode.null)
           -- , sendInfoOutside (AskToReconnectDocumentList Encode.null)
            , Cmd.map DocMsg (Document.getDocumentById docId Nothing)  
        ]

      HomeRef username -> 
        Cmd.batch [
            sendInfoOutside (AskToReconnectUser Encode.null)
            , Cmd.map DocListMsg (DocumentList.findDocuments Nothing ("key=home&authorname=" ++ username))  
        ]

      InternalRef str ->
          Cmd.none

focusSearchBox : Cmd Msg
focusSearchBox =
  Task.attempt (\_ -> NoOp) (Dom.focus "search-box")


-- SUBSCRIPITONS

autosaveSubscription : Model -> Sub Msg
autosaveSubscription model =
    if model.currentDocumentDirty then
        Time.every model.autosaveDuration SaveCurrentDocument
    else
        Sub.none

subscriptions model =
    Sub.batch [
      autosaveSubscription model
      , getInfoFromOutside Outside LogErr
      , Sub.map KeyMsg Keyboard.subscriptions
      , onUrlChange UrlChanged
      , imageRead ImageRead
    ]



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

        UserMsg (ReceiveToken result)->
          case result of 
            Ok token -> 
              let 
                maybeToken = Just token
                maybeCurrentUser = User.maybeUserFromEmailAndToken model.email (User.stringFromToken token)
              in 
               ({ model | 
                    maybeToken = maybeToken
                  , maybeCurrentUser = maybeCurrentUser
                  , message = "Authorized"
                  , email = ""
                  , password = ""
                  , username = ""
                }
                ,  sendMaybeUserDataToLocalStorage maybeCurrentUser ) 
            Err err -> 
                ({model | message = "Not authorized"},   Cmd.none  )

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
                  , message = "Authorized"
                  , email = ""
                  , password = ""
                  , username = ""
                  , currentDocument = SystemDocument.newUser 
                }
                ,  sendMaybeUserDataToLocalStorage maybeCurrentUser ) 
            Err err -> 
                ({model | message = "Not authorized"},   Cmd.none  )

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

        FileMsg (Credentials.ReceiveFileCredentials result) ->
          case result of 
            Ok credentialsWrapper -> 
               ({ model | message = "fileinfo OK" }, Cmd.none )
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
               ({ model | message = "document saved: OK"},  Cmd.none)
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


        DocListViewMsg (SetCurrentDocument document) -> 
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
          let 
              basicDoc = Document.basicDocument
              startupDoc = SystemDocument.signIn
              freshModel = initialModel "" model.windowWidth model.windowHeight  startupDoc
          in 
              (freshModel, Cmd.map UserMsg (User.getTokenCmd model.email model.password)  ) 

        SignOut ->
          let 
            freshModel = initialModel "" model.windowWidth model.windowHeight  SystemDocument.signedOut
          in 
            ({ freshModel | maybeCurrentUser = Nothing, maybeToken = Nothing}, eraseLocalStorage  )  


        RegisterUser ->
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
            , Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse query)))

        GetPublicDocumentsRawQuery query ->
           ({ model | appMode = Reading, toolPanelState = HideToolPanel, masterDocLoaded = False },  -- ####
             Cmd.map DocListMsg (DocumentList.findDocuments Nothing query))

        DocViewMsg (GetPublicDocumentsRawQuery2 query) ->
           ({ model | appMode = Reading, toolPanelState = HideToolPanel}, 
             Cmd.map DocListMsg (DocumentList.findDocuments Nothing query))
        
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
                 ({ model | message = "Put texmacros: " ++ (String.fromInt doc.id) 
                 , documentDictionary = DocumentDictionary.put "texmacros" doc dict },   Cmd.none  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )
        GoToStart ->
          let  
            doc = Document.basicDocument  
          in 
           ({model | currentDocument = { doc | title = "Welcome!" }}, Cmd.none)

        GoHome ->
          case model.maybeCurrentUser of 
            Nothing -> 
               let 
                 doc = Document.basicDocument  
               in 
                 ({model | currentDocument = { doc | title = "Welcome!" }}, Cmd.none)
            Just user -> 
               let 
                 queryString = "authorname=" ++ User.username user ++ "&key=home"
               in 
                 (model, Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser queryString))

        ChangeMode nextAppMode ->
         let 
           nextToolPaneState = if nextAppMode == Reading then 
                              HideToolPanel 
                           else
                              model.toolPanelState
         in 
          ({model | appMode = nextAppMode, toolPanelState = nextToolPaneState}, Cmd.none)

        DebounceMsg msg_ ->
            let
                (debounce, cmd) =
                    Debounce.update debounceConfig (Debounce.takeLast updateEditorContentCmd) msg_ model.debounce

                tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                ({ model | debounce = debounce, debounceCounter = model.debounceCounter + 1}, Cmd.batch [
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
          in  
            ( {model | currentDocument = nextCurrentDocument}, Cmd.none )

        SaveCurrentDocument time ->
          let  
              tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser 
          in 
              ( { model | currentDocumentDirty = False }
                , Cmd.map DocMsg <| Document.saveDocument tokenString model.currentDocument )

        UpdateCurrentDocument ->
          saveCurrentDocument model


        Outside infoForElm_ ->
           processInfoForElm model infoForElm_
           

        ToggleToolPanelState ->
           let  
              nextToolPanelState = 
                case model.toolPanelState of 
                  HideToolPanel -> ShowToolPanel
                  ShowToolPanel -> HideToolPanel
              nextModel = case nextToolPanelState of 
                 HideToolPanel -> { model | toolPanelState = nextToolPanelState }
                 ShowToolPanel -> 
                   { model | 
                      documentTitle  = model.currentDocument.title
                    , toolPanelState = nextToolPanelState
                    , deleteDocumentState = DeleteIsOnSafety
                    }             
          in 
            ( nextModel , Cmd.none)

        NewDocument -> 
          (model, Cmd.map DocMsg (newDocument model))

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
           ({model | maybeViewport = Just viewport }, Cmd.none)


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
            ( { model | message = "Error: " ++ error }, Cmd.none )
            
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
          let 
            cmd = Credentials.getS3Credentials (stringFromMaybeToken  model.maybeToken) Credentials.fileInfoTestRecord
          in
            ( model, Cmd.map FileMsg cmd )

        ReadImage v ->
            (model, readImage v )

        ImageRead v ->
          let 
            nextImageString = Decode.decodeValue Decode.string v |> Result.toMaybe
          in
            ( { model | maybeImageString = nextImageString }, Cmd.none )

  
-- UPDATE END

-- KEY COMMANDS

keyGateway : Model -> List Key -> ( Model, Cmd Msg )
keyGateway model pressedKeys =
    if model.previousKey == Control then
        respondToContolCommand model pressedKeys
    else
      case (headKey pressedKeys) of 
        Alt ->  doSearch model
        _ -> ( { model | previousKey = headKey pressedKeys }, Cmd.none )


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
    _ -> (model, Cmd.none)

doSearch : Model -> (Model, Cmd Msg)
doSearch model = 
  case model.appMode of 
        Reading -> getPublicDocuments model model.searchQueryString 
        Writing -> getUserDocuments model model.searchQueryString 
        ImageEditing -> (model, Cmd.none)
    
-- ERROR


handleHttpError : Http.Error -> String 
handleHttpError error = 
  case error of 
    Http.BadUrl str -> str 
    Http.Timeout -> "timeout"
    Http.NetworkError -> "Network error"
    Http.BadStatus resp -> "Bad status ("  ++ (String.fromInt resp.status.code)  ++ "): " ++ resp.status.message -- (decodeResponse resp) --  ++ "darn! " 
    Http.BadPayload str1 resp -> "Bad payload: " ++ str1  ++ ", payload = " ++ "bad payload"
      

-- decodeResponse : Http.Response String -> String 
-- decodeResponse resp = 
--   case resp of 
--     Http.Response str -> str 


-- IMAGE

port readImage : Value -> Cmd msg


port imageRead : (Value -> msg) -> Sub msg

show : String -> Html msg
show url =
    Html.img [ src url, Html.Attributes.width 160 ] []


decodeDataTransferFile : (Value -> msg) -> Decoder msg
decodeDataTransferFile toMsg =
    Decode.map toMsg (Decode.at ["dataTransfer", "files", "0"] Decode.value)


decodeNodeFile : (Value -> msg) -> Decoder msg
decodeNodeFile toMsg =
    Decode.map toMsg (Decode.at ["target", "files", "0"] Decode.value)

viewImage_ : Model -> Html Msg
viewImage_ model =
    Html.div [ Html.Attributes.style "margin-left" "20px"
             , Html.Attributes.style "margin-bottom" "25px"
             , Html.Attributes.style "padding" "10px"
             , Html.Attributes.style "background-color" "#eee"
             , Html.Attributes.style "width" "170px"]
        [ Html.strong [] [Html.text "Image loader"]
        , Html.br [] []
        , Html.br [][]
        , Html.input [ type_ "file", on "change" (decodeNodeFile ReadImage), value "" ] []
        , Html.pre [] [ Html.text <| imageType model]
        , Html.pre [] [ Html.text <|  (\x -> x ++ " bytes") <| String.fromInt <| String.length <| ( model.maybeImageString |> Maybe.withDefault "")]
        , Html.p [] [ Maybe.map show model.maybeImageString |> Maybe.withDefault (Html.text "") ]
        ]

imageType : Model -> String
imageType model = 
  let 
    imageString = ( model.maybeImageString |> Maybe.withDefault "- no image -" )
    i = (String.indexes ";" imageString) |> List.head |> Maybe.withDefault 0
    imageInfo = String.slice 0 i imageString
  in 
    case String.length imageInfo == 0 of 
      True -> "No image"
      False -> String.dropLeft 5 imageInfo

  
viewImage : Model -> Element Msg 
viewImage model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none
    Just user -> 
      case (User.username user) == "jxxcarlson" of 
        True -> Element.html (viewImage_ model)
        False -> Element.none

-- OUTSIDE

type InfoForElm = 
   DocumentDataFromOutside Document
 | DocumentListDataFromOutside DocumentList.IntList
 | UserDataFromOutside User 


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
            }
            , Cmd.none
          ) 
    DocumentListDataFromOutside intList ->
      ({ model | documentIdList = intList }
      , Cmd.map DocListMsg  (DocumentList.retrievDocumentsFromIntList model.maybeCurrentUser intList) )



   

-- UserDataFromOutside
-- VIEW

view  model =
   Element.layout [Font.size 14, width fill, height fill, clipY] <|
        Element.column [ width fill, height (px model.windowHeight)] [
              header model
            , body model
            , footer model
        ]
        
header : Model -> Element Msg
header model = 
  Element.row [width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0, spacing 10, alignLeft] [
      Element.row [ spacing 20]  [
         searchInput model
        -- , getDocumentsButton (px 60) model
        , getRandomDocumentsButton (px 70) model
        , Element.el [ Font.size 24] (text <| appTitle model.appMode)
        , startButton (px 55) model 
        , homeButton (px 55) model
        , readerModeButton (px 52) model
        , writerModeButton (px 52) model
        , imageModeButton (px 52) model]
  ]

appTitle : AppMode -> String 
appTitle appMode =
  case appMode of 
    Reading -> "kNode Reader"
    Writing -> "kNode Writer"
    ImageEditing -> "kNode Images"

body : Model -> Element Msg 
body model =
  case model.appMode of 
    Reading -> readerBody model 
    Writing -> writerBody model 
    ImageEditing -> imageBody model 


readerBody : Model -> Element Msg
readerBody model = 
  Element.row [width (fillPortion 4), height fill, Background.color Widget.white, centerX] [
     bodyLeftColumn 2 model,  bodyReaderColumn model.windowHeight 7 model, bodyRightColumn 2 model
  ]

writerBody : Model -> Element Msg
writerBody model = 
  Element.row [width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX] [
     bodyLeftColumn 2 model,  bodyEditorColumn model.windowHeight 5 model, bodyReaderColumn model.windowHeight 5 model
  ]

bodyLeftColumn : Int -> Model -> Element Msg
bodyLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        Element.row [spacing 10] [ toggleToolsButton (px 105) model, newDocumentButton model ]
      , newChildButton model 
      , toolsOrContents model
  ]

-- IMAGEBODY

imageBody : Model -> Element Msg
imageBody model = 
  Element.row [width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX] [
     imageLeftColumn 2 model,  imageCenterColumn model.windowHeight 7 model, imageRightColumn 2 model
  ]

imageLeftColumn : Int -> Model -> Element Msg
imageLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
       
  ]

imageCenterColumn : Int -> Int -> Model -> Element Msg
imageCenterColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      
  ]

imageRightColumn : Int -> Model -> Element Msg
imageRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, Background.color Widget.lightBlue, centerX] [
      viewImage model
  ]


-- LOGIN, ETC

loginOrSignUpPanel model = 
  case model.signupMode of
    SigninMode ->  loginPanel model
    RegistrationMode -> signupPanel model

loginPanel : Model -> Element Msg 
loginPanel model = 
  case model.maybeCurrentUser of 
    Just _ -> Element.none 
    Nothing ->
      Element.column [padding 20, spacing 20] [
          Element.el [Font.bold, Font.size 18] (text "Sign in")
        , emailInput model
        , passwordInput model
        , Element.row [spacing 15] [
              getTokenButton (px 66) model
            , gotoRegistrationButton (px 66) model
        ]
      ]

signupPanel : Model -> Element Msg 
signupPanel model = 
  case model.maybeCurrentUser of 
    Just _ -> Element.none 
    Nothing ->
      Element.column [padding 20, spacing 20] [
          Element.el [Font.bold, Font.size 18] (text "Sign up")
        , emailInput model
        , usernameInput model
        , passwordInput model
        , Element.row [spacing 15] [
            registerUserButton (px 65) model
          , cancelRegistrationButton (px 60) model
        ]
      ]





logoutPanel : Model -> Element Msg 
logoutPanel model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Element.column [padding 20, spacing 20] [
          currentUserNameElement model
        , signoutButton (px 70) model
        , viewUserManualButton (px 90) model
      ]

-- TOOLS

toolsOrContents model = 
  case model.toolPanelState of 
    ShowToolPanel -> toolsPanel model
    HideToolPanel -> Element.map DocListViewMsg (DocumentListView.viewWithHeading model.windowHeight model.masterDocLoaded (docListTitle model) model.documentList)

toolsPanel model = Element.column [ spacing 15, padding 10, height shrink, scrollbarY] [ 
   publicControls model
  , deleteDocumentButton model
  , masterDocPanel model
  , documentTitleInput model
  , documentPanels model
  , tagInputPane model (px 250) (px 140) "Tags"
  , versionsPanel model
  ]

publicControls : Model -> Element Msg 
publicControls model = 
  Element.row [spacing 5] [ publicButton model.currentDocument, privateButton model.currentDocument]


  


deleteDocumentButton : Model -> Element Msg
deleteDocumentButton model =
   Element.row [spacing 10] [
        deleteCurrentDocumentButton (px 60) model
      , cancelDeleteCurrentDocumentButton (px 60) model
    ]

masterDocPanel model = 
  Element.column [spacing 5] [ 
    Element.el [] (text <| "Master doc: " ++ (String.fromInt model.currentDocument.parentId))

  ]

versionsPanel model = 
  Element.column [spacing 5] [
     Element.el [] (text <| "Version: " ++ (String.fromInt model.currentDocument.version))
     , Element.column [] [
         showVersionButton model
        , newVersionButton model
       ]
  ]

printDocument model =
  case model.currentDocument.id > 0 of 
    True -> printDocument_ model  
    False -> Element.none  


printDocument_ model =
    printButton model.currentDocument

printButton document =
    Widget.linkButtonFat (printUrl document) "Print" (px 50)


printUrl : Document -> String
printUrl document =
    Configuration.backend ++ "/print/documents" ++ "/" ++ (String.fromInt document.id) ++ "?" ++ printTypeString document



printTypeString : Document -> String
printTypeString document =
    case document.textType of
        Asciidoc ->
            "text=adoc"

        AsciidocLatex ->
            "text=adoc_latex"

        MiniLatex ->
            "text=latex"

        PlainText ->
            "text=latex"

        Markdown ->
            "text=markdown"

showVersionButton model = 
  linkButton (showVersionsUrl model.currentDocument) "Show versions" (px 100)
  
newVersionButton model = 
  linkButton (newVersionUrl model.currentDocument) "New version" (px 100)


showVersionsUrl : Document -> String
showVersionsUrl document =
    Configuration.backend ++ "/archive/versions" ++ "/" ++ (String.fromInt document.id)


newVersionUrl : Document -> String
newVersionUrl document =
    Configuration.backend ++ "/archive/new_version" ++ "/" ++(String.fromInt document.id)


tagInputPane model width_ height_ label_  = 
  Element.column [] [
      Element.el [Font.bold] (text label_)
    , tagInputPane_ model width_ height_ label_ 
  ]

tagInputPane_ model width_ height_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (height_), padding 10, scrollbarY ]
                { onChange = Just AcceptDocumentTagString
                , text = model.currentDocument.tags |> String.join ", "
                , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]

documentPanels model = 
  Element.column [height shrink, spacing 10] [
    Element.el [Font.bold] (text "Text type")
  , textTypePanel model
  , Element.el [Font.bold] (text "Document type")
  , documentTypePanel model
  ]

textTypePanel model = 
  Element.column [spacing 5] [
      miniLatexTypeButton model 
    , asciidocTypeButton model 
    , asciidocLatexTypeButton model 
    , markdownTypeButton model 
    , plainTextTypeButton model 
  ]

documentTypePanel model = 
  Element.column [spacing 5] [
      standardDocumentButton model 
    , masterDocumentButton model 
  ]

bodyReaderColumn : Int -> Int -> Model -> Element Msg
bodyReaderColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view windowHeight_ model.counter model.debounceCounter (texMacros model) model.currentDocument)
  ]


bodyEditorColumn : Int -> Int -> Model -> Element Msg
bodyEditorColumn windowHeight_ portion_ model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 80))
    , Background.color Widget.lightYellow, centerX] [
     textArea model (fillPortion portion_) windowHeight_ "Editor"
  ]

textArea model width_ windowHeight_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (px (windowHeight_ - 80)), paddingXY 10 0, scrollbarY ]
                { onChange = Just GetContent
                , text = model.currentDocument.content
                , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]
-- (px (windowHeight_ - 40))


bodyRightColumn : Int -> Model -> Element Msg
bodyRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, Background.color Widget.lightBlue, centerX] [
      loginOrSignUpPanel model
    , logoutPanel model
  ]

docListTitle : Model -> String 
docListTitle model = 
  let  
    documentCount = List.length (DocumentList.documents model.documentList)
    firstDocument = DocumentList.getFirst model.documentList
    title = case firstDocument.docType of 
      Standard -> "Search Results"
      Master -> "Contents"
  in 
    title ++ " (" ++ String.fromInt documentCount ++ ")"  




texMacros : Model -> String
texMacros model = 
  case DocumentDictionary.get "texmacros"  model.documentDictionary of 
    Nothing -> ""
    Just doc -> doc.content
    
  


footer : Model -> Element Msg
footer model = 
  Element.row [moveUp 8, spacing 15, width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0] [
        Element.el [] (text model.message)
      , Element.el [documentDirtyIndicator  model, padding 5] (text ("id " ++ (String.fromInt model.currentDocument.id )))
      , saveCurrentDocumentButton (px 50) model
      , printDocument model 
      , getAuthorsDocumentsButton (px 110) model

      -- , Element.el [] (text <| "Author: " ++ model.currentDocument.authorName )
      , Element.el [] (text <| access model.currentDocument) 
  -- , currentUserNameElement model
      , Element.el [] (text <| (String.fromInt (Document.wordCount model.currentDocument)) ++ " words")
      -- , Element.el [] (text <| masterDocLoadedIndicator model)
      -- , Element.el [] (text <| "DDict, keys & values: " ++ documentDictionaryInfo model)
      , testButton model

    --  , Element.el [] (text ("keys: " ++ (showKeys model)))
    --  , Element.el [] (text <| displayCurrentMasterDocument model)
    --  , Element.el [] (text <| "Window height: " ++ (String.fromInt model.windowHeight))
  ] 

testButton : Model -> Element Msg 
testButton model = 
  case User.usernameFromMaybeUser model.maybeCurrentUser of 
    "jxxcarlson" ->
        Input.button (Widget.buttonStyle  (px 45)) {
          onPress =  Just Test
        , label = Element.text ("Test")
        }
    _ -> Element.none 

documentDictionaryInfo : Model -> String 
documentDictionaryInfo model = 
  let 
    k = model.documentDictionary |> DocumentDictionary.keys |> String.join ","
    v = model.documentDictionary |> DocumentDictionary.values |> String.join ","
  in  
    k ++ ":: " ++ v


masterDocLoadedIndicator model =
  case model.masterDocLoaded of 
    True -> "master: LOADED"
    False -> "master: NOT loaded"


documentDirtyIndicator  model = 
  case model.currentDocumentDirty  of 
    False -> Background.color Widget.indicatorGood
    True -> Background.color Widget.indicatorBad

currentUserNameElement : Model -> Element msg 
currentUserNameElement model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just user -> Element.el [] (Element.text <| "Signed in as " ++ User.username user)


access : Document -> String 
access doc = 
  case doc.public of 
    True -> "Public document"
    False -> "Private document"

showKeys : Model -> String 
showKeys model = 
  DocumentDictionary.keys model.documentDictionary |> String.join ", "


-- OUTPUTS

label : Int -> String -> Element msg
label fontSize str =
   Element.el [Font.size fontSize, Font.bold] (text str)


-- INPUTS

passwordInput : Model -> Element Msg
passwordInput model =
    Input.newPassword [width (px 180), height (px 30) , Font.color black] {
        text = model.password 
      , placeholder = Nothing
      , show = False
      , onChange = Just(\str -> AcceptPassword str)
      , label = Input.labelAbove [ Font.size 12, Font.bold, moveDown 0 ] (text "Password")
    }

emailInput : Model -> Element Msg
emailInput model =
    Input.text [width (px 180), height (px 30) , Font.color black] {
        text = model.email 
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptEmail str)
      , label = Input.labelAbove [ Font.size 12, Font.bold, moveDown 0 ] (text "Email")
    }


usernameInput : Model -> Element Msg
usernameInput model =
    Input.text [width (px 180), height (px 30) , Font.color black] {
        text = model.username 
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptUserName str)
      , label = Input.labelAbove [ Font.size 12, Font.bold, moveDown 0 ] (text "User name")
    }



searchInput : Model -> Element Msg
searchInput model =
    Input.text [htmlAttribute (Html.Attributes.id "search-box")
       , width (px 400), height (px 30) , Font.color black] {
        text = model.searchQueryString 
      , placeholder = Just (Input.placeholder [moveUp 5] (text "Search example: type 'quantum', then press Ctrl-Enter"))
      , onChange = Just(\str -> AcceptSearchQuery str)
      , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
    }

documentTitleInput : Model -> Element Msg
documentTitleInput model =
    Input.text [htmlAttribute (Html.Attributes.id "title-input"), width (px 250), height (px 30) , Font.color black] {
        text = model.documentTitle
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptDocumenTitle str)
      , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "Title")
    }


-- BUTTONS

publicButton : Document -> Element Msg 
publicButton document = 
  Input.button (Widget.buttonStyleWithColor (publicIndicatorColor document.public True) (px 60)) {
    onPress =  Just (SetDocumentPublic True)
  , label = Element.text ("Public")
  }

privateButton : Document -> Element Msg 
privateButton document = 
  Input.button (Widget.buttonStyleWithColor (publicIndicatorColor document.public False) (px 60)) {
    onPress =  Just (SetDocumentPublic False)
  , label = Element.text ("Private")
  }  

publicIndicatorColor : Bool -> Bool -> Color 
publicIndicatorColor actual target = 
  case actual == target of 
     True -> Widget.darkRed 
     False -> Widget.buttonColor


miniLatexTypeButton : Model -> Element Msg 
miniLatexTypeButton model = 
  Input.button (textTypeButtonStyle model MiniLatex) {
    onPress =  Just (SetDocumentTextType MiniLatex)
  , label = Element.text ("MiniLatex")
  }

asciidocTypeButton : Model -> Element Msg 
asciidocTypeButton model = 
  Input.button (textTypeButtonStyle model Asciidoc) {
    onPress =  Just (SetDocumentTextType Asciidoc)
  , label = Element.text ("Asciidoc")
  }

asciidocLatexTypeButton : Model -> Element Msg 
asciidocLatexTypeButton model = 
  Input.button (textTypeButtonStyle model AsciidocLatex) {
    onPress =  Just (SetDocumentTextType AsciidocLatex)
  , label = Element.text ("Asciidoc Latex")
  }

markdownTypeButton : Model -> Element Msg 
markdownTypeButton model = 
  Input.button (textTypeButtonStyle model Markdown) {
    onPress =  Just (SetDocumentTextType Markdown)
  , label = Element.text ("Markdown")
  }

plainTextTypeButton : Model -> Element Msg 
plainTextTypeButton model = 
  Input.button (textTypeButtonStyle model PlainText) {
    onPress =  Just (SetDocumentTextType PlainText)
  , label = Element.text ("Plain Text")
  } 


textTypeButtonStyle : Model -> TextType -> List (Attribute msg) 
textTypeButtonStyle model textType = 
  (
     (listItemStyleNarrow (px 110))  ++  (highLightTextType model.currentDocument.textType textType)
  )

documentTypeButtonStyle : Model -> DocType -> List (Attribute msg) 
documentTypeButtonStyle model docType = 
  (
     (listItemStyleNarrow (px 110))  ++  (highLightDocumentType model.currentDocument.docType docType)
  )

standardDocumentButton : Model -> Element Msg 
standardDocumentButton model = 
  Input.button (documentTypeButtonStyle model Standard) {
    onPress =  Just (SetDocumentType Standard)
  , label = Element.text ("Standard")
  }

masterDocumentButton : Model -> Element Msg 
masterDocumentButton model = 
  Input.button (documentTypeButtonStyle model Master) {
    onPress =  Just (SetDocumentType Master)
  , label = Element.text ("Master")
  }

highLightDocumentType : DocType -> DocType  -> List (Attribute msg) 
highLightDocumentType docType1 docType2 = 
  case docType1 == docType2 of 
    True -> [Font.bold]
    False -> [Font.light] 

highLightTextType : TextType -> TextType  -> List (Attribute msg) 
highLightTextType textType1 textType2 = 
  case textType1 == textType2 of 
    True -> [Font.bold]
    False -> [Font.light] 


newDocumentButton :  Model -> Element Msg    
newDocumentButton model = 
  case model.appMode of 
    ImageEditing -> Element.none
    Reading -> Element.none 
    Writing -> 
      Input.button (buttonStyle (px 105)) {
          onPress =  Just (NewDocument)
        , label = Element.text ("New document")
        }


newChildButton :  Model -> Element Msg    
newChildButton model = 
  case model.appMode of 
    Reading -> Element.none 
    Writing -> newChildButton_ model
    ImageEditing -> Element.none

newChildButton_ :  Model -> Element Msg    
newChildButton_ model = 
  let 
    headDocument = DocumentList.getFirst model.documentList
  in 
    case headDocument.docType of 
      Standard -> Element.none 
      Master -> newChildButton__ model

newChildButton__ :  Model -> Element Msg    
newChildButton__ model = 
  Input.button (buttonStyle (px 130)) {
    onPress =  Just (NewChildDocument) 
  , label = Element.text ("New subdocument")
  }

toggleToolsButton : Length -> Model -> Element Msg    
toggleToolsButton width_ model = 
  case model.appMode  of 
    ImageEditing -> Element.none
    Reading -> Element.none
    Writing -> 
      Input.button (buttonStyle width_ ) {
        onPress =  Just (ToggleToolPanelState)
      , label = Element.text (toggleToolsTitle model.toolPanelState)
      }
   

toggleToolsTitle : ToolPanelState -> String 
toggleToolsTitle toolPanelState =
  case toolPanelState of 
     ShowToolPanel -> "Hide attributes"
     HideToolPanel -> "Edit attributes"



getTokenButton : Length -> Model -> Element Msg    
getTokenButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just SignIn
  , label = Element.text "Sign in"
  } 

registerUserButton : Length -> Model -> Element Msg    
registerUserButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just RegisterUser
  , label = Element.text "Sign up"
  } 

cancelRegistrationButton : Length -> Model -> Element Msg    
cancelRegistrationButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just (SetSignupMode SigninMode)
  , label = Element.text "Cancel"
  } 


gotoRegistrationButton : Length -> Model -> Element Msg    
gotoRegistrationButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just (SetSignupMode RegistrationMode)
  , label = Element.text "Sign up"
  }


signoutButton : Length -> Model -> Element Msg    
signoutButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just SignOut
  , label = Element.text "Sign out"
  } 

viewUserManualButton width_ model = 
  Input.button (listItemStyleBold width_) {
    onPress =  Just GetUserManual
  , label = Element.text "User manual"
  } 


-- getDocumentsButton : Length -> Model -> Element Msg    
-- getDocumentsButton width_ model = 
--   Input.button (buttonStyle  width_) {
--     onPress =  Just ((getDocumentMsg model.appMode model.searchQueryString))
--   , label = Element.text "Search"
--   } 

getDocumentMsg : AppMode -> String -> Msg 
getDocumentMsg appMode searchQueryString = 
  case appMode of 
    Reading -> GetPublicDocuments searchQueryString
    Writing -> GetUserDocuments searchQueryString
    ImageEditing -> NoOp

getRandomDocumentsButton : Length -> Model -> Element Msg    
getRandomDocumentsButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GetPublicDocumentsRawQuery "random=public")
  , label = Element.text "Random"
  } 


getAuthorsDocumentsButton : Length -> Model -> Element Msg  
getAuthorsDocumentsButton width_ model = 
  if model.currentDocument.id > 0 then 
    getAuthorsDocumentsButton_ width_ model 
  else 
    Element.none

getAuthorsDocumentsButton_ : Length -> Model -> Element Msg    
getAuthorsDocumentsButton_ width_ model = 
  let  
    authorname = model.currentDocument.authorName 
  in 
    case authorname == "" of 
      True -> Element.none 
      False ->
        Input.button ((buttonStyle  width_) ++ [Font.center]) {
          onPress =  Just (GetPublicDocumentsRawQuery ("authorname=" ++ authorname ++ "&sort=title"))
        , label = Element.text authorname
        }

saveCurrentDocumentButton : Length -> Model -> Element Msg    
saveCurrentDocumentButton width_ model =  
    case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Input.button (buttonStyle  width_) {
        onPress =  Just (SaveCurrentDocument (Time.millisToPosix 10))
      , label = Element.text "Save"
      } 

deleteCurrentDocumentButton : Length -> Model -> Element Msg    
deleteCurrentDocumentButton width_ model = 
    case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Input.button (buttonStyleWithColor (deleteButtonBackgroundColor model) width_ ) {
        onPress =  Just (DeleteCurrentDocument)
      , label = Element.text "Delete"
      } 


cancelDeleteCurrentDocumentButton : Length -> Model -> Element Msg    
cancelDeleteCurrentDocumentButton width_ model = 
  case model.deleteDocumentState of 
    DeleteIsOnSafety -> Element.none 
    DeleteIsArmed -> cancelDeleteCurrentDocumentButton_ width_ model
    

cancelDeleteCurrentDocumentButton_ : Length -> Model -> Element Msg    
cancelDeleteCurrentDocumentButton_ width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (CancelDeleteCurrentDocument)
  , label = Element.text "Cancel"
  }  

deleteButtonBackgroundColor model =
   case model.deleteDocumentState of 
     DeleteIsOnSafety -> Widget.blue 
     DeleteIsArmed -> Widget.red


startButton : Length -> Model -> Element Msg    
startButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GoToStart)
  , label = Element.text "Start"
  } 

homeButton : Length -> Model -> Element Msg    
homeButton width_ model = 
    case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Input.button (buttonStyle  width_) {
        onPress =  Just (GoHome)
      , label = Element.text "Home"
      } 

readerModeButton : Length -> Model -> Element Msg    
readerModeButton width_ model = 
  Input.button (modeButtonStyle model.appMode Reading  width_) {
    onPress =  Just (ChangeMode Reading)
  , label = Element.text "Read"
  } 

writerModeButton : Length -> Model -> Element Msg    
writerModeButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ -> 
      Input.button (modeButtonStyle model.appMode Writing  width_) {
        onPress =  Just (ChangeMode Writing)
      , label = Element.text "Write"
      } 

imageModeButton : Length -> Model -> Element Msg    
imageModeButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just user -> 
      case User.username user == "jxxcarlson" of 
        False -> Element.none 
        True -> 
          Input.button (modeButtonStyle model.appMode ImageEditing  width_) {
            onPress =  Just (ChangeMode ImageEditing)
          , label = Element.text "Image"
          } 
-- END: BUTTONS


modeButtonStyle appMode buttonMode width_ = 
  case appMode == buttonMode of 
    True -> buttonStyleWithColor Widget.darkRed width_  
    False -> buttonStyleWithColor Widget.blue width_ 



idFromDocInfo str = 
  str |> String.toInt |> Maybe.withDefault 0

-- HELPERS

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
               ,  message = "gPD" 
            }
            , Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse queryString)))

getUserDocuments : Model -> String -> (Model, Cmd Msg)   
getUserDocuments model queryString =
  ({ model | toolPanelState = HideToolPanel, masterDocLoaded = False, message = "gUD" } 
    , Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser (Query.parse queryString))
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





getViewPort = Task.perform GetViewport Dom.getViewport

saveCurrentDocument : Model -> (Model, Cmd Msg)
saveCurrentDocument model = 
  let  
      tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser 
      currentDocument = model.currentDocument 
      tags = model.tagString |> String.split "," |> List.map String.trim
      nextCurrentDocument = { currentDocument | title = model.documentTitle, tags = tags}
  in 
      ( { model | currentDocumentDirty = False 
                , currentDocument = nextCurrentDocument}
        , Cmd.map DocMsg <| Document.saveDocument tokenString nextCurrentDocument )