module View.Common exposing (..)

import Element exposing(Element, Length)
import Element.Input as Input

import Model exposing(Model, Msg(..), ToolPanelState(..), AppMode(..))
import DocumentDictionary
import DocumentListView
import DocumentList
import Document exposing(DocType(..))
import View.Widget as Widget


texMacros : Model -> String
texMacros model = 
  case DocumentDictionary.get "texmacros"  model.documentDictionary of 
    Nothing -> ""
    Just doc -> doc.content


toggleToolsButton : Length -> Model -> Element Msg    
toggleToolsButton width_ model = 
  case model.appMode  of 
    Writing -> 
      Input.button (Widget.buttonStyle width_ ) {
        onPress =  Just (ToggleToolPanelState)
      , label = Element.el [] (Element.text (toggleToolsTitle model.toolPanelState))
      }
    _ -> Element.none

   

toggleToolsTitle : ToolPanelState -> String 
toggleToolsTitle toolPanelState =
  case toolPanelState of 
     ShowToolPanel -> "Hide attributes"
     HideToolPanel -> "Edit attributes"



