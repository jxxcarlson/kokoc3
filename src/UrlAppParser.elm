module UrlAppParser exposing(Route(..), toRoute)

import Url exposing(Url, Protocol(..))
import Url.Parser as Parser exposing(Parser, parse, int, map, oneOf, s, top, string, (</>))


type Route =
    NotFound
  | DocumentIdRef Int 
  | HomeRef String


-- -- parseDocId : Url -> Route
-- parseDocId url =
--   parse int

route : Parser (Route -> a) a
route =
  oneOf
    [ 
        map HomeRef (s "home" </> string)
      , map DocumentIdRef int
    ]

toRoute : String -> Route
toRoute string =
  case Url.fromString string of
    Nothing ->
      NotFound

    Just url ->
      Maybe.withDefault NotFound (parse route url)

defaultUrl = { fragment = Nothing, host = "foo.io", path = "/", port_ = Nothing, protocol = Http, query = Nothing }





testUrlString = "http://foo.io/444"

testUrl = Url.fromString testUrlString |> Maybe.withDefault defaultUrl