module Document exposing(
      Document
    , DocumentView
    , getDocumentById 
    , DocMsg(..)
    , basicDocument
    , viewDocument
  )

import Dict exposing(Dict)
import Time exposing(Posix)
import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http
import Html exposing(Html)
import Html.Attributes as HA

import MeenyLatex.Differ exposing (EditRecord)
import MeenyLatex.Driver as MiniLatex

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

basicDocument : Document 
basicDocument = Document
    0
    "basicDocument123"
    0
    "author123"
    "Phineas Phud"
    "Welcome!"
    "Pythagoras said: $a^2 + b^2 = c^2$."
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
    | PlainText


-- MSG

type DocMsg = 
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

        |> JPipeline.required "authorId" Decode.int
        |> JPipeline.required "authorIdentifier" Decode.string
        |> JPipeline.required "authorName" Decode.string

        |> JPipeline.required "title" Decode.string
        |> JPipeline.required "content" Decode.string
        |> JPipeline.required "level" Decode.int

        |> JPipeline.required "public" (Decode.bool)
        |> JPipeline.required "access" (Decode.dict Decode.string)

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


-- decodeHttpResponse : Decoder (Http.Response Document)
-- decodeHttpResponse = 
--   Decode.succeed (Http.Response Document)
--     |> JPipeline.required "url" Decode.string
--     |> JPipeline.required "status" (Decode.string |> Decode.andThen decodeHttpStatus)
--     |> JPipeline.required "headers" (Decode.dict Decode.string)
--     |> JPipeline.required "body" documentDecoder

-- type alias Status = 
--   {  code: Int
--      , message: String 
--   }

-- decodeHttpStatus : Decoder (Http.Response Document)
-- decodeHttpStatus = 
--   Decode.succeed Status
--     |> JPipeline.required "code" Decode.int
--     |> JPipeline.required "message" Decode.string


-- REQUEST

getDocumentByIdRequest : Int -> String -> Http.Request DocumentRecord
getDocumentByIdRequest id token = 
  Http.request
    { method = "Get"
    , headers = [
          Http.header "Authorization" ("Bearer " ++ token)
        , Http.header "APIVersion" "V2"
    ]
    , url = Configuration.backend ++ "/api/documents/" ++ (String.fromInt id)
    , body = Http.jsonBody Encode.null
    , expect = Http.expectJson documentRecordDecoder
    , timeout = Just 5000
    , withCredentials = False
    }

getDocumentById : Int  -> String -> Cmd DocMsg 
getDocumentById id token =
    Http.send ReceiveDocument <| getDocumentByIdRequest id token


-- VIEW

type alias DocumentView msg = 
  {    title: String
     , content: Html msg 
   }

viewDocument : Document -> DocumentView msg
viewDocument doc = 
  { title = doc.title 
    , content = documentContentView doc
  }

documentContentView : Document -> Html msg 
documentContentView document = 
  case document.textType of
    MiniLatex -> viewMiniLatex document 
    Markdown -> viewMarkdown document 
    Asciidoc -> viewAsciidoc document 
    AsciidocLatex -> viewAsciidocLatex document 
    PlainText -> viewPlainText document
  

viewMiniLatex : Document -> Html msg
viewMiniLatex document =
  let 
    editRecord =
        MiniLatex.setup 0 document.content   
  in 
    MiniLatex.getRenderedText "" editRecord
        |> List.map (\x -> Html.div [ HA.style "margin-bottom" "0.65em", HA.style "width" "300px" ] [  x ])
        |> Html.div []

viewMarkdown : Document -> Html msg
viewMarkdown document =
  Html.div [] [Html.text <| "Markdown"]  

viewAsciidoc : Document -> Html msg
viewAsciidoc document =
  Html.div [] [Html.text <| "Asciidoc"] 

viewAsciidocLatex : Document -> Html msg
viewAsciidocLatex document =
  Html.div [] [Html.text <| "Asciidoc LaTeX"]  

viewPlainText : Document -> Html msg
viewPlainText document =
  Html.div [] [Html.text <| "Plain text" ] 

