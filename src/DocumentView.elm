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
    Element.column [spacing 15] [
        Element.el [Font.size 18, Font.bold] (text viewDoc.title)
        , Element.el [width (px 600), height (px 570), scrollbarY] (viewDoc.content)
    ]

-- VIEW




    