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


toUtcString : Time.Posix -> String
toUtcString time =
    (String.fromInt (Time.toHour Time.utc time) |> String.padLeft 2 '0')
        ++ ":"
        ++ (String.fromInt (Time.toMinute Time.utc time) |> String.padLeft 2 '0')
        ++ ":"
        ++ (String.fromInt (Time.toSecond Time.utc time) |> String.padLeft 2 '0')
