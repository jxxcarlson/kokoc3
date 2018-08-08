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

import Configuration  
import KVList 

import MeenyLatex.Differ exposing (EditRecord)
import MeenyLatex.MiniLatex as MiniLatex
import MarkdownTools


import Html exposing(Html) 

import Document exposing(Document, Child, DocType(..), TextType(..))
import Widget


type DocViewMsg = 
    LoadMaster Int
  | LoadMasterWithSelection Int Int 
  | LoadMasterWithCurrentSelection Int
  | GetPublicDocumentsRawQuery2 String

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
    if document.docType == Standard then 
       Element.column (titleLineStyle 56) [
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




documentView : Int -> String -> Document -> DocumentView DocViewMsg
documentView debounceCounter texMacros doc = 
  { title = doc.title 
    , content = documentContentView debounceCounter texMacros doc
  }


documentContentView : Int -> String -> Document -> Element DocViewMsg 
documentContentView debounceCounter texMacros document = 
    case document.docType of 
        Master -> viewCoverArt document -- viewChildren document 
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
    preamble = 
      [  setCounterText document.tags 
       , setDocId document.id 
       , setClient
       , ""
      ] |> String.join("\n\n")

    postlude = "\n\n\\bigskip\n\\bigskip\n\\bigskip\n\\bigskip\n\n"

    source = if texMacros == "" then 
                document.content 
             else 
                prependMacros texMacros document.content
    editRecord =
        MiniLatex.initializeEditRecord 0 (preamble ++ source ++ postlude) 
  in 
    MiniLatex.getRenderedText editRecord
        |> List.map (\x -> Element.paragraph [  ] [ Element.html x ])
        |> Element.column []

setCounterText : List String -> String 
setCounterText tags = 
  let 
    maybeSectionNumber = KVList.intValueForKey "sectionNumber" tags
  in 
    case maybeSectionNumber of 
      Nothing -> ""
      Just sectionNumber -> "\\setcounter{section}{" ++ String.fromInt sectionNumber ++ "}\n\n"

setDocId : Int -> String
setDocId id = "\\setdocid{" ++ (String.fromInt id) ++ "}"

setClient : String 
setClient = 
  "\\setclient{" ++ Configuration.client ++ "}"

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