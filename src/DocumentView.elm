module DocumentView exposing (DocumentViewData, view)

import BigEditRecord exposing (BigEditRecord)
import Browser.Dom exposing (Viewport)
import Configuration
import DocViewMsg exposing (DocViewMsg(..))
import Document exposing (Child, DocType(..), Document, TextType(..))
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Element.Lazy
import ElmMarkup
import Html exposing (Html)
import Html.Attributes as HA
import Json.Encode as Encode
import KVList
import Mark
import MarkdownTools
import MiniLatex.Differ exposing (EditRecord)
import MiniLatex.MiniLatex as MiniLatex
import MiniLatexTools
import Model exposing (Msg)
import View.Widget as Widget exposing (..)


type alias DocumentViewData =
    { viewport : Viewport
    , counter : Int
    , debounceCounter : Int
    , seed : Int
    , texMacros : String
    , document : Document
    , bigEditRecord : BigEditRecord Msg
    }


view : DocumentViewData -> Element Msg
view dvd =
    Element.column
        [ spacing 15
        , width (px <| texWidth dvd.viewport)
        , centerX
        , Element.htmlAttribute <| HA.attribute "id" "_textViewParent_"
        ]
        [ titleLine dvd.document
        , contentView dvd
        ]


contentView : DocumentViewData -> Element Msg
contentView dvd =
    Keyed.el
        [ height (px (round <| dvd.viewport.viewport.height - 150))
        , scrollbarY
        , clipX
        , Element.htmlAttribute <| HA.attribute "id" "_textView_"
        ]
        ( String.fromInt dvd.counter, documentContentView dvd )


titleLine : Document -> Element Msg
titleLine document =
    if document.parentId == 0 then
        if document.docType == Standard then
            Element.column (titleLineStyle 62)
                [ Element.el [ Font.size 18, Font.bold ] (text document.title)
                , getAuthorsDocumentsTitleButton_ fill document
                ]

        else
            Element.column (titleLineStyle 76)
                [ loadChildrenButton document
                , Element.el [ moveRight 20 ] (getAuthorsDocumentsTitleButton_ fill document)
                ]

    else
        Element.column (titleLineStyle 84)
            [ Element.row [ spacing 10 ]
                [ loadMasterDocumentButton document
                , Element.el [ moveRight 20 ] (getAuthorsDocumentsTitleButton2 fill document)
                ]
            , Element.el [ moveRight 20, Font.size 18, Font.bold ] (text document.title)
            ]


titleLineStyle height_ =
    [ paddingXY 10 10, spacing 5, Background.color Widget.charcoal, Font.color Widget.white, width fill, height (px height_) ]


loadMasterDocumentButton : Document -> Element Msg
loadMasterDocumentButton document =
    Element.el []
        (Input.button Widget.titleStyleLight
            { onPress = Just (LoadMasterWithCurrentSelection document.parentId)
            , label = Element.el [ padding 10, Font.size 18, Font.bold ] (text document.parentTitle)
            }
        )
        |> Element.map Model.DocViewMsg


loadChildrenButton : Document -> Element Msg
loadChildrenButton document =
    Element.el []
        (Input.button Widget.titleStyleLight
            { onPress = Just (LoadMasterWithCurrentSelection document.id)
            , label = Element.el [ moveUp 0, padding 5, Font.size 18, Font.bold ] (text document.title)
            }
        )
        |> Element.map Model.DocViewMsg



