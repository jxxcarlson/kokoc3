module DocumentList exposing(
    DocumentList
  , DocListMsg(..)
  , findDocuments
  , loadMasterDocument
  , loadMasterDocumentWithCurrentSelection
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
  | ReceiveDocumentListAndPreserveCurrentSelection (Result Http.Error DocumentList)

findDocuments : Maybe User -> String -> Cmd DocListMsg
findDocuments maybeUser queryString = 
  Http.send ReceiveDocumentList <| findDocumentsRequest maybeUser queryString


loadMasterDocument : User -> Int -> Cmd DocListMsg 
loadMasterDocument user docId = 
  Http.send ReceiveDocumentList <| loadMasterDocumentRequest user docId

loadMasterDocumentWithCurrentSelection : User -> Int -> Cmd DocListMsg 
loadMasterDocumentWithCurrentSelection user docId = 
  Http.send ReceiveDocumentListAndPreserveCurrentSelection <| loadMasterDocumentRequest user docId

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

findDocumentsRequest : Maybe User -> String -> Http.Request DocumentList
findDocumentsRequest maybeUser queryString = 
  let 
    (route, headers) = case maybeUser of 
         Nothing -> ("/api/public/documents?" ++ queryString, 
             [Http.header "APIVersion" "V2"])
         Just user -> ("/api/documents?" ++ queryString, 
            [Http.header "APIVersion" "V2", Http.header "authorization" ("Bearer " ++ (User.getTokenString user))])
  in
  Http.request
    { method = "Get"
    , headers = headers
    , url = Configuration.backend ++ route
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
