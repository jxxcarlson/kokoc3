module DocumentList exposing(
    DocumentList
  , DocListMsg(..)
  , findDocuments
  , loadMasterDocument
  , loadMasterDocumentWithCurrentSelection
  , loadMasterDocumentAndSelect
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
  , make
  , documentListEncoder
  , IntList
  , intListDecoder
  , retrievDocumentsFromIntList
  , retrievRecentDocumentQueueFromIntList
  , emptyIntList
  , intListFromDocumentList
  , updateDocument
  , documentQueueToDocumentList
  , encodeDocumentQueue
  , intListForDocumentQueueDecoder
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
import Queue exposing(Queue) 


type DocumentList = DocumentList DocumentListRecord

type alias DocumentListRecord = {
      documents: List Document
    , selected: Maybe Document
  }

type alias IntList = {
      ints : List Int
    , selected : Int
  }

intListFromDocumentList : DocumentList -> IntList 
intListFromDocumentList documentList =
  {   ints = (documents documentList) |> List.map .id
    , selected = selectedId documentList
  }

emptyIntList : IntList 
emptyIntList = 
  {   ints = [0]
    , selected = 0
  }


empty : DocumentList 
empty = DocumentList {
    documents = []
  , selected = Nothing 
  }

make : Document -> List Document -> DocumentList 
make document listOfDocuments = 
  let 
    documentListRecord = { documents = document::listOfDocuments, selected = Just document}
  in 
    DocumentList documentListRecord 


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

selectedId : DocumentList -> Int 
selectedId documentList = 
   case selected documentList of 
     Nothing -> 0
     Just document -> document.id 

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

-- MSG 

type DocListMsg = 
  ReceiveDocumentList (Result Http.Error DocumentList)
  | ReceiveDocumentListWithSelectedId (Result Http.Error DocumentList)
  | RestoreDocumentList (Result Http.Error DocumentList)
  | RestoreRecentDocumentQueue (Result Http.Error (Queue Document))
  | ReceiveDocumentListAndPreserveCurrentSelection (Result Http.Error DocumentList)


--  CMDS

findDocuments : Maybe User -> String -> Cmd DocListMsg
findDocuments maybeUser queryString = 
  Http.send ReceiveDocumentList <| findDocumentsRequest maybeUser queryString

retrievDocumentsFromIntList : Maybe User -> IntList ->  Cmd DocListMsg 
retrievDocumentsFromIntList maybeUser intList =
    let 
      ids = intList.ints |> List.reverse |> List.map String.fromInt |> String.join ","
      queryString = "idlist=" ++ ids
    in
      Http.send RestoreDocumentList <| findDocumentsRequest maybeUser queryString

retrievRecentDocumentQueueFromIntList : Maybe User -> (List Int) ->  Cmd DocListMsg 
retrievRecentDocumentQueueFromIntList maybeUser intList =
    let 
      ids = intList |> List.reverse |> List.map String.fromInt |> String.join ","
      queryString = "idlist=" ++ ids
    
    in
      Http.send RestoreRecentDocumentQueue <| findDocumentQueueRequest maybeUser queryString


loadMasterDocument : Maybe User -> Int -> Cmd DocListMsg 
loadMasterDocument maybeUser docId = 
  Http.send ReceiveDocumentList <| loadMasterDocumentRequest maybeUser docId

loadMasterDocumentAndSelect : Maybe User -> Int -> Cmd DocListMsg 
loadMasterDocumentAndSelect maybeUser docId = 
  Http.send ReceiveDocumentListWithSelectedId <| loadMasterDocumentRequest maybeUser docId



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

documentQueueDecoder : Decoder (Queue Document)
documentQueueDecoder = 
  Decode.map (\list -> Queue.fromList list Configuration.documentQueueCapacity) listDocumentDecoder

intListDecoder : Decoder IntList 
intListDecoder = 
  Decode.map2 IntList
    (Decode.field "documentIds" (list int))
    (Decode.field "selected" int)
    
intListForDocumentQueueDecoder : Decoder (List Int)
intListForDocumentQueueDecoder = 
  list int
 
-- ENCODERS

documentListEncoder : DocumentList -> Encode.Value 
documentListEncoder documentList = 
  let 
    intList = intListFromDocumentList documentList 
  in 
  Encode.object [
          ("selected", Encode.int intList.selected)
        , ("documentIds", Encode.list Encode.int intList.ints)
     ]

-- REQUESTS


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
    , timeout = Just Configuration.timeout
    , withCredentials = False
    }


findDocumentQueueRequest : Maybe User -> String -> Http.Request (Queue Document)
findDocumentQueueRequest maybeUser queryString = 
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
    , expect = Http.expectJson documentQueueDecoder
    , timeout = Just Configuration.timeout
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
    , timeout = Just Configuration.timeout
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


{-| Replace the element in `documentList` whose id is that of
    of `document` by `document`.
-}
updateDocument : Document -> DocumentList -> DocumentList 
updateDocument document documentList =
  let 
    docs_ = documents documentList 
    newdocs_ = Utility.replaceIf (\doc -> doc.id == document.id) document docs_ 
  in 
    setDocuments newdocs_ documentList


documentQueueToDocumentList : Document -> (Queue Document) -> DocumentList 
documentQueueToDocumentList document documentQueue = 
    DocumentList { documents  = (Queue.list documentQueue), selected = Just document}


encodeDocumentQueue : (Queue Document) -> Encode.Value 
encodeDocumentQueue documentQueue = 
  documentQueue
    |> Queue.list 
    |> List.map .id
    |> encodeIntList

encodeIntList : (List Int) -> Encode.Value 
encodeIntList intList_ = 
   Encode.list Encode.int intList_
   
