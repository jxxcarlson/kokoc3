module View.Admin exposing(view , dateString)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Http
import Json.Encode as Encode
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Time exposing(Posix, utc, Month(..))

import Model exposing(Model, Msg(..))
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import View.Widget as Widget exposing(..)
import Configuration

type AdminMsg = 
    AcknowledgeUpdateOfDocument String
 

view : Model -> Element Msg
view model = 
  Element.row [width (fillPortion 4), height fill, Background.color Widget.white, centerX] [
     adminLeftColumn 2 model,  adminCenterColumn model.windowHeight 4 model
  ]

adminLeftColumn : Int -> Model -> Element Msg
adminLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        showUserCount model
      , listUsersButton  model  
      , emailPanel model 
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

viewUsers : List BigUser -> Element msg 
viewUsers userList =  
  Element.table [spacing 10, padding 30]
    { data = userList
    , columns =
        [ 
          { header = Element.el [Font.bold] (Element.text "ID")
          , width = (px 20)
          , view =
                (\user ->
                    Element.el [alignRight] (Element.text (String.fromInt user.id))
                )
          }
        , { header = Element.el [Font.bold] (Element.text "V")
          , width = (px 10)
          , view =
                 (\user ->
                    Element.text (boolToString user.verified)
                 )
          } 
        , { header = Element.el [Font.bold] (Element.text "P")
          , width = (px 10)
          , view =
                 (\user ->
                    Element.text (boolToString user.public)
                 )
          } 
        , { header = Element.el [Font.bold] (Element.text "Joined")
          , width = (px 90)
          , view =
                 (\user ->
                    Element.text (dateString user.created)
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


dateString : Posix -> String 
dateString p = 
  let 
    y = Time.toYear utc p |> String.fromInt 
    m = Time.toMonth utc p |> stringFromMonth
    d = Time.toDay utc p |> String.fromInt 
  in 
    m ++ " " ++ d ++ ", " ++ y

stringFromMonth : Time.Month -> String 
stringFromMonth month = 
  case month of 
    Jan -> "Jan"
    Feb -> "Feb"
    Mar -> "Mar"
    Apr -> "Apr"
    May -> "May"
    Jun -> "Jun"
    Jul -> "Jul"
    Aug -> "Aug"
    Sep -> "Sep"
    Oct -> "Oct"
    Nov -> "Nov"
    Dec -> "Dec"

boolToString : Bool -> String 
boolToString boolValue = 
  case boolValue of 
    True -> "T"
    False -> "F"

emailPanel : Model -> Element Msg 
emailPanel model = 
  Element.column [spacing 10, padding 10, Background.color Widget.charcoal] [
      Element.el [Font.bold, Font.size 18, Font.color Widget.white] (Element.text "Email")
    , emailSubjectInput model
    , textArea model 400 500 
    , sendEmailButton model

  ]


emailSubjectInput : Model -> Element Msg
emailSubjectInput model =
    Input.text [width (px 400), height (px 30) , Font.color black] {
        text = model.emailSubject 
      , placeholder = Just (Input.placeholder [moveUp 5] (Element.text "subject"))
      , onChange = Just(\str -> AcceptEmailSubject str)
      , label = Input.labelAbove [ ] (text "")
    }

-- HELPERS

listUsersButton : Model -> Element Msg 
listUsersButton model = 
    Input.button (Widget.buttonStyle  (px 115)) {
      onPress =  Just GetUsers
    , label = Element.el [] (Element.text ("List users"))
    }

sendEmailButton : Model -> Element Msg 
sendEmailButton model = 
    Input.button (Widget.whiteButtonStyle (px 90) ) {
      onPress =  Just SendEmail
    , label = Element.el [] (Element.text ("Send email"))
    }

textArea : Model -> Int -> Int -> Element Msg
textArea model width_ height_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (px width_), height (px height_), paddingXY 10 0, scrollbarY ]
                { onChange = Just AcceptEmailText
                , text = model.emailText
                , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
                , placeholder = Just <| (Input.placeholder [moveDown 5] (Element.text "Text of email ... "))
                , spellcheck = False
                }
          )
        ]

