port module Update.Document exposing (..)

import Http
import Bytes exposing (Bytes)
import TarManager
import Random
import Task exposing (Task)
import Json.Decode as Decode exposing (Decoder, Value)
import List.Extra
import Maybe.Extra
import Dict
import Utility
import Configuration
import Model
    exposing
        ( Model
        , Msg(..)
        , AppMode(..)
        , MiniLatexRenderMode(..)
        , ToolPanelState(..)
        , ToolMenuState(..)
        , DocumentListSource(..)
        , DeleteDocumentState(..)
        , PrintState(..)
        )
import Document
    exposing
        ( Document
        , DocumentRecord
        , TextType(..)
        , DocType(..)
        , DocMsg(..)
        , ArchiveProcessor
        , AccessDict
        )
import SystemDocument
import ImageManager
import DocumentList
    exposing
        ( DocListMsg(..)
        , DocumentList
        , HandleDocumentList(..)
        , documentListLength
        , findDocuments
        )
import User
    exposing
        ( BigUser
        , Token
        , User
        , UserMsg(..)
        , readToken
        , stringFromMaybeToken
        )
import BigEditRecord exposing (BigEditRecord)
import MiniLatex.Export as Export
import LatexHelper
import MiniLatexTools
import Query
import Queue
import File.Download as Download
import DocumentDictionary exposing (DocDictMsg(..), DocumentDictionary)
import Update.Outside as Outside
import Update.Time
import Update.User
import View.EditorTools as EditorTools
import Update.HttpError as HttpError


port incrementVersion : String -> Cmd msg


port sendDocumentForPrinting : Value -> Cmd msg


port sendPdfFileName : Value -> Cmd msg


port pushUrl : String -> Cmd msg


myMap : ( Model, Cmd DocMsg ) -> ( Model, Cmd Msg )
myMap ( model, cmdDocMsg ) =
    ( model, Cmd.map DocMsg cmdDocMsg )


