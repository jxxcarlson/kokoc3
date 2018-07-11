module DocumentDictionary exposing(DocumentDictionary, empty, put, get, member) 

import Dict exposing(Dict)

import Document exposing(Document)


type DocumentDictionary = 
  DocumentDictionary (Dict String Document)

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
  