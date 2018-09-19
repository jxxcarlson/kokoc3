-- module Utility exposing(replaceIf, toggleList, remove, softBreak, softBreakAlt)


module Utility exposing (findTag, flattenList, flattenListList, getEnclosedText, listDeleteAt, listInsertAt, lookUpKeyInTagList, remove, replaceIf, softBreak, softBreakAlt, softBreakAltAux, softBreakRegexp, toggleList, updateIf)

import Element
import Html.Attributes as HA
import Regex


findTag : String -> List String -> Maybe String
findTag tagFragment tagList =
    tagList |> List.filter (\x -> String.startsWith (tagFragment ++ ":") x) |> List.head


lookUpKeyInTagList : String -> List String -> Maybe String
lookUpKeyInTagList key tagList =
    case findTag key tagList of
        Nothing ->
            Nothing

        Just str ->
            String.split ":" str |> List.drop 1 |> List.head


{-| Replace all values that satisfy a predicate with a replacement value.
-}
replaceIf : (a -> Bool) -> a -> List a -> List a
replaceIf predicate replacement list =
    updateIf predicate (always replacement) list


{-| Replace all values that satisfy a predicate by calling an update function.
-}
updateIf : (a -> Bool) -> (a -> a) -> List a -> List a
updateIf predicate update list =
    List.map
        (\item ->
            if predicate item then
                update item

            else
                item
        )
        list


{-| Remove the first occurrence of an element of a list
-}
remove : a -> List a -> List a
remove x xs =
    case xs of
        [] ->
            []

        y :: ys ->
            if x == y then
                ys

            else
                y :: remove x ys


{-| toggleList a list removes a from list if a is in the list.
If it is not in the list, then it prepends it
-}
toggleList : a -> List a -> List a
toggleList x xs =
    if List.member x xs then
        remove x xs

    else
        x :: xs


softBreak : Int -> String -> List String
softBreak width string =
    if width <= 0 then
        []

    else
        string
            |> Regex.find (softBreakRegexp width)
            |> List.map .match


softBreakAltAux : Int -> String -> List String
softBreakAltAux width string =
    if String.length string < width then
        [ string ]

    else
        softBreak width string


softBreakAlt : Int -> String -> List String
softBreakAlt width string =
    string
        |> String.lines
        |> List.map (softBreakAltAux width)
        |> flattenListList


flattenListList : List (List String) -> List String
flattenListList stringListList =
    List.map flattenList stringListList


flattenList : List String -> String
flattenList stringList =
    let
        n =
            List.length stringList
    in
    if n < 2 then
        List.head stringList |> Maybe.withDefault ""

    else
        stringList |> String.join "\n"


softBreakRegexp : Int -> Regex.Regex
softBreakRegexp width =
    Maybe.withDefault Regex.never <|
        Regex.fromString (".{1," ++ String.fromInt width ++ "}(\\s+|$)|\\S+?(\\s+|$)")


{-|

> foo = [0, 1, 2, 3, 4, 5, 6]
> listInsertAt 3 111 foo
> [0,1,2,111,3,4,5,6]

-}
listInsertAt : Int -> a -> List a -> List a
listInsertAt k item list =
    List.take k list ++ [ item ] ++ List.drop k list


listDeleteAt : Int -> List a -> List a
listDeleteAt k list =
    List.take k list ++ List.drop (k + 1) list


getEnclosedText : String -> String -> String -> String
getEnclosedText startDelimiter endDelimiter str =
    let
        firstIndex =
            String.indexes startDelimiter str |> List.head

        lastIndex =
            String.indexes endDelimiter str |> List.head
    in
    case ( firstIndex, lastIndex ) of
        ( Just i, Just j ) ->
            String.slice (i + 1) j str

        _ ->
            ""
