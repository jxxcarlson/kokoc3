port module Update.Document exposing (..)

import Model
    exposing
        ( Model
        , Msg(..)
        , AppMode(..)
        , MiniLatexRenderMode(..)
        , ToolPanelState(..)
        , ToolMenuState(..)
        , DocumentListSource(..)
        )
import Document
    exposing
        ( Document
        , DocumentRecord
        , TextType(..)
        , DocType(..)
        , DocMsg(..)
        )
import Json.Decode as Decode exposing (Decoder, Value)
import Random
import SystemDocument
import Http
import ImageManager
import DocumentList
    exposing
        ( DocListMsg(..)
        , DocumentList
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
import List.Extra
import Task exposing (Task)
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
                    ( { model | currentDocument = documentRecord.document, bigEditRecord = updateBigEditRecord model documentRecord.document }
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
                            [ Update.User.updateBigUserCmd nextModel
                            , Outside.saveRecentDocumentQueueToLocalStorage nextDocumentQueue
                            ]
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )

        NewDocumentCreated result ->
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
                            [ Update.User.updateBigUserCmd nextModel
                            , Outside.saveRecentDocumentQueueToLocalStorage nextDocumentQueue
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
            , Outside.saveDocumentListToLocalStorage documents_
            ]
        )



-- EDIT RECORD


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


downloadImages : Model -> ( Model, Cmd Msg )
downloadImages model =
    -- if List.length model.imageUrlList == 0 then
    --     ( { model | exportText = "" }, Download.string currentDocument.title "application/text" model.exportText )
    -- else
    ( model, Cmd.none )


putCurrentDocumentAtTopOfQueue : Model -> ( Model, Cmd Msg )
putCurrentDocumentAtTopOfQueue model =
    ( { model | recentDocumentQueue = Queue.enqueueUnique model.currentDocument model.recentDocumentQueue }, Cmd.none )


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
            [ Update.Time.getTime
            , Task.attempt
                (DocListMsg << ReceiveDocumentList)
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
