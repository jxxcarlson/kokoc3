module DocumentListView exposing(view, DocListViewMsg(..))

import Element exposing (..)
import Element.Input as Input
import Element.Font as Font exposing(Font)
import Widget

import DocumentList exposing(DocumentList, documents)
import Document exposing(Document)

type DocListViewMsg = 
  SetCurrentDocument Document


view : DocumentList -> Element DocListViewMsg 
view docList =
  Element.column [spacing 5, scrollbarY, height (px 400) ] 
    ( List.map (setCurrentDocumentButton <| DocumentList.selected  docList) (documents docList) )

viewDocument :  Document -> Element msg 
viewDocument doc =
    Element.el (Widget.listItemStyle  (px 140)) (text doc.title)


setCurrentDocumentButton : Maybe Document -> Document -> Element DocListViewMsg    
setCurrentDocumentButton  maybeSelectedDocument document = 
  Element.el [] (
        Input.button (Widget.listItemStyle  (px 190)) {
            onPress =  Just(SetCurrentDocument document)
        , label = Element.el (selectedElementStyle maybeSelectedDocument document) (Element.text document.title)
        } 
    )

selectedElementStyle : Maybe Document -> Document -> List (Element.Attribute msg)
selectedElementStyle maybeSelectedDocument document = 
  case maybeSelectedDocument of 
    Nothing -> [Font.regular, Font.color Widget.blue]
    Just selectedDocument -> if selectedDocument.id == document.id then 
                                  [Font.extraBold, Font.color Widget.darkRed]
                                else  
                                   [Font.regular, Font.color Widget.blue]