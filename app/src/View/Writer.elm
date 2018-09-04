module View.Writer exposing(view)


import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed

import Browser.Dom exposing(Viewport)

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
import View.Widget as Widget exposing(..)



view : Model -> Element Msg
view model = 
  Element.row [width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX] [
     leftColumn 2 model,  editor model.windowHeight 5 model, reader model.viewport 5 model
  ]

reader : Viewport -> Int -> Model -> Element Msg
reader viewport portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (round <| viewport.viewport.height - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view viewport model.counter model.debounceCounter (Common.texMacros model) model.currentDocument)
  ]

editor : Int -> Int -> Model -> Element Msg
editor windowHeight_ portion_ model  = 
  Element.column [width (fillPortion portion_), height (px (round <| model.viewport.viewport.height - 80))
    , Background.color Widget.lightYellow, centerX] [
     textArea model (fillPortion portion_) "Editor"
  ]

textArea model width_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (px (round <| model.viewport.viewport.height - 80)), paddingXY 10 0, scrollbarY ]
                { onChange = GetContent
                , text = model.currentDocument.content
                , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]
-- (px (windowHeight_ - 40))



leftColumn : Int -> Model -> Element Msg
leftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        Element.row [spacing 10] [ Common.toggleToolsButton (px 90) model, EditorTools.newDocumentButton model ]
      , Element.row [spacing 10] [EditorTools.newMasterButton model , EditorTools.newChildButton model] 
      , EditorTools.toolsOrContents model
  ]