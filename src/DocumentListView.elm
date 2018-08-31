module DocumentListView exposing(viewWithHeading, DocListViewMsg(..))

import Element exposing (..)
import Element.Input as Input
import Element.Font as Font exposing(Font)
import View.Widget as Widget

import DocumentList exposing(DocumentList, documents)
import Document exposing(Document, DocType(..))

type DocListViewMsg =  
  SetCurrentDocument Document

  

viewWithHeading : Int -> Bool -> String -> DocumentList -> Element DocListViewMsg
viewWithHeading height_ masterDocLoaded heading docList = 
  Element.column [ spacing 10] [
     Element.el [moveRight 45, Font.size 18, Font.bold] (text heading)
    , view height_ masterDocLoaded docList
  ]

view : Int -> Bool -> DocumentList -> Element DocListViewMsg 
view height_ masterDocLoaded docList =
  case ((DocumentList.getFirst docList).docType, masterDocLoaded) of 
    (Master, True) -> viewTableOfContents height_ docList 
    (Master, False) -> viewSearchResults height_ docList 
    (Standard, _) -> viewSearchResults height_ docList 

viewSearchResults : Int -> DocumentList -> Element DocListViewMsg 
viewSearchResults height_ docList =
  Element.column [spacing 5, scrollbarY, height (px (height_ - 150)) ] 
    ( List.map (activeDocTitle (DocumentList.selected docList)) (documents docList) )


viewTableOfContents : Int -> DocumentList -> Element DocListViewMsg 
viewTableOfContents height_ docList =
  Element.column [spacing 5, scrollbarY, height (px (height_ - 150)) ] 
    ( List.indexedMap (activeDocTitleWithIndex (DocumentList.selected docList)) (documents docList) )

viewDocument doc =
    Element.el (Widget.listItemStyle  (px 140)) (text doc.title)

transformedTitle : Document -> String
transformedTitle doc = 
  case doc.docType of 
    Master -> String.toUpper doc.title
    Standard -> doc.title


activeDocTitle : Maybe Document -> Document -> Element DocListViewMsg    
activeDocTitle  maybeSelectedDocument document = 
  Element.el [] (
        Input.button (Widget.listItemStyle  (px 190)) {
            onPress =  Just(SetCurrentDocument document)
        , label = Element.el (selectedElementStyle maybeSelectedDocument document) (Element.text (transformedTitle document))
        } 
    )

activeDocTitleWithIndex : Maybe Document -> Int -> Document -> Element DocListViewMsg    
activeDocTitleWithIndex  maybeSelectedDocument index document = 
  Element.el [] (
        Input.button (Widget.listItemStyle  (px 190)) {
            onPress =  Just(SetCurrentDocument document)
        , label = Element.el (selectedElementStyle maybeSelectedDocument document) (titleWithIndex index document)
        } 
    )

titleWithIndex index document = 
  case (index == 0) of 
    True ->  (Element.text <| transformedTitle document)
    False -> (Element.text <| (String.fromInt index) ++ ". " ++ (transformedTitle document))

selectedElementStyle : Maybe Document -> Document -> List (Element.Attribute msg)
selectedElementStyle maybeSelectedDocument document = 
  case maybeSelectedDocument of 
    Nothing -> [Font.regular, Font.color Widget.blue]
    Just selectedDocument -> if selectedDocument.id == document.id then 
                                  [Font.extraBold, Font.color Widget.darkRed]
                                else  
                                   [Font.regular, Font.color Widget.blue]