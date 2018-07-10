module DocumentView exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy
import Element.Keyed as Keyed

import Html exposing(Html) 

import Document exposing(Document, DocumentView, viewDocument)

view : Int -> Document -> Element msg 
view counter doc = 
  let 
    viewDoc = viewDocument doc 
  in 
    Element.column [spacing 15] [
        Element.el [Font.size 18, Font.bold] (text viewDoc.title)
        , Keyed.el [width (px 600), height (px 570), scrollbarY] ((String.fromInt counter), viewDoc.content)
    ]

-- VIEW




    