module View.Writer exposing (view)

import AppUtility
import Browser.Dom exposing (Viewport)
import Configuration
import Document exposing (DocMsg(..), DocType(..), Document, TextType(..))
import DocumentDictionary
import DocumentList
import DocumentListView exposing (DocListViewMsg(..))
import DocumentView
import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Html exposing (Html)
import Html.Attributes exposing (src, type_, value)
import Html.Events exposing (on)
import Json.Decode as Decode exposing (Decoder, Value)
import Json.Encode as Encode
import Model
    exposing
        ( AppMode(..)
        , DeleteDocumentState(..)
        , Model
        , Msg(..)
        , SignupMode(..)
        , ToolPanelState(..)
        )
import Time
import User exposing (BigUser, Token, User, UserMsg(..), readToken, stringFromMaybeToken)
import View.Common as Common
import View.EditorTools as EditorTools
import View.Widget as Widget exposing (..)
import VirtualDom exposing (Handler(..))


view : Model -> Element Msg
view model =
    Element.row [ width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX ]
        [ leftColumn 2 model
        , editor model.windowHeight 5 model
        , reader model.viewport 5 model
        ]


reader : Viewport -> Int -> Model -> Element Msg
reader viewport portion_ model =
    Element.column
        [ width (fillPortion portion_)
        , height (px (round <| viewport.viewport.height - 73))
        , paddingXY 20 20
        , Background.color Widget.lightGrey
        , centerX
        ]
        [ DocumentView.view model
        ]


editor : Int -> Int -> Model -> Element Msg
editor windowHeight_ portion_ model =
    Element.column
        [ width (fillPortion portion_)
        , height (px (round <| model.viewport.viewport.height - 80))
        , Background.color Widget.lightYellow
        , centerX
        ]
        [ textArea model (fillPortion portion_) "Editor"
        ]


textArea model width_ label_ =
    -- ### textArea
    Keyed.row []
        [ ( String.fromInt model.counter
          , Input.multiline
                [ width width_
                , height (px (round <| model.viewport.viewport.height - 80))
                , paddingXY 10 0
                , scrollbarY
                , Element.htmlAttribute <| Html.Attributes.attribute "id" "_textArea_"
                ]
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
    Element.column
        [ width (fillPortion portion_)
        , height fill
        , Background.color Widget.lightBlue
        , paddingXY 20 20
        , spacing 25
        , alignTop
        ]
        [ Element.row [ spacing 16 ] [ editorButtons model ]
        , EditorTools.documentTitleInput model
        , EditorTools.publicControls model
        , EditorTools.toolsOrContents model
        ]


editorButtons : Model -> Element Msg
editorButtons model =
    Element.column [ spacing 8 ]
        [ Element.row [ spacing 10 ] [ Common.toggleToolsButton (px 90) model, EditorTools.newDocumentButton model ]
        , Element.row [ spacing 10 ] [ EditorTools.newMasterButton model, EditorTools.newChildButton model ]
        , Element.row [ spacing 8 ] [ EditorTools.deleteDocumentButton model, EditorTools.saveSettingsButton model ]
        , EditorTools.versionsPanel model
        ]
