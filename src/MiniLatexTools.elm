module MiniLatexTools exposing (makePreamble, makeDownloadPreamble, setupEditRecord, updateEditRecord)

import Configuration
import Document exposing (Document, DocType(..))
import Html exposing (Html)
import MiniLatex
import MiniLatex.Edit


prepareText : String -> Document -> String
prepareText texMacros document =
    let
        preamble =
            makePreamble document

        postlude =
            "\n\n\\bigskip\n\\bigskip\n\\bigskip\n\\bigskip\n\n"

        source =
            if texMacros == "" then
                document.content
            else
                prependMacros texMacros document.content
    in
        preamble ++ source ++ postlude


makePreamble : Document -> String
makePreamble document =
    [ setCounterText document
    , setDocId document.id
    , setClient
    , ""
    ]
        |> String.join "\n\n"


makeDownloadPreamble : Document -> String
makeDownloadPreamble document =
    case document.docType of
        Standard ->
            [ decrementedSetCounterText document
            , setDocId document.id
            , setClient
            , ""
            ]
                |> String.join "\n\n"

        Master ->
            [ setCounterText document
            , setDocId document.id
            , setClient
            , ""
            ]
                |> String.join "\n\n"


setupEditRecord : String -> Document -> MiniLatex.Edit.Data (Html msg)
setupEditRecord texMacros document =
    MiniLatex.Edit.init 0 (prepareText texMacros document)


updateEditRecord :  MiniLatex.Edit.Data (Html msg) -> Int -> String -> Document ->  MiniLatex.Edit.Data (Html msg)
updateEditRecord editRecord seed texMacros document =
    MiniLatex.Edit.update seed  (prepareText texMacros document) editRecord


setCounterText : Document -> String
setCounterText document =
    "\\setcounter{section}{" ++ String.fromInt (document.sectionNumber) ++ "}\n\n"


decrementedSetCounterText : Document -> String
decrementedSetCounterText document =
    "\\setcounter{section}{" ++ String.fromInt (document.sectionNumber - 1) ++ "}\n\n"


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
