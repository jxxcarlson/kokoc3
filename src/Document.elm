module Document exposing(
      Document
    , DocumentRecord
    , getDocumentById 
    , saveDocument
    , updateDocumentWithQueryString
    , createDocument
    , deleteDocument
    , getDocumentByIdRequest
    , documentDecoder
    , encodeDocumentForOutside
    , decodeDocumentFromOutside
    , Child
    , DocMsg(..)
    , DocType(..)
    , TextType(..)
    , basicDocument
    , newDocument
    , wordCount
    , selectedDocId
    , attachDocumentToMasterBelowCmd
    , sendToWorker
  )

import Dict exposing(Dict)
import Time exposing(Posix)
import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http

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
    "— kNode team"
    "Welcome to kNode Reader"
    Configuration.basicDocumentText
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



newDocument : Document 
newDocument = 
   { basicDocument | content = Configuration.newMiniLatexDocumentText, title = "New Document" }
  
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
  | NewDocumentCreated (Result Http.Error DocumentRecord)
  | AcknowledgeUpdateOfDocument (Result Http.Error DocumentRecord)
  | AcknowledgeDocumentDeleted (Result Http.Error String)
  | ReceiveWorkerReply (Result Http.Error String)

  

-- DECODERS

replyDecoder : Decoder String
replyDecoder =
    Decode.field "reply" Decode.string


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
        |> JPipeline.required "doc_id" (Decode.int)
        |> JPipeline.required "doc_identifier" (Decode.string)
        |> JPipeline.required "level" (Decode.int)
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
        , ( "authorIdentifier", Encode.string <| document.identifier )
        , ( "authorName", Encode.string <| document.authorName )

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


-- REQUESTS AND CMDS

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


updateDocumentWithQueryStringRequest : String -> String -> Document -> Http.Request DocumentRecord
updateDocumentWithQueryStringRequest tokenString queryString document = 
    Http.request
        { method = "Put"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/documents/" ++ (String.fromInt document.id) ++ "?" ++ queryString
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson documentRecordDecoder
        , timeout = Just 5000
        , withCredentials = False
        }


updateDocumentWithQueryString : String -> String -> Document -> Cmd DocMsg 
updateDocumentWithQueryString tokenString queryString document =
    Http.send AcknowledgeUpdateOfDocument <| updateDocumentWithQueryStringRequest tokenString queryString document


createDocumentRequest : String -> Document -> Http.Request DocumentRecord
createDocumentRequest tokenString document = 
  Http.request
        { method = "Post"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/documents/"
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson documentRecordDecoder
        , timeout = Just 5000
        , withCredentials = False
        }

createDocument : String -> Document -> Cmd DocMsg 
createDocument tokenString document =
    Http.send NewDocumentCreated <| createDocumentRequest tokenString document

deleteDocumentRequest : String -> Document -> Http.Request String
deleteDocumentRequest tokenString document = 
  Http.request
        { method = "Delete"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/documents/" ++ (String.fromInt document.id)
        , body = Http.jsonBody (encodeDocumentRecord document)
        , expect = Http.expectJson replyDecoder
        , timeout = Just 5000
        , withCredentials = False
        }

deleteDocument : String -> Document -> Cmd DocMsg 
deleteDocument tokenString document =
    Http.send AcknowledgeDocumentDeleted <| deleteDocumentRequest tokenString document


-- HELPER

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

attachDocumentToMasterBelowCmd : String -> Int -> Document -> Maybe Document -> Cmd DocMsg
attachDocumentToMasterBelowCmd  tokenString selectedDocId_ childDocument maybeMasterDocument =
  case maybeMasterDocument of 
    Nothing -> Cmd.none 
    Just masterDocument -> attachDocumentToMasterBelowCmd_  tokenString selectedDocId_ childDocument masterDocument

attachDocumentToMasterBelowCmd_ : String -> Int -> Document -> Document -> Cmd DocMsg
attachDocumentToMasterBelowCmd_  tokenString selectedDocId_ childDocument masterDocument =
  let  
    masterDocumentId = childDocument.parentId 
    query =  ("attach=below&child=" ++ (String.fromInt childDocument.id) ++ "&current=" ++ (String.fromInt selectedDocId_))
  in  
    case masterDocumentId == masterDocument.id of 
      False -> Cmd.none 
      True ->  (updateDocumentWithQueryString tokenString query masterDocument)   


sendToWorkerRequest : String -> Http.Request String
sendToWorkerRequest content = 
  Http.request
        { method = "Post"
        , headers = []
        , url = "https://knode.work/save.php"
        , body = Http.jsonBody (encodeString content)
        , expect = Http.expectJson stringDecoder
        , timeout = Just 5000
        , withCredentials = False
        }

sendToWorker : String -> Cmd DocMsg 
sendToWorker content =
    Http.send ReceiveWorkerReply <| sendToWorkerRequest content


encodeString : String -> Encode.Value
encodeString content =
    Encode.object
        [ ( "data", Encode.string  content ) ]


stringDecoder : Decoder String
stringDecoder =
    Decode.string

