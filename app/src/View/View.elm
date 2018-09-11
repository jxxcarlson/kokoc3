module View.View exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Element.Border as Border
import Element.Lazy

import Browser.Dom exposing(Viewport)

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
    , ToolMenuState(..)
  )
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import DocumentListView exposing(DocListViewMsg(..))
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
import DocumentView
import DocumentList
import DocumentDictionary
import Configuration
import AppUtility
import View.Widget as Widget exposing(..)

import View.Reader as Reader
import View.Admin as Admin
import View.Image as Image
import View.Writer as Writer
import View.Author as Author
import View.Phone exposing(phoneView)

import OnClickOutside

view model = 
  case (currentDevice model.viewport).class of 
    Phone -> phoneView model 
    _ -> nonPhoneView model


nonPhoneView  model =
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
        -- , Element.el [ Font.size 24] (text <| appTitle model.appMode)
        , startButton (px 90) model 
        , spacer 8
        , homeButton (px 55) model
        , spacer 11
        , readerModeButton (px 50) model
        , writerModeButton (px 48) model
        , imageModeButton (px 56) model]
        , authorDisplayModeButton (px 62) model
        , spacer 10
        , viewUserManualLink
        , spacer 10
        , Reader.signoutButton (px 70) model
        , adminModeButton (px 70) model
        , toolMenu model 
  ]


body : Model -> Element Msg 
body model =
  case model.appMode of 
    Reading -> Reader.view model 
    Writing -> Writer.view model 
    ImageEditing -> Image.view model 
    Admin -> Admin.view model
    DisplayAuthors -> Author.view model


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
      -- , Element.el [] (text <| currentDeviceString model.viewport)
      , Element.el [] (text <| Configuration.client)
      -- , Element.el [] (text <| "access: " ++ (Document.accessDictToString model.currentDocument.access))
      , Element.el [] (text <| viewportInfo model)
      , Element.el [] (text <| model.debugString) 
    
  ] 

viewportInfo : Model -> String 
viewportInfo model = 
  case model.viewPortOfRenderedText of 
    Nothing -> "--"
    Just vp ->
      let 
        x = vp.viewport.x |> String.fromFloat
        y = vp.viewport.x |> String.fromFloat
        h = vp.viewport.height |> String.fromFloat
        w = vp.viewport.width |> String.fromFloat
        sw = vp.scene.width |> String.fromFloat
        sh = vp.scene.height |> String.fromFloat
      in 
      "x = " ++ x ++ ", y = " ++ y ++ ", h = "  ++ h ++ ", w = " ++ w ++ ", sw = " ++ sw ++ ", sh = " ++ sh


yCoordinateForRenderedText : Model -> Float 
yCoordinateForRenderedText model = 
  case model.viewPortOfRenderedText of 
    Nothing -> 0
    Just viewport -> viewport.viewport.y

showMaybeUser : Maybe User -> String 
showMaybeUser maybeUser = 
  case maybeUser of 
    Nothing -> "No User"
    Just user -> User.username user
    
deviceClassString : DeviceClass -> String 
deviceClassString deviceClass = 
  case deviceClass of 
    Phone -> "phone"
    Tablet -> "tablet"
    Desktop -> "desktop"
    BigDesktop -> "big desktop"


currentDevice : Viewport -> Device 
currentDevice  viewport =
  let 
    width = viewport.viewport.width
    height = viewport.viewport.height
  in 
    classifyDevice {width = round width, height = round height}


currentDeviceString : Viewport -> String 
currentDeviceString  viewport = 
    viewport 
      |> currentDevice 
      |> .class
      |> deviceClassString



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
    Input.text ([htmlAttribute (Html.Attributes.id "search-box")
       , width (px 360), height (px 30) , Font.color black] 
         ++ OnClickOutside.withIdElement "search-box" (UserClicksOutsideSearchBox))
       {
        text = model.searchQueryString 
      , placeholder = Just (Input.placeholder [moveUp 5] (text <| searchPlaceHolderText model ))
      , onChange = (\str -> AcceptSearchQuery str)
      , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
    }

searchPlaceHolderText : Model -> String 
searchPlaceHolderText model  =
  case model.appMode of 
    ImageEditing -> "Example: type 'aust', press Enter"
    DisplayAuthors -> "Example: type 'fred' or 'physics', press Enter"
    Admin -> "Example: type 'alpha' or 'physics', press Enter"
    _ -> "Example: type 'quantum', press Enter"

-- BUTTONS AND LINKS


prepareImagesButton : Model -> Element Msg 
prepareImagesButton model = 
    Input.button (Widget.buttonStyle  (px 115)) {
      onPress =  Just Test
    , label = Element.el [] (Element.text ("Prepare Images"))
    }

testButton : Model -> Element Msg 
testButton model = 
    Input.button (Widget.buttonStyle  (px 115)) {
      onPress =  Just Test
    , label = Element.el [] (Element.text ("Test"))
    }

