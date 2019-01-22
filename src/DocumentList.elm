module DocumentList
    exposing
        ( DocListMsg(..)
        , DocumentList
        , IntList
        , HandleDocumentList(..)
        , addAndSelect
        , deleteItemInDocumentListAt
        , documentListEncoder
        , documentListFromDocumentQueue
        , documentListLength
        , documentQueueToDocumentList
        , documents
        , empty
        , emptyIntList
        , encodeDocumentQueue
        , findDocuments
        , getFirst
        , intListDecoder
        , intListForDocumentQueueDecoder
        , intListFromDocumentList
        , latexState
        , length
        , loadMasterDocument
        , loadMasterDocumentTask
        , loadMasterDocumentAndSelect
        , loadMasterDocumentWithCurrentSelection
        , make
        , nextDocumentList
        , prepend
        , propagateSettingsToChildren
        , renumberDocuments
        , retrievDocumentsFromIntList
        , retrievRecentDocumentQueueFromIntList
        , retrievRecentDocumentQueueFromIntListAtSignIn
        , save
        , select
        , selectDocumentById
        , selectFirst
        , selected
        , selectedData
        , setDocuments
        , setLatexState
        , updateDocument
        )

import Configuration
import Document exposing (Document, documentDecoder, DocType(..), DocMsg, DocumentRecord)
import Http
import Json.Decode as Decode exposing (Decoder, at, decodeString, int, list, string)
import Json.Decode.Pipeline as JPipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode
import List.Extra
import Queue exposing (Queue)
import User exposing (User)
import Utility
import Task exposing (Task)
import MiniLatex.LatexState as LatexState exposing (LatexState)


type DocumentList
    = DocumentList LatexState (List Document) (Maybe Document)


type alias DocumentListRecord =
    { documents : List Document
    , selected : Maybe Document
    }


type alias IntList =
    { ints : List Int
    , selected : Int
    }



{- MSG -}


type DocListMsg
    = ReceiveDocumentList HandleDocumentList (Result Http.Error DocumentList)
    | ReceiveDocumentListWithSelectedId (Result Http.Error DocumentList)
    | RestoreDocumentList (Result Http.Error DocumentList)
    | RestoreRecentDocumentQueue (Result Http.Error (Queue Document))
    | RestoreRecentDocumentQueueAtSignIn (Result Http.Error (Queue Document))
    | ReceiveDocumentListAndPreserveCurrentSelection (Result Http.Error DocumentList)
    | GetPublicDocuments String
    | GetUserDocuments String


type HandleDocumentList
    = DLDoNothing
    | DLSetMasterLoaded



{- Constructors -}


fromDocumentAndList : List Document -> Maybe Document -> DocumentList
fromDocumentAndList listOfDocuments maybeDocument =
    DocumentList LatexState.emptyLatexState listOfDocuments maybeDocument


empty : DocumentList
empty =
    DocumentList LatexState.emptyLatexState [] Nothing


make : LatexState -> Document -> List Document -> DocumentList
make latexState_ document listOfDocuments =
    DocumentList latexState_ (document :: listOfDocuments) (Just document)



{- Accessors -}


documents : DocumentList -> List Document
documents (DocumentList latexState_ documentList maybeDocument) =
    documentList


length : DocumentList -> Int
length (DocumentList latexState_ documentList maybeDocument) =
    List.length documentList


latexState : DocumentList -> LatexState
latexState (DocumentList latexState_ documentList maybeDocument) =
    latexState_


selectedData : DocumentList -> ( LatexState, Maybe Document )
selectedData (DocumentList latexState_ listOfDocuments maybeDocument) =
    ( latexState_, maybeDocument )


selected : DocumentList -> Maybe Document
selected (DocumentList latexState_ listOfDocuments maybeDocument) =
    maybeDocument



{- Properties -}


member : Document -> DocumentList -> Bool
member document documentList =
    List.member document (documents documentList)


selectedId : DocumentList -> Int
selectedId documentList =
    case selected documentList of
        Nothing ->
            0

        Just document ->
            document.id


getFirst : DocumentList -> Document
getFirst documentList =
    List.head (documents documentList) |> Maybe.withDefault notFoundDocument


