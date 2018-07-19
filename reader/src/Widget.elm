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

listItemStyleNarrow width_ = [
     Font.size 13 
    , mouseDown [  Font.size 13, Background.color lightYellow]
    , Font.color blue
    , width width_
    , height (px 16)
    , paddingXY 20 0
    , clipX
   ]

listItemStyleNarrow2 width_ = [
     Font.size 13 
    , mouseDown [  Font.size 13, Background.color lightYellow]
    , Font.color blue
    , width width_
    , height (px 16)
    , clipX
   ]


titleStyle = [
     Font.size 13 
    , mouseDown [  Font.size 13]
    , Font.color blue
    , paddingXY 10 0
    , clipX
   ]

titleStyleLight = [
     Font.size 13 
    , mouseDown [  Font.size 13]
    , Font.color mediumLightBlue
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

buttonStyleWithColor backgroundColor width_  = [
     Font.size 13 
    , mouseDown [  Font.size 13, Background.color mouseDownColor]
    , Background.color backgroundColor, Font.color white
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , Border.rounded 8
   ]

mouseDownColor = 
  Element.rgb 0.7 0.1 0.1

buttonColor = Element.rgb 0.3 0.3 0.3

charcoal = Element.rgb 0.4 0.4 0.4

grey = Element.rgb 0.8 0.8 0.8

lightGrey = Element.rgb 0.95 0.95 0.95

lightBlue = Element.rgb 0.85 0.85 0.9

mediumLightBlue = Element.rgb 0.75 0.75 1.0

lightYellow = Element.rgb 0.9 0.9 0.8

orange = Element.rgb 0.9 0.85 0.2

black = Element.rgb 0.1 0.1 0.1

blue = Element.rgb 0.3 0.3 0.5

red = Element.rgb 1.0 0 0.0

darkRed = Element.rgb 0.45 0.0 0.0

white = Element.rgb 1.0 1.0 1.0

indicatorBad = Element.rgb 1.0 0.9 0.0

indicatorGood = Element.rgb 0.0 0.9 0.0

linkButton url label_ width_ =
  newTabLink (listItemStyleNarrow2 width_)
      { url = url
      , label = text label_
      }

linkButtonFat url label_ width_ =
  newTabLink (buttonStyle width_)
      { url = url
      , label = Element.el [moveDown 0] (text label_)
      }