module Update.Time exposing (..)

import Model exposing (Msg(..))
import Task
import Time
import Process
import User exposing (UserMsg(..))


getTime : Cmd Msg
getTime =
    Time.now
        |> Task.perform SessionStatus
        |> Cmd.map UserMsg


getTimeInOneSecond : Cmd Msg
getTimeInOneSecond =
    Process.sleep 1000
        |> Task.andThen (\_ -> Time.now)
        |> Task.perform (\time -> SessionStatus time)
        |> Cmd.map UserMsg


getBigUserInOneSecond =
    Process.sleep 1000
        |> Task.perform (\_ -> Time.now)
