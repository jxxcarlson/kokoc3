module Main exposing (main)


import Browser
import Browser.Dom as Dom
import Task
import Time exposing(Posix)
import Keyboard
import Html exposing(Html)
import Random

import SystemDocument
import View.View exposing(view)
import Model exposing(Msg(..), Model, initialModel)
import Update exposing(
      update
    , processUrl
    , imageRead
    , onUrlChange
    , getInfoFromOutside
    , getTimeInOneSecond
   )

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
          processUrl flags.location
        , getTimeInOneSecond
        , Task.perform GetViewport Dom.getViewport
        , Random.generate NewSeed (Random.int 1 10000)
    ])


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



