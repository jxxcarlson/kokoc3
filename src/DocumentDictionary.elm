module DocumentDictionary exposing(DocumentDictionary, empty, put, 
  get, member, matchId, putTexMacroDocumentInDictionaryById, loadTexMacros, DocDictMsg(..)) 

import Dict exposing(Dict)
import Http 

import Document exposing(Document, DocumentRecord)
import Utility


type DocumentDictionary = 
  DocumentDictionary (Dict String Document)
  

type DocDictMsg = 
  PutDocumentInDictionaryAsTexMacros (Result Http.Error DocumentRecord)


empty = DocumentDictionary Dict.empty

put : String -> Document -> DocumentDictionary -> DocumentDictionary 
put key document (DocumentDictionary dict) = 
  DocumentDictionary (Dict.insert key document dict)

get : String -> DocumentDictionary -> Maybe Document
get key (DocumentDictionary dict) = 
  Dict.get key dict

member : String -> DocumentDictionary -> Bool 
member key (DocumentDictionary dict) =
  Dict.member key dict
  
matchId : Int -> String -> DocumentDictionary -> Bool 
matchId id key (DocumentDictionary dict) = 
  let 
    maybeDocument = Dict.get key dict
  in 
    case maybeDocument of 
      Nothing -> False 
      Just doc -> doc.id == id 

putTexMacroDocumentInDictionaryById : Int -> Maybe String -> Cmd DocDictMsg
putTexMacroDocumentInDictionaryById id maybeTokenString = 
  Http.send PutDocumentInDictionaryAsTexMacros (Document.getDocumentByIdRequest id maybeTokenString)


loadTexMacros : Maybe String -> Document -> List String -> DocumentDictionary -> Cmd DocDictMsg
loadTexMacros maybeTokenString document tagList documentDictionary =
  let 
    maybeTexMacroIdString = Utility.lookUpKeyInTagList "texmacros" tagList
    (texMacrosPresent, id) = case maybeTexMacroIdString of 
        Nothing -> (False, 0) 
        Just idString -> 
            let 
                id_ = String.toInt idString |> Maybe.withDefault 0
                matches = matchId id_ "texmacros" documentDictionary 
            in 
                (matches, id_)
  in 
    case (texMacrosPresent, id) of 
      (False, id_) -> putTexMacroDocumentInDictionaryById id_ maybeTokenString
      (True, id_) -> putTexMacroDocumentInDictionaryById id_ maybeTokenString