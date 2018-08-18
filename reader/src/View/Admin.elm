module View.Admin exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed

import Model exposing(Model, Msg(..))
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import Widget 

view : Model -> Element Msg
view model = 
  Element.row [width (fillPortion 4), height fill, Background.color Widget.white, centerX] [
     adminBodyLeftColumn 2 model,  adminCenterColumn model.windowHeight 7 model, adminRightColumn 2 model
  ]

adminBodyLeftColumn : Int -> Model -> Element Msg
adminBodyLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        showUserCount model
      , listUsersButton  model   
  ]

showUserCount : Model -> Element msg 
showUserCount model = 
  let 
    n = List.length model.userList
  in 
    case n == 0 of 
      True -> Element.none 
      False -> Element.el [] (Element.text <| "Users: " ++ String.fromInt n)


adminCenterColumn : Int -> Int -> Model -> Element Msg
adminCenterColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73)), scrollbarY] [ viewUsers model.userList ]

adminRightColumn : Int -> Model -> Element Msg
adminRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, Background.color Widget.lightBlue, centerX] [
      
  ]

viewUsers : List BigUser -> Element msg 
viewUsers userList =  
  Element.table [spacing 10, padding 30]
    { data = userList
    , columns =
        [ 
          { header = Element.el [Font.bold] (Element.text "ID")
          , width = (px 60)
          , view =
                (\user ->
                    Element.el [alignRight] (Element.text (String.fromInt user.id))
                )
          }
        , { header = Element.el [Font.bold] (Element.text "Username")
          , width = (px 110)
          , view =
                 (\user ->
                    Element.text user.username
                 )
          }
        , { header = Element.el [Font.bold] (Element.text "Email")
          , width = fill
          , view =
                 (\user ->
                    Element.text user.email
                 )
          }
        , { header = Element.el [Font.bold] (Element.text "Blurb")
          , width = fill
          , view =
                 (\user ->
                    Element.text user.blurb
                 )
          }
        , { header = Element.el [Font.bold] (Element.text "Docs")
          , width = (px 60)
          , view =
                 (\user ->
                    Element.el [alignRight] (Element.text (String.fromInt (user.documentCount)))
                 )
          }
        , { header = Element.el [Font.bold] (Element.text "Media")
          , width = (px 60)
          , view =
                 (\user ->
                    Element.el [alignRight] (Element.text (String.fromInt (user.mediaCount)))
                 )
          }
        
        ]
    }

-- HELPERS


listUsersButton : Model -> Element Msg 
listUsersButton model = 
    Input.button (Widget.buttonStyle  (px 115)) {
      onPress =  Just GetUsers
    , label = Element.el [] (Element.text ("List users"))
    }
