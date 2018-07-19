module DocumentView exposing(view, DocViewMsg(..))

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy
import Element.Keyed as Keyed

import Html exposing(Html) 

import Document exposing(Document, DocumentView)
import Widget


type DocViewMsg = 
  LoadMaster Int
  | LoadMasterWithCurrentSelection Int


view : Int -> Int -> Int -> String -> Document -> Element DocViewMsg 
view windowHeight_ counter debounceCounter texMacros document = 
    Element.column [spacing 15, width (fill |> maximum 600), centerX] [
        titleLine document
        , (contentView windowHeight_ counter (Document.view debounceCounter texMacros document ))
    ]

contentView windowHeight_ counter viewDoc = 
  Keyed.el [width (fill), height (px (windowHeight_ - 150)), scrollbarY] ((String.fromInt counter), viewDoc.content)


titleLine : Document -> Element DocViewMsg 
titleLine document = 
  if document.parentId == 0 then 
    Element.row titleLineStyle [Element.el [Font.size 18, Font.bold] (text document.title) ]
  else 
    Element.row titleLineStyle [loadMasterDocumentButton  document, Element.el [moveLeft 13, Font.size 18, Font.bold] (text document.title) ]

titleLineStyle = [paddingXY 10 0, Background.color Widget.charcoal, Font.color Widget.white, width fill, height (px 36)] 

loadMasterDocumentButton : Document -> Element DocViewMsg    
loadMasterDocumentButton  document = 
  Element.el [] (
        Input.button (Widget.titleStyleLight) {
            onPress =  Just (LoadMasterWithCurrentSelection document.parentId)
        , label = Element.el [ moveUp 0, padding 5, Font.size 18, Font.bold] (text (document.parentTitle ++ " :: "))
        } 
    )
    