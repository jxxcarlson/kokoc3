module DocumentView exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy

import Html exposing(Html) 

import Document exposing(Document, DocumentView, viewDocument)

view : Document -> Element msg 
view doc = 
  let 
    viewDoc = viewDocument doc 
  in 
    Element.column [] [
        Element.el [] (text viewDoc.title)
        , Element.el [width (px 600), height (px 580), scrollbarY] (viewDoc.content)
    ]

-- VIEW




    