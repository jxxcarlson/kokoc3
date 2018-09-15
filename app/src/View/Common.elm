module View.Common exposing (..)

import Element exposing(Element, Length)
import Element.Input as Input

import Model exposing(Model, Msg(..), ToolPanelState(..), AppMode(..))
import DocumentDictionary
import DocumentListView
import DocumentList
import DocumentView exposing(DocumentViewData)
import Document exposing(DocType(..))
import View.Widget as Widget
import Html exposing(Html)

import BigEditRecord exposing(BigEditRecord)


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
     ShowToolPanel -> "Hide tools"
     HideToolPanel -> "Editor tools"


documentViewData : Model -> DocumentViewData
documentViewData model = 
  {
      viewport = model.viewport  
    , counter = model.counter
    , debounceCounter = model.debounceCounter 
    , texMacros = texMacros model
    , document = model.currentDocument
    , bigEditRecord = BigEditRecord.empty 0 0
    , seed = model.seed
  }

  