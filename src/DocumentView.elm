module DocumentView exposing(view, options,  DocumentViewData, DocViewMsg(..))

import Json.Encode as Encode    

import Html exposing(Html)
import Html.Attributes as HA 

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy
import Element.Keyed as Keyed
import Mark
import KVList 

import Browser.Dom exposing(Viewport)

import Configuration 
import MiniLatexTools 


import MiniLatex.Differ exposing (EditRecord)
import MiniLatex.MiniLatex as MiniLatex   
import MarkdownTools


import Html exposing(Html) 

import Document exposing(Document, Child, DocType(..), TextType(..))
import View.Widget as Widget exposing(..)


type DocViewMsg = 
    LoadMaster Int
  | LoadMasterWithSelection Int Int 
  | LoadMasterWithCurrentSelection Int
  | GetPublicDocumentsRawQuery2 String

type alias DocumentView msg = 
  {    title: String
     , content: Element msg 
   }


type alias DocumentViewData = {
    viewport : Viewport  
  , counter : Int  
  , debounceCounter : Int  
  , texMacros : String  
  , document : Document 
  }

view : DocumentViewData -> Element DocViewMsg 
view dvd = 
    Element.column [spacing 15, width (px <| texWidth dvd.viewport), centerX 
        , Element.htmlAttribute <| HA.attribute "id" "_textViewParent_"] [
            titleLine dvd.document
        , contentView dvd
    ]

contentView : DocumentViewData -> Element DocViewMsg
contentView dvd = 
  Keyed.el [   height (px (round <| dvd.viewport.viewport.height - 150))
             , scrollbarY
             , clipX
             , Element.htmlAttribute <| HA.attribute "id" "_textView_"
          ] 
      ((String.fromInt dvd.counter), (documentContentView dvd))

titleLine : Document -> Element DocViewMsg 
titleLine document = 
  if document.parentId == 0 then 
    if document.docType == Standard then 
       Element.column (titleLineStyle 62) [
         Element.el [Font.size 18, Font.bold] (text document.title) 
         , getAuthorsDocumentsTitleButton_ fill document
         ]
    else 
       Element.column (titleLineStyle 76) [
          loadChildrenButton  document
          , Element.el [moveRight 20] (getAuthorsDocumentsTitleButton_ fill document) ]
  else 
    Element.column (titleLineStyle  84) [
        Element.row [spacing 10] [
            loadMasterDocumentButton  document
           , Element.el [moveRight 20] (getAuthorsDocumentsTitleButton2 fill document)
        ]
        , Element.el [moveRight 20, Font.size 18, Font.bold] (text document.title)
      ]

titleLineStyle height_ = [paddingXY 10 10, spacing 5, Background.color Widget.charcoal, Font.color Widget.white, width fill, height (px height_)] 

loadMasterDocumentButton : Document -> Element DocViewMsg    
loadMasterDocumentButton  document = 
  Element.el [] (
        Input.button (Widget.titleStyleLight) {
            onPress =  Just (LoadMasterWithCurrentSelection document.parentId)
        , label = Element.el [ padding 10, Font.size 18, Font.bold] (text (document.parentTitle))
        } 
    )

