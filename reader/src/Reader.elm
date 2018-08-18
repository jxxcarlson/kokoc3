module Main exposing (main)


import Browser
import Browser.Dom as Dom
import Task
import Time exposing(Posix)
import Keyboard

import SystemDocument
import View.View exposing(view)
import Model exposing(Msg(..), Model, initialModel)
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
          processUrl flags.location
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



