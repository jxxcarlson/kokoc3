module Query exposing (parse)

import Regex


parse: String -> String
parse input_ =
    let
      input = String.replace "author=" "authorname=" input_
      cmd =
            input
                |> String.split "="
                |> List.head
                |> Maybe.withDefault "NoCommand"
    in
        if List.member cmd [ "idlist" ] then
            input
        else
            parseQueryHelper input

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
            item

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
