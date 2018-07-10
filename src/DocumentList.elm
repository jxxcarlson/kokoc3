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

type alias DocumentList = {
    documents: List Document
    , selected: Maybe Document
  }
 

empty : DocumentList 
empty = {
    documents = []
  , selected = Nothing 
  }

documents : DocumentList -> List Document 
documents documentList =
  documentList.documents

documentListLength : DocumentList -> Int 
documentListLength documentList =
  List.length documentList.documents

type DocListMsg = 
  ReceiveDocumentList (Result Http.Error DocumentList)

findPublicDocuments : String -> Cmd DocListMsg
findPublicDocuments queryString = 
  Http.send ReceiveDocumentList <| findPublicDocumentsRequest queryString

-- DECODERS

listDocumentDecoder : Decoder (List Document)
listDocumentDecoder =
  Decode.field "documents" (Decode.list documentDecoder)
  
documentListDecoder : Decoder DocumentList 
documentListDecoder =
  Decode.map2 DocumentList listDocumentDecoder (Decode.succeed Nothing)



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
