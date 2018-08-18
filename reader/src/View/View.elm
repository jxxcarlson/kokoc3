module View.View exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Element.Border as Border
import Element.Lazy

import Html exposing(Html)
import Html.Attributes exposing(src, type_, value)
import Html.Events exposing(on)
import Time

import Json.Encode as Encode
import Json.Decode as Decode exposing(Decoder, Value)
import VirtualDom exposing (Handler(..))


import Model exposing(Model
    , Msg(..)
    , AppMode(..)
    , SignupMode(..)
    , ToolPanelState(..)
    , DeleteDocumentState(..)
  )
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import DocumentListView exposing(DocListViewMsg(..))
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
import DocumentView
import DocumentList
import DocumentDictionary
import Configuration
import AppUtility
import Widget exposing(..)

import View.Reader as Reader
import View.Admin as Admin
import View.Image as Image
import View.Writer as Writer


view  model =
   Element.layout [Font.size 14, width fill, height fill, clipY] <|
        Element.column [ width fill, height (px model.windowHeight)] [
              header model
            , body model
            , footer model
        ]
        
header : Model -> Element Msg
header model = 
  Element.row [width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0, spacing 10, alignLeft] [
      Element.row [ spacing 10]  [
         searchInput model
        -- , getDocumentsButton (px 60) model
        , getRandomDocumentsButton (px 70) model
        , spacer 8
        , Element.el [ Font.size 24] (text <| appTitle model.appMode)
        , spacer 8
        , startButton (px 50) model 
        , homeButton (px 55) model
        , spacer 11
        , readerModeButton (px 50) model
        , writerModeButton (px 48) model
        , imageModeButton (px 56) model]
        , spacer 10
        , viewUserManualLink
        , spacer 10
        , Reader.signoutButton (px 70) model
        , adminModeButton (px 70) model
  ]


body : Model -> Element Msg 
body model =
  case model.appMode of 
    Reading -> Reader.view model 
    Writing -> Writer.view model 
    ImageEditing -> Image.view model 
    Admin -> Admin.view model


footer : Model -> Element Msg
footer model = 
  Element.row [moveUp 8, spacing 15, width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0] [
        Element.el [width (px 240), Font.family [Font.typeface "Courier", Font.monospace]] (text model.message)
      , Element.el [documentDirtyIndicator  model, padding 5] (text ("id " ++ (String.fromInt model.currentDocument.id )))
      , Element.el [] (text <| docInfo model.currentDocument) 
      , testButton model
      , printDocumentButton model 
      , exportDocumentlLink model
      , getAuthorsDocumentsButton (px 110) model
  ] 

spacer : Int -> Element msg
spacer width_ = 
  Element.el [width (px width_)] (Element.text "")



{-| 
  Not currently used.
-}
documentDictionaryInfo : Model -> String 
documentDictionaryInfo model = 
  let 
    k = model.documentDictionary |> DocumentDictionary.keys |> String.join ","
    v = model.documentDictionary |> DocumentDictionary.values |> String.join ","
  in  
    k ++ ":: " ++ v

documentDirtyIndicator : Model -> Attr decorative msg
documentDirtyIndicator  model = 
  case model.currentDocumentDirty  of 
    False -> Background.color Widget.indicatorGood
    True -> Background.color Widget.indicatorBad



-- OUTPUTS

label : Int -> String -> Element msg
label fontSize str =
   Element.el [Font.size fontSize, Font.bold] (text str)


-- INPUTS


searchInput : Model -> Element Msg
searchInput model =
    Input.text [htmlAttribute (Html.Attributes.id "search-box")
       , width (px 360), height (px 30) , Font.color black] {
        text = model.searchQueryString 
      , placeholder = Just (Input.placeholder [moveUp 5] (text "Search example: type 'quantum', then press Ctrl-Enter"))
      , onChange = Just(\str -> AcceptSearchQuery str)
      , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
    }


-- BUTTONS AND LINKS


testButton : Model -> Element Msg 
testButton model = 
    Input.button (Widget.buttonStyle  (px 115)) {
      onPress =  Just Test
    , label = Element.el [] (Element.text ("Prepare Images"))
    }


viewUserManualLink : Element msg
viewUserManualLink = 
  Element.link [] { 
       url = Configuration.client ++ "/" ++ String.fromInt Configuration.userManualId
     , label = Element.el [Font.bold] (text "User manual") 
  }

exportDocumentlLink : Model -> Element msg   
exportDocumentlLink model = 
  case model.maybeCurrentUser of  
    Nothing -> Element.none 
    Just user ->
      case User.userId user == model.currentDocument.authorId of 
        False -> 
          Element.none 
        True -> 
          Widget.linkButtonFat (exportUrl model.currentDocument) "Export" (px 60) 


modeButtonStyle appMode buttonMode width_ = 
  case appMode == buttonMode of 
    True -> buttonStyleWithColor Widget.darkRed width_  
    False -> buttonStyleWithColor Widget.blue width_ 


basicButton : List (Attribute msg) -> String -> msg -> Element msg
basicButton style_ label_ msg =
 Input.button style_ {
        onPress =  Just msg
      , label = Element.el [] (Element.text label_)
      }

