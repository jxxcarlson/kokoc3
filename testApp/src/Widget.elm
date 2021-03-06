module Widget exposing (..)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy


listItemStyle width_ = [
     Font.size 13 
    , mouseDown [  Font.size 13, Background.color lightYellow]
    , Font.color blue
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , clipX
   ]

titleStyle = [
     Font.size 13 
    , mouseDown [  Font.size 13]
    , Font.color blue
    , paddingXY 10 0
    , clipX
   ]

buttonStyle width_ = [
     Font.size 13 
    , mouseDown [  Font.size 13, Background.color mouseDownColor]
    , Background.color blue, Font.color white
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , Border.rounded 8
   ]

mouseDownColor = 
  Element.rgb 0.7 0.1 0.1

buttonColor = Element.rgb 0.3 0.3 0.3

grey = Element.rgb 0.8 0.8 0.8

lightGrey = Element.rgb 0.95 0.95 0.95

lightBlue = Element.rgb 0.85 0.85 0.9

lightYellow = Element.rgb 0.9 0.9 0.8

orange = Element.rgb 0.9 0.85 0.2

black = Element.rgb 0.1 0.1 0.1

blue = Element.rgb 0.0 0.0 1.0

darkRed = Element.rgb 0.55 0.0 0.0

white = Element.rgb 1.0 1.0 1.0
