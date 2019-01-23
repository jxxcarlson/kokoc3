module Update.Keyboard exposing (gateway)

import Model exposing (Model, Msg, FocusedElement(..), AppMode(..))
import Keyboard exposing (Key(..))
import Update.Search as Search
import Update.Document
import UI.Update as UI
import User
import Configuration


gateway : Model -> ( List Key, Maybe Keyboard.KeyChange ) -> ( Model, Cmd Msg )
gateway model ( pressedKeys, maybeKeyChange ) =
    if List.member Control model.pressedKeys then
        handleKey { model | pressedKeys = [] } (headKey pressedKeys)
    else if model.focusedElement == FocusOnSearchBox && List.member Enter model.pressedKeys then
        let
            newModel =
                { model | pressedKeys = [] }
        in
            Search.doSearch newModel
    else
        ( { model | pressedKeys = pressedKeys }, Cmd.none )


handleKey : Model -> Key -> ( Model, Cmd Msg )
handleKey model key =
    case key of
        Character "s" ->
            Update.Document.saveCurrentDocument model

        Character "=" ->
            Update.Document.saveCurrentDocument model

        Character "/" ->
            Search.getPublicDocumentsRawQuery model "random=public"

        Character "[" ->
            case model.maybeCurrentUser of
                Nothing ->
                    Search.getPublicDocumentsRawQuery model "created=10"

                Just user ->
                    Search.getDocumentsRawQuery model <| "created=10"

        Character "]" ->
            case model.maybeCurrentUser of
                Nothing ->
                    Search.getPublicDocumentsRawQuery model "updated=10"

                Just user ->
                    Search.getDocumentsRawQuery model <| "updated=10"

        -- &author=" ++ (User.username user)
        Character "w" ->
            UI.changeMode model Writing

        Character "r" ->
            UI.changeMode model Reading

        Character "i" ->
            UI.changeMode model ImageEditing

        Character "a" ->
            UI.changeMode model DisplayAuthors

        -- Character "f" -> (model, focusSearchBox)
        Character "f" ->
            Update.Document.doFullRender model

        Character "h" ->
            UI.goHome model

        Character "j" ->
            Update.Document.makeNewChildDocument model

        Character "e" ->
            UI.toggleToolPanelState model

        Character "m" ->
            Update.Document.doNewMasterDocument model Configuration.newMasterDocumentTitle Configuration.sampleMiniLatexDocumentText

        Character "1" ->
            Update.Document.doNewStandardDocument model Configuration.sampleDocumentTitle Configuration.sampleMiniLatexDocumentText

        Character "n" ->
            Update.Document.doNewStandardDocument model Configuration.newDocumentTitle Configuration.newMiniLatexDocumentText

        Character "p" ->
            Update.Document.printDocument model

        Character "q" ->
            Update.Document.putCurrentDocumentAtTopOfQueue model

        Character "u" ->
            UI.togglePreferences model

        -- Character "v" ->
        --     Update.Document.doIncrementVersion model
        Character "0" ->
            UI.goToStart model

        F20 ->
            ( model, Cmd.none )

        _ ->
            ( model, Cmd.none )


headKey : List Key -> Key
headKey keyList =
    keyList
        |> List.filter (\item -> item /= Control && item /= Character "^")
        |> List.head
        |> Maybe.withDefault F20