{- #################################### -}


documentContentView : DocumentViewData -> Element Msg
documentContentView dvd =
    case dvd.document.docType of
        Master ->
            Element.map Model.DocViewMsg <| viewCoverArt dvd.document

        -- viewChildren document
        Standard ->
            documentContentView_ dvd


documentContentView_ : DocumentViewData -> Element Msg
documentContentView_ dvd =
    case dvd.document.textType of
        -- MiniLatex -> Element.el [] (Element.text "foo")
        MiniLatex ->
            viewMiniLatex dvd

        Markdown ->
            viewMarkdown dvd.document

        Asciidoc ->
            viewAsciidoc dvd.debounceCounter dvd.document.content

        AsciidocLatex ->
            viewAsciidoc dvd.debounceCounter dvd.document.content

        PlainText ->
            viewPlainText dvd.document

        ElmMarkup ->
            ElmMarkup.view dvd.document


viewMiniLatex : DocumentViewData -> Element Msg
viewMiniLatex dvd =
    let
        bigEditRecord =
            if BigEditRecord.isEmpty dvd.bigEditRecord then
                BigEditRecord.updateFromDocument dvd.bigEditRecord dvd.document dvd.texMacros dvd.seed

            else
                dvd.bigEditRecord
    in
    bigEditRecord
        |> BigEditRecord.getRenderedTextAsElements
        |> List.map (\x -> Element.paragraph [ width (px (texWidth dvd.viewport)) ] [ x ])
        |> Element.column [ Element.htmlAttribute <| HA.attribute "id" "_renderedText_" ]


viewMarkdown : Document -> Element Msg
viewMarkdown document =
    Element.el [ Element.paddingEach { top = 0, bottom = 120, left = 0, right = 0 } ] (Element.html <| MarkdownTools.view document.content)



-- YAY: https://ellie-test-19-cutover.now.sh/LGShLFZHvha1
-- https://ellie-test-19-cutover.now.sh/LGc6jCfs64a1


viewAsciidoc : Int -> String -> Element Msg
viewAsciidoc debounceCounter str =
    Keyed.el [ Element.paddingEach { top = 0, bottom = 120, left = 0, right = 0 } ]
        ( "Asciidoc." ++ String.fromInt debounceCounter
        , Element.html <| asciidocText str
        )


asciidocText : String -> Html Msg
asciidocText str =
    Html.node "asciidoc-text"
        [ HA.property "content" (Encode.string str) ]
        []


viewPlainText : Document -> Element Msg
viewPlainText document =
    Element.el [ Element.paddingEach { top = 0, bottom = 120, left = 0, right = 0 } ] (Element.html <| MarkdownTools.view document.content)


viewChildren : Document -> Element DocViewMsg
viewChildren document =
    Element.column [ Element.spacing 5 ] (List.map (viewChild document.id) document.children)


viewCoverArt : Document -> Element DocViewMsg
viewCoverArt document =
    let
        coverArtUrl =
            KVList.stringValueForKey "coverArt" document.tags |> Maybe.withDefault Configuration.coverArtUrl
    in
    Element.image [ width fill ] { src = coverArtUrl, description = "Cover Art" }


getAuthorsDocumentsTitleButton_ : Length -> Document -> Element Msg
getAuthorsDocumentsTitleButton_ width_ document =
    (let
        authorname =
            document.authorName
     in
     Input.button (Widget.listItemStyleBoldPale width_)
        { onPress = Just (GetPublicDocumentsRawQuery2 ("authorname=" ++ authorname))
        , label = Element.el [] (text authorname)
        }
    )
        |> Element.map Model.DocViewMsg


getAuthorsDocumentsTitleButton2 : Length -> Document -> Element Msg
getAuthorsDocumentsTitleButton2 width_ document =
    (let
        authorname =
            document.authorName
     in
     Input.button (Widget.listItemStyleBoldPale width_)
        { onPress = Just (GetPublicDocumentsRawQuery2 ("authorname=" ++ authorname))
        , label = Element.el [] (text <| "(" ++ authorname ++ ")")
        }
    )
        |> Element.map Model.DocViewMsg


viewChild : Int -> Child -> Element DocViewMsg
viewChild parentId child =
    Element.el []
        (Input.button Widget.titleStyle
            { onPress = Just (LoadMasterWithSelection child.docId parentId)
            , label = Element.el [ moveUp 0, padding 5, Font.size 12, Font.bold ] (text child.title)
            }
        )



-- HELPERS


texWidth : Viewport -> Int
texWidth viewport =
    case (currentDevice viewport).class of
        Phone ->
            round <| 1.0 * (viewport.viewport.width - 60)

        _ ->
            round <| 0.6363 * (viewport.viewport.width - 460)


currentDevice : Viewport -> Device
currentDevice viewport =
    let
        width =
            viewport.viewport.width

        height =
            viewport.viewport.height
    in
    classifyDevice { width = round width, height = round height }
