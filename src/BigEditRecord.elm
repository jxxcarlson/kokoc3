module BigEditRecord exposing(..)

import MiniLatex.Differ exposing (EditRecord)
import MiniLatex.MiniLatex as MiniLatex
import MiniLatexTools
import Document exposing(Document)
import Html exposing(Html)
import Element exposing(Element)

type BigEditRecord msg =
  BigEditRecord (EditRecord (Html msg)) Int Int -- editRecord docId seed

empty : Int -> Int -> BigEditRecord msg
empty docId_ seed_ = 
  BigEditRecord MiniLatex.emptyEditRecord docId_ seed_

isEmpty : BigEditRecord msg -> Bool
isEmpty ber = 
  ber |> editRecord |> .paragraphs |> (\x -> x == [])

fromText : String -> Int -> BigEditRecord msg
fromText text docId_ =  
  BigEditRecord (MiniLatex.initializeEditRecord 0 text) docId_ 0

fromDocument : Document -> String -> BigEditRecord msg
fromDocument document texMacros = 
  BigEditRecord (MiniLatexTools.setupEditRecord texMacros document) document.id 0

seed : BigEditRecord msg -> Int   
seed (BigEditRecord editRecord_ docId_ seed_) = seed_

docId : BigEditRecord msg -> Int   
docId (BigEditRecord editRecord_ docId_ seed_) = docId_

editRecord : BigEditRecord msg -> EditRecord (Html msg)     
editRecord (BigEditRecord editRecord_ docId_ seed_) = editRecord_

updateFromDocument : BigEditRecord msg -> Document -> String -> Int -> BigEditRecord msg
updateFromDocument ber document texMacros seed_ = 
  case (docId ber) == document.id of  
    True -> BigEditRecord (MiniLatexTools.updateEditRecord (editRecord ber) seed_ texMacros document) document.id seed_
    False -> BigEditRecord (MiniLatexTools.setupEditRecord texMacros document) document.id 0

getRenderedText : BigEditRecord msg -> List (Html msg)
getRenderedText ber = 
   MiniLatex.getRenderedText (editRecord ber)


getRenderedTextAsElements : BigEditRecord msg -> List (Element msg)
getRenderedTextAsElements ber = 
   MiniLatex.getRenderedText (editRecord ber) |> List.map Element.html

idListAsString : BigEditRecord msg -> String   
idListAsString ber = 
  ber |> editRecord |> .idList |> String.join(", ")