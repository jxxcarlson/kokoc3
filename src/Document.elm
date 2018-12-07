module Document
    exposing
        ( Child
        , DocMsg(..)
        , DocType(..)
        , Document
        , DocumentRecord
        , TextType(..)
        , accessDictToString
        , attachDocumentToMasterBelowCmd
        , basicDocument
        , createDocument
        , createDocumentTask
        , saveDocumentTask
        , decodeDocumentFromOutside
        , deleteDocument
        , documentDecoder
        , encodeDocumentForOutside
        , encodeString
        , getDocumentById
        , getDocumentByIdRequest
        , getExportLatex
        , newDocument
        , printUrl
        , saveDocument
        , selectedDocId
        , sendToWorker
        , stringToAccessDict
        , wordCount
        )

import Configuration
import Dict exposing (Dict)
import Http
import Json.Decode as Decode exposing (Decoder, at, decodeString, int, list, string)
import Json.Decode.Pipeline as JPipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode
import List.Extra
import Time exposing (Posix)
import Utility
import Task exposing (Task)


-- TYPES


type alias DocumentRecord =
    { document : Document }


type alias Document =
    { id : Int
    , identifier : String
    , authorId : Int
    , authorIdentifier : String
    , authorName : String
    , title : String
    , content : String
    , level : Int
    , public : Bool
    , access : AccessDict
    , tags : List String
    , children : List Child
    , parentId : Int
    , parentTitle : String
    , textType : TextType
    , docType : DocType
    , archive : String
    , version : Int
    , lastViewed : Posix
    , created : Posix
    , modified : Posix
    , randomInt : Int
    }


type alias Child =
    { title : String
    , docId : Int
    , docIdentifier : String
    , level : Int
    , comment : String
    }


type alias AccessDict =
    Dict String AccessType


type AccessType
    = Readable
    | Writeable
    | ReadableAndWriteable
    | NotShared


{-| A master document has list of children
-}
type DocType
    = Standard
    | Master


type TextType
    = MiniLatex
    | Markdown
    | Asciidoc
    | AsciidocLatex
    | PlainText
    | ElmMarkup



-- MSG


type DocMsg
    = AcceptDocumenTitle String
    | AcceptDocumentTagString String
    | ReceiveDocument (Result Http.Error DocumentRecord)
    | NewDocumentCreated (Result Http.Error DocumentRecord)
    | AcknowledgeUpdateOfDocument (Result Http.Error DocumentRecord)
    | AcknowledgeDocumentDeleted (Result Http.Error String)
    | ReceiveWorkerReply (Result Http.Error String)
    | ReceiveLatexExportText (Result Http.Error String)
    | GetDocumentById Int
    | IncrementVersion
    | SaveCurrentDocument Posix
    | NewDocument
    | DeleteCurrentDocument
    | CancelDeleteCurrentDocument



-- CONSTRUCTORS


basicDocument : Document
basicDocument =
    Document
        0
        "basicDocument123"
        0
        "author123"
        "— kNode team"
        "Welcome to kNode Reader"
        Configuration.basicDocumentText
        1
        True
        Dict.empty
        []
        []
        0
        "Parent"
        MiniLatex
        Standard
        "default"
        0
        (Time.millisToPosix 0)
        (Time.millisToPosix 0)
        (Time.millisToPosix 0)
        0


newDocument : Document
newDocument =
    { basicDocument | content = Configuration.newMiniLatexDocumentText, title = "New Document" }



-- DECODERS


replyDecoder : Decoder String
replyDecoder =
    Decode.field "reply" Decode.string


documentRecordDecoder : Decoder DocumentRecord
documentRecordDecoder =
    Decode.succeed DocumentRecord
        |> JPipeline.required "document" documentDecoder


