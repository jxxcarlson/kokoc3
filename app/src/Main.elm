module Main exposing (main)

import Browser
import Browser.Dom as Dom
import Html exposing (Html)
import Keyboard
import Model exposing (Model, Msg(..), initialModel)
import Random
import SystemDocument
import Document exposing (DocMsg(..))
import Task
import Time exposing (Posix)
import Spinner
import Update.Time exposing (getTimeInOneSecond)
import Update
    exposing
        ( imageRead
        , onUrlChange
        , processUrl
        , update
        )
import Update.Outside exposing (getInfoFromOutside)
import View.View exposing (view)


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Flags =
    { width : Int
    , height : Int
    , location : String
    }



-- INIT


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( initialModel flags.location flags.width flags.height SystemDocument.welcome
    , Cmd.batch
        [ processUrl flags.location
        , getTimeInOneSecond
        , Task.perform GetViewport Dom.getViewport
        , Random.generate NewSeed (Random.int 1 10000)
        , Task.perform NewTime Time.now
        , Task.perform AdjustTimeZone Time.here
        ]
    )



-- SUBSCRIPITONS


autosaveSubscription : Model -> Sub Msg
autosaveSubscription model =
    Sub.map DocMsg <|
        Time.every model.autosaveDuration SaveCurrentDocument


subscriptions model =
    Sub.batch
        [ autosaveSubscription model
        , getInfoFromOutside Outside LogErr
        , Sub.map KeyMsg Keyboard.subscriptions
        , onUrlChange UrlChanged
        , imageRead ImageRead
        , Time.every 1000 Tick
        , Sub.map SpinnerMsg Spinner.subscription
        ]
