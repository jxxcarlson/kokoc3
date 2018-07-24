module DocumentList exposing(
    DocumentList
  , DocListMsg(..)
  , findDocuments
  , loadMasterDocument
  , loadMasterDocumentWithCurrentSelection
  , empty
  , selected
  , select
  , selectFirst
  , getFirst
  , documents
  , setDocuments
  , prepend
  , documentListLength
  , nextDocumentList
  , deleteItemInDocumentListAt
  )

import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http

import List.Extra
import Utility


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

prepend : Document -> DocumentList -> DocumentList 
prepend document (DocumentList documentListRecord) = 
   DocumentList { documentListRecord | documents = document :: documentListRecord.documents, selected = Just document }
   

documents : DocumentList -> List Document 
documents (DocumentList documentList) =
  documentList.documents

setDocuments : List Document -> DocumentList -> DocumentList
setDocuments listOfDocuments (DocumentList documentListRecord)  = 
  DocumentList { documentListRecord | documents = listOfDocuments }

selected : DocumentList -> Maybe Document 
selected (DocumentList docListRecord) =
 docListRecord.selected

select : Maybe Document -> DocumentList -> DocumentList 
select maybeSelectedDocument (DocumentList documentList) =
    DocumentList { documents = documentList.documents, selected = maybeSelectedDocument}

selectFirst : DocumentList -> DocumentList 
selectFirst documentList = 
  let 
    maybeFirstDocument = List.head (documents documentList)
  in 
    select maybeFirstDocument documentList

getFirst : DocumentList -> Document 
getFirst documentList = 
  List.head (documents documentList) |> Maybe.withDefault notFoundDocument

notFoundDocument : Document 
notFoundDocument = 
  let 
    doc =  Document.basicDocument 
  in 
    { doc | title = "Not found" }

documentListLength : DocumentList -> Int 
documentListLength (DocumentList documentList) =
  List.length documentList.documents

type DocListMsg = 
  ReceiveDocumentList (Result Http.Error DocumentList)
  | ReceiveDocumentListAndPreserveCurrentSelection (Result Http.Error DocumentList)


--  REQUESTS

findDocuments : Maybe User -> String -> Cmd DocListMsg
findDocuments maybeUser queryString = 
  Http.send ReceiveDocumentList <| findDocumentsRequest maybeUser queryString


loadMasterDocument : Maybe User -> Int -> Cmd DocListMsg 
loadMasterDocument maybeUser docId = 
  Http.send ReceiveDocumentList <| loadMasterDocumentRequest maybeUser docId

loadMasterDocumentWithCurrentSelection : Maybe User -> Int -> Cmd DocListMsg 
loadMasterDocumentWithCurrentSelection maybeUser docId = 
  Http.send ReceiveDocumentListAndPreserveCurrentSelection <| loadMasterDocumentRequest maybeUser docId

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


loadMasterDocumentRequest : Maybe User -> Int -> Http.Request DocumentList 
loadMasterDocumentRequest  maybeUser docId =
  let 
    (route, headers) = case maybeUser of 
      Nothing -> ("/api/public/documents?master=" ++ (String.fromInt docId), [Http.header "APIVersion" "V2"])
      Just user -> ("/api/documents?master=" ++ (String.fromInt docId), 
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


nextDocumentList : Int -> Document -> DocumentList -> DocumentList
nextDocumentList targetDocId document documentList = 
  case targetDocId == 0 of 
    True ->  prepend document documentList
    False ->
      let  
        maybeTargetIndex = List.Extra.findIndex (\doc -> doc.id ==  targetDocId) (documents documentList)
      in  
        case maybeTargetIndex of 
          Nothing -> prepend document documentList
          Just k -> 
            setDocuments (Utility.listInsertAt (k+1) document (documents documentList)) documentList
              |> select (Just document)


deleteItemInDocumentListAt : Int -> DocumentList -> DocumentList
deleteItemInDocumentListAt targetDocId documentList = 
  case targetDocId == 0 of 
    True ->  documentList
    False ->
      let  
        maybeTargetIndex = List.Extra.findIndex (\doc -> doc.id ==  targetDocId) (documents documentList)
      in  
        case maybeTargetIndex of 
          Nothing -> documentList
          Just k -> 
            setDocuments (Utility.listDeleteAt k (documents documentList)) documentList
              