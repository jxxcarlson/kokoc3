port module Update
    exposing
        ( getViewPort
        , imageRead
        , onUrlChange
        , processUrl
        , update
        )

-- IMPORT

import Update.Outside as Outside exposing (InfoForOutside(..), InfoForElm(..))
import Update.Document
import Update.Keyboard
import Update.Search as Search
import Update.Time
import Update.UI as UI
import MiniLatexTools
import AppUtility
import BigEditRecord exposing (BigEditRecord)
import Browser.Dom as Dom
import Configuration
import Debounce exposing (Debounce)
import DocViewMsg exposing (DocViewMsg(..))
import Document exposing (DocMsg(..), DocType(..), Document, TextType(..), printUrl, DocumentRecord)
import DocumentDictionary exposing (DocDictMsg(..), DocumentDictionary)
import DocumentList
    exposing
        ( DocListMsg(..)
        , DocumentList
        , documentListLength
        , findDocuments
        )
import DocumentListView exposing (DocListViewMsg(..))
import DocumentView exposing (view)
import FileUploadCredentials as Credentials exposing (FileData, Image)
import Html exposing (Html)
import Html.Attributes
import Http
import ImageManager exposing (ImageMsg(..))
import Json.Decode as Decode exposing (Decoder, Value)
import Json.Encode as Encode
import Keyboard exposing (Key(..))
import List.Extra
import Mail
import Model
    exposing
        ( AppMode(..)
        , DeleteDocumentState(..)
        , DocumentListSource(..)
        , ErrorResponse(..)
        , FocusedElement(..)
        , ImageAccessibility(..)
        , ImageMode(..)
        , MiniLatexRenderMode(..)
        , Model
        , Msg(..)
        , PreferencesPanelState(..)
        , SignupMode(..)
        , ToolMenuState(..)
        , ToolPanelState(..)
        , initialModel
        )
import Query
import Queue exposing (Queue)
import Random
import SystemDocument
import Task
import Time
import UrlAppParser exposing (Route(..))
import User
    exposing
        ( BigUser
        , Token
        , User
        , UserMsg(..)
        , readToken
        , stringFromMaybeToken
        )
import Utility
import View.Common as Common
import View.EditorTools as EditorTools
import VirtualDom exposing (Handler(..))
import BigEditRecord
import Bozo.Update
import Update.HttpError as HttpError


port readImage : Value -> Cmd msg


port uploadImage : Value -> Cmd msg


port imageRead : (Value -> msg) -> Sub msg


port sendCredentials : Value -> Cmd msg


port sendPdfFileName : Value -> Cmd msg


port onUrlChange : (String -> msg) -> Sub msg


port pushUrl : String -> Cmd msg


processInfoForElm :
    Model
    -> InfoForElm
    -> ( Model, Cmd Msg ) -- SET CURRENT DOCUMENT
processInfoForElm model infoForElm_ =
    case infoForElm_ of
        DocumentDataFromOutside document ->
            ( { model
                | currentDocument = document
                , bigEditRecord = Update.Document.updateBigEditRecord model document
                , documentList = DocumentList.make document []
                , message = "!got doc from outside"
              }
            , Cmd.none
            )

        UserDataFromOutside user ->
            ( { model
                | maybeCurrentUser = Just user
                , maybeToken = Just (User.getToken user)
                , message = "You are reconnected"
              }
            , bigUserCmd2 (Just user)
            )

        DocumentListDataFromOutside intList ->
            ( { model | documentIdList = intList, message = "intList: " ++ (String.fromInt <| List.length intList.ints) }
            , Cmd.map DocListMsg (DocumentList.retrievDocumentsFromIntList model.maybeCurrentUser intList)
            )

        RecentDocumentQueueDataFromOutside intList ->
            case intList of
                [] ->
                    ( model, Cmd.none )

                _ ->
                    ( { model | documentListSource = RecentDocumentsQueue }
                    , Cmd.map DocListMsg (DocumentList.retrievRecentDocumentQueueFromIntList model.maybeCurrentUser intList)
                    )


