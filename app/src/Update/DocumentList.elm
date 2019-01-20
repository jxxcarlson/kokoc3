module Update.DocumentList exposing (update)

import Document exposing (DocType(..))
import DocumentList exposing (DocListMsg(..), HandleDocumentList(..))
import Model exposing (Model, Msg(..), DocumentListSource(..), ToolPanelState(..), AppMode(..))
import Update.HttpError as HttpError
import Update.Document
import Update.Outside as Outside
import List.Extra
import Query
import BigEditRecord exposing (BigEditRecord)


update : DocListMsg -> Model -> ( Model, Cmd Msg )
update docListMsg model =
    case docListMsg of
        ReceiveDocumentList handleDocumentList result ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentList ->
                    let
                        masterDocLoaded =
                            case handleDocumentList of
                                DLDoNothing ->
                                    model.masterDocLoaded

                                DLSetMasterLoaded ->
                                    True

                        currentDocument =
                            DocumentList.getFirst documentList

                        bigEditRecord =
                            Update.Document.updateBigEditRecord model currentDocument

                        latexState_ =
                            BigEditRecord.latexState bigEditRecord

                        nextDocumentList =
                            if currentDocument.docType == Master then
                                DocumentList.renumberDocuments documentList
                            else
                                documentList

                        ( nextMaybeMasterDocument, loadTexMacrosForMasterDocument ) =
                            case currentDocument.docType of
                                Standard ->
                                    ( Nothing, Cmd.none )

                                Master ->
                                    ( Just currentDocument, Update.Document.loadTexMacrosForDocument currentDocument model )
                    in
                        ( { model
                            | documentList = DocumentList.selectFirst latexState_ nextDocumentList
                            , currentDocument = currentDocument
                            , masterDocLoaded = masterDocLoaded
                            , bigEditRecord = bigEditRecord
                            , maybeMasterDocument = nextMaybeMasterDocument
                          }
                        , Cmd.batch
                            [ Update.Document.loadTexMacrosForDocument currentDocument model
                            , loadTexMacrosForMasterDocument
                            , Outside.saveDocumentListToLocalStorage nextDocumentList
                            , Update.Document.pushDocument currentDocument
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        ReceiveDocumentListAndPreserveCurrentSelection result ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentList ->
                    let
                        currentDocument =
                            DocumentList.getFirst documentList

                        bigEditRecord =
                            Update.Document.updateBigEditRecord model currentDocument

                        latexState =
                            BigEditRecord.latexState bigEditRecord

                        nextDocumentList =
                            if currentDocument.docType == Master then
                                DocumentList.renumberDocuments documentList
                            else
                                documentList

                        nextMaybeMasterDocument =
                            case currentDocument.docType of
                                Standard ->
                                    Nothing

                                Master ->
                                    Just currentDocument

                        nextDocumentList_ =
                            DocumentList.select latexState (Just model.currentDocument) nextDocumentList
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

        ReceiveDocumentListWithSelectedId result ->
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

                        -- ###
                        -- masterDocLoaded =
                        --     case selectedDocument.docType of
                        --         Master ->
                        --             True
                        --
                        --         Standard ->
                        --             False
                        bigEditRecord =
                            Update.Document.updateBigEditRecord model selectedDocument

                        latexState =
                            BigEditRecord.latexState bigEditRecord
                    in
                        ( { model
                            | documentList = DocumentList.select latexState (Just selectedDocument) documentList
                            , currentDocument = selectedDocument
                            , bigEditRecord = bigEditRecord

                            -- ###, masterDocLoaded = masterDocLoaded
                          }
                        , Cmd.batch
                            [ Update.Document.loadTexMacrosForDocument selectedDocument model
                            , Outside.saveDocumentListToLocalStorage documentList
                            , Update.Document.pushDocument selectedDocument
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        RestoreDocumentList result ->
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

                        bigEditRecord =
                            Update.Document.updateBigEditRecord model currentDocument

                        latexState =
                            BigEditRecord.latexState bigEditRecord

                        nextMaybeMasterDocument =
                            case currentDocument.docType of
                                Standard ->
                                    Nothing

                                Master ->
                                    Just currentDocument
                    in
                        ( { model
                            | documentList = DocumentList.select latexState maybeCurrentDocument documentList
                            , currentDocument = currentDocument
                            , bigEditRecord = bigEditRecord
                            , maybeMasterDocument = nextMaybeMasterDocument
                          }
                        , Cmd.batch
                            [ Update.Document.loadTexMacrosForDocument currentDocument model
                            , Outside.saveDocumentListToLocalStorage documentList
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        RestoreRecentDocumentQueue result ->
            case result of
                Ok restoredDocumentQueue ->
                    ( { model | recentDocumentQueue = restoredDocumentQueue }, Cmd.none )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        RestoreRecentDocumentQueueAtSignIn result ->
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

        GetUserDocuments query ->
            case model.maybeCurrentUser of
                Nothing ->
                    ( model, Cmd.none )

                Just user ->
                    ( { model | toolPanelState = HideToolPanel }, Cmd.map DocListMsg (DocumentList.findDocuments (Just user) (Query.parse query)) )