documentListLength : DocumentList -> Int
documentListLength (DocumentList latexState_ documentList maybeDocument) =
    List.length documentList



{- Converters -}


intListFromDocumentList : DocumentList -> IntList
intListFromDocumentList documentList =
    { ints = documents documentList |> List.map .id
    , selected = selectedId documentList
    }


emptyIntList : IntList
emptyIntList =
    { ints = [ 0 ]
    , selected = 0
    }



{- Modifiers -}


prepend : Document -> DocumentList -> DocumentList
prepend document (DocumentList latexState_ documentList maybeDocument) =
    DocumentList latexState_ (document :: documentList) (Just document)


setDocuments : List Document -> DocumentList -> DocumentList
setDocuments listOfDocuments (DocumentList latexState_ documentList maybeDocument) =
    DocumentList latexState_ listOfDocuments maybeDocument


selectDocumentById : Int -> DocumentList -> DocumentList
selectDocumentById id (DocumentList latexState_ documentList maybeDocument) =
    case List.Extra.find (\doc -> doc.id == id) documentList of
        Nothing ->
            (DocumentList latexState_ documentList Nothing)

        Just document ->
            (DocumentList latexState_ documentList (Just document))


setLatexState : LatexState -> DocumentList -> DocumentList
setLatexState newLatexState (DocumentList _ listOfDocuments maybeDocument) =
    DocumentList newLatexState listOfDocuments maybeDocument


{-| -}
select : LatexState -> Maybe Document -> DocumentList -> DocumentList
select latexState_ maybeSelectedDocument (DocumentList latexState__ documentList maybeDocument) =
    DocumentList latexState_ documentList maybeSelectedDocument


addAndSelect : Document -> DocumentList -> DocumentList
addAndSelect document documentList =
    case member document documentList of
        False ->
            prependAndSelect document documentList

        True ->
            documentList


prependAndSelect : Document -> DocumentList -> DocumentList
prependAndSelect document (DocumentList latexState_ documentList maybeDocument) =
    DocumentList latexState_ (document :: documentList) (Just document)


selectFirst : LatexState -> DocumentList -> DocumentList
selectFirst latexState_ documentList =
    let
        maybeFirstDocument =
            List.head (documents documentList)
    in
        select latexState_ maybeFirstDocument documentList


{-| Replace the element in `documentList` whose id is that of
of `document` by `document`.
-}
updateDocument : Document -> DocumentList -> DocumentList
updateDocument document documentList =
    let
        docs_ =
            documents documentList

        newdocs_ =
            Utility.replaceIf (\doc -> doc.id == document.id) document docs_
    in
        setDocuments newdocs_ documentList


nextDocumentList : Int -> Document -> DocumentList -> DocumentList
nextDocumentList targetDocId document documentList =
    case targetDocId == 0 of
        True ->
            prepend document documentList

        False ->
            let
                maybeTargetIndex =
                    List.Extra.findIndex (\doc -> doc.id == targetDocId) (documents documentList)
            in
                case maybeTargetIndex of
                    Nothing ->
                        prepend document documentList

                    Just k ->
                        setDocuments (Utility.listInsertAt (k + 1) document (documents documentList)) documentList
                            |> select (latexState documentList) (Just document)


deleteItemInDocumentListAt : Int -> DocumentList -> DocumentList
deleteItemInDocumentListAt targetDocId documentList =
    case targetDocId == 0 of
        True ->
            documentList

        False ->
            let
                maybeTargetIndex =
                    List.Extra.findIndex (\doc -> doc.id == targetDocId) (documents documentList)
            in
                case maybeTargetIndex of
                    Nothing ->
                        documentList

                    Just k ->
                        setDocuments (Utility.listDeleteAt k (documents documentList)) documentList



{- Helpers -}


notFoundDocument : Document
notFoundDocument =
    let
        doc =
            Document.basicDocument
    in
        { doc | title = "Not found", content = "\\strong{Sorry, nothing found}" }



{- CMDS -}


