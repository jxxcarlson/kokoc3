module DocumentListView exposing(view, viewWithHeading, DocListViewMsg(..))

import Element exposing (..)
import Element.Input as Input
import Element.Font as Font exposing(Font)
import Widget

import DocumentList exposing(DocumentList, documents)
import Document exposing(Document, DocType(..))

type DocListViewMsg = 
  SetCurrentDocument Document


viewWithHeading : Int -> String -> DocumentList -> Element DocListViewMsg
viewWithHeading height_ heading docList = 
  Element.column [ spacing 10] [
     Element.el [moveRight 10, Font.size 18, Font.bold] (text heading)
    , view height_ docList
  ]

view : Int -> DocumentList -> Element DocListViewMsg 
view height_ docList =
  Element.column [spacing 5, scrollbarY, height (px (height_ - 150)) ] 
    ( List.map (setCurrentDocumentButton <| DocumentList.selected  docList) (documents docList) )

viewDocument doc =
    Element.el (Widget.listItemStyle  (px 140)) (text doc.title)

transformedTitle : Document -> String
transformedTitle doc = 
  case doc.docType of 
    Master -> String.toUpper doc.title
    Standard -> doc.title


setCurrentDocumentButton : Maybe Document -> Document -> Element DocListViewMsg    
setCurrentDocumentButton  maybeSelectedDocument document = 
  Element.el [] (
        Input.button (Widget.listItemStyle  (px 190)) {
            onPress =  Just(SetCurrentDocument document)
        , label = Element.el (selectedElementStyle maybeSelectedDocument document) (Element.text (transformedTitle document))
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