viewUserManualLink : Element msg
viewUserManualLink = 
  Element.link [] { 
       url = Configuration.client ++ "/" ++ String.fromInt Configuration.userManualId
     , label = Element.el [Font.bold] (text "Manual") 
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
  Input.button (titleButtonStyle  width_) {
    onPress =  Just (GoToStart)
  , label = Element.el [] (Element.text "kNode")
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

authorDisplayModeButton : Length -> Model -> Element Msg    
authorDisplayModeButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just user -> 
        Input.button (modeButtonStyle model.appMode DisplayAuthors  width_) {
          onPress =  Just (ChangeMode DisplayAuthors)
        , label = Element.el [] (Element.text "Authors")
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
    Admin -> "Admin"
    _ -> "kNode"


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
 
 -- INPUTS


toolMenu : Model -> Element Msg 
toolMenu model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ -> 
      Element.row [spacing 5,Background.color charcoal, Font.color white, padding 10]
      [ Element.el
          [ Element.below (displayMenuItems model)
          ]
          (toggleToolMenu)
      ]


displayMenuItems : Model ->  Element Msg
displayMenuItems model =
  case model.toolMenuState of 
    HideToolMenu -> Element.none
    ShowToolMenu -> 
      Element.column [ moveLeft  10]
        [
             separator
           , doSearchItem
           , randomDocumentItem model
           , separator
           , readerModeItem model
           , writerModeItem model
           , imageModeItem model
           , authorModeItem model
           , homeItem model
           , separator
           , saveCurrentDocumentItem
           , newStandardDocItem
           , newMasterDocItem 
           , newSubDocumentItem
           , incrementVersionItem
           , separator
           , toggleEditPanelItem
           , toggleUserPreferencesItem
           , printItem
           , goToStartItem
        ]

separator = Element.el (Widget.menuSeparatorStyle  (px 160)) (Element.text "———————-———————")

toggleToolMenu = 
    Input.button (Widget.menuItemStyle  (px 140)) {
      onPress =  Just ToggleToolMenu
    , label = Element.el [] (Element.text ("TOOLS"))
    }

saveCurrentDocumentItem : Element Msg
saveCurrentDocumentItem = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  Just UpdateCurrentDocument
    , label = Element.el [] (Element.text ("Save doc Ctrl-S"))
    }

randomDocumentItem : Model -> Element Msg
randomDocumentItem model = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (randomItemMsg model))
    , label = Element.el [] (Element.text ("Random docs Ctrl-/"))
    }
    
doSearchItem : Element Msg
doSearchItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (Search))
    , label = Element.el [] (Element.text ("Search Enter"))
    }

writerModeItem : Model -> Element Msg
writerModeItem model = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (ChangeMode Writing))
    , label = Element.el [] (Element.text ("Write mode Ctrl-W"))
    }

readerModeItem : Model -> Element Msg
readerModeItem model = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (ChangeMode Reading))
    , label = Element.el [] (Element.text ("Read mode Ctrl-R"))
    }

imageModeItem : Model -> Element Msg
imageModeItem model = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (ChangeMode ImageEditing))
    , label = Element.el [] (Element.text ("Image upload Ctrl-I"))
    }

authorModeItem : Model -> Element Msg
authorModeItem model = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (ChangeMode DisplayAuthors))
    , label = Element.el [] (Element.text ("Author list Ctrl-A"))
    }

homeItem : Model -> Element Msg
homeItem model = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (GoHome))
    , label = Element.el [] (Element.text ("Home Ctrl-H"))
    }

newStandardDocItem :  Element Msg
newStandardDocItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (NewDocument))
    , label = Element.el [] (Element.text ("New document Ctrl-N"))
    }

newSubDocumentItem : Element Msg
newSubDocumentItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (NewChildDocument))
    , label = Element.el [] (Element.text ("New subdocument Ctrl-J"))
    }

newMasterDocItem :  Element Msg
newMasterDocItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (NewMasterDocument))
    , label = Element.el [] (Element.text ("New master doc Ctrl-M"))
    }

toggleEditPanelItem :  Element Msg
toggleEditPanelItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (ToggleToolPanelState))
    , label = Element.el [] (Element.text ("Edit Tools Ctrl-E"))
    }

printItem :  Element Msg
printItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (PrintDocument))
    , label = Element.el [] (Element.text ("Print Ctrl-P"))
    }


goToStartItem :  Element Msg
goToStartItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (GoToStart))
    , label = Element.el [] (Element.text ("kNode Ctrl-0"))
    }


incrementVersionItem :  Element Msg
incrementVersionItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (IncrementVersion))
    , label = Element.el [] (Element.text ("New version Ctrl-V"))
    }

toggleUserPreferencesItem :  Element Msg
toggleUserPreferencesItem  = 
    Input.button (Widget.menuItemStyle  (px 160)) {
      onPress =  (Just (TogglePreferencesPanel))
    , label = Element.el [] (Element.text ("User preferences Ctrl-U"))
    }
