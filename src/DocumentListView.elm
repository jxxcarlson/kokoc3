module DocumentListView exposing(view, DocListViewMsg(..))

import Element exposing (..)
import Element.Input as Input
import Widget

import DocumentList exposing(DocumentList, documents)
import Document exposing(Document)

type DocListViewMsg = 
  SetCurrentDocument Document

view : DocumentList -> Element DocListViewMsg 
view docList =
  Element.column [spacing 5 ] ( List.map (setCurrentDocumentButton) (documents docList) )

viewDocument :  Document -> Element msg 
viewDocument doc =
    Element.el [] (text doc.title)
  
setCurrentDocumentButton : Document -> Element DocListViewMsg    
setCurrentDocumentButton  document = 
  Input.button (Widget.listItemStyle  (px 140)) {
    onPress =  Just(SetCurrentDocument document)
  , label = Element.text document.title
  } 