module MiniLatexTools exposing (setupEditRecord, updateEditRecord)

import Configuration
import Document exposing (Document)
import Html exposing (Html)
import KVList
import MiniLatex.Differ exposing (EditRecord)
import MiniLatex.MiniLatex as MiniLatex


prepareText : String -> Document -> String
prepareText texMacros document =
    let
        preamble =
            [ setCounterText document.tags
            , setDocId document.id
            , setClient
            , ""
            ]
                |> String.join "\n\n"

        postlude =
            "\n\n\\bigskip\n\\bigskip\n\\bigskip\n\\bigskip\n\n"

        source =
            if texMacros == "" then
                document.content

            else
                prependMacros texMacros document.content
    in
    preamble ++ source ++ postlude


setupEditRecord : String -> Document -> EditRecord (Html msg)
setupEditRecord texMacros document =
    MiniLatex.initializeEditRecord 0 (prepareText texMacros document)


updateEditRecord : EditRecord (Html msg) -> Int -> String -> Document -> EditRecord (Html msg)
updateEditRecord editRecord seed texMacros document =
    MiniLatex.updateEditRecord seed editRecord (prepareText texMacros document)


setCounterText : List String -> String
setCounterText tags =
    let
        maybeSectionNumber =
            KVList.intValueForKey "sectionNumber" tags
    in
    case maybeSectionNumber of
        Nothing ->
            ""

        Just sectionNumber ->
            "\\setcounter{section}{" ++ String.fromInt sectionNumber ++ "}\n\n"


setDocId : Int -> String
setDocId id =
    "\\setdocid{" ++ String.fromInt id ++ "}"


setClient : String
setClient =
    "\\setclient{" ++ Configuration.client ++ "}"


normalize : String -> String
normalize str =
    str |> String.lines |> List.filter (\x -> x /= "") |> String.join "\n"


prependMacros : String -> String -> String
prependMacros macros_ sourceText =
    let
        macros__ =
            macros_ |> normalize
    in
    "$$\n" ++ macros__ ++ "\n$$\n\n" ++ sourceText