findDocuments : Maybe User -> String -> Cmd DocListMsg
findDocuments maybeUser queryString =
    let
        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2" ]
                    )

                Just user ->
                    ( "/api/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson (ReceiveDocumentList DLDoNothing) documentListDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


retrievDocumentsFromIntList : Maybe User -> IntList -> Cmd DocListMsg
retrievDocumentsFromIntList maybeUser intList =
    let
        ids =
            intList.ints |> List.reverse |> List.map String.fromInt |> String.join ","

        queryString =
            "idlist=" ++ ids

        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2" ]
                    )

                Just user ->
                    ( "/api/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson RestoreDocumentList documentListDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


retrievRecentDocumentQueueFromIntList : Maybe User -> List Int -> Cmd DocListMsg
retrievRecentDocumentQueueFromIntList maybeUser intList =
    let
        ids =
            intList |> List.reverse |> List.map String.fromInt |> String.join ","

        queryString =
            "idlist=" ++ ids

        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2" ]
                    )

                Just user ->
                    ( "/api/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson RestoreRecentDocumentQueue documentQueueDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


retrievRecentDocumentQueueFromIntListAtSignIn : Maybe User -> List Int -> Cmd DocListMsg
retrievRecentDocumentQueueFromIntListAtSignIn maybeUser intList =
    let
        ids =
            intList |> List.reverse |> List.map String.fromInt |> String.join ","

        queryString =
            "idlist=" ++ ids

        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2" ]
                    )

                Just user ->
                    ( "/api/documents?" ++ queryString
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson RestoreRecentDocumentQueueAtSignIn documentQueueDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


loadMasterDocument : Maybe User -> Int -> Cmd DocListMsg
loadMasterDocument maybeUser docId =
    let
        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?master=" ++ String.fromInt docId, [ Http.header "APIVersion" "V2" ] )

                Just user ->
                    ( "/api/documents?master=" ++ String.fromInt docId
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson (ReceiveDocumentList DLSetMasterLoaded) documentListDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


loadMasterDocumentTask : Maybe User -> Int -> Task Http.Error DocumentList
loadMasterDocumentTask maybeUser docId =
    let
        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?master=" ++ String.fromInt docId, [ Http.header "APIVersion" "V2" ] )

                Just user ->
                    ( "/api/documents?master=" ++ String.fromInt docId
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.task
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , resolver = Http.stringResolver (responder documentListDecoder)
            , timeout = Just Configuration.timeout
            }


responder : Decoder a -> Http.Response String -> Result Http.Error a
responder decoder response =
    case response of
        Http.BadUrl_ url ->
            Err (Http.BadUrl url)

        Http.Timeout_ ->
            Err Http.Timeout

        Http.NetworkError_ ->
            Err Http.NetworkError

        Http.BadStatus_ metadata body ->
            Err (Http.BadStatus metadata.statusCode)

        Http.GoodStatus_ metadata body ->
            case Decode.decodeString decoder body of
                Ok value ->
                    Ok value

                Err err ->
                    Err (Http.BadBody (Decode.errorToString err))


loadMasterDocumentAndSelect : Maybe User -> Int -> Cmd DocListMsg
loadMasterDocumentAndSelect maybeUser docId =
    let
        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?master=" ++ String.fromInt docId, [ Http.header "APIVersion" "V2" ] )

                Just user ->
                    ( "/api/documents?master=" ++ String.fromInt docId
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson ReceiveDocumentListWithSelectedId documentListDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


loadMasterDocumentWithCurrentSelection : Maybe User -> Int -> Cmd DocListMsg
loadMasterDocumentWithCurrentSelection maybeUser docId =
    let
        ( route, headers ) =
            case maybeUser of
                Nothing ->
                    ( "/api/public/documents?master=" ++ String.fromInt docId, [ Http.header "APIVersion" "V2" ] )

                Just user ->
                    ( "/api/documents?master=" ++ String.fromInt docId
                    , [ Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ User.getTokenString user) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson ReceiveDocumentListAndPreserveCurrentSelection documentListDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


renumberDocuments : DocumentList -> DocumentList
renumberDocuments (DocumentList latexState_ documentList maybeDocument) =
    let
        newDocumentList =
            documentList
                |> List.indexedMap (\k doc -> { doc | sectionNumber = k })
    in
        (DocumentList latexState_ newDocumentList maybeDocument)



{- DECODERS -}


listDocumentDecoder : Decoder (List Document)
listDocumentDecoder =
    Decode.field "documents" (Decode.list documentDecoder)


documentListRecordDecoder : Decoder DocumentListRecord
documentListRecordDecoder =
    Decode.map2 DocumentListRecord listDocumentDecoder (Decode.succeed Nothing)


documentListDecoder : Decoder DocumentList
documentListDecoder =
    Decode.map documentListFromRecord documentListRecordDecoder


documentListFromRecord : DocumentListRecord -> DocumentList
documentListFromRecord r =
    DocumentList LatexState.emptyLatexState r.documents r.selected


documentQueueDecoder : Decoder (Queue Document)
documentQueueDecoder =
    Decode.map (\list -> Queue.fromList list Configuration.documentQueueCapacity) listDocumentDecoder


intListDecoder : Decoder IntList
intListDecoder =
    Decode.map2 IntList
        (Decode.field "documentIds" (list int))
        (Decode.field "selected" int)


intListForDocumentQueueDecoder : Decoder (List Int)
intListForDocumentQueueDecoder =
    list int


{-| Propgate certain seetings from the head document to the
remainning documens, which are assumed to be children of the
head document/
-}
propagateSettingsToChildren : DocumentList -> DocumentList
propagateSettingsToChildren (DocumentList latexState_ listOfDocuments maybeDocument) =
    let
        _ =
            Debug.log "Enter PSTC, n" (List.length listOfDocuments)

        maybeHeadDocument =
            List.head listOfDocuments
    in
        case maybeHeadDocument of
            Nothing ->
                DocumentList latexState_ listOfDocuments maybeDocument

            Just headDocument ->
                case headDocument.docType of
                    Standard ->
                        DocumentList latexState_ listOfDocuments maybeDocument

                    Master ->
                        DocumentList latexState_ (propagateSettingsToListOfDocuments headDocument (List.drop 1 listOfDocuments)) maybeDocument


save : String -> Int -> DocumentList -> Cmd DocMsg
save token offset (DocumentList latexState_ listOfDocuments maybeDocument) =
    Cmd.batch (List.map (Document.saveDocument token) (List.drop offset listOfDocuments))


saveTask : String -> Int -> DocumentList -> Task Http.Error (List DocumentRecord)
saveTask token offset (DocumentList latexState_ listOfDocuments maybeDocument) =
    Task.sequence (List.map (Document.saveDocumentTask token) (List.drop offset listOfDocuments))


propagateSettingsToListOfDocuments : Document -> List Document -> List Document
propagateSettingsToListOfDocuments document listOfDocuments =
    List.map (propagateSettingsFromDocument document) listOfDocuments


propagateSettingsFromDocument : Document -> Document -> Document
propagateSettingsFromDocument fromDoc toDoc =
    let
        _ =
            Debug.log "PSFD: " ( fromDoc.id, toDoc.id )
    in
        { toDoc
            | texMacroDocumentId = fromDoc.texMacroDocumentId
            , access = fromDoc.access
            , public = fromDoc.public
        }



{- ENCODERS -}


documentListEncoder : DocumentList -> Encode.Value
documentListEncoder documentList =
    let
        intList =
            intListFromDocumentList documentList
    in
        Encode.object
            [ ( "selected", Encode.int intList.selected )
            , ( "documentIds", Encode.list Encode.int intList.ints )
            ]



{- REQUESTS -}
{- Queue Interop -}


documentQueueToDocumentList : Document -> Queue Document -> DocumentList
documentQueueToDocumentList document documentQueue =
    DocumentList LatexState.emptyLatexState (Queue.list documentQueue) (Just document)


documentListFromDocumentQueue : Queue Document -> DocumentList
documentListFromDocumentQueue documentQueue =
    DocumentList LatexState.emptyLatexState (Queue.list documentQueue) Nothing


encodeDocumentQueue : Queue Document -> Encode.Value
encodeDocumentQueue documentQueue =
    documentQueue
        |> Queue.list
        |> List.map .id
        |> encodeIntList


encodeIntList : List Int -> Encode.Value
encodeIntList intList_ =
    Encode.list Encode.int intList_
