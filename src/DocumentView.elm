module DocumentView exposing(view, DocViewMsg(..))

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

import MeenyLatex.Differ exposing (EditRecord)
import MeenyLatex.MiniLatex as MiniLatex
import MarkdownTools


import Html exposing(Html) 

import Document exposing(Document, Child, DocType(..), TextType(..))
import Widget


type DocViewMsg = 
  LoadMaster Int
  | LoadMasterWithCurrentSelection Int

type alias DocumentView msg = 
  {    title: String
     , content: Element msg 
   }

view : Int -> Int -> Int -> String -> Document -> Element DocViewMsg 
view windowHeight_ counter debounceCounter texMacros document = 
    Element.column [spacing 15, width (fill |> maximum 600), centerX] [
        titleLine document
        , (contentView windowHeight_ counter (documentView debounceCounter texMacros document ))
    ]

contentView windowHeight_ counter viewDoc = 
  Keyed.el [width (fill), height (px (windowHeight_ - 150)), scrollbarY] ((String.fromInt counter), viewDoc.content)


titleLine : Document -> Element DocViewMsg 
titleLine document = 
  if document.parentId == 0 then 
    Element.row titleLineStyle [Element.el [Font.size 18, Font.bold] (text document.title) ]
  else 
    Element.row titleLineStyle [loadMasterDocumentButton  document, Element.el [moveLeft 13, Font.size 18, Font.bold] (text document.title) ]

titleLineStyle = [paddingXY 10 0, Background.color Widget.charcoal, Font.color Widget.white, width fill, height (px 36)] 

loadMasterDocumentButton : Document -> Element DocViewMsg    
loadMasterDocumentButton  document = 
  Element.el [] (
        Input.button (Widget.titleStyleLight) {
            onPress =  Just (LoadMasterWithCurrentSelection document.parentId)
        , label = Element.el [ moveUp 0, padding 5, Font.size 18, Font.bold] (text (document.parentTitle ++ " :: "))
        } 
    )
    

    {- #################################### -}




documentView : Int -> String -> Document -> DocumentView DocViewMsg
documentView debounceCounter texMacros doc = 
  { title = doc.title 
    , content = documentContentView debounceCounter texMacros doc
  }


documentContentView : Int -> String -> Document -> Element DocViewMsg 
documentContentView debounceCounter texMacros document = 
    case document.docType of 
        Master -> viewChildren document 
        Standard -> documentContentView_ debounceCounter texMacros document

documentContentView_ : Int -> String -> Document -> Element msg 
documentContentView_  debounceCounter texMacros document =    
  case document.textType of
    MiniLatex -> viewMiniLatex texMacros document 
    Markdown -> viewMarkdown document 
    Asciidoc -> viewAsciidoc debounceCounter document.content
    AsciidocLatex -> viewAsciidoc debounceCounter document.content
    PlainText -> viewPlainText document
  
normalize str = 
  str |> String.lines |> List.filter (\x -> x /= "") |> String.join("\n") 

   
prependMacros macros_ sourceText = 
  let
    macros__ =  (macros_ |> normalize)
  in
    "$$\n" ++ macros__ ++ "\n$$\n\n" ++ sourceText 

viewMiniLatex : String -> Document -> Element msg
viewMiniLatex texMacros document =
  let 
    source = if texMacros == "" then 
                document.content 
             else 
                prependMacros texMacros document.content
    editRecord =
        MiniLatex.initializeEditRecord 0 source 
  in 
    MiniLatex.getRenderedText editRecord
        |> List.map (\x -> Element.paragraph [  ] [ Element.html x ])
        |> Element.column []

viewMarkdown : Document -> Element msg
viewMarkdown document =
  Element.el [ ] (Element.html <| MarkdownTools.view document.content)


-- YAY: https://ellie-test-19-cutover.now.sh/LGShLFZHvha1
-- https://ellie-test-19-cutover.now.sh/LGc6jCfs64a1


viewAsciidoc : Int -> String -> Element msg
viewAsciidoc debounceCounter str =
  Keyed.el [ ] (  ("Asciidoc." ++ String.fromInt debounceCounter)
                  , (Element.html <| asciidocText str))


asciidocText : String -> Html msg
asciidocText str =
    Html.node "asciidoc-text"
        [ HA.property "content" (Encode.string str) ]
        []

viewPlainText : Document -> Element msg
viewPlainText document =
   Element.el [ ] (Element.html <| MarkdownTools.view document.content)


viewChildren : Document -> Element DocViewMsg 
viewChildren document = 
  Element.column [Element.spacing 5] (List.map (viewChild document.id) document.children)
  
viewChild : Int -> Child -> Element DocViewMsg 
viewChild parentId child = 
  Element.el [] (
        Input.button (Widget.titleStyle) {
            onPress =  Just (LoadMasterWithCurrentSelection parentId)
        , label = Element.el [ moveUp 0, padding 5, Font.size 12, Font.bold] (text child.title)
        } 
    )