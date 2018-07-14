module Document exposing(
      Document
    , DocumentRecord
    , DocumentView
    , getDocumentById 
    , saveDocument
    , getDocumentByIdRequest
    , documentDecoder
    , encodeDocumentForOutside
    , decodeDocumentFromOutside
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
  | AcknowledgeUpdateOfDocument (Result Http.Error DocumentRecord)
  

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
        [ 
          ( "id", Encode.int <| document.id )
        , ( "identifier", Encode.string <| document.identifier )

        , ( "author_id", Encode.int <| document.authorId )
        , ( "author_name", Encode.string <| document.authorName )

        , ( "title", Encode.string <| document.title )
        , ( "content", Encode.string <| document.content )

        , ( "tags", Encode.list Encode.string document.tags )
        , ( "parent_id", Encode.int <| document.parentId )
        , ( "parent_title", Encode.string <| document.parentTitle )
        
        , ( "attributes", encodeDocumentAttributes <| document )
       
        ]

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

        |> JPipeline.required "public" (Decode.bool)
        |> JPipeline.required "access" (Decode.dict Decode.string) -- PROBLEM

        |> JPipeline.required "tags" (Decode.list Decode.string) -- PROBLEM

        |> JPipeline.required "children" (Decode.list decodeChild) -- PROBLEM
        |> JPipeline.required "parentId" Decode.int
        |> JPipeline.required "parentTitle" Decode.string

        |> JPipeline.required "textType" (Decode.string |> Decode.andThen decodeTextType)
        |> JPipeline.required "docType" (Decode.string |> Decode.andThen decodeDocType)
        
        |> JPipeline.required "archive" Decode.string
        |> JPipeline.required "version" Decode.int

        |> JPipeline.required "lastViewed" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "created" (Decode.map Time.millisToPosix Decode.int)
        |> JPipeline.required "lastModified" (Decode.map Time.millisToPosix Decode.int)
       
        
        

encodeDocumentForOutside : Document -> Encode.Value
encodeDocumentForOutside document =
    Encode.object
        [ 
          ( "id", Encode.int <| document.id )
        , ( "identifier", Encode.string <| document.identifier )

        , ( "authorId", Encode.int <| document.authorId )
        , ( "authorIdentifier", Encode.int <| document.authorId )
        , ( "author_name", Encode.string <| document.authorName )

        , ( "title", Encode.string <| document.title )
        , ( "content", Encode.string <| document.content )
        , ( "level", Encode.int <| document.level )

        , ( "public", Encode.bool <| document.public )
        , ( "access", Encode.dict identity Encode.string document.access )

        , ( "tags", Encode.list Encode.string document.tags )

        , ( "children", Encode.list encodeChildForOutside document.children ) 
        , ( "parentId", Encode.int <| document.parentId )
        , ( "parentTitle", Encode.string <| document.parentTitle )
        
        , ( "textType", encodeTextType <| document.textType )
        , ( "docType", encodeDocType <| document.docType )
        
        , ( "archive", Encode.string <| document.archive )
        , ( "version", Encode.int <| document.version )

        , ( "lastViewed", Encode.int (Time.posixToMillis document.lastViewed) )
        , ( "created",  Encode.int (Time.posixToMillis document.created) )
        , ( "lastModified", Encode.int (Time.posixToMillis document.modified) )
        
       
        ]


encodeChildForOutside : Child -> Encode.Value
encodeChildForOutside child =
   Encode.object
        [ 
              ( "title", Encode.string <| child.title )
            , ( "level", Encode.int <| child.level )
            , ( "docIdentifier", Encode.string <| child.docIdentifier )
            , ( "docId", Encode.int <| child.docId )
            , ( "comment", Encode.string <| child.comment )
        ]

     -- |> JPipeline.required "authorIdentifier" Decode.string
        -- |> JPipeline.required "access" (Decode.dict Decode.string)
        -- |> JPipeline.required "children" (Decode.list decodeChild)
        -- |> JPipeline.required "lastViewed" (Decode.map Time.millisToPosix Decode.int)
        -- |> JPipeline.required "created" (Decode.map Time.millisToPosix Decode.int)
        -- |> JPipeline.required "lastModified" (Decode.map Time.millisToPosix Decode.int)

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



encodeChild : Child -> Encode.Value
encodeChild record =
    Encode.object
        [ ( "title", Encode.string <| record.title )
        , ( "level", Encode.int <| record.level )
        , ( "doc_identifier", Encode.string <| record.docIdentifier )
        , ( "doc_id", Encode.int <| record.docId )
        , ( "comment", Encode.string <| record.comment )
        ]


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


saveDocumentRequest : String -> Document -> Http.Request DocumentRecord
saveDocumentRequest tokenString document = 
    Http.request
        { method = "Put"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/documents/" ++ (String.fromInt document.id)
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson documentRecordDecoder
        , timeout = Just 5000
        , withCredentials = False
        }

saveDocument : String -> Document -> Cmd DocMsg 
saveDocument tokenString document =
    Http.send AcknowledgeUpdateOfDocument <| saveDocumentRequest tokenString document

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
    Asciidoc -> asciiDocViewer document 
    AsciidocLatex -> viewAsciidoc document.content 
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


-- YAY: https://ellie-test-19-cutover.now.sh/LGShLFZHvha1
-- https://ellie-test-19-cutover.now.sh/LGc6jCfs64a1

asciiDocViewer document = 
  case document.docType of 
    Master -> viewChildren document 
    Standard -> viewAsciidoc document.content 

viewAsciidoc : String -> Element msg
viewAsciidoc str =
  Element.el [ ] (Element.html <| asciidocText str)


asciidocText : String -> Html msg
asciidocText str =
    Html.node "asciidoc-text"
        [ HA.property "content" (Encode.string str) ]
        []

viewPlainText : Document -> Element msg
viewPlainText document =
   Element.el [ ] (Element.html <| MarkdownTools.view document.content)


viewChildren : Document -> Element msg 
viewChildren document = 
  Element.column [Element.spacing 10] (List.map viewChild document.children)
  
viewChild : Child -> Element msg 
viewChild child = 
  Element.el [] (Element.text <| child.title)


-- TEXT

initialText = 
    """
\\section{Getting started}

Type something in the search box, upper left, to find a document.
Or press the \\strong{Random} button.

\\section{Search Tips}

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

\\item To find all the public articles by an author
with user name \\italic{jxxcarlson}, Use
the search term \\strong{author=jxxcarlson}.    
For all the articles by that author with title
including \\italic{haskell}, search on 
\\strong{author=jxxcarlson, title=haskell}.

\\item You can do full text searches.  For example,
\\strong{text=atom} finds documents with \\italic{atom}
in the text.  The search \\strong{text=atom, text=oscillator}
finds those texts that also contain the word \\italic{oscillator}.

\\item Click the \\strong{Random} button to produce
a  list of random documents.


\\end{enumerate}

There is more to searching, but this is enough for now.....

\\section{About kNode}

\\strong{kNode.io} is an app for sharing your knowledge 
 with others.  With the kNode Reader,
 you can read what others write without signing in.
 To keep track of what you are reading or to
 write your own content to distribute on kNode.io, 
 sign up for an account. You can write in 
 plain text, Markdown, Asciidoc, or MiniLatex.

 For questions or comments, contact jxxcarlson at gmail.

"""