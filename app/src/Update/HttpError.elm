module Update.HttpError exposing (..)

import Http


httpErrorHandler : Http.Error -> String
httpErrorHandler error =
    case error of
        Http.BadPayload errorString response ->
            "Bad Payload"

        -- errorString
        --   |> Utility.getEnclosedText "{" "}"
        --   |> String.split ":"
        --   |> List.drop 1
        --   |> List.head
        --   |> Maybe.withDefault ""
        --   |> String.replace "\"" ""
        -- |> (\x -> "Bad payload: " ++ x)
        -- Debug.toString response
        Http.BadUrl str ->
            "Bad url: " ++ str

        Http.Timeout ->
            "timeout"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus resp ->
            "Bad status: " ++ "darn!"


handle : Http.Error -> String
handle error =
    case error of
        Http.BadUrl str ->
            str

        Http.Timeout ->
            "timeout"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus resp ->
            "Bad status (" ++ String.fromInt resp.status.code ++ "): " ++ resp.status.message

        -- (decodeResponse resp) --  ++ "darn! "
        Http.BadPayload str1 resp ->
            "Bad payload: " ++ str1 ++ ", payload = " ++ "bad payload"