update : DocMsg -> Model -> ( Model, Cmd Msg )
update docMsg model =
    case docMsg of
        AcceptDocumenTitle str ->
            let
                currentDocument =
                    model.currentDocument

                nextDocument =
                    { currentDocument | title = str }
            in
                ( { model | documentTitle = str, currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        AcceptTexMacroId str ->
            let
                currentDocument =
                    model.currentDocument

                id =
                    case String.toInt str of
                        Nothing ->
                            0

                        Just id_ ->
                            id_

                nextDocument =
                    { currentDocument | texMacroDocumentId = id }
            in
                ( { model | currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

        AcceptCoverArtUrl str ->
            let
                currentDocument =
                    model.currentDocument

                nextDocument =
                    { currentDocument | coverArtUrl = str }
            in
                ( { model | currentDocument = nextDocument, currentDocumentDirty = True }, Cmd.none )

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

        ReceiveDocument result ->
            case result of
                Ok documentRecord ->
                    ( { model
                        | currentDocument = documentRecord.document
                        , bigEditRecord = updateBigEditRecord model documentRecord.document
                      }
                    , Cmd.batch
                        [ loadTexMacrosForDocument documentRecord.document model
                        ]
                    )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        AcknowledgeDocumentDeleted result ->
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
                            let
                                latexState =
                                    (BigEditRecord.editRecord model.bigEditRecord).latexState
                            in
                                DocumentList.select latexState maybeDocumentToSelect model.documentList

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
                            [ Update.User.updateBigUserCmd nextModel
                            , Outside.saveRecentDocumentQueueToLocalStorage nextDocumentQueue
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        NewDocumentCreated selectedDocId_ result ->
            -- SET CURRENT DOCUMENT
            case result of
                Ok documentRecord ->
                    let
                        nextDocument =
                            documentRecord.document

                        -- selectedDocId_ =
                        --     Document.selectedDocId nextDocument
                        cmd =
                            if selectedDocId_ > 0 then
                                Cmd.map DocMsg (Document.attachDocumentToMasterBelowCmd (User.getTokenStringFromMaybeUser model.maybeCurrentUser) selectedDocId_ nextDocument model.maybeMasterDocument)
                            else
                                Cmd.none

                        nextDocumentList_ =
                            DocumentList.nextDocumentList selectedDocId_ nextDocument model.documentList

                        nextDocumentQueue =
                            Queue.enqueueUnique nextDocument model.recentDocumentQueue

                        nextModel =
                            { model
                                | currentDocument = nextDocument
                                , bigEditRecord = updateBigEditRecord model nextDocument
                                , documentList = nextDocumentList_
                                , recentDocumentQueue = nextDocumentQueue
                            }
                    in
                        ( nextModel
                        , Cmd.batch
                            [ Update.User.updateBigUserCmd nextModel
                            , Outside.saveRecentDocumentQueueToLocalStorage nextDocumentQueue
                            , cmd
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        AcknowledgeUpdateOfDocument result ->
            case result of
                Ok documentRecord ->
                    ( model, Cmd.none )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        ReceiveWorkerReply result ->
            case result of
                Ok pdfFileName ->
                    ( { model | message = pdfFileName }, sendPdfFileName (Document.encodeString pdfFileName) )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        ReceiveLatexExportText result ->
            case result of
                Ok str ->
                    ( { model | message = "Export file: " ++ String.fromInt (String.length str) }, Cmd.map DocMsg <| Document.sendToWorker str )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        GetDocumentById id ->
            ( model, Cmd.map DocMsg <| Document.getDocumentById id (readToken model.maybeToken) )

        IncrementVersion ->
            doIncrementVersion model

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
                        , Cmd.batch [ saveCurrentDocumentIfDirty model, Update.Time.getTime ]
                        )

        NewDocument ->
            doNewStandardDocument model

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

        UpdateCurrentDocument ->
            saveCurrentDocument model

        NewMasterDocument ->
            doNewMasterDocument model

        NewChildDocument ->
            ( { model | toolMenuState = HideToolMenu, appMode = Writing }
            , Cmd.map DocMsg (newChildDocument model)
            )

        PrintDocument ->
            case model.currentDocument.textType of
                MiniLatex ->
                    printLatex model

                _ ->
                    ( { model | toolMenuState = HideToolMenu }
                    , sendDocumentForPrinting (Document.encodeString (Document.printReference model.currentDocument))
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

        GetImageData archiveProcessor ->
            case List.head model.imageUrlList of
                Nothing ->
                    ( model, Cmd.none )

                Just url ->
                    ( model, Cmd.map DocMsg (getImageDataFromList archiveProcessor model) )

        GotImageData archiveProcessor result ->
            case result of
                Ok data ->
                    case List.head model.imageUrlList of
                        Nothing ->
                            ( model, Cmd.none )

                        Just url ->
                            let
                                url1 =
                                    TarManager.shortFilenameFromUrl url

                                dataList =
                                    ( url1, data ) :: model.dataList

                                lengthDataList =
                                    List.length dataList |> String.fromInt

                                message =
                                    "Data items = "
                                        ++ (String.fromInt (Bytes.width data))
                                        ++ ", Bytes received = "
                                        ++ String.fromInt (Bytes.width data)

                                newModel =
                                    { model
                                        | debugString = message
                                        , maybeBytes = Just data
                                        , imageUrlList = List.drop 1 model.imageUrlList
                                        , dataList = dataList
                                    }
                            in
                                ( newModel, Cmd.map DocMsg (getImageDataFromList archiveProcessor newModel) )

                Err _ ->
                    ( { model | debugString = "Invalid data" }, Cmd.none )

        ExportLatex ->
            downloadLatexDocument model |> myMap

        PrintToPdf ->
            sendLatexDocumentTarArchive model |> myMap

        PrintPdfFile result ->
            case result of
                Ok url ->
                    ( { model | message = url, printReference = String.replace "\"" "" url }, Cmd.none )

                Err err ->
                    ( { model | printState = NothingToPrint, message = HttpError.handle err }, Cmd.none )

        ResetPrintState ->
            ( { model | printState = NothingToPrint }, TarManager.resetTarArchiveCmd model.printReference ) |> myMap

        AcknowledgeTarArchiveReset str ->
            ( { model | printReference = "" }, Cmd.none )


exportContentAndImageUrls : Document -> ( String, List String )
exportContentAndImageUrls document =
    -- !!! exportContentAndImageUrls, use Export.transform
    document.content |> Export.transform


joinContentAndImageUrls :
    ( String, List String )
    -> ( String, List String )
    -> ( String, List String )
joinContentAndImageUrls ( str1, urlList1 ) ( str2, urlList2 ) =
    ( str2 ++ "\n\n" ++ str1, urlList2 ++ urlList1 )


exportReducer : Document -> ( String, List String ) -> ( String, List String )
exportReducer document ( content, urlList ) =
    -- !!! exportReducer, uses Export.transform via exportContentAndImageUrls
    joinContentAndImageUrls (exportContentAndImageUrls document) ( content, urlList )


concatenateChildrenForExport : DocumentList -> ( String, List String )
concatenateChildrenForExport documentList =
    let
        listOfDocuments =
            List.drop 1 <| DocumentList.documents documentList
    in
        listOfDocuments
            |> List.foldl exportReducer ( "", [] )


filterIt : Int -> ( String, List String ) -> ( String, List String )
filterIt k ( str, strList ) =
    ( str, List.take k strList )


prepareArchive : Model -> ( String, String, List String )
prepareArchive model =
    let
        document =
            model.currentDocument

        documentTitle =
            (Utility.normalize document.title) ++ ".tex"

        prepend : String -> String -> String
        prepend prefix str =
            prefix ++ "\n\n" ++ str

        ( documentContent, imageUrlList_ ) =
            case document.docType of
                Standard ->
                    -- !!! export standard document
                    exportContentAndImageUrls document

                Master ->
                    -- !!! export master document
                    concatenateChildrenForExport model.documentList

        --|> filterIt 2
        imageUrlList =
            (List.map TarManager.s3AdjustUrl imageUrlList_
                |> Maybe.Extra.values
            )

        preparedDocumentContent =
            documentContent
                |> prepend model.texMacros
                |> prepend (MiniLatexTools.makeDownloadPreamble document)
                |> LatexHelper.makeDocument document.docType
    in
        ( documentTitle, preparedDocumentContent, imageUrlList )


downloadLatexDocument : Model -> ( Model, Cmd DocMsg )
downloadLatexDocument model =
    handleLatexArchive TarManager.downloadTarArchiveCmd model


sendLatexDocumentTarArchive : Model -> ( Model, Cmd DocMsg )
sendLatexDocumentTarArchive model =
    let
        filename =
            Utility.normalize model.currentDocument.title

        url =
            Configuration.backend ++ "/api/print/pdf/" ++ filename
    in
        handleLatexArchive (TarManager.sendTarArchiveCmd url) { model | printState = PdfReadyToPrint }


handleLatexArchive : ArchiveProcessor -> Model -> ( Model, Cmd DocMsg )
handleLatexArchive archiveProcessor model =
    let
        ( documentTitle, preparedDocumentContent, imageUrlList ) =
            prepareArchive model
    in
        if List.length imageUrlList == 0 then
            ( model, archiveProcessor [ ( documentTitle, preparedDocumentContent ) ] [] )
        else
            let
                nextModel =
                    { model
                        | exportText = preparedDocumentContent
                        , imageUrlList = imageUrlList
                        , debugString = "Images: " ++ (String.fromInt <| List.length imageUrlList)
                    }
            in
                ( nextModel, getImageDataFromList archiveProcessor nextModel )


getImageDataFromList : ArchiveProcessor -> Model -> Cmd DocMsg
getImageDataFromList archiveProcessor model =
    case List.head model.imageUrlList of
        Nothing ->
            let
                title =
                    model.currentDocument.title
                        |> String.replace " " "_"
                        |> (\x -> x ++ ".tex")

                content =
                    model.exportText
            in
                archiveProcessor [ ( title, content ) ] model.dataList

        Just url ->
            getImageData archiveProcessor url


getImageData : ArchiveProcessor -> String -> Cmd DocMsg
getImageData archiveProcessor url_ =
    Task.attempt (GotImageData archiveProcessor) (TarManager.getImageTask url_)


getUserDocuments : Model -> String -> ( Model, Cmd Msg )
getUserDocuments model queryString =
    ( { model
        | toolPanelState = HideToolPanel
        , masterDocLoaded = False
        , currentDocumentDirty = False
        , toolMenuState = Model.HideToolMenu
        , documentListSource = SearchResults
      }
    , Cmd.batch
        [ Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser (Query.parse queryString))
        , saveCurrentDocumentIfDirty model
        ]
    )


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
        latexState =
            (BigEditRecord.editRecord model.bigEditRecord).latexState

        newDocumentList =
            DocumentList.selectDocumentById id model.documentList
                |> DocumentList.setLatexState latexState

        lengthOfDocumentList =
            DocumentList.documentListLength model.documentList

        currentDocument =
            DocumentList.selected newDocumentList |> Maybe.withDefault Document.basicDocument

        ( masterDocLoaded, commandXX ) =
            case ( currentDocument.docType, lengthOfDocumentList ) of
                ( Master, 1 ) ->
                    ( True, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser currentDocument.id) )

                ( _, _ ) ->
                    ( False, Cmd.none )
    in
        ( { model
            | documentList = newDocumentList
            , currentDocument = currentDocument
            , bigEditRecord = updateBigEditRecord model currentDocument
            , counter = model.counter + 1

            --   , masterDocLoaded = masterDocLoaded
            , documentListSource = SearchResults
          }
        , Cmd.batch
            [ loadTexMacrosForDocument currentDocument model
            , Outside.saveDocumentListToLocalStorage newDocumentList
            , commandXX
            ]
        )



-- EDIT RECORD


updateBigEditRecordFull : Model -> Document -> BigEditRecord Msg
updateBigEditRecordFull model document =
    BigEditRecord.updateFromDocument (BigEditRecord.empty 0 0) document model.texMacros model.seed


updateBigEditRecord : Model -> Document -> BigEditRecord Msg
updateBigEditRecord model document =
    -- ### RenderFull, RenderIncremental, model.miniLatexRenderMode
    case model.miniLatexRenderMode of
        RenderFull ->
            BigEditRecord.updateFromDocument (BigEditRecord.empty 0 0) document model.texMacros model.seed

        RenderIncremental ->
            BigEditRecord.updateFromDocument model.bigEditRecord document model.texMacros model.seed



-- )


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


putCurrentDocumentAtTopOfQueue : Model -> ( Model, Cmd Msg )
putCurrentDocumentAtTopOfQueue model =
    ( { model | recentDocumentQueue = Queue.enqueueUnique model.currentDocument model.recentDocumentQueue }, Cmd.none )


printDocument : Model -> ( Model, Cmd Msg )
printDocument model =
    case model.currentDocument.textType of
        MiniLatex ->
            printLatex model

        _ ->
            ( model, sendDocumentForPrinting (Document.encodeString (Document.printReference model.currentDocument)) )


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
                (DocMsg << NewDocumentCreated 0)
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
                (DocMsg << (NewDocumentCreated 0))
                ((saveCurrentDocumentIfDirtyTask model)
                    |> Task.andThen
                        (\_ -> newDocumentForUserTask user model Master)
                )
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


type alias NewSubDocumentInfo =
    { parentId : Int
    , texMacroDocumentId : Int
    , parentTitle : String
    , textType : TextType
    , access : AccessDict
    }


newDocumentForUserWithParent : User -> Model -> Cmd DocMsg
newDocumentForUserWithParent user model =
    let
        masterDocument =
            DocumentList.getFirst model.documentList

        selectedDocumentId =
            case DocumentList.selected model.documentList of
                Nothing ->
                    masterDocument.parentId

                Just selectedDoc ->
                    selectedDoc.id

        newSubDocumentInfo =
            { parentId = masterDocument.id
            , texMacroDocumentId = masterDocument.texMacroDocumentId
            , parentTitle = masterDocument.title
            , textType = masterDocument.textType
            , access = masterDocument.access
            }
    in
        Document.createDocument (User.getTokenString user) selectedDocumentId (makeNewDocumentWithParent newSubDocumentInfo user)


{-| NOTE: don't mess with the text ", placeUnder:"
-- It plays a role in placing the subdocument
-- I know, I know: very bad coding practie.
-}
makeNewDocumentWithParent : NewSubDocumentInfo -> User -> Document
makeNewDocumentWithParent newSubDocumentInfo user =
    let
        newDocument_ =
            Document.basicDocument
    in
        { newDocument_
            | title = "New Subdocument"
            , authorId = User.userId user
            , authorName = User.username user
            , parentId = newSubDocumentInfo.parentId
            , parentTitle = newSubDocumentInfo.parentTitle
            , texMacroDocumentId = newSubDocumentInfo.texMacroDocumentId
            , textType = newSubDocumentInfo.textType
            , docType = Standard
            , access = newSubDocumentInfo.access
            , content = "New Subdocument of " ++ newSubDocumentInfo.parentTitle
        }


displayCurrentMasterDocument model =
    case model.maybeMasterDocument of
        Nothing ->
            "Master: none"

        Just doc ->
            "Master: " ++ String.fromInt doc.id


makeNewChildDocument : Model -> ( Model, Cmd Msg )
makeNewChildDocument model =
    ( model, Cmd.map DocMsg (newChildDocument model) )


doFullRender : Model -> ( Model, Cmd Msg )
doFullRender model =
    ( { model | bigEditRecord = updateBigEditRecordFull model model.currentDocument, toolMenuState = HideToolMenu }
    , Random.generate NewSeed (Random.int 1 10000)
    )


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


saveCurrentMasterDocument :
    Model
    -> ( Model, Cmd Msg )
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
            [ Update.Time.getTime
            , Task.attempt
                (DocListMsg << (ReceiveDocumentList DLSetMasterLoaded))
                ((Document.saveDocumentTask tokenString model.currentDocument)
                    |> Task.andThen
                        (\_ -> DocumentList.loadMasterDocumentTask model.maybeCurrentUser model.currentDocument.id)
                )
            ]
        )


pushDocument : Document -> Cmd Msg
pushDocument document =
    pushUrl <| "/" ++ String.fromInt document.id



-- HELPERS


digest str =
    str
        |> String.replace "\n" ""
        |> (\x -> String.left 3 x ++ "..." ++ String.right 3 x)
