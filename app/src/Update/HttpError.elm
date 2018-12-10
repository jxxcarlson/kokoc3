module Update.HttpError exposing (..)

import Http


httpErrorHandler : Http.Error -> String
httpErrorHandler error =
    case error of
        _ ->
            "Http.error"



-- Http.BadUrl str ->
--     "Bad url: " ++ str
--
-- Http.Timeout_ ->
--     "timeout"
--
-- Http.NetworkError_ ->
--     "Network error"
--
-- Http.BadStatus_ m k ->
--     "Bad status: " ++ String.fromInt k


handle : Http.Error -> String
handle error =
    case error of
        _ ->
            "Http.error"



-- Http.BadUrl str ->
--     "Bad url: " ++ str
--
-- Http.Timeout_ ->
--     "timeout"
--
-- Http.NetworkError_ ->
--     "Network error"
--
-- Http.BadStatus_ m k ->
--     "Bad status: " ++ String.fromInt k
