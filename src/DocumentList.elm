module DocumentList exposing(
    DocumentList
  , DocListMsg(..)
  , findPublicDocuments
  , empty
  , documents
  , documentListLength
  )

import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http
import Configuration

import Document exposing(Document, documentDecoder)

type DocumentList = 
  DocumentList (List Document) 

empty : DocumentList 
empty = 
  DocumentList []

documents : DocumentList -> List Document 
documents (DocumentList docs) =
  docs

documentListLength : DocumentList -> Int 
documentListLength (DocumentList documents_) =
  List.length documents_

type DocListMsg = 
  ReceiveDocumentList (Result Http.Error DocumentList)

findPublicDocuments : String -> Cmd DocListMsg
findPublicDocuments queryString = 
  Http.send ReceiveDocumentList <| findPublicDocumentsRequest queryString

-- DECODERS

documentListDecoder : Decoder DocumentList
documentListDecoder =
  Decode.succeed DocumentList
    |> JPipeline.required "documents" (Decode.list documentDecoder)

-- documentListDecoder : Decoder DocumentList
-- documentListDecoder =
--     Decode.map DocumentList (Decode.list documentDecoder)


findPublicDocumentsRequest : String -> Http.Request DocumentList
findPublicDocumentsRequest queryString = 
  Http.request
    { method = "Get"
    , headers = [
          Http.header "APIVersion" "V2"
    ]
    , url = Configuration.backend ++ "/api/public/documents?" ++ queryString
    , body = Http.jsonBody Encode.null
    , expect = Http.expectJson documentListDecoder
    , timeout = Just 5000
    , withCredentials = False
    }