bigUserCmd2 maybeCurrentUser =
    case maybeCurrentUser of
        Nothing ->
            Cmd.none

        Just user ->
            Cmd.map UserMsg <| User.getBigUserRecord (User.userId user)



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
    case UrlAppParser.toRoute urlString of
        NotFound ->
            Cmd.batch
                [ Outside.sendInfoOutside (AskToReconnectDocument Encode.null)
                , Outside.sendInfoOutside (AskToReconnectDocumentList Encode.null)
                , Outside.sendInfoOutside (AskToReconnectRecentDocumentQueue Encode.null)
                , Outside.sendInfoOutside (AskToReconnectUser Encode.null)
                ]

        DocumentIdRef docId ->
            Cmd.batch
                [ Outside.sendInfoOutside (AskToReconnectUser Encode.null)
                , Outside.sendInfoOutside (AskToReconnectRecentDocumentQueue Encode.null)

                --, Outside.sendInfoOutside (AskToReconnectDocumentList Encode.null)
                , Cmd.map DocMsg (Document.getDocumentById docId Nothing)
                , Cmd.map DocListMsg (DocumentList.findDocuments Nothing <| "id=" ++ String.fromInt docId)
                ]

        HomeRef username ->
            Cmd.batch
                [ Outside.sendInfoOutside (AskToReconnectUser Encode.null)
                , Outside.sendInfoOutside (AskToReconnectRecentDocumentQueue Encode.null)
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


focusSearchBox : Cmd Msg
focusSearchBox =
    Task.attempt SetFocusOnSearchBox (Dom.focus "search-box")



-- https://package.elm-lang.org/packages/elm/core/latest/Task#perform
-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        Bozo bozoMsg ->
            Bozo.Update.update bozoMsg model

        AcceptPassword str ->
            ( { model | password = str }, Cmd.none )

        AcceptEmail str ->
            ( { model | email = str }, Cmd.none )

        AcceptUserName str ->
            ( { model | username = str }, Cmd.none )

        AcceptSearchQuery searchQueryString ->
            ( { model
                | searchQueryString = searchQueryString
                , focusedElement = FocusOnSearchBox
              }
            , Cmd.none
            )

        AcceptDocumenTitle str ->
            let
                currentDocument =
                    model.currentDocument

                nextDocument =
                    { currentDocument | title = str }
            in
                ( { model | documentTitle = str, currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        AcceptDocumentTagString str ->
            let
                currentDocument =
                    model.currentDocument

                nextTags =
                    str |> String.split "," |> List.map String.trim

                nextDocument =
                    { currentDocument | tags = nextTags }
            in
                ( { model | tagString = str, currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        AcceptSharingString str ->
            let
                currentDocument =
                    model.currentDocument

                nextAccessDict =
                    str |> Document.stringToAccessDict

                nextDocument =
                    { currentDocument | access = nextAccessDict }
            in
                ( { model | sharingString = str, currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        AcceptImageName str ->
            ( { model | imageName = str }, Cmd.none )

        UserMsg (ReceiveToken result) ->
            case result of
                Ok token ->
                    let
                        maybeToken =
                            Just token

                        maybeCurrentUser =
                            User.maybeUserFromEmailAndToken model.email (User.stringFromToken token)

                        bigUserCmd =
                            case maybeCurrentUser of
                                Nothing ->
                                    Cmd.none

                                Just user ->
                                    Cmd.map UserMsg <| User.getBigUserRecordAtSignIn (User.userId user)
                    in
                        ( { model
                            | maybeToken = maybeToken
                            , maybeCurrentUser = maybeCurrentUser
                            , message = "Signed in"
                            , email = ""
                            , password = ""
                            , username = ""
                          }
                        , Cmd.batch
                            [ Outside.sendMaybeUserDataToLocalStorage maybeCurrentUser
                            , bigUserCmd
                            ]
                        )

                Err err ->
                    let
                        errorMessage =
                            String.trim <| HttpError.handle err

                        errorResponse =
                            if errorMessage == "Incorrect email or password" then
                                ShowPasswordReset
                            else if errorMessage == "Account not verified" then
                                ShowVerifyAccount
                            else
                                NoErrorResponse
                    in
                        ( { model | message = errorMessage, errorResponse = errorResponse }, Cmd.none )

        UserMsg (RespondToNewUser result) ->
            case result of
                Ok token ->
                    let
                        maybeToken =
                            Just token

                        maybeCurrentUser =
                            User.maybeUserFromEmailAndToken model.email (User.stringFromToken token)
                    in
                        ( { model
                            | maybeToken = maybeToken
                            , maybeCurrentUser = maybeCurrentUser
                            , message = "Signed up"
                            , email = ""
                            , password = ""
                            , username = ""
                            , currentDocument = SystemDocument.newUser
                          }
                        , Outside.sendMaybeUserDataToLocalStorage maybeCurrentUser
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocMsg (ReceiveDocument result) ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentRecord ->
                    ( { model | currentDocument = documentRecord.document, bigEditRecord = Update.Document.updateBigEditRecord model documentRecord.document }
                    , Cmd.batch
                        [ Update.Document.loadTexMacrosForDocument documentRecord.document model
                        ]
                    )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocMsg (AcknowledgeDocumentDeleted result) ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok reply ->
                    let
                        documents =
                            DocumentList.documents model.documentList

                        idOfDocumentToDelete =
                            String.toInt reply |> Maybe.withDefault 0

                        indexOfDocumentToDelete =
                            List.Extra.findIndex (\doc -> doc.id == idOfDocumentToDelete) documents |> Maybe.withDefault 0

                        maybeDocumentAboveDeleteDocument =
                            List.Extra.getAt (indexOfDocumentToDelete - 1) documents

                        maybeDocumentBelowDeleteDocument =
                            List.Extra.getAt (indexOfDocumentToDelete + 1) documents

                        maybeDocumentToSelect =
                            case maybeDocumentAboveDeleteDocument of
                                Just document ->
                                    Just document

                                Nothing ->
                                    case maybeDocumentBelowDeleteDocument of
                                        Just document ->
                                            Just document

                                        Nothing ->
                                            Nothing

                        documentSelectedId =
                            case maybeDocumentToSelect of
                                Just document ->
                                    document.id

                                Nothing ->
                                    0

                        documentSelected =
                            case maybeDocumentToSelect of
                                Just doc ->
                                    doc

                                Nothing ->
                                    Document.basicDocument

                        nextDocumentList_ =
                            DocumentList.select maybeDocumentToSelect model.documentList

                        nextDocumentQueue =
                            Queue.removeWithPredicate (\doc -> doc.id == idOfDocumentToDelete) model.recentDocumentQueue

                        nextModel =
                            { model
                                | message = "Document deleted: " ++ String.fromInt indexOfDocumentToDelete ++ ", Document selected: " ++ String.fromInt documentSelectedId
                                , currentDocument = documentSelected
                                , bigEditRecord = Update.Document.updateBigEditRecord model documentSelected
                                , toolPanelState = HideToolPanel
                                , documentList = DocumentList.deleteItemInDocumentListAt idOfDocumentToDelete nextDocumentList_
                                , recentDocumentQueue = nextDocumentQueue
                            }
                    in
                        ( nextModel
                        , Cmd.batch
                            [ updateBigUserCmd nextModel
                            , Outside.saveRecentDocumentQueueToLocalStorage nextDocumentQueue
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocMsg (NewDocumentCreated result) ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentRecord ->
                    let
                        nextDocument =
                            documentRecord.document

                        selectedDocId_ =
                            Document.selectedDocId nextDocument

                        cmd =
                            Cmd.map DocMsg (Document.attachDocumentToMasterBelowCmd (User.getTokenStringFromMaybeUser model.maybeCurrentUser) selectedDocId_ nextDocument model.maybeMasterDocument)

                        nextDocumentList_ =
                            DocumentList.nextDocumentList selectedDocId_ nextDocument model.documentList

                        nextDocumentQueue =
                            Queue.enqueueUnique nextDocument model.recentDocumentQueue

                        nextModel =
                            { model
                                | currentDocument = nextDocument
                                , bigEditRecord = Update.Document.updateBigEditRecord model nextDocument
                                , sourceText = nextDocument.content
                                , documentList = nextDocumentList_
                                , recentDocumentQueue = nextDocumentQueue
                            }
                    in
                        ( nextModel
                        , Cmd.batch
                            [ updateBigUserCmd nextModel
                            , Outside.saveRecentDocumentQueueToLocalStorage nextDocumentQueue
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocMsg (AcknowledgeUpdateOfDocument result) ->
            case result of
                Ok documentRecord ->
                    ( model, Cmd.none )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocListMsg (RestoreDocumentList result) ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentList ->
                    let
                        currentDocumentId =
                            model.documentIdList.selected

                        maybeCurrentDocument =
                            List.Extra.find (\doc -> doc.id == currentDocumentId) (DocumentList.documents documentList)

                        currentDocument =
                            maybeCurrentDocument |> Maybe.withDefault Document.basicDocument

                        nextMaybeMasterDocument =
                            case currentDocument.docType of
                                Standard ->
                                    Nothing

                                Master ->
                                    Just currentDocument
                    in
                        ( { model
                            | documentList = DocumentList.select maybeCurrentDocument documentList
                            , currentDocument = currentDocument
                            , bigEditRecord = Update.Document.updateBigEditRecord model currentDocument
                            , maybeMasterDocument = nextMaybeMasterDocument
                          }
                        , Cmd.batch
                            [ Update.Document.loadTexMacrosForDocument currentDocument model
                            , Outside.saveDocumentListToLocalStorage documentList
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        -- DocListMsg (RestoreRecentDocumentQueue result) ->
        --   case result of
        --     Ok documentList ->
        --       (model, Cmd.none)
        --     Err err ->
        --         ({model | message = HttpError.handle err},   Cmd.none  )
        DocListMsg (RestoreRecentDocumentQueue result) ->
            case result of
                Ok restoredDocumentQueue ->
                    ( { model | recentDocumentQueue = restoredDocumentQueue }, Cmd.none )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocListMsg (RestoreRecentDocumentQueueAtSignIn result) ->
            case result of
                Ok restoredDocumentQueue ->
                    ( { model
                        | recentDocumentQueue = restoredDocumentQueue
                        , documentListSource = RecentDocumentsQueue
                      }
                    , Outside.saveRecentDocumentQueueToLocalStorage restoredDocumentQueue
                    )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocListMsg (ReceiveDocumentListWithSelectedId result) ->
            -- SET
            case result of
                Ok documentList ->
                    let
                        idOfSelectedDocument =
                            model.selectedDocumentId

                        documents_ =
                            DocumentList.documents documentList

                        indexOfSelectedDocument =
                            List.Extra.findIndex (\doc -> doc.id == idOfSelectedDocument) documents_ |> Maybe.withDefault 0

                        selectedDocument =
                            List.Extra.getAt indexOfSelectedDocument documents_ |> Maybe.withDefault Document.basicDocument
                    in
                        ( { model
                            | documentList = DocumentList.select (Just selectedDocument) documentList
                            , currentDocument = selectedDocument
                            , bigEditRecord = Update.Document.updateBigEditRecord model selectedDocument
                          }
                        , Cmd.batch
                            [ Update.Document.loadTexMacrosForDocument selectedDocument model
                            , Outside.saveDocumentListToLocalStorage documentList
                            , pushDocument selectedDocument
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocListMsg (ReceiveDocumentList result) ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentList ->
                    let
                        currentDocument =
                            DocumentList.getFirst documentList

                        ( nextMaybeMasterDocument, loadTexMacrosForMasterDocument ) =
                            case currentDocument.docType of
                                Standard ->
                                    ( Nothing, Cmd.none )

                                Master ->
                                    ( Just currentDocument, Update.Document.loadTexMacrosForDocument currentDocument model )
                    in
                        ( { model
                            | documentList = DocumentList.selectFirst documentList
                            , currentDocument = currentDocument
                            , bigEditRecord = Update.Document.updateBigEditRecord model currentDocument
                            , maybeMasterDocument = nextMaybeMasterDocument
                          }
                        , Cmd.batch
                            [ Update.Document.loadTexMacrosForDocument currentDocument model
                            , loadTexMacrosForMasterDocument
                            , Outside.saveDocumentListToLocalStorage documentList
                            , pushDocument currentDocument
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocListMsg (ReceiveDocumentListAndPreserveCurrentSelection result) ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentList ->
                    let
                        currentDocument =
                            DocumentList.getFirst documentList

                        nextMaybeMasterDocument =
                            case currentDocument.docType of
                                Standard ->
                                    Nothing

                                Master ->
                                    Just currentDocument

                        nextDocumentList_ =
                            DocumentList.select (Just model.currentDocument) documentList
                    in
                        ( { model
                            | documentList = nextDocumentList_
                            , maybeMasterDocument = nextMaybeMasterDocument
                            , bigEditRecord = Update.Document.updateBigEditRecord model currentDocument
                          }
                        , Cmd.batch
                            [ Outside.saveDocumentListToLocalStorage documentList
                            , Update.Document.loadTexMacrosForDocument currentDocument model
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocListViewMsg (SetCurrentDocument document) ->
            -- SET CURRENT DOCUMENT
            let
                documentList =
                    case model.documentListSource of
                        SearchResults ->
                            DocumentList.select (Just document) model.documentList

                        RecentDocumentsQueue ->
                            DocumentList.addAndSelect document model.documentList

                nextDocumentQueue =
                    case model.documentListSource of
                        SearchResults ->
                            Queue.enqueueUniqueWithProperty (\x -> x.id) document model.recentDocumentQueue

                        RecentDocumentsQueue ->
                            model.recentDocumentQueue

                masterDocLoaded =
                    case document.docType of
                        Standard ->
                            model.masterDocLoaded

                        Master ->
                            True

                loadMasterCommand =
                    case document.docType of
                        Standard ->
                            Cmd.none

                        Master ->
                            Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser document.id)

                newModel =
                    { model
                        | currentDocument = document
                        , bigEditRecord = Update.Document.updateBigEditRecord model document
                        , masterDocLoaded = masterDocLoaded
                        , deleteDocumentState = DeleteIsOnSafety
                        , documentList = documentList
                        , recentDocumentQueue = nextDocumentQueue
                        , currentDocumentDirty = False
                        , counter = model.counter + 1
                    }
            in
                ( newModel
                , Cmd.batch
                    [ loadMasterCommand
                    , Outside.saveDocToLocalStorage document
                    , Outside.saveRecentDocumentQueueToLocalStorage nextDocumentQueue
                    , Outside.saveDocumentListToLocalStorage documentList
                    , updateBigUserCmd newModel
                    , Update.Document.loadTexMacrosForDocument document newModel
                    , pushDocument document
                    ]
                )

        DocViewMsg (LoadMaster docId) ->
            ( { model | masterDocLoaded = True, documentListSource = SearchResults }, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser docId) )

        DocViewMsg (LoadMasterWithSelection childId docId) ->
            ( { model | selectedDocumentId = childId, masterDocLoaded = True, documentListSource = SearchResults }, Cmd.map DocListMsg (DocumentList.loadMasterDocumentAndSelect model.maybeCurrentUser docId) )

        DocViewMsg (LoadMasterWithCurrentSelection docId) ->
            ( { model | appMode = Reading, toolPanelState = HideToolPanel, masterDocLoaded = True, documentListSource = SearchResults }, Cmd.map DocListMsg (DocumentList.loadMasterDocumentWithCurrentSelection model.maybeCurrentUser docId) )

        SignIn ->
            signIn model

        SignOut ->
            signOutCurrentUser model

        -- Handler: RespondToNewUser
        RegisterUser ->
            case String.length model.password < 8 of
                True ->
                    ( { model | message = "Password must have at least 8 characters" }, Cmd.none )

                False ->
                    ( model, Cmd.map UserMsg (User.registerUser model.email model.username "anon" model.password) )

        SetSignupMode signupMode_ ->
            ( { model | signupMode = signupMode_ }, Cmd.none )

        GetDocumentById id ->
            ( model, Cmd.map DocMsg (Document.getDocumentById id (readToken model.maybeToken)) )

        GetPublicDocuments query ->
            ( { model
                | appMode = Reading
                , toolPanelState = HideToolPanel
              }
            , Cmd.batch
                [ Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse query))
                , Update.Document.saveCurrentDocumentIfDirty model
                ]
            )

        GetPublicDocumentsRawQuery query ->
            Search.getPublicDocumentsRawQuery model query

        GetImages query ->
            ( model, Cmd.map FileMsg <| Credentials.getImages "" query )

        DocViewMsg (GetPublicDocumentsRawQuery2 query) ->
            ( { model | appMode = Reading, toolPanelState = HideToolPanel, currentDocumentDirty = False }
            , Cmd.batch
                [ Cmd.map DocListMsg (DocumentList.findDocuments Nothing query)
                , Update.Document.saveCurrentDocumentIfDirty model
                ]
            )

        GetUserDocuments query ->
            case model.maybeCurrentUser of
                Nothing ->
                    ( model, Cmd.none )

                Just user ->
                    ( { model | toolPanelState = HideToolPanel }, Cmd.map DocListMsg (DocumentList.findDocuments (Just user) (Query.parse query)) )

        LoadMasterDocument idString ->
            case String.toInt idString of
                Nothing ->
                    ( model, Cmd.none )

                Just id ->
                    ( { model | masterDocLoaded = True }, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser id) )

        DocDictMsg (PutDocumentInDictionaryAsTexMacros result) ->
            case result of
                Ok documentRecord ->
                    let
                        dict =
                            model.documentDictionary

                        texdoc =
                            documentRecord.document

                        texMacros =
                            texdoc.content

                        -- bigEditRecord = BigEditRecord.Update.Document.updateBigEditRecord model document
                        -- bigEditRecord = BigEditRecord.fromDocument model.currentDocument texmacros
                        -- bigEditRecord = BigEditRecord.fromDocument model.currentDocument documentRecord.document.content
                    in
                        ( { model
                            | documentDictionary = DocumentDictionary.put "texmacros" texdoc dict
                            , texMacros = texMacros
                          }
                        , Cmd.none
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        GoToStart ->
            UI.goToStart model

        Model.GoHome ->
            UI.goHome model

        GoToUsersHomePage bigUser ->
            let
                queryString =
                    "authorname=" ++ bigUser.username ++ "&key=home"
            in
                ( { model
                    | appMode = Reading
                    , toolPanelState = HideToolPanel
                  }
                , Cmd.map DocListMsg (DocumentList.findDocuments Nothing queryString)
                )

        ChangeMode nextAppMode ->
            UI.changeMode model nextAppMode

        DebounceMsg msg_ ->
            let
                ( debounce, cmd ) =
                    Debounce.update debounceConfig (Debounce.takeLast updateEditorContentCmd) msg_ model.debounce

                tokenString =
                    User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                ( { model
                    | debounce = debounce
                    , debounceCounter = model.debounceCounter + 1

                    --, message = "debounce: " ++ (String.fromInt model.debounceCounter)
                  }
                , Cmd.batch
                    [ cmd
                    , Outside.saveDocToLocalStorage model.currentDocument
                    , Random.generate NewSeed (Random.int 1 10000)
                    ]
                )

        GetContent str ->
            let
                ( debounce, cmd ) =
                    Debounce.push debounceConfig str model.debounce
            in
                ( { model
                    | sourceText = str
                    , currentDocumentDirty = True
                    , debounce = debounce
                  }
                , cmd
                )

        UpdateEditorContent str ->
            let
                currentDocument =
                    model.currentDocument

                nextCurrentDocument =
                    { currentDocument | content = str }

                -- ###
                nextBigEditRecord =
                    Update.Document.updateBigEditRecord model nextCurrentDocument

                nextDocumentList =
                    DocumentList.updateDocument nextCurrentDocument model.documentList

                nextDocumentQueue =
                    Queue.replaceUsingPredicate (\doc -> doc.id == nextCurrentDocument.id) nextCurrentDocument model.recentDocumentQueue
            in
                ( { model
                    | currentDocument = nextCurrentDocument
                    , recentDocumentQueue = nextDocumentQueue
                    , documentList = nextDocumentList
                    , bigEditRecord = nextBigEditRecord
                  }
                , Cmd.none
                )

        SaveCurrentDocument time ->
            let
                tokenString =
                    User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                case model.currentDocument.docType of
                    Master ->
                        ( { model | message = "Autosave (no, M)" }, Update.Time.getTime )

                    -- do not autosave master documents
                    Standard ->
                        ( { model
                            | currentDocumentDirty = False
                            , message = "Autosaved doc " ++ String.fromInt model.debounceCounter
                            , documentList = DocumentList.updateDocument model.currentDocument model.documentList
                            , recentDocumentQueue = Queue.replaceUsingPredicate (\doc -> doc.id == model.currentDocument.id) model.currentDocument model.recentDocumentQueue
                          }
                        , Cmd.batch [ Update.Document.saveCurrentDocumentIfDirty model, Update.Time.getTime ]
                        )

        UpdateCurrentDocument ->
            Update.Document.saveCurrentDocument model

        Outside infoForElm_ ->
            processInfoForElm model infoForElm_

        ToggleToolPanelState ->
            UI.toggleToolPanelState model

        NewDocument ->
            Update.Document.doNewStandardDocument model

        NewMasterDocument ->
            Update.Document.doNewMasterDocument model

        NewChildDocument ->
            ( { model | toolMenuState = HideToolMenu, appMode = Writing }
            , Cmd.map DocMsg (Update.Document.newChildDocument model)
            )

        SetDocumentTextType textType ->
            let
                document =
                    model.currentDocument

                nextDocument =
                    { document | textType = textType }
            in
                ( { model | currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        SetDocumentType docType ->
            let
                document =
                    model.currentDocument

                nextDocument =
                    { document | docType = docType }
            in
                ( { model | currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        GetViewport viewport ->
            ( { model | viewport = viewport }, Cmd.none )

        FindViewportOfRenderedText result ->
            case result of
                Ok viewport ->
                    ( { model | viewPortOfRenderedText = Just viewport, debugString = "doc VP OK" }, Cmd.none )

                Err _ ->
                    ( { model | debugString = "doc VP ERROR" }, Cmd.none )

        DeleteCurrentDocument ->
            let
                tokenString =
                    User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                case model.deleteDocumentState of
                    DeleteIsOnSafety ->
                        ( { model | deleteDocumentState = DeleteIsArmed }, Cmd.none )

                    DeleteIsArmed ->
                        ( { model | deleteDocumentState = DeleteIsOnSafety }, Cmd.map DocMsg (Document.deleteDocument tokenString model.currentDocument) )

        CancelDeleteCurrentDocument ->
            ( { model | deleteDocumentState = DeleteIsOnSafety }, Cmd.none )

        LogErr error ->
            ( model, Cmd.none )

        -- ## startup errors
        KeyMsg keyMsg ->
            let
                ( pressedKeys, maybeKeyChange ) =
                    Keyboard.updateWithKeyChange
                        (Keyboard.oneOf [ Keyboard.characterKey, Keyboard.modifierKey, Keyboard.whitespaceKey ])
                        keyMsg
                        model.pressedKeys
            in
                Update.Keyboard.gateway model ( pressedKeys, maybeKeyChange )

        GetUserManual ->
            ( model, Cmd.map DocMsg (Document.getDocumentById Configuration.userManualId Nothing) )

        UrlChanged str ->
            case UrlAppParser.toRoute str of
                DocumentIdRef id ->
                    Update.Document.selectDocumentWithId id model

                _ ->
                    ( model, Cmd.none )

        SetDocumentPublic value ->
            let
                currentDocument =
                    model.currentDocument

                nextCurrentDocument =
                    { currentDocument | public = value }
            in
                ( { model | currentDocument = nextCurrentDocument }, Cmd.none )

        Test ->
            ( model, getViewPortOfRenderedText "_textView_" )

        -- (model, Cmd.map ImageMsg <| ImageManager.getImageList model.currentDocument)
        ReadImage v ->
            let
                maybeFileData =
                    case Decode.decodeValue Credentials.decodeFileData v of
                        Ok fileData ->
                            Just fileData

                        Err _ ->
                            Nothing

                fileInfo =
                    case maybeFileData of
                        Nothing ->
                            Credentials.fileInfoTestRecord

                        Just fileData ->
                            { filename = fileData.name
                            , mimetype = fileData.mimetype
                            , bucket = "noteimages"
                            , path = User.usernameFromMaybeUser model.maybeCurrentUser
                            }

                path_ =
                    User.usernameFromMaybeUser model.maybeCurrentUser ++ "/" ++ fileInfo.filename

                cmd =
                    Credentials.getS3PresignedUrl (stringFromMaybeToken model.maybeToken) "noteimages" path_ fileInfo.mimetype
            in
                ( { model | message = fileInfo.filename, maybeFileData = maybeFileData, fileValue = v }, Cmd.map FileMsg cmd )

        FileMsg (Credentials.ReceiveFileCredentials result) ->
            let
                cmd =
                    case result of
                        Ok credentialsWrapper ->
                            sendCredentials (Credentials.encodeCredentialsWrapper credentialsWrapper)

                        Err _ ->
                            Cmd.none
            in
                ( model, cmd )

        FileMsg (Credentials.ReceivePresignedUrl result) ->
            let
                v =
                    case model.maybeFileData of
                        Nothing ->
                            Encode.null

                        Just fileData ->
                            Credentials.encodeFileData fileData
            in
                case result of
                    Ok url ->
                        ( { model | message = "psurl: " ++ url, psurl = url }
                        , Cmd.batch
                            [ readImage (Credentials.encodeFileValueWithUrl model.fileValue url)
                            , uploadImage (Credentials.encodeFileValueWithUrl model.fileValue url)
                            ]
                        )

                    Err err ->
                        ( { model | message = HttpError.handle err }, Cmd.none )

        ImageRead v ->
            let
                nextImageString =
                    Decode.decodeValue Decode.string v |> Result.toMaybe
            in
                ( { model | maybeImageString = nextImageString, message = "ImageRead" }, Cmd.map UserMsg <| User.incrementMediaCountForMaybeUser model.maybeCurrentUser )

        DocMsg (ReceiveWorkerReply result) ->
            case result of
                Ok pdfFileName ->
                    ( { model | message = pdfFileName }, sendPdfFileName (Document.encodeString pdfFileName) )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocMsg (ReceiveLatexExportText result) ->
            case result of
                Ok str ->
                    ( { model | message = "Export file: " ++ String.fromInt (String.length str) }, Cmd.map DocMsg <| Document.sendToWorker str )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        SessionStatus t ->
            let
                sessionExpired =
                    case model.maybeCurrentUser of
                        Nothing ->
                            True

                        Just user ->
                            User.sessionIsExpired t user

                sessionString =
                    case sessionExpired of
                        True ->
                            "Not signed in"

                        False ->
                            "UTC " ++ Update.Time.toUtcString t
            in
                case ( sessionExpired, model.maybeCurrentUser ) of
                    ( True, Just _ ) ->
                        signOutCurrentUser model

                    ( _, _ ) ->
                        ( { model | message = sessionString }, Cmd.none )

        PrintDocument ->
            case model.currentDocument.textType of
                MiniLatex ->
                    Update.Document.printLatex model

                _ ->
                    ( { model | toolMenuState = HideToolMenu }, Update.Document.sendDocumentForPrinting (Document.encodeString (Document.printUrl model.currentDocument)) )

        IncrementVersion ->
            Update.Document.doIncrementVersion model

        ImageMsg (ReceiveImageList result) ->
            case result of
                Ok imageList ->
                    ( { model | message = "Images: " ++ String.fromInt (List.length imageList) }
                    , Cmd.map ImageMsg (ImageManager.processImageList imageList)
                    )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        ImageMsg (ReceiveImageListReply result) ->
            case result of
                Ok str ->
                    ( { model | message = "RIL: " ++ str }, Cmd.none )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        -- Err err -> ( { model | message = "RIL Error" }, Cmd.none )
        UserMsg (ListUsers result) ->
            case result of
                Ok userList ->
                    ( { model | userList = userList, message = "Users: " ++ (String.fromInt <| List.length userList) }, Cmd.none )

                Err error ->
                    ( { model | message = HttpError.handle error }, Cmd.none )

        GetUsers ->
            Search.searchForUsers model

        UserMsg (AcknowledgeMediaCountIncrement result) ->
            case result of
                Ok reply ->
                    ( { model | message = reply }, Cmd.none )

                Err error ->
                    ( { model | message = HttpError.handle error }, Cmd.none )

        MakeImage ->
            case model.maybeCurrentUser of
                Nothing ->
                    ( model, Cmd.none )

                Just user ->
                    ( model
                    , Cmd.map FileMsg <|
                        Credentials.makeImage
                            (User.getTokenString user)
                            model.imageName
                            (AppUtility.imageUrlAtS3 model)
                            (imageAccessbilityToBool model.imageAccessibility)
                            (User.userId user)
                    )

        FileMsg (Credentials.ReceiveMakeImageAcknowledgement result) ->
            case result of
                Ok reply ->
                    ( { model | message = reply }, Cmd.none )

                Err error ->
                    ( { model | message = HttpError.handle error }, Cmd.none )

        FileMsg (Credentials.ReceiveImageList result) ->
            case result of
                Ok imageList ->
                    ( { model | imageList = imageList, message = "Images: " ++ (String.fromInt <| List.length imageList) }, Cmd.none )

                Err error ->
                    ( { model | message = HttpError.handle error }, Cmd.none )

        SelectImage image ->
            ( { model | message = "Image: " ++ image.name, maybeCurrentImage = Just image, imageMode = ViewImage }, Cmd.none )

        SelectImageLoader ->
            ( { model | imageMode = LoadImage }, Cmd.none )

        ToggleImageAccessibility ->
            case model.imageAccessibility of
                PublicImage ->
                    ( { model | imageAccessibility = PrivateImage }, Cmd.none )

                PrivateImage ->
                    ( { model | imageAccessibility = PublicImage }, Cmd.none )

        AcceptEmailSubject str ->
            ( { model | emailSubject = str }, Cmd.none )

        AcceptEmailText str ->
            ( { model | emailText = str }, Cmd.none )

        SendEmail ->
            ( { model | message = "Sending email" }
            , Cmd.map MailMsg <|
                Mail.sendEmailToUsers
                    (User.getTokenStringFromMaybeUser model.maybeCurrentUser)
                    model.userList
                    model.emailSubject
                    model.emailText
            )

        MailMsg (Mail.AcknowledgeEmailSent result) ->
            case result of
                Ok reply ->
                    ( { model | message = reply }, Cmd.none )

                Err error ->
                    ( { model | message = "Error sending mail" }, Cmd.none )

        TogglePreferencesPanel ->
            UI.togglePreferences model

        UserMsg (ReceiveBigUserRecord result) ->
            case result of
                Ok bigUserRecord ->
                    ( { model
                        | blurb = bigUserRecord.user.blurb
                        , maybeBigUser = Just bigUserRecord.user
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model | blurb = "No blurb", message = HttpError.handle error }, Cmd.none )

        UserMsg (ReceiveBigUserRecordAtSignIn result) ->
            case result of
                Ok bigUserRecord ->
                    ( { model
                        | blurb = bigUserRecord.user.blurb
                        , maybeBigUser = Just bigUserRecord.user
                      }
                    , Cmd.map DocListMsg (DocumentList.retrievRecentDocumentQueueFromIntListAtSignIn model.maybeCurrentUser bigUserRecord.user.documentIds)
                    )

                Err error ->
                    ( { model | blurb = "No blurb", message = HttpError.handle error }, Cmd.none )

        UserMsg (AcknowlegeBigUserUpdate result) ->
            case result of
                Ok bigUserRecord ->
                    ( { model | message = "BIG USER OK" }, Cmd.none )

                Err error ->
                    ( { model | message = "BIG USER ERROR" }, Cmd.none )

        GetBigUser ->
            case model.maybeCurrentUser of
                Nothing ->
                    ( model, Cmd.none )

                Just user ->
                    ( model, Cmd.map UserMsg <| User.getBigUserRecord (User.userId user) )

        UpdateBigUser ->
            ( model, updateBigUserCmd model )

        AcceptBlurb str ->
            ( { model | blurb = str }, Cmd.none )

        ToggleUserPublicPrivate ->
            case model.maybeBigUser of
                Nothing ->
                    ( model, Cmd.none )

                Just bigUser ->
                    case bigUser.public of
                        True ->
                            ( { model | maybeBigUser = Just { bigUser | public = False } }, Cmd.none )

                        False ->
                            ( { model | maybeBigUser = Just { bigUser | public = True } }, Cmd.none )

        Search ->
            Search.doSearch model

        ToggleToolMenu ->
            case model.toolMenuState of
                HideToolMenu ->
                    ( { model | toolMenuState = ShowToolMenu }, Cmd.none )

                ShowToolMenu ->
                    ( { model | toolMenuState = HideToolMenu }, Cmd.none )

        ToggleDocumentSource ->
            case model.documentListSource of
                SearchResults ->
                    ( { model | documentListSource = RecentDocumentsQueue }, Cmd.none )

                RecentDocumentsQueue ->
                    ( { model | documentListSource = SearchResults }, Cmd.none )

        UserClicksOutsideSearchBox clickedOutside ->
            case clickedOutside of
                True ->
                    ( { model | focusedElement = NoFocus }, Cmd.none )

                False ->
                    ( { model | focusedElement = FocusOnSearchBox }, Cmd.none )

        SetFocusOnSearchBox result ->
            ( model, Cmd.none )

        -- case result of
        --   Err _ -> ({model | debugString = "Focus ERROR"}, Cmd.none)
        --   Ok () -> ({model | debugString = "Focus"}, Cmd.none)
        -- https://package.elm-lang.org/packages/elm/core/latest/Task#perform
        GenerateSeed ->
            ( model, Random.generate NewSeed (Random.int 1 10000) )

        NewSeed newSeed ->
            ( { model | seed = newSeed }, Cmd.none )

        DoFullRender ->
            Update.Document.doFullRender model

        ExportLatex ->
            Update.Document.downloadCurrentLatexDocument model



-- UPDATE END
-- HELPERS
-- DOCUPDATE


imageAccessbilityToBool : ImageAccessibility -> Bool
imageAccessbilityToBool imageAccessibility =
    case imageAccessibility of
        PublicImage ->
            True

        PrivateImage ->
            False


{-| Handler: ListUsers
-}
signOutCurrentUser : Model -> ( Model, Cmd Msg )
signOutCurrentUser model =
    let
        freshModel =
            initialModel "" model.windowWidth model.windowHeight SystemDocument.signedOut
    in
        ( { freshModel
            | maybeCurrentUser = Nothing
            , maybeToken = Nothing
            , message = "Signed out"
            , currentDocumentDirty = False
          }
        , Cmd.batch
            [ Outside.eraseLocalStorage
            , Update.Document.saveCurrentDocumentIfDirty model
            ]
        )


signIn : Model -> ( Model, Cmd Msg )
signIn model =
    case String.length model.password < 8 of
        True ->
            ( { model | message = "Password must contain at least 8 characters" }, Cmd.none )

        False ->
            let
                basicDoc =
                    Document.basicDocument

                startupDoc =
                    SystemDocument.signIn

                freshModel =
                    initialModel "" model.windowWidth model.windowHeight startupDoc

                documentListSource =
                    RecentDocumentsQueue
            in
                ( freshModel
                , Cmd.batch
                    [ Cmd.map UserMsg (User.getTokenCmd model.email model.password)
                    , Outside.eraseLocalStorage
                    ]
                )



-- DOCUMENT


pushDocument : Document -> Cmd Msg
pushDocument document =
    pushUrl <| "/" ++ String.fromInt document.id


getViewPort : Cmd Msg
getViewPort =
    Task.perform GetViewport Dom.getViewport


getViewPortOfRenderedText : String -> Cmd Msg
getViewPortOfRenderedText id =
    Task.attempt FindViewportOfRenderedText (Dom.getViewportOf id)


updateBigUserCmd : Model -> Cmd Msg
updateBigUserCmd model =
    case model.maybeBigUser of
        Nothing ->
            Cmd.none

        Just bigUser ->
            let
                nextBigUser =
                    { bigUser | blurb = model.blurb, documentIds = List.map .id <| Queue.list model.recentDocumentQueue }
            in
                Cmd.map UserMsg <| User.updateBigUser (User.getTokenStringFromMaybeUser model.maybeCurrentUser) nextBigUser