documentDecoder : Decoder Document
documentDecoder =
    Decode.succeed Document
        |> JPipeline.required "id" Decode.int
        |> JPipeline.required "identifier" Decode.string
        |> JPipeline.required "authorId" Decode.int
        |> JPipeline.required "authorIdentifier" Decode.string
        |> JPipeline.required "authorName" Decode.string
        |> JPipeline.required "title" Decode.string
        |> JPipeline.required "content" Decode.string
        |> JPipeline.required "level" Decode.int
        |> JPipeline.required "public" Decode.bool
        |> JPipeline.required "access" (Decode.dict (Decode.map stringToAccessType Decode.string))
        |> JPipeline.required "tags" (Decode.list Decode.string)
        |> JPipeline.required "children" (Decode.list decodeChild)
        |> JPipeline.required "parentId" Decode.int
        |> JPipeline.required "parentTitle" Decode.string
        |> JPipeline.required "textType" (Decode.string |> Decode.andThen decodeTextType)
        |> JPipeline.required "docType" (Decode.string |> Decode.andThen decodeDocType)
        |> JPipeline.required "archive" Decode.string
        |> JPipeline.required "version" Decode.int
        |> JPipeline.required "lastViewed" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "created" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "lastModified" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.hardcoded 0


stringDecoder : Decoder String
stringDecoder =
    Decode.string


dataStringDecoder : Decoder String
dataStringDecoder =
    Decode.field "data" Decode.string


decodeDocType : String -> Decoder DocType
decodeDocType docTypeString =
    case docTypeString of
        "standard" ->
            Decode.succeed Standard

        "master" ->
            Decode.succeed Master

        _ ->
            Decode.fail <| "I don't know a docType named " ++ docTypeString


decodeTextType : String -> Decoder TextType
decodeTextType textTypeString =
    case textTypeString of
        "adoc" ->
            Decode.succeed Asciidoc

        "adoc_latex" ->
            Decode.succeed AsciidocLatex

        "plain" ->
            Decode.succeed Asciidoc

        "latex" ->
            Decode.succeed MiniLatex

        "markdown" ->
            Decode.succeed Markdown

        "elm-markup" ->
            Decode.succeed ElmMarkup

        _ ->
            Decode.fail <| "I don't know a textType named " ++ textTypeString


decodeChild : Decoder Child
decodeChild =
    Decode.succeed Child
        |> JPipeline.required "title" Decode.string
        |> JPipeline.required "doc_id" Decode.int
        |> JPipeline.required "doc_identifier" Decode.string
        |> JPipeline.required "level" Decode.int
        |> JPipeline.required "comment" Decode.string


decodeDocumentFromOutside : Decoder Document
decodeDocumentFromOutside =
    Decode.succeed Document
        |> JPipeline.required "id" Decode.int
        |> JPipeline.required "identifier" Decode.string
        |> JPipeline.required "authorId" Decode.int
        |> JPipeline.required "authorIdentifier" Decode.string
        |> JPipeline.required "authorName" Decode.string
        |> JPipeline.required "title" Decode.string
        |> JPipeline.required "content" Decode.string
        |> JPipeline.required "level" Decode.int
        |> JPipeline.required "public" Decode.bool
        |> JPipeline.required "access" (Decode.dict (Decode.map stringToAccessType Decode.string))
        -- PROBLEM
        |> JPipeline.required "tags" (Decode.list Decode.string)
        -- PROBLEM
        |> JPipeline.required "children" (Decode.list decodeChild)
        -- PROBLEM
        |> JPipeline.required "parentId" Decode.int
        |> JPipeline.required "parentTitle" Decode.string
        |> JPipeline.required "textType" (Decode.string |> Decode.andThen decodeTextType)
        |> JPipeline.required "docType" (Decode.string |> Decode.andThen decodeDocType)
        |> JPipeline.required "archive" Decode.string
        |> JPipeline.required "version" Decode.int
        |> JPipeline.required "lastViewed" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "created" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "lastModified" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.hardcoded 0



-- ENCODERS


encodeDocumentRecord : Document -> Encode.Value
encodeDocumentRecord document =
    Encode.object
        [ ( "document"
          , encodeDocument document
          )
        ]


