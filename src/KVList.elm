module KVList exposing
    ( intValueForKey
    , removeKey
    , setIntValueForKey
    , stringValueForKey
    )

{-| Tags the form k:v define a key-value pair.
The function extractValue key taglist resturns
the value of the key-value pair as a Maybe Int
-}

{- Key-value functions for a list of tags -}


intValueForKey : String -> List String -> Maybe Int
intValueForKey key tags =
    let
        maybeMacrotag =
            tags
                |> List.filter (\tag -> String.startsWith (key ++ ":") tag)
                |> List.head

        value =
            case maybeMacrotag of
                Nothing ->
                    Nothing

                Just tag ->
                    keyValueIntHelper tag
    in
    value


stringValueForKey : String -> List String -> Maybe String
stringValueForKey key tags =
    let
        maybeMacrotag =
            tags
                |> List.filter (\tag -> String.startsWith (key ++ ":") tag)
                |> List.head

        value =
            case maybeMacrotag of
                Nothing ->
                    Nothing

                Just tag ->
                    keyValueStringHelper tag
    in
    value


removeKey : String -> List String -> List String
removeKey key tags =
    tags |> List.filter (\tag -> not (String.startsWith (key ++ ":") tag))


setIntValueForKey : String -> Int -> List String -> List String
setIntValueForKey key value tags =
    tags |> removeKey key |> (\list -> list ++ [ key ++ ":" ++ String.fromInt value ])


keyValueIntHelper : String -> Maybe Int
keyValueIntHelper tag =
    let
        maybeIdString =
            tag |> String.split ":" |> List.drop 1 |> List.head
    in
    case maybeIdString of
        Nothing ->
            Nothing

        Just idString ->
            idString |> String.toInt


keyValueStringHelper : String -> Maybe String
keyValueStringHelper tag =
    tag
        |> String.split ":"
        |> List.drop 1
        |> String.join ":"
        |> Just
