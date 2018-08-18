module Main exposing (main)

{- This app retrieves and displays weather data from openweathermap.org. -}

import Browser
import Browser.Dom as Dom
import Task

import Http
import Time exposing(Posix)
import List.Extra

import Keyboard




import Url
import UrlAppParser exposing(Route(..))

import Html exposing(Html)
import Html.Attributes exposing(src, type_, value)
import Html.Events exposing(on)


import VirtualDom exposing (Handler(..))

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Element.Border as Border
import Element.Lazy

import Utility
import SystemDocument
import DocumentList
import Json.Encode as Encode






import View exposing(view)
import Model exposing(
      Msg(..)
    , Model
    , AppMode(..)
    , ImageMode(..)
    , SignupMode(..)
    , ToolPanelState(..)
    , DeleteDocumentState(..)
    , ImageAccessibility(..)
    , initialModel
  )
import Update exposing(update, processUrl, imageRead, onUrlChange, getInfoFromOutside)


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions 
        }



type alias Flags =
    {
      width : Int
    , height : Int
    , location : String  
    }


-- INIT

init : Flags -> ( Model, Cmd Msg )
init flags = 
    ( initialModel flags.location flags.width flags.height  SystemDocument.welcome 
    , Cmd.batch [ 
        -- focusSearchBox
          processUrl flags.location
        -- , getTime

    ])



focusSearchBox : Cmd Msg
focusSearchBox =
  Task.attempt (\_ -> NoOp) (Dom.focus "search-box")


-- SUBSCRIPITONS

autosaveSubscription : Model -> Sub Msg
autosaveSubscription model =
   Time.every model.autosaveDuration SaveCurrentDocument


subscriptions model =
    Sub.batch [
      autosaveSubscription model
      , getInfoFromOutside Outside LogErr
      , Sub.map KeyMsg Keyboard.subscriptions
      , onUrlChange UrlChanged
      , imageRead ImageRead
    ]



-- UPDATE



-- IMAGE


    
-- ERROR

-- decodeResponse : Http.Response String -> String 
-- decodeResponse resp = 
--   case resp of 
--     Http.Response str -> str 

