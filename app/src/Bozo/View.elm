module Bozo.View exposing (..)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Bozo.Model exposing (BozoModel, BozoMsg(..), stringOfState)


view : BozoModel -> Element msg
view model =
    el [] (text <| "Bozo state: " ++ (stringOfState model.state))


buttonUp : Element BozoMsg
buttonUp =
    Input.button []
        { onPress = Just MoveUp
        , label = el buttonStyle (text "Up")
        }


buttonDown : Element BozoMsg
buttonDown =
    Input.button []
        { onPress = Just MoveDown
        , label = el buttonStyle (text "Down")
        }


buttonStyle =
    [ Background.color (rgb255 80 80 80)
    , Font.color (rgb 255 255 255)
    , paddingXY 8 4
    ]
