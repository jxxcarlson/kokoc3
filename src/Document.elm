module Document exposing(..)

import Dict exposing(Dict)
import Time exposing(Posix)
import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http 

import Configuration



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
    }


type alias Child =
    { title : String
    , docId : Int
    , docIdentifier : String
    , level : Int
    , comment : String
    }

type alias AccessDict =
    Dict String String

{-| Entries in the documentDict point to
    special associated documents such as
    a summary, a commentary, or a TeX macro file 
 -}
type alias DocumentDict =
    Dict String Document

{-| A master document has list of children -}
type DocType
    = Standard
    | Master

type TextType
    = MiniLatex
    | Markdown
    | Asciidoc
    | AsciidocLatex
    | Plain


-- MSG

type DocumentMsg = 
  ReceiveDocument (Result Http.Error DocumentRecord)

-- DECODERS

documentRecordDecoder : Decoder DocumentRecord
documentRecordDecoder =
    Decode.succeed DocumentRecord
        |> JPipeline.required "document" (documentDecoder)


documentDecoder : Decoder Document
documentDecoder =
    Decode.succeed Document
        |> JPipeline.required "id" Decode.int
        |> JPipeline.required "identifier" Decode.string

        |> JPipeline.required "author_id" Decode.int
        |> JPipeline.required "author_identifier" Decode.string
        |> JPipeline.required "author_name" Decode.string

        |> JPipeline.required "title" Decode.string
        |> JPipeline.required "content" Decode.string
        |> JPipeline.required "level" Decode.int

        |> JPipeline.required "public" (Decode.bool)
        |> JPipeline.required "access" (Decode.dict Decode.string)

        |> JPipeline.required "tags" (Decode.list Decode.string)

        |> JPipeline.required "children" (Decode.list decodeChild)
        |> JPipeline.required "parent_id" Decode.int
        |> JPipeline.required "parent_title" Decode.string

        |> JPipeline.required "text_type" (Decode.string |> Decode.andThen decodeTextType)
        |> JPipeline.required "doc_type" (Decode.string |> Decode.andThen decodeDocType)
        
        |> JPipeline.required "archive" Decode.string
        |> JPipeline.required "version" Decode.int

        |> JPipeline.required "lastViewed" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "created" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "lastModified" (Decode.map Time.millisToPosix Decode.int)
       
        
        
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

        _ ->
            Decode.fail <| "I don't know a textType named " ++ textTypeString


decodeChild : Decoder Child
decodeChild =
    Decode.succeed Child
        |> JPipeline.required "title" (Decode.string)
        |> JPipeline.required "level" (Decode.int)
        |> JPipeline.required "doc_identifier" (Decode.string)
        |> JPipeline.required "doc_id" (Decode.int)
        |> JPipeline.required "comment" (Decode.string)


-- REQUEST

getDocumentRequest : Int -> String -> Http.Request DocumentRecord
getDocumentRequest id token = 
  Http.request
    { method = "Get"
    , headers = [Http.header "Authorization" ("Bearer " ++ token)]
    , url = Configuration.backend ++ "/api/documents/" ++ (String.fromInt id)
    , body = Http.jsonBody Encode.null
    , expect = Http.expectJson documentRecordDecoder
    , timeout = Just 5000
    , withCredentials = False
    }

getDocument : Int  -> String -> Cmd DocumentMsg 
getDocument id token =
    Http.send ReceiveDocument <| getDocumentRequest id token
