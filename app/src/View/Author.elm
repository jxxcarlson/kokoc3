module View.Author exposing (view)

import Configuration
import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Html exposing (Html)
import Http
import Json.Decode as Decode exposing (Decoder, at, decodeString, int, list, string)
import Json.Encode as Encode
import Model exposing (Model, Msg(..))
import User exposing (BigUser, Token, User, UserMsg(..), readToken, stringFromMaybeToken)
import View.Widget as Widget exposing (..)


type AdminMsg
    = AcknowledgeUpdateOfDocument String


view : Model -> Element Msg
view model =
    Element.row [ width (fillPortion 4), height fill, Background.color Widget.white, centerX ]
        [ authorLeftColumn 2 model
        , authorCenterColumn model.windowHeight 4 model
        , authorRightColumn 2 model
        ]


authorLeftColumn : Int -> Model -> Element Msg
authorLeftColumn portion_ model =
    Element.column
        [ width (fillPortion portion_)
        , height fill
        , Background.color Widget.lightBlue
        , paddingXY 20 20
        , spacing 10
        ]
        [ showAuthorCount model
        , listUsersButton model
        ]


authorRightColumn : Int -> Model -> Element Msg
authorRightColumn portion_ model =
    Element.column
        [ width (fillPortion portion_)
        , height fill
        , Background.color Widget.lightBlue
        , paddingXY 20 20
        , spacing 10
        ]
        []


showAuthorCount : Model -> Element msg
showAuthorCount model =
    let
        n =
            List.length (List.filter (\user -> user.blurb /= "" && user.public) model.userList)
    in
        case n == 0 of
            True ->
                Element.none

            False ->
                Element.el [] (Element.text <| "Authors: " ++ String.fromInt n)


authorCenterColumn : Int -> Int -> Model -> Element Msg
authorCenterColumn windowHeight_ portion_ model =
    let
        userList =
            List.filter (\user -> user.blurb /= "" && user.public) model.userList
    in
        Element.column [ width (fillPortion portion_), height (px (windowHeight_ - 73)), scrollbarY ]
            [ Element.row [ spacing 10 ]
                [ Element.el [ paddingXY 30 10, Font.bold, width (px 145) ] (Element.text "Author/Home")
                , Element.el [ Font.bold, width (px 300) ] (Element.text "Blurb")
                ]
            , viewUsers userList
            ]


viewUsers : List BigUser -> Element Msg
viewUsers userList =
    Element.column [ spacing 10 ] (userList |> List.map viewUser)


viewUser : BigUser -> Element Msg
viewUser bigUser =
    Element.row [ spacing 10, paddingXY 10 0 ]
        [ authorHomePageButton bigUser
        , Element.paragraph [ width (px 300) ] [ Element.text bigUser.blurb ]
        , getAuthorDocumentsButton bigUser
        ]


boolToString : Bool -> String
boolToString boolValue =
    case boolValue of
        True ->
            "T"

        False ->
            "F"


listUsersButton : Model -> Element Msg
listUsersButton model =
    Input.button (Widget.buttonStyle (px 115))
        { onPress = Just GetUsers
        , label = Element.el [] (Element.text "List authors")
        }


getAuthorDocumentsButton : BigUser -> Element Msg
getAuthorDocumentsButton bigUser =
    Input.button (listItemStyleNarrowDark (px 100) ++ [ Font.center ])
        { onPress = Just (GetPublicDocumentsRawQuery ("authorname=" ++ bigUser.username ++ "&sort=title"))
        , label = Element.el [] (Element.text "Documents")
        }


authorHomePageButton : BigUser -> Element Msg
authorHomePageButton bigUser =
    Input.button (listItemStyleNarrowDark (px 135) ++ [ Font.center ])
        { onPress = Just (GoToUsersHomePage bigUser)
        , label = Element.el [] (Element.text bigUser.username)
        }
