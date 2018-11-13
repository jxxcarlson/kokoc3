module View.Common exposing (toggleToolsButton, toggleToolsTitle)

import BigEditRecord exposing (BigEditRecord)
import Document exposing (DocType(..))
import DocumentDictionary
import DocumentList
import DocumentListView
import Element exposing (Element, Length)
import Element.Input as Input
import Html exposing (Html)
import Model exposing (AppMode(..), Model, Msg(..), ToolPanelState(..))
import View.Widget as Widget


toggleToolsButton : Length -> Model -> Element Msg
toggleToolsButton width_ model =
    case model.appMode of
        Writing ->
            Input.button (Widget.buttonStyle width_)
                { onPress = Just ToggleToolPanelState
                , label = Element.el [] (Element.text (toggleToolsTitle model.toolPanelState))
                }

        _ ->
            Element.none


toggleToolsTitle : ToolPanelState -> String
toggleToolsTitle toolPanelState =
    case toolPanelState of
        ShowToolPanel ->
            "Hide tools"

        HideToolPanel ->
            "Editor tools"

