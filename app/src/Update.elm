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
import Update.DocumentList
import Update.Keyboard
import Update.Search as Search
import Update.User
import Update.Time
import UI.Update as UI
import Shorthand
import MiniLatexTools
import AppUtility
import BigEditRecord exposing (BigEditRecord)
import Browser.Dom as Dom
import Configuration
import Debounce exposing (Debounce)
import DocViewMsg exposing (DocViewMsg(..))
import Document exposing (DocMsg(..), DocType(..), Document, TextType(..), printReference, DocumentRecord)
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
        , PrintState(..)
        , initialModel
        )
import Query
import Queue exposing (Queue)
import Random
import Spinner
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
import Bozo.Model exposing (BozoModel, BozoMsg)
import Bozo.Update
import Update.HttpError as HttpError


port readImage : Value -> Cmd msg


port uploadImage : Value -> Cmd msg


port imageRead : (Value -> msg) -> Sub msg


port sendCredentials : Value -> Cmd msg


port onUrlChange : (String -> msg) -> Sub msg


processInfoForElm :
    Model
    -> InfoForElm
    -> ( Model, Cmd Msg ) -- SET CURRENT DOCUMENT
processInfoForElm model infoForElm_ =
    case infoForElm_ of
        DocumentDataFromOutside document ->
            let
                bigEditRecord =
                    Update.Document.updateBigEditRecord model document

                editRecord =
                    BigEditRecord.editRecord bigEditRecord
            in
                ( { model
                    | currentDocument = document
                    , bigEditRecord = bigEditRecord
                    , documentList = DocumentList.make editRecord.latexState document []
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


bozoMap : Model -> ( BozoModel, Cmd BozoMsg ) -> ( Model, Cmd Msg )
bozoMap model ( bozoModel, bozoMsg ) =
    ( { model | bozo = bozoModel }, Cmd.map Bozo bozoMsg )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        Bozo bozoMsg ->
            Bozo.Update.update bozoMsg model.bozo
                |> bozoMap model

        DocMsg docMsg ->
            Update.Document.update docMsg model

        DocListMsg docListMsg ->
            Update.DocumentList.update docListMsg model

        UserMsg userMsg ->
            Update.User.update userMsg model

        AcceptSearchQuery searchQueryString ->
            ( { model
                | searchQueryString = searchQueryString
                , focusedElement = FocusOnSearchBox
              }
            , Cmd.none
            )

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

        DocListViewMsg (LoadMasterDocument2 document) ->
            case document.docType of
                Master ->
                    ( { model
                        | masterDocLoaded = True
                        , documentListSource = SearchResults
                      }
                    , Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser document.id)
                    )

                Standard ->
                    ( model, Cmd.none )

        DocListViewMsg (SetCurrentDocument document) ->
            -- SET CURRENT DOCUMENT
            let
                latexState =
                    (BigEditRecord.editRecord model.bigEditRecord).latexState

                documentList =
                    case model.documentListSource of
                        SearchResults ->
                            DocumentList.select latexState (Just document) model.documentList

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
                    , Update.User.updateBigUserCmd newModel
                    , Update.Document.loadTexMacrosForDocument document newModel
                    , Update.Document.pushDocument document
                    ]
                )

        DocViewMsg (LoadMaster docId) ->
            ( { model | masterDocLoaded = True, documentListSource = SearchResults }, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser docId) )

        DocViewMsg (LoadMasterWithSelection childId docId) ->
            ( { model | selectedDocumentId = childId, masterDocLoaded = True, documentListSource = SearchResults }, Cmd.map DocListMsg (DocumentList.loadMasterDocumentAndSelect model.maybeCurrentUser docId) )

        DocViewMsg (LoadMasterWithCurrentSelection docId) ->
            ( { model | appMode = Reading, toolPanelState = HideToolPanel, masterDocLoaded = True, documentListSource = SearchResults }, Cmd.map DocListMsg (DocumentList.loadMasterDocumentWithCurrentSelection model.maybeCurrentUser docId) )

        SetSignupMode signupMode_ ->
            ( { model | signupMode = signupMode_ }, Cmd.none )

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
            -- ### DebounceMsg
            let
                ( debounce, cmd ) =
                    Debounce.update debounceConfig (Debounce.takeLast updateEditorContentCmd) msg_ model.debounce

                tokenString =
                    User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                ( { model
                    | debounce = debounce
                    , debounceCounter = model.debounceCounter + 1

                    -- , viewPortOfEditorText = Just viewport
                    --, message = "debounce: " ++ (String.fromInt model.debounceCounter)
                  }
                , Cmd.batch
                    [ cmd
                    , Outside.saveDocToLocalStorage model.currentDocument
                    , Random.generate NewSeed (Random.int 1 10000)
                    , getViewPortOfEditorText
                    ]
                )

        GetContent str ->
            let
                ( debounce, cmd ) =
                    Debounce.push debounceConfig str model.debounce
            in
                ( { model
                    | currentDocumentDirty = True
                    , debounce = debounce
                  }
                , cmd
                )

        UpdateEditorContent str ->
            -- ### UpdateEditorContent
            let
                currentDocument =
                    model.currentDocument

                nextCurrentDocument =
                    { currentDocument | content = Shorthand.transform str }

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

                    -- , counter = model.counter + 1
                  }
                  -- ###, resetEditorViewPort model
                , Cmd.none
                )

        Outside infoForElm_ ->
            processInfoForElm model infoForElm_

        ToggleToolPanelState ->
            UI.toggleToolPanelState model

        GetViewport viewport ->
            ( { model | viewport = viewport }, Cmd.none )

        FindViewportOfRenderedText result ->
            case result of
                Ok viewport ->
                    ( { model | viewPortOfRenderedText = Just viewport }, Cmd.none )

                Err _ ->
                    ( { model | debugString = "doc VP ERROR" }, Cmd.none )

        FindViewportOfEditorText result ->
            case result of
                Ok viewport ->
                    ( { model | viewPortOfEditorText = Just viewport }, Cmd.none )

                Err _ ->
                    ( { model | debugString = "doc VP ERROR" }, Cmd.none )

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
            -- ( model, getViewPortOfRenderedText "_textView_" )
            ( model, getViewPortOfEditorText )

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
        GetUsers ->
            Search.searchForUsers model

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

        GetBigUser ->
            case model.maybeCurrentUser of
                Nothing ->
                    ( model, Cmd.none )

                Just user ->
                    ( model, Cmd.map UserMsg <| User.getBigUserRecord (User.userId user) )

        UpdateBigUser ->
            ( model, Update.User.updateBigUserCmd model )

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

        Tick newTime ->
            ( model, Cmd.batch [ getNewTime ] )

        NewTime newTime ->
            ( { model | time = newTime }, Cmd.none )

        AdjustTimeZone newZone ->
            ( { model | zone = newZone }
            , Cmd.none
            )

        SpinnerMsg spinnerMsg ->
            let
                spinnerModel =
                    Spinner.update spinnerMsg model.spinner
            in
                ( { model | spinner = spinnerModel }
                , Cmd.none
                )


