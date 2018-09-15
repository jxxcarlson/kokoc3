module BigEditRecord exposing(..)

import MiniLatex.Differ exposing (EditRecord)
import MiniLatex.MiniLatex as MiniLatex
import MiniLatexTools
import Document exposing(Document)
import Html exposing(Html)

type BigEditRecord msg =
  BigEditRecord (EditRecord (Html msg)) Int Int -- editRecord docId seed

makeFromText : String -> Int -> BigEditRecord msg
makeFromText text docId_ =  
  BigEditRecord (MiniLatex.initializeEditRecord 0 text) docId_ 0

makeFromDocument : Document -> String -> BigEditRecord msg
makeFromDocument document texMacros = 
  BigEditRecord (MiniLatexTools.setupEditRecord texMacros document) 0 document.id

seed : BigEditRecord msg -> Int   
seed (BigEditRecord editRecord_ docId_ seed_) = seed_

docId : BigEditRecord msg -> Int   
docId (BigEditRecord editRecord_ docId_ seed_) = docId_

editRecord : BigEditRecord msg -> EditRecord (Html msg)     
editRecord (BigEditRecord editRecord_ docId_ seed_) = editRecord_

updateFromDocument : BigEditRecord msg -> Document -> String -> Int -> BigEditRecord msg
updateFromDocument ber document texMacros seed_ = 
  case (docId ber) == document.id of  
    True -> BigEditRecord (MiniLatexTools.updateEditRecord (editRecord ber) seed_ texMacros document) 0 document.id
    False -> BigEditRecord (MiniLatexTools.setupEditRecord texMacros document) 0 document.id
      