encodeDocument : Document -> Encode.Value
encodeDocument document =
    Encode.object
        [ ( "id", Encode.int <| document.id )
        , ( "identifier", Encode.string <| document.identifier )
        , ( "author_id", Encode.int <| document.authorId )
        , ( "author_name", Encode.string <| document.authorName )
        , ( "title", Encode.string <| document.title )
        , ( "content", Encode.string <| document.content )
        , ( "tags", Encode.list Encode.string document.tags )
        , ( "parent_id", Encode.int <| document.parentId )
        , ( "parent_title", Encode.string <| document.parentTitle )
        , ( "attributes", encodeDocumentAttributes <| document )
        , ( "access", Encode.dict identity encodeDocumentAccess document.access )
        ]


encodeDocumentAccess : AccessType -> Encode.Value
encodeDocumentAccess accessValue =
    case accessValue of
        Readable ->
            Encode.string "r"

        Writeable ->
            Encode.string "w"

        ReadableAndWriteable ->
            Encode.string "rw"

        NotShared ->
            Encode.string ""


encodeDocumentForOutside : Document -> Encode.Value
encodeDocumentForOutside document =
    Encode.object
        [ ( "id", Encode.int <| document.id )
        , ( "identifier", Encode.string <| document.identifier )
        , ( "authorId", Encode.int <| document.authorId )
        , ( "authorIdentifier", Encode.string <| document.identifier )
        , ( "authorName", Encode.string <| document.authorName )
        , ( "title", Encode.string <| document.title )
        , ( "content", Encode.string <| document.content )
        , ( "level", Encode.int <| document.level )
        , ( "public", Encode.bool <| document.public )
        , ( "access", Encode.dict identity encodeDocumentAccess document.access )
        , ( "tags", Encode.list Encode.string document.tags )
        , ( "children", Encode.list encodeChildForOutside document.children )
        , ( "parentId", Encode.int <| document.parentId )
        , ( "parentTitle", Encode.string <| document.parentTitle )
        , ( "textType", encodeTextType <| document.textType )
        , ( "docType", encodeDocType <| document.docType )
        , ( "archive", Encode.string <| document.archive )
        , ( "version", Encode.int <| document.version )
        , ( "lastViewed", Encode.int (Time.posixToMillis document.lastViewed) )
        , ( "created", Encode.int (Time.posixToMillis document.created) )
        , ( "lastModified", Encode.int (Time.posixToMillis document.modified) )
        ]


encodeChildForOutside : Child -> Encode.Value
encodeChildForOutside child =
    Encode.object
        [ ( "title", Encode.string <| child.title )
        , ( "level", Encode.int <| child.level )
        , ( "docIdentifier", Encode.string <| child.docIdentifier )
        , ( "docId", Encode.int <| child.docId )
        , ( "comment", Encode.string <| child.comment )
        ]


encodeDocumentAttributes : Document -> Encode.Value
encodeDocumentAttributes doc =
    Encode.object
        [ ( "text_type", encodeTextType <| doc.textType )
        , ( "public", Encode.bool <| doc.public )
        , ( "doc_type", encodeDocType <| doc.docType )
        , ( "level", Encode.int <| doc.level )
        , ( "archive", Encode.string <| doc.archive )
        , ( "version", Encode.int <| doc.version )
        ]


encodeDocType : DocType -> Encode.Value
encodeDocType docType =
    case docType of
        Standard ->
            Encode.string "standard"

        Master ->
            Encode.string "master"


encodeTextType : TextType -> Encode.Value
encodeTextType textType =
    case textType of
        Asciidoc ->
            Encode.string "adoc"

        AsciidocLatex ->
            Encode.string "adoc_latex"

        MiniLatex ->
            Encode.string "latex"

        PlainText ->
            Encode.string "plain"

        Markdown ->
            Encode.string "markdown"

        ElmMarkup ->
            Encode.string "elm-markup"


