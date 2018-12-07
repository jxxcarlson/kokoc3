module Bozo.Update exposing (..)

import Bozo.Model exposing (..)


update : BozoMsg -> BozoModel -> ( BozoModel, Cmd BozoMsg )
update msg model =
    case msg of
        MoveUp ->
            ( { model | state = Up }, Cmd.none )

        MoveDown ->
            ( { model | state = Down }, Cmd.none )
