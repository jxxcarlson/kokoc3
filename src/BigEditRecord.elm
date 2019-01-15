module BigEditRecord
    exposing
        ( BigEditRecord(..)
        , docId
        , incrementSeed
        , editRecord
        , empty
        , fromDocument
        , fromText
        , getRenderedText
        , getRenderedTextAsElements
        , idListAsString
        , isEmpty
        , latexState
        , seed
        , updateFromDocument
        )

{-| BigEditRecord is an opaque type that carries an
EditRecord and two integers -- the id of the document
to which the EditRecord is associated, and a seed,
which is used to generate ids for each paragraph in the
rendered text. These ids are necessary for correct processing
of math text by MathJax. ids are changed using the seed
if the content of the associated paragraph changes.

The key function is `updateFromDocument`, which
takes as input a BigEditRecord, a document, a string
consisting of LaTeX macros, and an integer seed,
and which produces a output an new BigEditRecord.
If the id of the document agrees with the id of the
BigEditRecord, the BigEditRecord is updated and returned.
If he ids do not a agree, a new BigEditRecord based on the
given document is returned.

-}

import Document exposing (Document)
import Element exposing (Element)
import Html exposing (Html)
import MiniLatex.Differ exposing (EditRecord)
import MiniLatex.MiniLatex as MiniLatex
import MiniLatex.LatexState as LatexState exposing (LatexState)
import MiniLatexTools


type BigEditRecord msg
    = BigEditRecord (EditRecord (Html msg)) Int Int -- editRecord docId seed


empty : Int -> Int -> BigEditRecord msg
empty docId_ seed_ =
    BigEditRecord MiniLatex.emptyStringRecord docId_ seed_


isEmpty : BigEditRecord msg -> Bool
isEmpty ber =
    ber |> editRecord |> .paragraphs |> (\x -> x == [])


fromText : String -> Int -> BigEditRecord msg
fromText text docId_ =
    BigEditRecord (MiniLatex.initializeEditRecord 0 text) docId_ 0


fromDocument : Document -> String -> BigEditRecord msg
fromDocument document texMacros =
    BigEditRecord (MiniLatexTools.setupEditRecord texMacros document) document.id 0


seed : BigEditRecord msg -> Int
seed (BigEditRecord editRecord_ docId_ seed_) =
    seed_


incrementSeed : BigEditRecord msg -> BigEditRecord msg
incrementSeed (BigEditRecord er docId_ seed_) =
    BigEditRecord er docId_ (seed_ + 1)


docId : BigEditRecord msg -> Int
docId (BigEditRecord editRecord_ docId_ seed_) =
    docId_


editRecord : BigEditRecord msg -> EditRecord (Html msg)
editRecord (BigEditRecord editRecord_ docId_ seed_) =
    editRecord_


latexState : BigEditRecord msg -> LatexState
latexState (BigEditRecord editRecord_ docId_ seed_) =
    editRecord_.latexState


updateFromDocument : BigEditRecord msg -> Document -> String -> Int -> BigEditRecord msg
updateFromDocument ber document texMacros seed_ =
    -- ### updateFromDocument, use MiniLatexTools
    case docId ber == document.id of
        True ->
            BigEditRecord (MiniLatexTools.updateEditRecord (editRecord ber) seed_ texMacros document) document.id seed_

        False ->
            BigEditRecord (MiniLatexTools.setupEditRecord texMacros document) document.id 0


getRenderedText : BigEditRecord msg -> List (Html msg)
getRenderedText ber =
    MiniLatex.getRenderedText (editRecord ber)


getRenderedTextAsElements : BigEditRecord msg -> List (Element msg)
getRenderedTextAsElements ber =
    MiniLatex.getRenderedText (editRecord ber) |> List.map Element.html


idListAsString : BigEditRecord msg -> String
idListAsString ber =
    ber |> editRecord |> .idList |> String.join ", "
