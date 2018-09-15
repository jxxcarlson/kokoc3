module ElmMarkup exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Keyed as Keyed
import Element.Border as Border
import Mark
import Document exposing(Document)

view : Document -> Element msg 
view document =
  let 
    parsedElement = 
      case Mark.parseWith options (document.content) of 
        Ok parsedContent -> (parsedContent Element.none)
        Err error -> Element.el [] (Element.text "Oops, Markup parse error")
  in 
    Element.row [ 
           Element.paddingEach {top = 0, bottom = 120, left = 0, right = 0}
         ] [parsedElement]

options =
    { styling =
        \model -> elmMarkupDefaults
    , blocks =
        Mark.defaultBlocks
    , inlines =
         []
    }


elmMarkupDefaults = { root =
        [ Element.spacing 24
        , Element.width (Element.px 600)
        , Element.centerX
        , Element.padding 0
        ]
    , block = []
    , monospace =
        [ Element.spacing 5
        , Element.padding 24
        , Background.color
            (Element.rgba 0 0 0 0.04)
        , Border.rounded 2
        , Font.size 16
        , Font.family
            [ Font.external
                { url = "https://fonts.googleapis.com/css?family=Source+Code+Pro"
                , name = "Source Code Pro"
                }
            , Font.sansSerif
            ]
        ]
    , link =
        [ Font.color
            (Element.rgb
                (17 / 255)
                (132 / 255)
                (206 / 255)
            )
        , Element.mouseOver
            [ Font.color
                (Element.rgb
                    (234 / 255)
                    (21 / 255)
                    (122 / 255)
                )

            -- , Font.underline
            ]
        ]
    , token =
        [ Background.color
            (Element.rgba 0 0 0 0.04)
        , Border.rounded 2
        , Element.paddingXY 5 3
        , Font.size 16
        , Font.family
            [ Font.external
                { url = "https://fonts.googleapis.com/css?family=Source+Code+Pro"
                , name = "Source Code Pro"
                }
            , Font.sansSerif
            ]
        ]
    , listIcons = defaultListToken
    , list =
        [ Element.spacing 8
        ]
    , title =
        [ Font.size 48 ]
    , header =
        [ Font.size 36 ]
    }

defaultListToken : Mark.Cursor -> Mark.ListIcon -> Element msg
defaultListToken cursor symbol =
    let
        pad =
            Element.paddingEach
                { edges
                    | left =
                        case cursorLevel cursor of
                            1 ->
                                28

                            2 ->
                                56

                            3 ->
                                84

                            _ ->
                                84
                    , right = 12
                }
    in
    case symbol of
        Mark.Arrow ->
            Element.el
                [ pad ]
                (Element.text "➙")

        Mark.Bullet ->
            let
                icon =
                    case cursorLevel cursor of
                        1 ->
                            "•"

                        _ ->
                            "◦"
            in
            Element.el [ pad ] (Element.text icon)

        Mark.Number ->
            Element.el [ pad ]
                (Element.text
                    (String.join "."
                        (mapCursor String.fromInt cursor)
                    )
                )


cursorLevel ( current, nested ) =
    List.length nested + 1

mapCursor fn ( head, tail ) =
    List.map fn (head :: tail)

-- HELPERS

edges =
    { top = 0
    , right = 0
    , bottom = 0
    , left = 0
    }