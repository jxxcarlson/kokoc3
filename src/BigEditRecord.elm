module BigEditRecord exposing
    ( BigEditRecord(..)
    , docId
    , editRecord
    , empty
    , fromDocument
    , fromText
    , getRenderedText
    , getRenderedTextAsElements
    , idListAsString
    , incrementSeed
    , isEmpty
    , latexState
    , seed
    , updateFromDocument
    , updateFromMMDocument
    , getRenderedMMTextAsElements
    , getIDList
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
import MiniLatex  exposing (LatexState)
import MiniLatex.Edit exposing(emptyData)
import MiniLatexTools
import MMDiffer
import MMarkdown


type BigEditRecord msg
    = BigEditRecord ( MiniLatex.Edit.Data (Html msg)) Int Int -- editRecord docId seed


empty : Int -> Int -> BigEditRecord msg
empty docId_ seed_ =
    BigEditRecord MiniLatex.Edit.emptyData docId_ seed_


isEmpty : BigEditRecord msg -> Bool
isEmpty ber =
    ber |> editRecord |> .paragraphs |> (\x -> x == [])


fromText : String -> Int -> BigEditRecord msg
fromText text docId_ =
    BigEditRecord (MiniLatex.Edit.init 0 text) docId_ 0


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


editRecord : BigEditRecord msg -> MiniLatex.Edit.Data (Html msg)
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
    MiniLatex.Edit.get (editRecord ber)


getRenderedTextAsElements : BigEditRecord msg -> List (Element msg)
getRenderedTextAsElements ber =
    MiniLatex.Edit.get (editRecord ber) |> List.map Element.html


idListAsString : BigEditRecord msg -> String
idListAsString ber =
    ber |> editRecord |> .idList |> String.join ", "



--
-- MARKDOWN
--

mmEditRecord : BigEditRecord a -> MMDiffer.EditRecord (Html a)
mmEditRecord (BigEditRecord er docId_ seed_) =
    MMDiffer.EditRecord er.paragraphs er.renderedParagraphs er.idList




updateFromMMDocument : BigEditRecord msg -> Document -> Int -> BigEditRecord msg
updateFromMMDocument ber document seed_ =
    case docId ber == document.id of
        True ->
            let
                mmER = MMDiffer.update seed_ (MMarkdown.toHtml []) (mmEditRecord ber)  document.content
                mlER = { emptyData | paragraphs = mmER.paragraphs
                           ,  renderedParagraphs = mmER.renderedParagraphs
                           , idList = mmER.idList
                           }
            in
            BigEditRecord mlER document.id seed_

        False ->
            let
               mmER = MMDiffer.createRecord  (MMarkdown.toHtml [])  document.content
               mlER = { emptyData | paragraphs = mmER.paragraphs
                                          ,  renderedParagraphs = mmER.renderedParagraphs
                                          , idList = mmER.idList
                                          }

            in
            BigEditRecord mlER document.id 0




getRenderedMMText : BigEditRecord msg -> List (Html msg)
getRenderedMMText ber =
    (editRecord ber).renderedParagraphs

getIDList : BigEditRecord msg -> List String
getIDList ber =
    (editRecord ber).idList

getRenderedMMTextAsElements : BigEditRecord msg -> List (Element msg)
getRenderedMMTextAsElements ber =
   getRenderedMMText ber |> List.map Element.html