encodeChild : Child -> Encode.Value
encodeChild record =
    Encode.object
        [ ( "title", Encode.string <| record.title )
        , ( "level", Encode.int <| record.level )
        , ( "doc_identifier", Encode.string <| record.docIdentifier )
        , ( "doc_id", Encode.int <| record.docId )
        , ( "comment", Encode.string <| record.comment )
        ]



-- ACCESS


stringToAccessType : String -> AccessType
stringToAccessType str =
    case str of
        "r" ->
            Readable

        "w" ->
            Writeable

        "rw" ->
            ReadableAndWriteable

        _ ->
            NotShared


accessTypeToString : AccessType -> String
accessTypeToString accessValue =
    case accessValue of
        Readable ->
            "r"

        Writeable ->
            "w"

        ReadableAndWriteable ->
            "rw"

        NotShared ->
            "not shared"


accessDictToStringList : AccessDict -> List String
accessDictToStringList accessDict =
    accessDict
        |> Dict.toList
        |> List.map kvTupleToString


stringListToAccessDict : List String -> AccessDict
stringListToAccessDict strlist =
    strlist
        |> List.map String.trim
        |> List.map (\x -> String.split ":" x |> List.map String.trim)
        |> List.filter (\item -> List.length item == 2)
        |> List.map pairToKVTuple
        |> Dict.fromList


accessDictToString : AccessDict -> String
accessDictToString accessDict =
    accessDict |> accessDictToStringList |> String.join ", "


stringToAccessDict : String -> AccessDict
stringToAccessDict str =
    str |> String.split "," |> stringListToAccessDict


pairToKVTuple : List String -> ( String, AccessType )
pairToKVTuple list =
    if List.length list /= 2 then
        ( "bozo", NotShared )
    else
        let
            key =
                List.Extra.getAt 0 list |> Maybe.withDefault "bozo"

            value =
                List.Extra.getAt 1 list |> Maybe.withDefault "" |> stringToAccessType
        in
            ( key, value )


kvTupleToString : ( String, AccessType ) -> String
kvTupleToString ( str, accessValue ) =
    str ++ ": " ++ accessTypeToString accessValue



-- REQUESTS


