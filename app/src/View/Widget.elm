module View.Widget
    exposing
        ( black
        , blue
        , buttonColor
        , buttonStyle
        , buttonStyleWithColor
        , charcoal
        , darkBlue
        , darkGrey
        , darkRed
        , grey
        , indicatorBad
        , indicatorGood
        , lightBlue
        , lightGrey
        , lightYellow
        , linkButton
        , linkButtonWhite
        , linkButtonFat
        , listItemStyle
        , listItemStyleBold
        , listItemStyleBoldPale
        , listItemStyleLarge
        , listItemStyleNarrow
        , listItemStyleNarrowWhite
        , listItemStyleNarrow2
        , listItemStyleNarrowDark
        , mediumLightBlue
        , menuItemStyle
        , menuSeparatorStyle
        , mouseDownColor
        , orange
        , red
        , squareButtonStyle
        , titleButtonStyle
        , titleStyle
        , titleStyleLight
        , veryDarkGrey
        , white
        , whiteButtonStyle
        )

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Element.Lazy


menuItemStyle width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color white
    , Background.color charcoal
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , clipX
    ]


menuSeparatorStyle width_ =
    [ Font.size 10
    , Font.color white
    , Background.color charcoal
    , width width_
    , height (px 10)
    , paddingXY 10 0
    , clipX
    ]


listItemStyle width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color blue
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , clipX
    ]


listItemStyleBold width_ =
    [ Font.size 14
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color blue
    , Font.bold
    , width width_
    , height (px 24)
    , clipX
    ]


listItemStyleLarge width_ =
    [ Font.size 16
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color blue
    , width width_
    , height (px 24)
    , clipX
    ]


listItemStyleBoldPale width_ =
    [ Font.size 14
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color (Element.rgb 0.75 0.75 0.9)
    , Font.bold
    , width width_
    , height (px 24)
    , clipX
    ]


listItemStyleNarrow width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color blue
    , width width_
    , height (px 16)
    , paddingXY 20 0
    , clipX
    ]


listItemStyleNarrowWhite width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color (rgb255 200 200 200)
    , width width_
    , height (px 16)
    , paddingXY 20 0
    , clipX
    ]


listItemStyleNarrowDark width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color darkBlue
    , width width_
    , height (px 16)
    , paddingXY 20 0
    , clipX
    ]


listItemStyleNarrow2 width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color blue
    , width width_
    , height (px 16)
    , clipX
    ]


listItemStyleNarrow2White width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color lightYellow ]
    , Font.color (rgb255 200 200 200)
    , Font.bold
    , width width_
    , height (px 16)
    , clipX
    ]


titleStyle =
    [ Font.size 13
    , mouseDown [ Font.size 13 ]
    , Font.color blue
    , paddingXY 10 0
    , clipX
    ]


titleStyleLight =
    [ Font.size 13
    , mouseDown [ Font.size 13 ]
    , Font.color mediumLightBlue
    , paddingXY 10 0
    , clipX
    ]


buttonStyle width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color mouseDownColor ]
    , Background.color blue
    , Font.color white
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , Border.rounded 8
    ]


titleButtonStyle width_ =
    [ Font.size 24
    , mouseDown [ Font.size 13, Background.color mouseDownColor ]

    -- , Background.color Fong.color.gray, Font.color white
    , width width_
    , Font.color blue
    , height (px 28)
    , paddingXY 10 0
    , moveDown 3
    ]


whiteButtonStyle width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color mouseDownColor ]
    , Background.color white
    , Font.color charcoal
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , Border.rounded 8
    ]


squareButtonStyle width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color mouseDownColor ]
    , Background.color charcoal
    , Font.color white
    , width width_
    , height (px 24)
    , paddingXY 10 0
    ]


buttonStyleWithColor backgroundColor width_ =
    [ Font.size 13
    , mouseDown [ Font.size 13, Background.color mouseDownColor ]
    , Background.color backgroundColor
    , Font.color white
    , width width_
    , height (px 24)
    , paddingXY 10 0
    , Border.rounded 8
    ]


mouseDownColor =
    Element.rgb 0.7 0.1 0.1


buttonColor =
    Element.rgb 0.3 0.3 0.3


charcoal =
    Element.rgb 0.3 0.3 0.3


grey =
    Element.rgb 0.8 0.8 0.8


lightGrey =
    Element.rgb 0.95 0.95 0.95


darkGrey =
    Element.rgb 0.45 0.45 0.45


veryDarkGrey =
    Element.rgb 0.2 0.2 0.2


lightBlue =
    Element.rgb 0.85 0.85 0.9


mediumLightBlue =
    Element.rgb 0.75 0.75 1.0


lightYellow =
    Element.rgb 0.9 0.9 0.8


orange =
    Element.rgb 0.9 0.85 0.2


black =
    Element.rgb 0.1 0.1 0.1


blue =
    Element.rgb 0.3 0.3 0.5


darkBlue =
    Element.rgb 0.3 0.3 0.8


red =
    Element.rgb 1.0 0 0.0


darkRed =
    Element.rgb 0.45 0.0 0.0


white =
    Element.rgb 1.0 1.0 1.0


indicatorBad =
    Element.rgb 0.9 0.9 0.0


indicatorGood =
    Element.rgb 0.1 0.9 0.0


linkButton url label_ width_ =
    newTabLink (listItemStyleNarrow2 width_)
        { url = url
        , label = text label_
        }


linkButtonWhite url label_ width_ =
    newTabLink (listItemStyleNarrow2White width_)
        { url = url
        , label = text label_
        }


linkButtonFat url label_ width_ =
    newTabLink (buttonStyle width_)
        { url = url
        , label = Element.el [ moveDown 0 ] (text label_)
        }
