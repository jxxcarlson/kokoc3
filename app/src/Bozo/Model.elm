module Bozo.Model exposing (..)


type alias BozoModel =
    { state : BozoState }


type BozoMsg
    = MoveUp
    | MoveDown


type BozoState
    = Start
    | Up
    | Down


stringOfState : BozoState -> String
stringOfState bozoState =
    case bozoState of
        Start ->
            "Start"

        Up ->
            "Up"

        Down ->
            "Down"


init : BozoModel
init =
    { state = Start }
