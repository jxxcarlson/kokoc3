module Bozo.Update exposing (..)

import Model exposing (Model, Msg)
import Bozo.Model exposing (..)


update : BozoMsg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MoveUp ->
            ( updateState Up model, Cmd.none )

        MoveDown ->
            ( updateState Down model, Cmd.none )


updateState : BozoState -> Model -> Model
updateState nextState model =
    let
        bozoModel =
            model.bozo

        nextBozoModel =
            { bozoModel | state = nextState }
    in
        { model | bozo = nextBozoModel }
