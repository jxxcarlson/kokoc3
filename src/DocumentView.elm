module DocumentView exposing(view, DocViewMsg(..))

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy
import Element.Keyed as Keyed

import Html exposing(Html) 

import Document exposing(Document, DocumentView, viewDocument)
import Widget


type DocViewMsg = 
  LoadMaster Int
  | LoadMasterWithCurrentSelection Int


view : Int -> String -> Document -> Element DocViewMsg 
view counter texMacros doc = 
  let 
    viewDoc = viewDocument texMacros doc 
  in 
    Element.column [spacing 15] [
        titleLine doc
        , (contentView counter viewDoc)
    ]

contentView counter viewDoc = 
  Keyed.el [width (px 600), height (px 570), scrollbarY] ((String.fromInt counter), viewDoc.content)


titleLine : Document -> Element DocViewMsg 
titleLine document = 
  if document.parentId == 0 then 
    Element.el [Font.size 18, Font.bold] (text document.title) 
  else 
    Element.row [moveLeft 15] [loadMasterDocumentButton  document, Element.el [moveLeft 13, Font.size 18, Font.bold] (text document.title) ]



loadMasterDocumentButton : Document -> Element DocViewMsg    
loadMasterDocumentButton  document = 
  Element.el [] (
        Input.button (Widget.titleStyle) {
            onPress =  Just (LoadMasterWithCurrentSelection document.parentId)
        , label = Element.el [ moveUp 0, padding 5, Font.size 18, Font.bold] (text (document.parentTitle ++ " :: "))
        } 
    )
    