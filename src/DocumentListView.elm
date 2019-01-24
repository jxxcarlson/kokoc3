module DocumentListView exposing (DocListViewMsg(..), viewWithHeading, viewWithHeadingShifted)

import Document exposing (DocType(..), Document)
import DocumentList exposing (DocumentList, documents)
import MiniLatex.LatexState exposing (LatexState, TocEntry, TableOfContents)
import Element exposing (..)
import Element.Font as Font exposing (Font)
import Element.Input as Input
import Element.Events as Events
import View.Widget as Widget
import Utility
import Configuration


type DocListViewMsg
    = SetCurrentDocument Document
    | LoadMasterDocument2 Document


viewWithHeading : Int -> Bool -> String -> DocumentList -> Element DocListViewMsg
viewWithHeading height_ masterDocLoaded heading docList =
    Element.column [ spacing 10 ]
        [ Element.el [ Font.size 18, Font.bold ] (text heading)
        , view height_ masterDocLoaded docList
        ]


viewWithHeadingShifted : Int -> Bool -> String -> DocumentList -> Element DocListViewMsg
viewWithHeadingShifted height_ masterDocLoaded heading docList =
    Element.column [ spacing 10 ]
        [ Element.el [ moveRight 45, Font.size 18, Font.bold, Font.color Widget.blue ] (text heading)
        , view height_ masterDocLoaded docList
        ]


view : Int -> Bool -> DocumentList -> Element DocListViewMsg
view height_ masterDocLoaded docList =
    case ( (DocumentList.getFirst docList).docType, masterDocLoaded ) of
        ( Master, True ) ->
            viewTableOfContents height_ docList

        ( Master, False ) ->
            viewSearchResults height_ docList

        ( Standard, _ ) ->
            viewSearchResults height_ docList


tableBottomInset =
    150



--     case model.appMode of
--         Writing ->
--             80
--
--         _ ->
--             150
-- 150


viewSearchResults : Int -> DocumentList -> Element DocListViewMsg
viewSearchResults height_ docList =
    Element.column [ spacing 5, scrollbarY, height (px (height_ - tableBottomInset)) ]
        (List.map (activeDocTitle (DocumentList.selected docList)) (documents docList))


viewTableOfContents : Int -> DocumentList -> Element DocListViewMsg
viewTableOfContents height_ docList =
    Element.column [ spacing 5, scrollbarY, height (px (height_ - tableBottomInset)) ]
        (List.indexedMap (activeDocTitleWithIndex (DocumentList.selectedData docList)) (documents docList))


activeDocTitleWithIndex : ( LatexState, Maybe Document ) -> Int -> Document -> Element DocListViewMsg
activeDocTitleWithIndex ( latexState, maybeSelectedDocument ) index document =
    Element.column []
        [ Element.el [ Events.onDoubleClick <| LoadMasterDocument2 document ]
            (Input.button (Widget.listItemStyle (px tableWidth))
                { onPress = Just (SetCurrentDocument document)
                , label = Element.el (selectedElementStyle maybeSelectedDocument document) (tocItem index document)
                }
            )
        , innerTableOfContents latexState maybeSelectedDocument document
        ]


tocItem1 : Int -> Document -> Element DocListViewMsg
tocItem1 index document =
    Element.el [] (titleWithIndex index document)


tocItem : Int -> Document -> Element DocListViewMsg
tocItem index document =
    let
        name =
            document.title |> String.replace " " "" |> String.toLower
    in
        link []
            { url = Configuration.client ++ "/" ++ (String.fromInt document.id) ++ "#_section_" ++ name
            , label = titleWithIndex index document
            }


innerTableOfContents : LatexState -> Maybe Document -> Document -> Element DocListViewMsg
innerTableOfContents latexState maybeDocument document =
    case maybeDocument == Just document of
        True ->
            Element.column [ spacing 4, moveRight 24 ] (List.map (innerTocItem document) (List.drop 1 latexState.tableOfContents))

        False ->
            Element.none


innerTocItem : Document -> TocEntry -> Element DocListViewMsg
innerTocItem document tocEntry =
    let
        name =
            tocEntry.name |> String.replace " " "" |> String.toLower
    in
        link [ Font.size 11, Font.color (rgb255 0 0 100) ]
            { url = Configuration.client ++ "/" ++ (String.fromInt document.id) ++ "#_subsection_" ++ name
            , label = text <| tocEntry.label ++ " " ++ tocEntry.name
            }


viewDocument : Document -> Element msg
viewDocument doc =
    Element.el (Widget.listItemStyle (px 140)) (text doc.title)



-- HELPERS: ELEMENT


transformedTitle : Document -> String
transformedTitle doc =
    case doc.docType of
        Master ->
            String.toUpper doc.title

        Standard ->
            doc.title


tableWidth : Int
tableWidth =
    260


activeDocTitle : Maybe Document -> Document -> Element DocListViewMsg
activeDocTitle maybeSelectedDocument document =
    Element.el [ Events.onDoubleClick <| LoadMasterDocument2 document ]
        (Input.button (Widget.listItemStyle (px tableWidth))
            { onPress = Just (SetCurrentDocument document)
            , label = Element.el (selectedElementStyle maybeSelectedDocument document) (Element.text (transformedTitle document))
            }
        )


titleWithIndex : Int -> Document -> Element msg
titleWithIndex index document =
    case index == 0 of
        True ->
            Element.text <| transformedTitle document

        False ->
            Element.text <| String.fromInt index ++ ". " ++ transformedTitle document



-- HELPERS: ATTRIBUTE


selectedElementStyle : Maybe Document -> Document -> List (Element.Attribute msg)
selectedElementStyle maybeSelectedDocument document =
    case maybeSelectedDocument of
        Nothing ->
            [ Font.regular, Font.color Widget.blue ]

        Just selectedDocument ->
            if selectedDocument.id == document.id then
                [ Font.extraBold, Font.color Widget.darkRed ]
            else
                [ Font.regular, Font.color Widget.blue ]
