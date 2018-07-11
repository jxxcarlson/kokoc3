module DocumentList exposing(
    DocumentList
  , DocListMsg(..)
  , findPublicDocuments
  , findUserDocuments
  , loadMasterDocument
  , empty
  , selected
  , select
  , documents
  , documentListLength
  )

import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http
import Configuration
import User exposing(User)

import Document exposing(Document, documentDecoder)

type alias DocumentListRecord = {
      documents: List Document
    , selected: Maybe Document
  }

type DocumentList = DocumentList DocumentListRecord
 

empty : DocumentList 
empty = DocumentList {
    documents = []
  , selected = Nothing 
  }

documents : DocumentList -> List Document 
documents (DocumentList documentList) =
  documentList.documents

selected : DocumentList -> Maybe Document 
selected (DocumentList docListRecord) =
 docListRecord.selected

select : Maybe Document -> DocumentList -> DocumentList 
select maybeSelectedDocument (DocumentList documentList) =
    DocumentList { documents = documentList.documents, selected = maybeSelectedDocument}

documentListLength : DocumentList -> Int 
documentListLength (DocumentList documentList) =
  List.length documentList.documents

type DocListMsg = 
  ReceiveDocumentList (Result Http.Error DocumentList)

findPublicDocuments : String -> Cmd DocListMsg
findPublicDocuments queryString = 
  Http.send ReceiveDocumentList <| findPublicDocumentsRequest queryString

findUserDocuments : User -> String -> Cmd DocListMsg
findUserDocuments user queryString = 
  Http.send ReceiveDocumentList <| findUserDocumentsRequest user queryString

loadMasterDocument : User -> Int -> Cmd DocListMsg 
loadMasterDocument user docId = 
  Http.send ReceiveDocumentList <| loadMasterDocumentRequest user docId

-- DECODERS

listDocumentDecoder : Decoder (List Document)
listDocumentDecoder =
  Decode.field "documents" (Decode.list documentDecoder)

  
documentListRecordDecoder : Decoder DocumentListRecord 
documentListRecordDecoder =
    Decode.map2 DocumentListRecord listDocumentDecoder (Decode.succeed Nothing)

documentListDecoder : Decoder DocumentList
documentListDecoder = 
  Decode.map DocumentList documentListRecordDecoder

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

findUserDocumentsRequest : User -> String -> Http.Request DocumentList
findUserDocumentsRequest user queryString = 
  Http.request
    { method = "Get"
    , headers = [
          Http.header "APIVersion" "V2"
        , Http.header "authorization" ("Bearer " ++ (User.getTokenString user))
    ]
    , url = Configuration.backend ++ "/api/documents?" ++ queryString
    , body = Http.jsonBody Encode.null
    , expect = Http.expectJson documentListDecoder
    , timeout = Just 5000
    , withCredentials = False
    }

loadMasterDocumentRequest :User -> Int -> Http.Request DocumentList 
loadMasterDocumentRequest  user docId =
    Http.request
    { method = "Get"
    , headers = [
          Http.header "APIVersion" "V2"
        , Http.header "authorization" ("Bearer " ++ (User.getTokenString user))
    ]
    , url = Configuration.backend ++ "/api/documents?master=" ++ (String.fromInt docId)
    , body = Http.jsonBody Encode.null
    , expect = Http.expectJson documentListDecoder
    , timeout = Just 5000
    , withCredentials = False
    }
