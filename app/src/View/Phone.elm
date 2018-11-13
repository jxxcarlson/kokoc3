module View.Phone exposing (phoneView)

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
        , ErrorResponse(..)
        , Model
        , Msg(..)
        , PreferencesPanelState(..)
        , SignupMode(..)
        , ToolPanelState(..)
        )
import Time
import User exposing (BigUser, Token, User, UserMsg(..), readToken, stringFromMaybeToken)
import View.Common as Common
import View.EditorTools as EditorTools
import View.Widget as Widget exposing (..)
import VirtualDom exposing (Handler(..))


phoneView model =
    Element.layout [ Font.size 14, width fill, height fill, clipY ] <|
        Element.column []
            [ header model
            , body model
            ]


header : Model -> Element Msg
header model =
    Element.row [ width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0, spacing 10, alignLeft ]
        [ Element.row [ spacing 10 ]
            [ searchInput model
            , searchButton (px 90) model

            -- , getRandomDocumentsButton (px 70) model
            ]
        ]


searchInput : Model -> Element Msg
searchInput model =
    Input.text
        [ htmlAttribute (Html.Attributes.id "search-box")
        , width (px 200)
        , height (px 30)
        , Font.color black
        ]
        { text = model.searchQueryString
        , placeholder = Just (Input.placeholder [ moveUp 5 ] (text <| searchPlaceHolderText model))
        , onChange = \str -> AcceptSearchQuery str
        , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
        }


searchPlaceHolderText : Model -> String
searchPlaceHolderText model =
    "Example: type 'wave'"


searchButton : Length -> Model -> Element Msg
searchButton width_ model =
    Input.button (buttonStyle width_)
        { onPress = Just Search
        , label = Element.el [] (Element.text "Search")
        }


body : Model -> Element Msg
body model =
    Element.column
        [ width (currentWidth model)
        , height (currentHeight model)
        , Background.color Widget.lightGrey
        , centerX
        , clipX
        , clipY
        ]
        [ DocumentView.view model
        ]


currentWidth : Model -> Length
currentWidth model =
    px <| round <| model.viewport.viewport.width


currentHeight : Model -> Length
currentHeight model =
    px <| round <| model.viewport.viewport.height
