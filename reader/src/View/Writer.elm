module View.Writer exposing(view)


import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed

import Html exposing(Html)
import Html.Attributes exposing(src, type_, value)
import Html.Events exposing(on)
import Time

import Json.Encode as Encode
import Json.Decode as Decode exposing(Decoder, Value)
import VirtualDom exposing (Handler(..))


import Model exposing(Model
    , Msg(..)
    , AppMode(..)
    , SignupMode(..)
    , ToolPanelState(..)
    , DeleteDocumentState(..)
  )
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import DocumentListView exposing(DocListViewMsg(..))
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
import DocumentView
import DocumentList
import DocumentDictionary
import Configuration
import AppUtility
import View.EditorTools as EditorTools
import View.Common as Common
import Widget exposing(..)



view : Model -> Element Msg
view model = 
  Element.row [width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX] [
     bodyLeftColumn 2 model,  bodyEditorColumn model.windowHeight 5 model, bodyReaderColumn model.windowHeight 5 model
  ]

bodyReaderColumn : Int -> Int -> Model -> Element Msg
bodyReaderColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view windowHeight_ model.counter model.debounceCounter (Common.texMacros model) model.currentDocument)
  ]

bodyEditorColumn : Int -> Int -> Model -> Element Msg
bodyEditorColumn windowHeight_ portion_ model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 80))
    , Background.color Widget.lightYellow, centerX] [
     textArea model (fillPortion portion_) windowHeight_ "Editor"
  ]

textArea model width_ windowHeight_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (px (windowHeight_ - 80)), paddingXY 10 0, scrollbarY ]
                { onChange = Just GetContent
                , text = model.currentDocument.content
                , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]
-- (px (windowHeight_ - 40))



bodyLeftColumn : Int -> Model -> Element Msg
bodyLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        Element.row [spacing 10] [ Common.toggleToolsButton (px 105) model, EditorTools.newDocumentButton model ]
      , EditorTools.newChildButton model 
      , EditorTools.toolsOrContents model
  ]