getDocumentByIdRequest : Int -> Maybe String -> Http.Request DocumentRecord
getDocumentByIdRequest id maybeTokenString =
    let
        ( route, headers ) =
            case maybeTokenString of
                Nothing ->
                    ( "/api/public/documents/" ++ String.fromInt id, [ Http.header "APIVersion" "V2" ] )

                Just tokenString ->
                    ( "/api/documents/" ++ String.fromInt id
                    , [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson documentRecordDecoder
            , timeout = Just Configuration.timeout
            , withCredentials = False
            }


getDocumentById : Int -> Maybe String -> Cmd DocMsg
getDocumentById id maybeTokenString =
    Http.send ReceiveDocument <| getDocumentByIdRequest id maybeTokenString


saveDocumentRequest : String -> Document -> Http.Request DocumentRecord
saveDocumentRequest tokenString document =
    Http.request
        { method = "Put"
        , headers = [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
        , url = Configuration.backend ++ "/api/documents/" ++ String.fromInt document.id
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson documentRecordDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }


updateDocumentWithQueryStringRequest : String -> String -> Document -> Http.Request DocumentRecord
updateDocumentWithQueryStringRequest tokenString queryString document =
    Http.request
        { method = "Put"
        , headers = [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
        , url = Configuration.backend ++ "/api/documents/" ++ String.fromInt document.id ++ "?" ++ queryString
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson documentRecordDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }


getExportLatexRequest : Document -> Http.Request String
getExportLatexRequest document =
    Http.request
        { method = "Get"
        , headers = []
        , url = Configuration.backend ++ "/api/export/" ++ String.fromInt document.id
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson dataStringDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }



-- HELPERS: STRING


printUrl : Document -> String
printUrl document =
    Configuration.backend ++ "/print/documents" ++ "/" ++ String.fromInt document.id ++ "?" ++ printTypeString document


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

        ElmMarkup ->
            "text=elm-markup"



-- HELPERS: Int


wordCount : Document -> Int
wordCount document =
    document.content
        |> String.words
        |> List.length


selectedDocId : Document -> Int
selectedDocId document =
    document.content
        |> String.split ","
        |> List.drop 1
        |> List.head
        |> Maybe.withDefault "placeUnder:0"
        |> String.trim
        |> String.split ":"
        |> List.drop 1
        |> List.head
        |> Maybe.withDefault "0"
        |> String.toInt
        |> Maybe.withDefault 0



-- CMD


attachDocumentToMasterBelowCmd : String -> Int -> Document -> Maybe Document -> Cmd DocMsg
attachDocumentToMasterBelowCmd tokenString selectedDocId_ childDocument maybeMasterDocument =
    case maybeMasterDocument of
        Nothing ->
            Cmd.none

        Just masterDocument ->
            attachDocumentToMasterBelowCmd_ tokenString selectedDocId_ childDocument masterDocument


attachDocumentToMasterBelowCmd_ : String -> Int -> Document -> Document -> Cmd DocMsg
attachDocumentToMasterBelowCmd_ tokenString selectedDocId_ childDocument masterDocument =
    let
        masterDocumentId =
            childDocument.parentId

        query =
            "attach=below&child=" ++ String.fromInt childDocument.id ++ "&current=" ++ String.fromInt selectedDocId_
    in
        case masterDocumentId == masterDocument.id of
            False ->
                Cmd.none

            True ->
                updateDocumentWithQueryString tokenString query masterDocument


sendToWorkerRequest : String -> Http.Request String
sendToWorkerRequest content =
    Http.request
        { method = "Post"
        , headers = []
        , url = "https://knode.work/processLatex.php"
        , body = Http.multipartBody [ Http.stringPart "data" content ]
        , expect = Http.expectJson stringDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }


sendToWorker : String -> Cmd DocMsg
sendToWorker content =
    Http.send ReceiveWorkerReply <| sendToWorkerRequest content


encodeString : String -> Encode.Value
encodeString content =
    Encode.object
        [ ( "data", Encode.string content ) ]


getExportLatex : Document -> Cmd DocMsg
getExportLatex document =
    Http.send ReceiveLatexExportText <| getExportLatexRequest document



-- CMD


createDocumentRequest : String -> Document -> Http.Request DocumentRecord
createDocumentRequest tokenString document =
    Http.request
        { method = "Post"
        , headers = [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
        , url = Configuration.backend ++ "/api/documents/"
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson documentRecordDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }


createDocument : String -> Document -> Cmd DocMsg
createDocument tokenString document =
    Http.send NewDocumentCreated <| createDocumentRequest tokenString document


createDocumentTask : String -> Document -> Task Http.Error DocumentRecord
createDocumentTask tokenString document =
    createDocumentRequest tokenString document
        |> Http.toTask


deleteDocumentRequest : String -> Document -> Http.Request String
deleteDocumentRequest tokenString document =
    Http.request
        { method = "Delete"
        , headers = [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
        , url = Configuration.backend ++ "/api/documents/" ++ String.fromInt document.id
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson replyDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }


deleteDocument : String -> Document -> Cmd DocMsg
deleteDocument tokenString document =
    Http.send AcknowledgeDocumentDeleted <| deleteDocumentRequest tokenString document


saveDocument : String -> Document -> Cmd DocMsg
saveDocument tokenString document =
    Http.send AcknowledgeUpdateOfDocument <| saveDocumentRequest tokenString document


saveDocumentTask : String -> Document -> Task Http.Error DocumentRecord
saveDocumentTask tokenString document =
    saveDocumentRequest tokenString document
        |> Http.toTask


updateDocumentWithQueryString : String -> String -> Document -> Cmd DocMsg
updateDocumentWithQueryString tokenString queryString document =
    Http.send AcknowledgeUpdateOfDocument <| updateDocumentWithQueryStringRequest tokenString queryString document
