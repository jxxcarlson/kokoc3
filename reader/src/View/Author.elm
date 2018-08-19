module View.Author exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Http
import Json.Encode as Encode
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)


import Model exposing(Model, Msg(..))
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import View.Widget as Widget exposing(..)
import Configuration

type AdminMsg = 
    AcknowledgeUpdateOfDocument String
 

view : Model -> Element Msg
view model = 
  Element.row [width (fillPortion 4), height fill, Background.color Widget.white, centerX] [
     authorLeftColumn 2 model,  authorCenterColumn model.windowHeight 4 model, authorRightColumn 2 model
  ]

authorLeftColumn : Int -> Model -> Element Msg
authorLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        showUserCount model
      , listUsersButton  model  
  ]

authorRightColumn : Int -> Model -> Element Msg
authorRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
   
  ]

showUserCount : Model -> Element msg 
showUserCount model = 
  let 
    n = List.length (List.filter (\user -> user.blurb /= "") model.userList)
  in 
    case n == 0 of 
      True -> Element.none 
      False -> Element.el [] (Element.text <| "Users: " ++ String.fromInt n)


authorCenterColumn : Int -> Int -> Model -> Element Msg
authorCenterColumn windowHeight_ portion_  model  = 
  let 
    userList = List.filter (\user -> user.blurb /= "") model.userList
  in 
    Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73)), scrollbarY] [ 
        Element.row [  spacing 10] [
          Element.el [paddingXY 30 10, Font.bold, width (px 145)] (Element.text "Author")
          , Element.el [Font.bold, width (px 300)] (Element.text "Blurb")
        ]
      , viewUsers userList 
    ]


viewUsers : List BigUser -> Element Msg 
viewUsers userList =  
  Element.column [spacing 10] (userList |> List.map viewUser)

viewUser : BigUser -> Element Msg 
viewUser bigUser = 
  Element.row [spacing 10, paddingXY 10 0] [
      authorHomePageButton bigUser
    , Element.paragraph [width (px 300)] [Element.text bigUser.blurb]
    , getAuthorDocumentsButton bigUser 
  ]

boolToString : Bool -> String 
boolToString boolValue = 
  case boolValue of 
    True -> "T"
    False -> "F"

listUsersButton : Model -> Element Msg 
listUsersButton model = 
    Input.button (Widget.buttonStyle  (px 115)) {
      onPress =  Just GetUsers
    , label = Element.el [] (Element.text ("List users"))
    }


getAuthorDocumentsButton: BigUser -> Element Msg    
getAuthorDocumentsButton bigUser = 
    Input.button ((listItemStyleNarrowDark  (px 100)) ++ [Font.center]) {
      onPress =  Just (GetPublicDocumentsRawQuery ("authorname=" ++ bigUser.username ++ "&sort=title"))
    , label = Element.el [] (Element.text "Documents")
    }
  
authorHomePageButton: BigUser -> Element Msg    
authorHomePageButton bigUser = 
    Input.button ((listItemStyleNarrowDark  (px 135)) ++ [Font.center]) {
      onPress =  Just (GoToUsersHomePage bigUser)
    , label = Element.el [] (Element.text bigUser.username)
    }
