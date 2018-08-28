module Query exposing (parse, stringToQueryString)

import Regex


parse: String -> String
parse str =
    if List.member (getCommand str) [ "idlist" ] then
        str
    else
        parseQueryHelper (doReplacements str)


doReplacements : String -> String
doReplacements str = 
  str 
    |> String.replace "author=" "authorname=" 
    |> String.replace "ago=" "days_before="
    |> String.replace "shared" "shared=yes"
    |> fixIdSearch


fixIdSearch : String -> String
fixIdSearch str =
  if List.member (String.left 1 str) ["1", "2", "3", "4", "5", "6", "7", "8", "9"] then 
    "id=" ++ str 
  else 
    str 

getCommand : String -> String
getCommand str = 
  str
    |> String.split "="
    |> List.head
    |> Maybe.withDefault "NoCommand"

{-| If the inpute is INT, map it to id=INT, otherwise
    pass it on unchanged.
-}
parseQueryHelper : String -> String
parseQueryHelper input = 
  let 
    headWord = input |> String.words |> List.head |> Maybe.withDefault "xxx"
  in 
    case String.toInt headWord of 
      Nothing -> parseQueryHelper_ input 
      Just id -> "id=" ++ (String.fromInt id)  

parseQueryHelper_ : String -> String
parseQueryHelper_ input =
  let 
     brackets : Regex.Regex
     brackets =
        Maybe.withDefault Regex.never <|
        Regex.fromString "[, ]"
  in
    input
        |> String.replace "tag=" "key="
        |> Regex.split brackets
        |> List.map String.trim
        |> List.filter (\item -> item /= "")
        |> List.map (\item -> transformItem item)
        |> String.join ("&")




transformItem : String -> String
transformItem item =
    case ( String.contains ":" item, String.contains "=" item ) of
        ( True, True ) ->
            item

        ( True, False ) ->
            transformQualifiedItem item

        ( False, True ) ->
            case String.split "=" item of 
              [a,b] ->
                    case a of 
                    "home" -> "authorname=" ++ b ++ "&key=home"
                    _ -> item
              _ -> item

        ( False, False ) ->
            "title=" ++ item


transformQualifiedItem : String -> String
transformQualifiedItem item =
    case String.split ":" item of
        [ "k", stem ] ->
            "key=" ++ stem

        [ "t", stem ] ->
            "text=" ++ stem

        [ "ti", stem ] ->
            "title=" ++ stem

        [ "p", stem ] ->
            "public=" ++ stem

        [ "a", stem ] ->
            "authorname=" ++ stem

        [ "id", stem ] ->
            "id=" ++ stem

        [ "ident", stem ] ->
            "ident=" ++ stem

        [ "sort", "updated" ] ->
            "sort=updated"

        [ "sort", "u" ] ->
            "sort=updated"

        [ "sort", "created" ] ->
            "sort=created"

        [ "sort", "c" ] ->
            "sort=created"

        [ "sort", "title" ] ->
            "sort=title"

        [ "sort", "t" ] ->
            "sort=title"

        [ "sort", "viewed" ] ->
            "sort=viewed"

        [ "sort", "v" ] ->
            "sort=viewed"

        [ "limit", stem ] ->
            "limit=" ++ stem

        _ ->
            ""

stringToQueryString : String -> String -> String
stringToQueryString prefix input =
  let 
     separators : Regex.Regex
     separators =
        Maybe.withDefault Regex.never <|
        Regex.fromString "[, ]"
  in
    input
        |> Regex.split separators
        |> List.map String.trim
        |> List.filter (\item -> item /= "")
        |> List.map (\item -> addPrefix prefix item)
        |> String.join ("&")

addPrefix : String -> String -> String 
addPrefix prefix item =
  case String.contains "=" item of 
    True -> item 
    False -> prefix ++ "=" ++ item