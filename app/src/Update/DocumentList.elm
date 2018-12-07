module Update.DocumentList exposing (update)

import Document exposing (DocType(..))
import DocumentList exposing (DocListMsg(..))
import Model exposing (Model, Msg(..), DocumentListSource(..), ToolPanelState(..), AppMode(..))
import Update.HttpError as HttpError
import Update.Document
import Update.Outside as Outside
import List.Extra
import Query


update : DocListMsg -> Model -> ( Model, Cmd Msg )
update docListMsg model =
    case docListMsg of
        ReceiveDocumentList result ->
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
                    in
                        ( { model
                            | documentList = DocumentList.select (Just selectedDocument) documentList
                            , currentDocument = selectedDocument
                            , bigEditRecord = Update.Document.updateBigEditRecord model selectedDocument
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
