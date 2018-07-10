module DocumentListView exposing(view)

import Element exposing (..)

import DocumentList exposing(DocumentList, documents)
import Document exposing(Document)

view : DocumentList -> Element msg 
view docList =
  Element.column [spacing 5 ] ( List.map (viewDocument) (documents docList) )

viewDocument :  Document -> Element msg 
viewDocument doc =
    Element.el [] (text doc.title)
  
