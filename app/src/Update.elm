port module Update
    exposing
        ( getInfoFromOutside
        , getTimeInOneSecond
        , getViewPort
        , imageRead
        , onUrlChange
        , processUrl
        , update
        )

-- IMPORT

import File.Download as Download
import MiniLatex.Export as Export
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
import LatexHelper
import Html exposing (Html)
import Html.Attributes
import Http
import ImageManager exposing (ImageMsg(..))
import Json.Decode as Decode exposing (Decoder, Value)
import Json.Encode as Encode
import Keyboard exposing (Key(..))
import Keyboard.Arrows
import List.Extra
import Mail
import Task exposing (Task)
import Model
    exposing
        ( AppMode(..)
        , DeleteDocumentState(..)
        , DocumentListSource(..)
        , ErrorResponse(..)
        , FocusedElement(..)
        , ImageAccessibility(..)
        , ImageMode(..)
        , InfoForElm(..)
        , MiniLatexRenderMode(..)
        , Model
        , Msg(..)
        , PreferencesPanelState(..)
        , SignupMode(..)
        , ToolMenuState(..)
        , ToolPanelState(..)
        , initialModel
        )
import Process
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


port sendDocumentForPrinting : Value -> Cmd msg


port onUrlChange : (String -> msg) -> Sub msg


port pushUrl : String -> Cmd msg


port incrementVersion : String -> Cmd msg



-- OUTSIDE


port infoForOutside : GenericOutsideData -> Cmd msg


port infoForElm : (GenericOutsideData -> msg) -> Sub msg


type InfoForOutside
    = DocumentData Encode.Value
    | DocumentListData Encode.Value
    | DocumentQueueData Encode.Value
    | AskToReconnectDocument Encode.Value
    | AskToReconnectDocumentList Encode.Value
    | AskToReconnectRecentDocumentQueue Encode.Value
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

        DocumentQueueData value ->
            infoForOutside { tag = "DocumentQueueData", data = value }

        UserData value ->
            infoForOutside { tag = "UserData", data = value }

        AskToReconnectDocument value ->
            infoForOutside { tag = "AskToReconnectDocument", data = Encode.null }

        AskToReconnectDocumentList value ->
            infoForOutside { tag = "AskToReconnectDocumentList", data = Encode.null }

        AskToReconnectRecentDocumentQueue value ->
            infoForOutside { tag = "AskToReconnectRecentDocumentQueue", data = Encode.null }

        AskToReconnectUser value ->
            infoForOutside { tag = "AskToReconnectUser", data = Encode.null }

        AskToEraseLocalStorage value ->
            infoForOutside { tag = "AskToEraseLocalStorage", data = Encode.null }


bigUserCmd2 maybeCurrentUser =
    case maybeCurrentUser of
        Nothing ->
            Cmd.none

        Just user ->
            Cmd.map UserMsg <| User.getBigUserRecord (User.userId user)


getInfoFromOutside : (InfoForElm -> msg) -> (String -> msg) -> Sub msg
getInfoFromOutside tagger onError =
    infoForElm
        (\outsideInfo ->
            case outsideInfo.tag of
                "ReconnectDocument" ->
                    case Decode.decodeValue Document.decodeDocumentFromOutside outsideInfo.data of
                        Ok result ->
                            tagger <| DocumentDataFromOutside result

                        Err e ->
                            onError <| "No doc to retrieve"

                "ReconnectDocumentList" ->
                    case Decode.decodeValue DocumentList.intListDecoder outsideInfo.data of
                        Ok result ->
                            tagger <| DocumentListDataFromOutside result

                        Err e ->
                            onError <| "No doc to retrieve"

                "ReconnectDocumentQueue" ->
                    case Decode.decodeValue DocumentList.intListForDocumentQueueDecoder outsideInfo.data of
                        Ok result ->
                            tagger <| RecentDocumentQueueDataFromOutside result

                        Err e ->
                            onError <| "No document queue to retrieve"

                "ReconnectUser" ->
                    case Decode.decodeValue User.decodeUserFromOutside outsideInfo.data of
                        Ok result ->
                            tagger <| UserDataFromOutside result

                        Err e ->
                            onError <| ""

                --   "Bad decode (getInfoFromOutside)"  ++ (Decode.errorToString e))
                _ ->
                    onError <| "Unexpected info from outside"
        )



-- link : msg -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
-- link href attrs children =
--   Html.a (preventDefaultOn "click" (Decode.succeed (href, True)) :: attrs) children


processInfoForElm :
    Model
    -> InfoForElm
    -> ( Model, Cmd Msg ) -- SET CURRENT DOCUMENT