xbutton : Model -> List (Attribute msg) -> String -> msg -> Element msg    
xbutton model style_ label_ msg =  
    case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Input.button style_ {
        onPress =  Just msg
      , label = Element.el [] (Element.text label_)
      } 

 
getRandomDocumentsButton : Length -> Model -> Element Msg    
getRandomDocumentsButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (randomItemMsg model)
  , label = Element.el [] (Element.text "Random")
  } 


randomItemMsg : Model -> Msg
randomItemMsg model =
  case model.appMode of 
    ImageEditing -> GetImages "random=yes" 
    _ -> GetPublicDocumentsRawQuery "random=public"


getAuthorsDocumentsButton : Length -> Model -> Element Msg  
getAuthorsDocumentsButton width_ model = 
  if model.currentDocument.id > 0 then 
    getAuthorsDocumentsButton_ width_ model 
  else 
    Element.none

getAuthorsDocumentsButton_ : Length -> Model -> Element Msg    
getAuthorsDocumentsButton_ width_ model = 
  let  
    authorname = model.currentDocument.authorName 
  in 
    case authorname == "" of 
      True -> Element.none 
      False ->
        case authorname == User.usernameFromMaybeUser model.maybeCurrentUser  of 
          False -> 
            Input.button ((buttonStyle  width_) ++ [Font.center]) {
              onPress =  Just (GetPublicDocumentsRawQuery ("authorname=" ++ authorname ++ "&sort=title"))
            , label = Element.el [] (Element.text authorname)
            }
          True -> 
            Input.button ((buttonStyle  width_) ++ [Font.center]) {
              onPress =  Just (GetUserDocuments ("authorname=" ++ authorname ++ "&sort=title" ++ "&docs=any"))
            , label = Element.el [] (Element.text authorname)
            }

{-| Not used.
-}
saveCurrentDocumentButton : Length -> Model -> Element Msg    
saveCurrentDocumentButton width_ model =
  xbutton model (buttonStyle  width_) "Save" (SaveCurrentDocument (Time.millisToPosix 10))  


startButton : Length -> Model -> Element Msg    
startButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GoToStart)
  , label = Element.el [] (Element.text "Start")
  } 

homeButton : Length -> Model -> Element Msg    
homeButton width_ model = 
    case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Input.button (buttonStyle  width_) {
        onPress =  Just (GoHome)
      , label =  Element.el [] (Element.text "Home")
      } 

readerModeButton : Length -> Model -> Element Msg    
readerModeButton width_ model = 
  Input.button (modeButtonStyle model.appMode Reading  width_) {
    onPress =  Just (ChangeMode Reading)
  , label = Element.el [] (Element.text "Read")
  } 

writerModeButton : Length -> Model -> Element Msg    
writerModeButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ -> 
      Input.button (modeButtonStyle model.appMode Writing  width_) {
        onPress =  Just (ChangeMode Writing)
      , label = Element.el [] (Element.text "Write")
      } 

adminModeButton : Length -> Model -> Element Msg    
adminModeButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just user -> 
      case User.username user == Configuration.adminUsername of 
        False -> Element.none 
        True -> 
          Input.button (modeButtonStyle model.appMode Admin  width_) {
            onPress =  Just (ChangeMode Admin)
          , label = Element.el [] (Element.text "Admin")
          } 

imageModeButton : Length -> Model -> Element Msg    
imageModeButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just user -> 
        Input.button (modeButtonStyle model.appMode ImageEditing  width_) {
          onPress =  Just (ChangeMode ImageEditing)
        , label = Element.el [] (Element.text "Image")
        } 
 
printDocumentButton model =
  case model.currentDocument.id > 0 of 
    True -> printButton model 
    False -> Element.none  


printButton model =
  case model.currentDocument.textType of 
    MiniLatex -> 
      printLatexButton model
    _ -> 
      Widget.linkButtonFat (Document.printUrl model.currentDocument) "Print" (px 45)

printLatexButton : Model -> Element Msg 
printLatexButton model = 
    Input.button (Widget.buttonStyle  (px 45)) {
      onPress =  Just PrintDocument
    , label = Element.el [] (Element.text ("Print"))
    }

-- STRING HELPERS

appTitle : AppMode -> String 
appTitle appMode =
  case appMode of 
    Reading -> "kNode"
    Writing -> "kNode"
    ImageEditing -> "kNode"
    Admin -> "Admin"


exportUrl : Document -> String 
exportUrl document = 
  Configuration.backend ++ "/export/documents/" ++ String.fromInt  document.id


access : Document -> String 
access doc = 
  case doc.public of 
    True -> "public"
    False -> "private"

docInfo : Document -> String 
docInfo document = 
  let 
    wordCount = (String.fromInt (Document.wordCount document)) ++ " words"
    access_ = access document
  in 
    "(" ++ access_ ++ ", " ++ wordCount ++ ")"

showKeys : Model -> String 
showKeys model = 
  DocumentDictionary.keys model.documentDictionary |> String.join ", "
 