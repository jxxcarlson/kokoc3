module View.Common exposing (documentViewData, texMacros, toggleToolsButton, toggleToolsTitle)

import BigEditRecord exposing (BigEditRecord)
import Document exposing (DocType(..))
import DocumentDictionary
import DocumentList
import DocumentListView
import DocumentView exposing (DocumentViewData)
import Element exposing (Element, Length)
import Element.Input as Input
import Html exposing (Html)
import Model exposing (AppMode(..), Model, Msg(..), ToolPanelState(..))
import View.Widget as Widget


texMacros : Model -> String
texMacros model =
    case DocumentDictionary.get "texmacros" model.documentDictionary of
        Nothing ->
            ""

        Just doc ->
            doc.content


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


documentViewData : Model -> DocumentViewData
documentViewData model =
    { viewport = model.viewport
    , counter = model.counter
    , debounceCounter = model.debounceCounter
    , texMacros = texMacros model
    , document = model.currentDocument
    , bigEditRecord = model.bigEditRecord
    , seed = model.seed
    }