processInfoForElm model infoForElm_ =
    case infoForElm_ of
        DocumentDataFromOutside document ->
            ( { model
                | currentDocument = document
                , bigEditRecord = updateBigEditRecord model document
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


saveDocToLocalStorage : Document -> Cmd msg
saveDocToLocalStorage document =
    sendInfoOutside (DocumentData (Document.encodeDocumentForOutside document))


saveDocumentListToLocalStorage : DocumentList -> Cmd msg
saveDocumentListToLocalStorage documentList =
    sendInfoOutside (DocumentListData (DocumentList.documentListEncoder documentList))


saveRecentDocumentQueueToLocalStorage : Queue Document -> Cmd msg
saveRecentDocumentQueueToLocalStorage documentQueue =
    sendInfoOutside (DocumentQueueData (DocumentList.encodeDocumentQueue documentQueue))


sendMaybeUserDataToLocalStorage : Maybe User -> Cmd msg
sendMaybeUserDataToLocalStorage maybeUser =
    case maybeUser of
        Nothing ->
            Cmd.none

        Just user ->
            sendInfoOutside (UserData (User.encodeUserForOutside user))


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
    case UrlAppParser.toRoute urlString of
        NotFound ->
            Cmd.batch
                [ sendInfoOutside (AskToReconnectDocument Encode.null)
                , sendInfoOutside (AskToReconnectDocumentList Encode.null)
                , sendInfoOutside (AskToReconnectRecentDocumentQueue Encode.null)
                , sendInfoOutside (AskToReconnectUser Encode.null)
                ]

        DocumentIdRef docId ->
            Cmd.batch
                [ sendInfoOutside (AskToReconnectUser Encode.null)
                , sendInfoOutside (AskToReconnectRecentDocumentQueue Encode.null)

                --, sendInfoOutside (AskToReconnectDocumentList Encode.null)
                , Cmd.map DocMsg (Document.getDocumentById docId Nothing)
                , Cmd.map DocListMsg (DocumentList.findDocuments Nothing <| "id=" ++ String.fromInt docId)
                ]

        HomeRef username ->
            Cmd.batch
                [ sendInfoOutside (AskToReconnectUser Encode.null)
                , sendInfoOutside (AskToReconnectRecentDocumentQueue Encode.null)
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


keyGateway : Model -> ( List Key, Maybe Keyboard.KeyChange ) -> ( Model, Cmd Msg )
keyGateway model ( pressedKeys, maybeKeyChange ) =
    -- let
    --     _ =
    --         Debug.log "PK" pressedKeys
    -- in
    if List.member Control model.pressedKeys then
        handleKey { model | pressedKeys = [] } (headKey pressedKeys)
    else if model.focusedElement == FocusOnSearchBox && List.member Enter model.pressedKeys then
        let
            newModel =
                { model | pressedKeys = [] }
        in
            doSearch newModel
    else
        ( { model | pressedKeys = pressedKeys }, Cmd.none )


handleKey : Model -> Key -> ( Model, Cmd Msg )
handleKey model key =
    case key of
        Character "s" ->
            saveCurrentDocument model

        Character "=" ->
            saveCurrentDocument model

        Character "/" ->
            getPublicDocumentsRawQuery model "random=public"

        Character "w" ->
            changeMode model Writing

        Character "r" ->
            changeMode model Reading

        Character "i" ->
            changeMode model ImageEditing

        Character "a" ->
            changeMode model DisplayAuthors

        -- Character "f" -> (model, focusSearchBox)
        Character "f" ->
            doFullRender model

        Character "h" ->
            goHome model

        Character "j" ->
            makeNewChildDocument model

        Character "e" ->
            toggleToolPanelState model

        Character "m" ->
            doNewMasterDocument model

        Character "n" ->
            doNewStandardDocument model

        Character "p" ->
            printDocument model

        Character "q" ->
            putCurrentDocumentAtTopOfQueue model

        Character "u" ->
            togglePreferences model

        Character "v" ->
            doIncrementVersion model

        Character "0" ->
            goToStart model

        F20 ->
            ( model, Cmd.none )

        _ ->
            ( model, Cmd.none )


focusSearchBox : Cmd Msg
focusSearchBox =
    Task.attempt SetFocusOnSearchBox (Dom.focus "search-box")



-- https://package.elm-lang.org/packages/elm/core/latest/Task#perform


makeNewChildDocument : Model -> ( Model, Cmd Msg )
makeNewChildDocument model =
    ( model, Cmd.map DocMsg (newChildDocument model) )


doSearch : Model -> ( Model, Cmd Msg )
doSearch model =
    case model.appMode of
        Reading ->
            case model.maybeCurrentUser of
                Nothing ->
                    getPublicDocuments model model.searchQueryString

                Just _ ->
                    case String.contains "shared" model.searchQueryString of
                        True ->
                            getUserDocuments model model.searchQueryString

                        False ->
                            getUserDocuments model (model.searchQueryString ++ ", docs=any")

        Writing ->
            getUserDocuments model model.searchQueryString

        ImageEditing ->
            searchForImages model

        Admin ->
            searchForUsers model

        DisplayAuthors ->
            searchForUsers model



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
                            [ sendMaybeUserDataToLocalStorage maybeCurrentUser
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
                        , sendMaybeUserDataToLocalStorage maybeCurrentUser
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        DocMsg (ReceiveDocument result) ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentRecord ->
                    ( { model | currentDocument = documentRecord.document, bigEditRecord = updateBigEditRecord model documentRecord.document }
                    , Cmd.batch
                        [ loadTexMacrosForDocument documentRecord.document model
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
                                , bigEditRecord = updateBigEditRecord model documentSelected
                                , toolPanelState = HideToolPanel
                                , documentList = DocumentList.deleteItemInDocumentListAt idOfDocumentToDelete nextDocumentList_
                                , recentDocumentQueue = nextDocumentQueue
                            }
                    in
                        ( nextModel
                        , Cmd.batch
                            [ updateBigUserCmd nextModel
                            , saveRecentDocumentQueueToLocalStorage nextDocumentQueue
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
                                , bigEditRecord = updateBigEditRecord model nextDocument
                                , sourceText = nextDocument.content
                                , documentList = nextDocumentList_
                                , recentDocumentQueue = nextDocumentQueue
                            }
                    in
                        ( nextModel
                        , Cmd.batch
                            [ updateBigUserCmd nextModel
                            , saveRecentDocumentQueueToLocalStorage nextDocumentQueue
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
                            , bigEditRecord = updateBigEditRecord model currentDocument
                            , maybeMasterDocument = nextMaybeMasterDocument
                          }
                        , Cmd.batch
                            [ loadTexMacrosForDocument currentDocument model
                            , saveDocumentListToLocalStorage documentList
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
                    , saveRecentDocumentQueueToLocalStorage restoredDocumentQueue
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
                            , bigEditRecord = updateBigEditRecord model selectedDocument
                          }
                        , Cmd.batch
                            [ loadTexMacrosForDocument selectedDocument model
                            , saveDocumentListToLocalStorage documentList
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
                                    ( Just currentDocument, loadTexMacrosForDocument currentDocument model )
                    in
                        ( { model
                            | documentList = DocumentList.selectFirst documentList
                            , currentDocument = currentDocument
                            , bigEditRecord = updateBigEditRecord model currentDocument
                            , maybeMasterDocument = nextMaybeMasterDocument
                          }
                        , Cmd.batch
                            [ loadTexMacrosForDocument currentDocument model
                            , loadTexMacrosForMasterDocument
                            , saveDocumentListToLocalStorage documentList
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
                            , bigEditRecord = updateBigEditRecord model currentDocument
                          }
                        , Cmd.batch
                            [ saveDocumentListToLocalStorage documentList
                            , loadTexMacrosForDocument currentDocument model
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
                        , bigEditRecord = updateBigEditRecord model document
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
                    , saveDocToLocalStorage document
                    , saveRecentDocumentQueueToLocalStorage nextDocumentQueue
                    , saveDocumentListToLocalStorage documentList
                    , updateBigUserCmd newModel
                    , loadTexMacrosForDocument document newModel
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
                , saveCurrentDocumentIfDirty model
                ]
            )

        GetPublicDocumentsRawQuery query ->
            getPublicDocumentsRawQuery model query

        GetImages query ->
            ( model, Cmd.map FileMsg <| Credentials.getImages "" query )

        DocViewMsg (GetPublicDocumentsRawQuery2 query) ->
            ( { model | appMode = Reading, toolPanelState = HideToolPanel, currentDocumentDirty = False }
            , Cmd.batch
                [ Cmd.map DocListMsg (DocumentList.findDocuments Nothing query)
                , saveCurrentDocumentIfDirty model
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

                        -- bigEditRecord = BigEditRecord.updateBigEditRecord model document
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
            goToStart model

        Model.GoHome ->
            goHome model

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
            changeMode model nextAppMode

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
                    , saveDocToLocalStorage model.currentDocument
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
                    updateBigEditRecord model nextCurrentDocument

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
                        ( { model | message = "Autosave (no, M)" }, getTime )

                    -- do not autosave master documents
                    Standard ->
                        ( { model
                            | currentDocumentDirty = False
                            , message = "Autosaved doc " ++ String.fromInt model.debounceCounter
                            , documentList = DocumentList.updateDocument model.currentDocument model.documentList
                            , recentDocumentQueue = Queue.replaceUsingPredicate (\doc -> doc.id == model.currentDocument.id) model.currentDocument model.recentDocumentQueue
                          }
                        , Cmd.batch [ saveCurrentDocumentIfDirty model, getTime ]
                        )

        UpdateCurrentDocument ->
            saveCurrentDocument model

        Outside infoForElm_ ->
            processInfoForElm model infoForElm_

        ToggleToolPanelState ->
            toggleToolPanelState model

        NewDocument ->
            doNewStandardDocument model

        NewMasterDocument ->
            doNewMasterDocument model

        NewChildDocument ->
            ( { model | toolMenuState = HideToolMenu, appMode = Writing }, Cmd.map DocMsg (newChildDocument model) )

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
                keyGateway model ( pressedKeys, maybeKeyChange )

        GetUserManual ->
            ( model, Cmd.map DocMsg (Document.getDocumentById Configuration.userManualId Nothing) )

        UrlChanged str ->
            case UrlAppParser.toRoute str of
                DocumentIdRef id ->
                    selectDocumentWithId id model

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
                            "UTC " ++ toUtcString t
            in
                case ( sessionExpired, model.maybeCurrentUser ) of
                    ( True, Just _ ) ->
                        signOutCurrentUser model

                    ( _, _ ) ->
                        ( { model | message = sessionString }, Cmd.none )

        PrintDocument ->
            case model.currentDocument.textType of
                MiniLatex ->
                    printLatex model

                _ ->
                    ( { model | toolMenuState = HideToolMenu }, sendDocumentForPrinting (Document.encodeString (Document.printUrl model.currentDocument)) )

        IncrementVersion ->
            doIncrementVersion model

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
            searchForUsers model

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
            togglePreferences model

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
            doSearch model

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
            doFullRender model

        ExportLatex ->
            downloadCurrentLatexDocument model



-- UPDATE END
-- HELPERS


downloadCurrentLatexDocument : Model -> ( Model, Cmd Msg )
downloadCurrentLatexDocument model =
    let
        document =
            model.currentDocument

        documentTitle =
            (String.replace " " "_" document.title) ++ ".tex"

        prepend : String -> String -> String
        prepend prefix str =
            prefix ++ "\n\n" ++ str

        ( documentContent, imageUrlList ) =
            document.content |> Export.transform

        preparedDocumentContent =
            documentContent
                |> prepend model.texMacros
                |> prepend (MiniLatexTools.makePreamble document)
                |> LatexHelper.makeDocument
    in
        if List.length imageUrlList == 0 then
            ( model, Download.string documentTitle "application/text" preparedDocumentContent )
        else
            let
                nextModel =
                    { model
                        | exportText = preparedDocumentContent
                        , imageUrlList = imageUrlList
                    }
            in
                downloadImages nextModel


downloadImages : Model -> ( Model, Cmd Msg )
downloadImages model =
    -- if List.length model.imageUrlList == 0 then
    --     ( { model | exportText = "" }, Download.string currentDocument.title "application/text" model.exportText )
    -- else
    ( model, Cmd.none )


doFullRender : Model -> ( Model, Cmd Msg )
doFullRender model =
    ( { model | bigEditRecord = updateBigEditRecordFull model model.currentDocument, toolMenuState = HideToolMenu }
    , Random.generate NewSeed (Random.int 1 10000)
    )


updateBigEditRecordFull : Model -> Document -> BigEditRecord Msg
updateBigEditRecordFull model document =
    BigEditRecord.updateFromDocument (BigEditRecord.empty 0 0) document model.texMacros model.seed


updateBigEditRecord : Model -> Document -> BigEditRecord Msg
updateBigEditRecord model document =
    case model.miniLatexRenderMode of
        RenderFull ->
            BigEditRecord.updateFromDocument (BigEditRecord.empty 0 0) document model.texMacros model.seed

        RenderIncremental ->
            BigEditRecord.updateFromDocument model.bigEditRecord document model.texMacros model.seed


imageAccessbilityToBool : ImageAccessibility -> Bool
imageAccessbilityToBool imageAccessibility =
    case imageAccessibility of
        PublicImage ->
            True

        PrivateImage ->
            False


imageQuery : Model -> String -> String
imageQuery model basicQuery =
    case model.maybeCurrentUser of
        Nothing ->
            "123XY.uuk#m!!t"

        Just user ->
            case basicQuery == "" of
                True ->
                    Query.parse <| "user_id=" ++ (String.fromInt <| User.userId user)

                False ->
                    case basicQuery == "random" of
                        True ->
                            Query.parse <| "random=yes"

                        False ->
                            Query.parse <| "user_id=" ++ (String.fromInt <| User.userId user) ++ "&" ++ Query.stringToQueryString "name" basicQuery


{-| Handler: ListUsers
-}
searchForUsersCmdWithQuery : String -> Model -> Cmd Msg
searchForUsersCmdWithQuery searchQueryString model =
    Cmd.map UserMsg (User.getUsers <| searchQueryString)


searchForUsersCmd : Model -> Cmd Msg
searchForUsersCmd model =
    case String.contains "=" model.searchQueryString of
        True ->
            Cmd.map UserMsg (User.getUsers <| model.searchQueryString)

        False ->
            Cmd.map UserMsg (User.getUsers <| "is_user=" ++ model.searchQueryString)


searchForUsers : Model -> ( Model, Cmd Msg )
searchForUsers model =
    ( { model | toolMenuState = HideToolMenu, documentListSource = SearchResults }, searchForUsersCmd model )


searchForImages : Model -> ( Model, Cmd Msg )
searchForImages model =
    let
        queryString =
            case model.searchQueryString == "" of
                True ->
                    ""

                False ->
                    model.searchQueryString
    in
        ( { model | toolMenuState = HideToolMenu, documentListSource = SearchResults }, Cmd.map FileMsg (Credentials.getImages "" (imageQuery model queryString)) )


goToStart model =
    -- SET CURRENT DOCUMENT
    let
        doc =
            Document.basicDocument
    in
        ( { model
            | currentDocument = { doc | title = "Welcome!" }
            , currentDocumentDirty = False
            , bigEditRecord = updateBigEditRecord model { doc | title = "Welcome!" }
            , appMode = Reading
            , toolMenuState = HideToolMenu
          }
        , saveCurrentDocumentIfDirty model
        )


printDocument : Model -> ( Model, Cmd Msg )
printDocument model =
    case model.currentDocument.textType of
        MiniLatex ->
            printLatex model

        _ ->
            ( model, sendDocumentForPrinting (Document.encodeString (Document.printUrl model.currentDocument)) )


printLatex : Model -> ( Model, Cmd Msg )
printLatex model =
    ( model
    , Cmd.batch
        [ Cmd.map DocMsg <| Document.getExportLatex model.currentDocument
        , Cmd.map ImageMsg <| ImageManager.getImageList model.currentDocument
        ]
    )


doNewStandardDocument : Model -> ( Model, Cmd Msg )
doNewStandardDocument model =
    case model.maybeCurrentUser of
        Nothing ->
            ( model, Cmd.none )

        Just user ->
            ( { model
                | toolPanelState = ShowToolPanel
                , documentTitle = "NEW DOCUMENT"
                , currentDocumentDirty = False
                , toolMenuState = HideToolMenu
                , appMode = Writing
              }
            , Task.attempt
                (DocMsg << NewDocumentCreated)
                ((saveCurrentDocumentIfDirtyTask model)
                    |> Task.andThen
                        (\_ -> newDocumentForUserTask user model Standard)
                )
            )


doNewMasterDocument : Model -> ( Model, Cmd Msg )
doNewMasterDocument model =
    case model.maybeCurrentUser of
        Nothing ->
            ( model, Cmd.none )

        Just user ->
            ( { model
                | toolPanelState = ShowToolPanel
                , documentTitle = "NEW MASTER DOCUMENT"
                , currentDocumentDirty = False
                , toolMenuState = HideToolMenu
                , appMode = Writing
              }
            , Task.attempt
                (DocMsg << NewDocumentCreated)
                ((saveCurrentDocumentIfDirtyTask model)
                    |> Task.andThen
                        (\_ -> newDocumentForUserTask user model Master)
                )
            )


toggleToolPanelState : Model -> ( Model, Cmd Msg )
toggleToolPanelState model =
    case model.maybeCurrentUser of
        Nothing ->
            ( model, Cmd.none )

        Just _ ->
            let
                nextToolPanelState =
                    case model.toolPanelState of
                        HideToolPanel ->
                            ShowToolPanel

                        ShowToolPanel ->
                            HideToolPanel

                nextModel =
                    case nextToolPanelState of
                        HideToolPanel ->
                            let
                                docList_ =
                                    model.documentList

                                nextDocList_ =
                                    DocumentList.updateDocument model.currentDocument docList_

                                nextDocumentQueue =
                                    Queue.replaceUsingPredicate (\doc -> doc.id == model.currentDocument.id) model.currentDocument model.recentDocumentQueue
                            in
                                { model | toolPanelState = nextToolPanelState, documentList = nextDocList_, recentDocumentQueue = nextDocumentQueue, toolMenuState = HideToolMenu }

                        ShowToolPanel ->
                            { model
                                | documentTitle = model.currentDocument.title
                                , toolPanelState = nextToolPanelState
                                , deleteDocumentState = DeleteIsOnSafety
                                , appMode = Writing
                                , toolMenuState = HideToolMenu
                            }
            in
                ( nextModel, Cmd.none )


togglePreferences : Model -> ( Model, Cmd Msg )
togglePreferences model =
    case model.preferencesPanelState of
        PreferencesPanelOff ->
            ( { model
                | preferencesPanelState = PreferencesPanelOn
                , toolMenuState = HideToolMenu
                , appMode = Reading
              }
            , Cmd.none
            )

        PreferencesPanelOn ->
            ( { model
                | preferencesPanelState = PreferencesPanelOff
                , toolMenuState = HideToolMenu
                , appMode = Reading
              }
            , Cmd.none
            )


getPublicDocumentsRawQuery : Model -> String -> ( Model, Cmd Msg )
getPublicDocumentsRawQuery model query =
    ( { model
        | appMode = Reading
        , toolPanelState = HideToolPanel
        , documentListSource = SearchResults
        , masterDocLoaded = False
        , currentDocumentDirty = False
        , toolMenuState = HideToolMenu
      }
    , Cmd.batch
        [ Cmd.map DocListMsg (DocumentList.findDocuments Nothing query)
        , saveCurrentDocumentIfDirty model
        ]
    )


goHome :
    Model
    -> ( Model, Cmd Msg ) -- SET CURRENT DOCUMENT
goHome model =
    case model.maybeCurrentUser of
        Nothing ->
            let
                doc =
                    Document.basicDocument
            in
                ( { model
                    | currentDocument = { doc | title = "Welcome!" }
                    , bigEditRecord = updateBigEditRecord model doc
                    , currentDocumentDirty = False
                  }
                , saveCurrentDocumentIfDirty model
                )

        Just user ->
            let
                queryString =
                    "authorname=" ++ User.username user ++ "&key=home"
            in
                ( { model
                    | appMode = Reading
                    , toolPanelState = HideToolPanel
                  }
                , Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser queryString)
                )


changeMode : Model -> AppMode -> ( Model, Cmd Msg )
changeMode model nextAppMode =
    let
        nextToolPaneState =
            if nextAppMode == Reading then
                HideToolPanel
            else
                model.toolPanelState

        cmd =
            case nextAppMode of
                ImageEditing ->
                    case model.imageList == [] of
                        True ->
                            Cmd.map FileMsg (Credentials.getImages "" (imageQuery model ""))

                        False ->
                            Cmd.none

                DisplayAuthors ->
                    case model.userList == [] of
                        True ->
                            searchForUsersCmdWithQuery "created=3000" model

                        False ->
                            Cmd.none

                Admin ->
                    case model.userList == [] of
                        True ->
                            searchForUsersCmdWithQuery "created=7" model

                        False ->
                            Cmd.none

                _ ->
                    Cmd.none

        searchQueryString =
            case nextAppMode of
                Admin ->
                    "created=7"

                _ ->
                    ""
    in
        ( { model | appMode = nextAppMode, searchQueryString = searchQueryString, toolPanelState = nextToolPaneState, toolMenuState = HideToolMenu }, cmd )


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
            [ eraseLocalStorage
            , saveCurrentDocumentIfDirty model
            ]
        )


getTime : Cmd Msg
getTime =
    Time.now
        |> Task.perform SessionStatus


getTimeInOneSecond =
    Process.sleep 1000
        |> Task.andThen (\_ -> Time.now)
        |> Task.perform (\time -> SessionStatus time)


getBigUserInOneSecond =
    Process.sleep 1000
        |> Task.perform (\_ -> Time.now)


toUtcString : Time.Posix -> String
toUtcString time =
    (String.fromInt (Time.toHour Time.utc time) |> String.padLeft 2 '0')
        ++ ":"
        ++ (String.fromInt (Time.toMinute Time.utc time) |> String.padLeft 2 '0')
        ++ ":"
        ++ (String.fromInt (Time.toSecond Time.utc time) |> String.padLeft 2 '0')


saveCurrentDocumentIfDirty : Model -> Cmd Msg
saveCurrentDocumentIfDirty model =
    case model.currentDocumentDirty of
        False ->
            Cmd.none

        True ->
            let
                token =
                    User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                Cmd.map DocMsg <| Document.saveDocument token model.currentDocument


saveCurrentDocumentIfDirtyTask : Model -> Task Http.Error DocumentRecord
saveCurrentDocumentIfDirtyTask model =
    case model.currentDocumentDirty of
        False ->
            Task.succeed { document = SystemDocument.empty }

        True ->
            let
                token =
                    User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                Document.saveDocumentTask token model.currentDocument


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
                    , eraseLocalStorage
                    ]
                )


loadTexMacrosForDocument : Document -> Model -> Cmd Msg
loadTexMacrosForDocument document model =
    Cmd.map DocDictMsg <|
        DocumentDictionary.loadTexMacros (readToken model.maybeToken) document document.tags model.documentDictionary


selectDocumentWithId :
    Int
    -> Model
    -> ( Model, Cmd Msg ) -- SET CURRENT DOCUMENT
selectDocumentWithId id model =
    let
        documents_ =
            model.documentList

        documentList =
            DocumentList.documents documents_

        indexOfSelectedDocument =
            List.Extra.findIndex (\doc -> doc.id == id) documentList |> Maybe.withDefault 0

        selectedDocument =
            List.Extra.getAt indexOfSelectedDocument documentList |> Maybe.withDefault Document.basicDocument
    in
        ( { model
            | documentList = DocumentList.select (Just selectedDocument) documents_
            , currentDocument = selectedDocument
            , bigEditRecord = updateBigEditRecord model selectedDocument
            , counter = model.counter + 1
          }
        , Cmd.batch
            [ loadTexMacrosForDocument selectedDocument model
            , saveDocumentListToLocalStorage documents_
            ]
        )


pushDocument : Document -> Cmd Msg
pushDocument document =
    pushUrl <| "/" ++ String.fromInt document.id


headKey : List Key -> Key
headKey keyList =
    keyList
        |> List.filter (\item -> item /= Control && item /= Character "^")
        |> List.head
        |> Maybe.withDefault F20


getPublicDocuments : Model -> String -> ( Model, Cmd Msg )
getPublicDocuments model queryString =
    ( { model
        | appMode = Reading
        , toolPanelState = HideToolPanel
        , masterDocLoaded = False
        , currentDocumentDirty = False
        , documentListSource = SearchResults
      }
    , Cmd.batch
        [ Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse queryString))
        , saveCurrentDocumentIfDirty model
        ]
    )


getUserDocuments : Model -> String -> ( Model, Cmd Msg )
getUserDocuments model queryString =
    ( { model
        | toolPanelState = HideToolPanel
        , masterDocLoaded = False
        , currentDocumentDirty = False
        , toolMenuState = HideToolMenu
        , documentListSource = SearchResults
      }
    , Cmd.batch
        [ Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser (Query.parse queryString))
        , saveCurrentDocumentIfDirty model
        ]
    )


newDocumentForUserTask : User -> Model -> DocType -> Task Http.Error DocumentRecord
newDocumentForUserTask user model docType =
    let
        headDocument =
            DocumentList.getFirst model.documentList

        parentId =
            case headDocument.docType of
                Master ->
                    headDocument.id

                Standard ->
                    0

        selectedDocumentId =
            case DocumentList.selected model.documentList of
                Nothing ->
                    0

                Just selectedDoc ->
                    selectedDoc.id
    in
        Document.createDocumentTask (User.getTokenString user) (makeNewDocument user docType)


makeNewDocument : User -> DocType -> Document
makeNewDocument user docType =
    let
        newDocument_ =
            SystemDocument.newDocument
    in
        case docType of
            Standard ->
                { newDocument_
                    | authorId = User.userId user
                    , authorName = User.username user
                    , title = "NEW DOCUMENT"
                }

            Master ->
                { newDocument_
                    | authorId = User.userId user
                    , authorName = User.username user
                    , title = "NEW MASTER DOCUMENT"
                    , content = "Add new sections by using the text '== 1234' to add the document with ID 1234.  Add one document per line."
                    , docType = Master
                }


newChildDocument : Model -> Cmd DocMsg
newChildDocument model =
    case model.maybeCurrentUser of
        Nothing ->
            Cmd.none

        Just user ->
            newDocumentForUserWithParent user model


newDocumentForUserWithParent : User -> Model -> Cmd DocMsg
newDocumentForUserWithParent user model =
    let
        headDocument =
            DocumentList.getFirst model.documentList

        parentId =
            case headDocument.docType of
                Master ->
                    headDocument.id

                Standard ->
                    0

        parentTitle =
            case headDocument.docType of
                Master ->
                    headDocument.title

                Standard ->
                    ""

        selectedDocumentId =
            case DocumentList.selected model.documentList of
                Nothing ->
                    parentId

                Just selectedDoc ->
                    selectedDoc.id
    in
        Document.createDocument (User.getTokenString user) (makeNewDocumentWithParent parentId parentTitle selectedDocumentId user)


{-| NOTE: don't mess with the text ", placeUnder:"
-- It plays a role in placing the subdocument
-- I know, I know: very bad coding practie.
-}
makeNewDocumentWithParent : Int -> String -> Int -> User -> Document
makeNewDocumentWithParent parentId parentTitle selectedDocumentId user =
    let
        newDocument_ =
            Document.basicDocument
    in
        { newDocument_
            | title = "New Child Document"
            , authorId = User.userId user
            , authorName = User.username user
            , parentId = parentId
            , parentTitle = parentTitle
            , content = "New Child Document of " ++ parentTitle ++ ", placeUnder:" ++ String.fromInt selectedDocumentId
        }


displayCurrentMasterDocument model =
    case model.maybeMasterDocument of
        Nothing ->
            "Master: none"

        Just doc ->
            "Master: " ++ String.fromInt doc.id


getViewPort : Cmd Msg
getViewPort =
    Task.perform GetViewport Dom.getViewport


getViewPortOfRenderedText : String -> Cmd Msg
getViewPortOfRenderedText id =
    Task.attempt FindViewportOfRenderedText (Dom.getViewportOf id)



-- "_textView_" "re nderedText"
-- FindViewportOfRenderedText : Result x a -> msg


saveCurrentDocument : Model -> ( Model, Cmd Msg )
saveCurrentDocument model =
    case model.currentDocument.docType of
        Master ->
            saveCurrentMasterDocument model

        Standard ->
            let
                tokenString =
                    User.getTokenStringFromMaybeUser model.maybeCurrentUser

                currentDocument =
                    model.currentDocument

                tagStringSaved =
                    model.tagString

                newTags =
                    model.tagString
                        |> String.split ","
                        |> List.map String.trim
                        |> List.filter (\x -> x /= "")

                tagLengthString =
                    String.fromInt <| List.length newTags

                nextTags =
                    case newTags == [] of
                        True ->
                            currentDocument.tags

                        False ->
                            newTags

                nextDocumentTitle =
                    case model.documentTitle == "" of
                        True ->
                            currentDocument.title

                        False ->
                            model.documentTitle

                nextCurrentDocument =
                    { currentDocument | title = nextDocumentTitle, tags = nextTags }

                nextDocumentList =
                    DocumentList.updateDocument currentDocument model.documentList

                nextDocumentQueue =
                    Queue.replaceUsingPredicate (\doc -> doc.id == currentDocument.id) currentDocument model.recentDocumentQueue
            in
                ( { model
                    | currentDocumentDirty = False
                    , message = "(s)" ++ digest nextCurrentDocument.content
                    , currentDocument = nextCurrentDocument
                    , documentList = nextDocumentList
                    , recentDocumentQueue = nextDocumentQueue
                    , toolMenuState = HideToolMenu

                    -- , debugString = "TSL = " ++ tagLengthString ++ ", TS = " ++ tagStringSaved
                  }
                , Cmd.map DocMsg <| Document.saveDocument tokenString nextCurrentDocument
                )


digest str =
    str
        |> String.replace "\n" ""
        |> (\x -> String.left 3 x ++ "..." ++ String.right 3 x)


saveCurrentMasterDocument :
    Model
    -> ( Model, Cmd Msg ) -- ###
saveCurrentMasterDocument model =
    let
        tokenString =
            User.getTokenStringFromMaybeUser model.maybeCurrentUser
    in
        ( { model
            | currentDocumentDirty = False
            , message = "(m)" ++ digest model.currentDocument.content
            , documentList = DocumentList.updateDocument model.currentDocument model.documentList
            , recentDocumentQueue = Queue.replaceUsingPredicate (\doc -> doc.id == model.currentDocument.id) model.currentDocument model.recentDocumentQueue
          }
        , Cmd.batch
            [ getTime
            , Task.attempt
                (DocListMsg << ReceiveDocumentList)
                ((Document.saveDocumentTask tokenString model.currentDocument)
                    |> Task.andThen
                        (\_ -> DocumentList.loadMasterDocumentTask model.maybeCurrentUser model.currentDocument.id)
                )
            ]
        )


doIncrementVersion : Model -> ( Model, Cmd Msg )
doIncrementVersion model =
    let
        currentDocument =
            model.currentDocument

        nextCurrentDocument =
            { currentDocument | version = currentDocument.version + 1 }
    in
        ( { model | toolMenuState = HideToolMenu, currentDocument = nextCurrentDocument }
        , incrementVersion (EditorTools.newVersionUrl model.currentDocument)
        )


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


putCurrentDocumentAtTopOfQueue : Model -> ( Model, Cmd Msg )
putCurrentDocumentAtTopOfQueue model =
    ( { model | recentDocumentQueue = Queue.enqueueUnique model.currentDocument model.recentDocumentQueue }, Cmd.none )
