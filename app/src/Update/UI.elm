module Update.UI exposing (..)

import Document
import DocumentList exposing (DocListMsg(..))
import Queue
import Update.Document
import User
import Model
    exposing
        ( Model
        , Msg(..)
        , AppMode(..)
        , ToolMenuState(..)
        , ToolPanelState(..)
        , PreferencesPanelState(..)
        , DeleteDocumentState(..)
        )
import Update.Search as Search
import FileUploadCredentials as Credentials


-- exposing (FileData, Image)


goToStart model =
    -- SET CURRENT DOCUMENTinfor
    let
        doc =
            Document.basicDocument
    in
        ( { model
            | currentDocument = { doc | title = "Welcome!" }
            , currentDocumentDirty = False
            , bigEditRecord = Update.Document.updateBigEditRecord model { doc | title = "Welcome!" }
            , appMode = Reading
            , toolMenuState = HideToolMenu
          }
        , Update.Document.saveCurrentDocumentIfDirty model
        )


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
                    , bigEditRecord = Update.Document.updateBigEditRecord model doc
                    , currentDocumentDirty = False
                  }
                , Update.Document.saveCurrentDocumentIfDirty model
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
                            Cmd.map FileMsg (Credentials.getImages "" (Search.imageQuery model ""))

                        False ->
                            Cmd.none

                DisplayAuthors ->
                    case model.userList == [] of
                        True ->
                            Search.searchForUsersCmdWithQuery "created=3000" model

                        False ->
                            Cmd.none

                Admin ->
                    case model.userList == [] of
                        True ->
                            Search.searchForUsersCmdWithQuery "created=7" model

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
