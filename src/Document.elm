module Document exposing(
      Document
    , DocumentRecord
    , DocumentView
    , getDocumentById 
    , getDocumentByIdRequest
    , documentDecoder
    , DocMsg(..)
    , DocType(..)
    , basicDocument
    , viewDocument
  )

import Dict exposing(Dict)
import Time exposing(Posix)
import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http
import Element exposing(Element)
import Html exposing(Html)
import Html.Attributes as HA 

import MeenyLatex.Differ exposing (EditRecord)
import MeenyLatex.Driver as MiniLatex

import MarkdownTools

import Configuration
import Utility



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

initialText = 
    """
Type something in the search box, upper left, to find a document.

\\subheading{Search Tips}

\\begin{enumerate}

\\item Type words or fragments of words to search by title.
For example, type \\strong{atom}.  If you wanted to be
more specific, you could type \\strong{hydrogen atom},
or for that mattter \\strong{ato hy}.

\\item Every document has a numerical ID, like a person's
social security number. You can type the ID in the search
box to find a document.   If someone says, "My class notes
are on document \\strong{440} at knode.io,"" you 
know what to do. 

\\item You can do full text searches.  For example,
\\strong{text=atom} finds documents with \\italic{atom}
in the text.  The search \\strong{text=atom, text=oscillator}
finds those texts that also contain the word \\italic{oscillator}.

\\item Click the \\strong{Random} button to produce
a  list of random documents.


\\end{enumerate}

There is more to searching, but this is enough for now.
"""

basicDocument : Document 
basicDocument = Document
    0
    "basicDocument123"
    0
    "author123"
    "Phineas Phud"
    "Welcome to kNode Reader"
    initialText
    1  
    True
    Dict.empty
    ["texmacros:453"]
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


-- REQUEST

getDocumentByIdRequest : Int -> Maybe String -> Http.Request DocumentRecord
getDocumentByIdRequest id maybeTokenString = 
  let 
    (route, headers) = case maybeTokenString of 
       Nothing -> ("/api/public/documents/" ++ (String.fromInt id), [Http.header "APIVersion" "V2"])
       Just tokenString -> ("/api/documents/" ++ (String.fromInt id),
         [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)] )
  in
    Http.request
        { method = "Get"
        , headers = headers
        , url = Configuration.backend ++ route
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson documentRecordDecoder
        , timeout = Just 5000
        , withCredentials = False
        }

getDocumentById : Int  -> Maybe String -> Cmd DocMsg 
getDocumentById id maybeTokenString =
    Http.send ReceiveDocument <| getDocumentByIdRequest id maybeTokenString




-- ACTIONS



-- VIEW

type alias DocumentView msg = 
  {    title: String
     , content: Element msg 
   }

viewDocument : String -> Document -> DocumentView msg
viewDocument texMacros doc = 
  { title = doc.title 
    , content = documentContentView texMacros doc
  }

documentContentView : String -> Document -> Element msg 
documentContentView texMacros document = 
  case document.textType of
    MiniLatex -> viewMiniLatex texMacros document 
    Markdown -> viewMarkdown document 
    Asciidoc -> viewAsciidoc document 
    AsciidocLatex -> viewAsciidocLatex document 
    PlainText -> viewPlainText document
  
normalize str = 
  str |> String.lines |> List.filter (\x -> x /= "") |> String.join("\n") 

   
prependMacros macros_ sourceText = 
  let
    macros__ =  (macros_ |> normalize)
  in
    "$$\n" ++ macros__ ++ "\n$$\n\n" ++ sourceText 

viewMiniLatex : String -> Document -> Element msg
viewMiniLatex texMacros document =
  let 
    source = if texMacros == "" then 
                document.content 
             else 
                prependMacros texMacros document.content
    editRecord =
        MiniLatex.setup 0 source 
  in 
    MiniLatex.getRenderedText texMacros editRecord
        |> List.map (\x -> Element.paragraph [  ] [ Element.html x ])
        |> Element.column []

viewMarkdown : Document -> Element msg
viewMarkdown document =
  Element.el [ ] (Element.html <| MarkdownTools.view document.content)

viewAsciidoc : Document -> Element msg
viewAsciidoc document =
  Element.el [ ] (Element.html <| asciidocText document.content)

viewAsciidocLatex : Document -> Element msg
viewAsciidocLatex document =
  Element.el [ ] (Element.html <| asciidocText document.content)

viewPlainText : Document -> Element msg
viewPlainText document =
   Element.el [ ] (Element.html <| MarkdownTools.view document.content)

asciidocText : String -> Html msg
asciidocText content =
    Html.node "asciidoc-text"
        [ HA.property "content" (Encode.string <| "== ASCIIDOC\n\n*This is a test*") ]
        []