getNewTime : Cmd Msg
getNewTime =
    Task.perform NewTime Time.now



-- UPDATE END
-- HELPERS
-- DOCUPDATE


resetEditorViewPort : Model -> Cmd Msg
resetEditorViewPort model =
    -- ### resetEditorViewPort
    case model.viewPortOfEditorText of
        Nothing ->
            Cmd.none

        Just viewport ->
            let
                y =
                    viewport.scene.height
            in
                Task.attempt (\_ -> NoOp) (Dom.setViewportOf "_textArea_" 0 y)


imageAccessbilityToBool : ImageAccessibility -> Bool
imageAccessbilityToBool imageAccessibility =
    case imageAccessibility of
        PublicImage ->
            True

        PrivateImage ->
            False


{-| Handler: ListUsers
-}



-- DOCUMENT


getViewPort : Cmd Msg
getViewPort =
    Task.perform GetViewport Dom.getViewport


getViewPortOfRenderedText : String -> Cmd Msg
getViewPortOfRenderedText id =
    Task.attempt FindViewportOfRenderedText (Dom.getViewportOf id)


getViewPortOfEditorText : Cmd Msg
getViewPortOfEditorText =
    -- ### getViewPortOfEditorText
    Task.attempt FindViewportOfEditorText (Dom.getViewportOf "_textArea_")



-- BOTTOM