loadChildrenButton : Document -> Element DocViewMsg    
loadChildrenButton  document = 
  Element.el [] (
        Input.button (Widget.titleStyleLight) {
          onPress =  Just (LoadMasterWithCurrentSelection document.id)
        , label = Element.el [ moveUp 0, padding 5, Font.size 18, Font.bold] (text (document.title))
        } 
    )  

    {- #################################### -}




documentView : DocumentViewData -> DocumentView DocViewMsg
documentView dvd = 
  { title = dvd.document.title 
    , content = documentContentView dvd
  }


documentContentView : DocumentViewData -> Element DocViewMsg 
documentContentView dvd = 
    case dvd.document.docType of 
        Master -> viewCoverArt dvd.document -- viewChildren document 
        Standard -> documentContentView_ dvd

documentContentView_ : DocumentViewData -> Element msg 
documentContentView_  dvd =    
  case dvd.document.textType of
    MiniLatex -> viewMiniLatex dvd 
    Markdown -> viewMarkdown dvd.document 
    Asciidoc -> viewAsciidoc dvd.debounceCounter dvd.document.content
    AsciidocLatex -> viewAsciidoc dvd.debounceCounter dvd.document.content
    PlainText -> viewPlainText dvd.document
    ElmMarkup -> viewElmMarkup dvd.document
  

viewMiniLatex : DocumentViewData -> Element msg
viewMiniLatex dvd =
    MiniLatex.getRenderedText (MiniLatexTools.setupEditRecord dvd.texMacros dvd.document)
        |> List.map (\x -> Element.paragraph [ width (px (texWidth dvd.viewport))] [ Element.html x ]) -- ###@@@
        |> Element.column [Element.htmlAttribute <| HA.attribute "id" "_renderedText_"]


viewMarkdown : Document -> Element msg
viewMarkdown document =
  Element.el [ Element.paddingEach {top = 0, bottom = 120, left = 0, right = 0} ] (Element.html <| MarkdownTools.view document.content)

viewElmMarkup : Document -> Element msg 
viewElmMarkup document =
  let 
    parsedElement = 
      case Mark.parseWith options (document.content) of 
        Ok parsedContent -> (parsedContent Element.none)
        Err error -> Element.el [] (Element.text "Oops, Markup parse error")
  in 
    Element.row [ 
           Element.paddingEach {top = 0, bottom = 120, left = 0, right = 0}
         ] [parsedElement]

options =
    { styling =
        \model -> elmMarkupDefaults
    , blocks =
        Mark.defaultBlocks
    , inlines =
         []
    }


elmMarkupDefaults = { root =
        [ Element.spacing 24
        , Element.width (Element.px 600)
        , Element.centerX
        , Element.padding 0
        ]
    , block = []
    , monospace =
        [ Element.spacing 5
        , Element.padding 24
        , Background.color
            (Element.rgba 0 0 0 0.04)
        , Border.rounded 2
        , Font.size 16
        , Font.family
            [ Font.external
                { url = "https://fonts.googleapis.com/css?family=Source+Code+Pro"
                , name = "Source Code Pro"
                }
            , Font.sansSerif
            ]
        ]
    , link =
        [ Font.color
            (Element.rgb
                (17 / 255)
                (132 / 255)
                (206 / 255)
            )
        , Element.mouseOver
            [ Font.color
                (Element.rgb
                    (234 / 255)
                    (21 / 255)
                    (122 / 255)
                )

            -- , Font.underline
            ]
        ]
    , token =
        [ Background.color
            (Element.rgba 0 0 0 0.04)
        , Border.rounded 2
        , Element.paddingXY 5 3
        , Font.size 16
        , Font.family
            [ Font.external
                { url = "https://fonts.googleapis.com/css?family=Source+Code+Pro"
                , name = "Source Code Pro"
                }
            , Font.sansSerif
            ]
        ]
    , listIcons = defaultListToken
    , list =
        [ Element.spacing 8
        ]
    , title =
        [ Font.size 48 ]
    , header =
        [ Font.size 36 ]
    }

defaultListToken : Mark.Cursor -> Mark.ListIcon -> Element msg
defaultListToken cursor symbol =
    let
        pad =
            Element.paddingEach
                { edges
                    | left =
                        case cursorLevel cursor of
                            1 ->
                                28

                            2 ->
                                56

                            3 ->
                                84

                            _ ->
                                84
                    , right = 12
                }
    in
    case symbol of
        Mark.Arrow ->
            Element.el
                [ pad ]
                (Element.text "➙")

        Mark.Bullet ->
            let
                icon =
                    case cursorLevel cursor of
                        1 ->
                            "•"

                        _ ->
                            "◦"
            in
            Element.el [ pad ] (Element.text icon)

        Mark.Number ->
            Element.el [ pad ]
                (Element.text
                    (String.join "."
                        (mapCursor String.fromInt cursor)
                    )
                )


cursorLevel ( current, nested ) =
    List.length nested + 1

mapCursor fn ( head, tail ) =
    List.map fn (head :: tail)


-- YAY: https://ellie-test-19-cutover.now.sh/LGShLFZHvha1
-- https://ellie-test-19-cutover.now.sh/LGc6jCfs64a1


viewAsciidoc : Int -> String -> Element msg
viewAsciidoc debounceCounter str =
  Keyed.el [ Element.paddingEach {top = 0, bottom = 120, left = 0, right = 0}  ] (  ("Asciidoc." ++ String.fromInt debounceCounter)
                  , (Element.html <| asciidocText str))


asciidocText : String -> Html msg
asciidocText str =
    Html.node "asciidoc-text"
        [ HA.property "content" (Encode.string str) ]
        []

viewPlainText : Document -> Element msg
viewPlainText document =
   Element.el [ Element.paddingEach {top = 0, bottom = 120, left = 0, right = 0} ] (Element.html <| MarkdownTools.view document.content)


viewChildren : Document -> Element DocViewMsg 
viewChildren document = 
  Element.column [Element.spacing 5] (List.map (viewChild document.id) document.children)
  

viewCoverArt : Document -> Element DocViewMsg 
viewCoverArt document = 
  let 
    coverArtUrl = KVList.stringValueForKey "coverArt" document.tags |> Maybe.withDefault Configuration.coverArtUrl
  in 
    Element.image [width fill] {src = coverArtUrl, description = "Cover Art"}

getAuthorsDocumentsTitleButton_ : Length -> Document -> Element DocViewMsg    
getAuthorsDocumentsTitleButton_ width_ document = 
  let  
    authorname = document.authorName 
  in 
    Input.button (Widget.listItemStyleBoldPale  width_) {
      onPress =  Just (GetPublicDocumentsRawQuery2 ("authorname=" ++ authorname))
    , label = Element.el [] (text authorname)
    } 

getAuthorsDocumentsTitleButton2 : Length -> Document -> Element DocViewMsg    
getAuthorsDocumentsTitleButton2 width_ document = 
  let  
    authorname = document.authorName 
  in 
    Input.button (Widget.listItemStyleBoldPale  width_) {
      onPress =  Just (GetPublicDocumentsRawQuery2 ("authorname=" ++ authorname))
    , label = Element.el [] (text <| "(" ++ authorname ++ ")")
    } 

viewChild : Int -> Child -> Element DocViewMsg 
viewChild parentId child = 
  Element.el [] (
        Input.button (Widget.titleStyle) {
            onPress =  Just (LoadMasterWithSelection child.docId parentId)
        , label = Element.el [ moveUp 0, padding 5, Font.size 12, Font.bold] (text child.title)
        } 
    )

-- HELPERS


edges =
    { top = 0
    , right = 0
    , bottom = 0
    , left = 0
    }

texWidth : Viewport -> Int 
texWidth viewport = 
  case (currentDevice viewport).class of 
    Phone -> round <| 1.00*(viewport.viewport.width - 60)
    _ -> round <| 0.6363*(viewport.viewport.width - 460)

currentDevice : Viewport -> Device 
currentDevice  viewport =
  let 
    width = viewport.viewport.width
    height = viewport.viewport.height
  in 
    classifyDevice {width = round width, height = round height}

  
edge = {left = 0, right = 0, top = 0, bottom = 0}
