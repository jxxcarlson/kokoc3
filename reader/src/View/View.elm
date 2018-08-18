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
    , ImageMode(..)
    , SignupMode(..)
    , ToolPanelState(..)
    , DeleteDocumentState(..)
    , ImageAccessibility(..)
  )
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import FileUploadCredentials as Credentials exposing(FileData, Image)
import DocumentListView exposing(DocListViewMsg(..))
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
import DocumentView
import DocumentList
import DocumentDictionary
import Configuration
import AppUtility
import Widget exposing(..)

import View.Admin as Admin


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
        , signoutButton (px 70) model
        , adminModeButton (px 70) model
  ]

spacer : Int -> Element msg
spacer width_ = 
  Element.el [width (px width_)] (Element.text "")

appTitle : AppMode -> String 
appTitle appMode =
  case appMode of 
    Reading -> "kNode"
    Writing -> "kNode"
    ImageEditing -> "kNode"
    Admin -> "Admin"

body : Model -> Element Msg 
body model =
  case model.appMode of 
    Reading -> readerBody model 
    Writing -> writerBody model 
    ImageEditing -> imageBody model 
    Admin -> Admin.view model


-- READER

readerBody : Model -> Element Msg
readerBody model = 
  Element.row [width (fillPortion 4), height fill, Background.color Widget.white, centerX] [
     bodyLeftColumn 2 model,  bodyReaderColumn model.windowHeight 7 model, bodyRightColumn 2 model
  ]

writerBody : Model -> Element Msg
writerBody model = 
  Element.row [width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX] [
     bodyLeftColumn 2 model,  bodyEditorColumn model.windowHeight 5 model, bodyReaderColumn model.windowHeight 5 model
  ]

bodyLeftColumn : Int -> Model -> Element Msg
bodyLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        Element.row [spacing 10] [ toggleToolsButton (px 105) model, newDocumentButton model ]
      , newChildButton model 
      , toolsOrContents model
  ]

-- IMAGEBODY

imageBody : Model -> Element Msg
imageBody model = 
  Element.row [width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX] [
     imageLeftColumn 2 model,  imageCenterColumn model.windowHeight 7 model, imageRightColumn 2 model
  ]

imageLeftColumn : Int -> Model -> Element Msg
imageLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        imageCatalogueLink model
      , Element.el [] (Element.text <| "Images: " ++ (String.fromInt <| List.length model.imageList))
      , viewImages model.imageList
       
  ]

imageCenterColumn : Int -> Int -> Model -> Element Msg
imageCenterColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73))
    , Background.color Widget.veryDarkGrey 
    , centerX, centerY
    ] [ loadOrViewImage model ]

loadOrViewImage : Model -> Element Msg
loadOrViewImage model = 
  case model.imageMode of 
    LoadImage ->  viewImageToUpload model
    ViewImage -> viewLargeImage model 



imageRightColumn : Int -> Model -> Element Msg
imageRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, Background.color Widget.lightBlue, centerX] [
      
  ]

viewImages : List Image -> Element Msg 
viewImages imageList = 
  Element.column [spacing 20, scrollbarY] (List.map viewImage imageList)

viewImage : Image -> Element Msg 
viewImage image = 
  Element.column [spacing 5] [
    Element.image  [width (px 250)] {
      src = image.url
    , description = image.name
    }
    -- , Element.el [] (Element.text image.url)
    -- , Element.el [Font.bold] (Element.text image.name)
    , selectImageButton image
  ]

selectImageButton : Image -> Element Msg 
selectImageButton image = 
    Input.button (Widget.squareButtonStyle  (px 250)) {
      onPress =  Just (SelectImage image)
    , label = Element.el [] (Element.text image.name)
    }


-- LOGIN, ETC

loginOrSignUpPanel model = 
  case model.signupMode of
    SigninMode ->  loginPanel model
    RegistrationMode -> signupPanel model

loginPanel : Model -> Element Msg 
loginPanel model = 
  case model.maybeCurrentUser of 
    Just _ -> Element.none 
    Nothing ->
      Element.column [padding 20, spacing 20] [
          Element.el [Font.bold, Font.size 18] (text "Sign in")
        , emailInput model
        , passwordInput model
        , Element.row [spacing 15] [
              getTokenButton (px 66) model
            , gotoRegistrationButton (px 66) model
        ] 
        , Element.paragraph [Font.color Widget.darkRed, width (px 160)] [text <| filterMessageForSignIn model.message]
      ]

filterMessageForSignIn : String -> String
filterMessageForSignIn str  =  
  case String.startsWith "Error:" str of 
    True -> ""
    False -> str

                


signupPanel : Model -> Element Msg 
signupPanel model = 
  case model.maybeCurrentUser of 
    Just _ -> Element.none 
    Nothing ->
      Element.column [padding 20, spacing 20] [
          Element.el [Font.bold, Font.size 18] (text "Sign up")
        , emailInput model
        , usernameInput model
        , passwordInput model
        , Element.row [spacing 15] [
            registerUserButton (px 65) model
          , cancelRegistrationButton (px 60) model
        ]
        , Element.paragraph [Font.color Widget.darkRed, width (px 160)] [text <| filterMessageForSignIn model.message]
      ]





logoutPanel : Model -> Element Msg 
logoutPanel model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Element.column [padding 20, spacing 20] [
          currentUserNameElement model
       
        
      ]

-- TOOLS

toolsOrContents model = 
  case model.toolPanelState of 
    ShowToolPanel -> toolsPanel model
    HideToolPanel -> Element.map DocListViewMsg (DocumentListView.viewWithHeading model.windowHeight model.masterDocLoaded (docListTitle model) model.documentList)

toolsPanel model = Element.column [ spacing 15, padding 10, height shrink, scrollbarY] [ 
   publicControls model
  , deleteDocumentButton model
  , masterDocPanel model
  , documentTitleInput model
  , documentPanels model
  , tagInputPane model (px 250) (px 140) "Tags"
  , versionsPanel model
  ]

publicControls : Model -> Element Msg 
publicControls model = 
  Element.row [spacing 5] [ publicButton model.currentDocument, privateButton model.currentDocument]


  


deleteDocumentButton : Model -> Element Msg
deleteDocumentButton model =
   Element.row [spacing 10] [
        deleteCurrentDocumentButton (px 60) model
      , cancelDeleteCurrentDocumentButton (px 60) model
    ]

masterDocPanel model = 
  Element.column [spacing 5] [ 
    Element.el [] (text <| "Master doc: " ++ (String.fromInt model.currentDocument.parentId))

  ]

versionsPanel model = 
  Element.column [spacing 5] [
     Element.el [] (text <| "Version: " ++ (String.fromInt model.currentDocument.version))
     , Element.column [] [
         showVersionButton model
        , newVersionButton model
       ]
  ]

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



exportUrl : Document -> String 
exportUrl document = 
  Configuration.backend ++ "/export/documents/" ++ String.fromInt  document.id



showVersionButton model = 
  linkButton (showVersionsUrl model.currentDocument) "Show versions" (px 100)
  
newVersionButton model = 
  linkButton (newVersionUrl model.currentDocument) "New version" (px 100)


showVersionsUrl : Document -> String
showVersionsUrl document =
    Configuration.backend ++ "/archive/versions" ++ "/" ++ (String.fromInt document.id)


newVersionUrl : Document -> String
newVersionUrl document =
    Configuration.backend ++ "/archive/new_version" ++ "/" ++(String.fromInt document.id)


tagInputPane model width_ height_ label_  = 
  Element.column [] [
      Element.el [Font.bold] (text label_)
    , tagInputPane_ model width_ height_ label_ 
  ]

tagInputPane_ model width_ height_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (height_), padding 10, scrollbarY ]
                { onChange = Just AcceptDocumentTagString
                , text = model.currentDocument.tags |> String.join ", "
                , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]

documentPanels model = 
  Element.column [height shrink, spacing 10] [
    Element.el [Font.bold] (text "Text type")
  , textTypePanel model
  , Element.el [Font.bold] (text "Document type")
  , documentTypePanel model
  ]

textTypePanel model = 
  Element.column [spacing 5] [
      miniLatexTypeButton model 
    , asciidocTypeButton model 
    , asciidocLatexTypeButton model 
    , markdownTypeButton model 
    , plainTextTypeButton model 
  ]

documentTypePanel model = 
  Element.column [spacing 5] [
      standardDocumentButton model 
    , masterDocumentButton model 
  ]

bodyReaderColumn : Int -> Int -> Model -> Element Msg
bodyReaderColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view windowHeight_ model.counter model.debounceCounter (texMacros model) model.currentDocument)
  ]


bodyEditorColumn : Int -> Int -> Model -> Element Msg
bodyEditorColumn windowHeight_ portion_ model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 80))
    , Background.color Widget.lightYellow, centerX] [
     textArea model (fillPortion portion_) windowHeight_ "Editor"
  ]

textArea model width_ windowHeight_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (px (windowHeight_ - 80)), paddingXY 10 0, scrollbarY ]
                { onChange = Just GetContent
                , text = model.currentDocument.content
                , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]
-- (px (windowHeight_ - 40))


bodyRightColumn : Int -> Model -> Element Msg
bodyRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, Background.color Widget.lightBlue, centerX] [
      loginOrSignUpPanel model
    , logoutPanel model
  ]

docListTitle : Model -> String 
docListTitle model = 
  let  
    documentCount = List.length (DocumentList.documents model.documentList)
    firstDocument = DocumentList.getFirst model.documentList
    title = case firstDocument.docType of 
      Standard -> "Search Results"
      Master -> "Contents"
  in 
    title ++ " (" ++ String.fromInt documentCount ++ ")"  




texMacros : Model -> String
texMacros model = 
  case DocumentDictionary.get "texmacros"  model.documentDictionary of 
    Nothing -> ""
    Just doc -> doc.content
    
  


footer : Model -> Element Msg
footer model = 
  Element.row [moveUp 8, spacing 15, width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0] [
        Element.el [width (px 240), Font.family [Font.typeface "Courier", Font.monospace]] (text model.message)
      , Element.el [documentDirtyIndicator  model, padding 5] (text ("id " ++ (String.fromInt model.currentDocument.id )))
      , Element.el [] (text <| docInfo model.currentDocument) 
     --  , saveCurrentDocumentButton (px 50) model
      , testButton model
      , printDocumentButton model 
      , exportDocumentlLink model
      , getAuthorsDocumentsButton (px 110) model

  ] 

testButton : Model -> Element Msg 
testButton model = 
    Input.button (Widget.buttonStyle  (px 115)) {
      onPress =  Just Test
    , label = Element.el [] (Element.text ("Prepare Images"))
    }


documentDictionaryInfo : Model -> String 
documentDictionaryInfo model = 
  let 
    k = model.documentDictionary |> DocumentDictionary.keys |> String.join ","
    v = model.documentDictionary |> DocumentDictionary.values |> String.join ","
  in  
    k ++ ":: " ++ v


masterDocLoadedIndicator model =
  case model.masterDocLoaded of 
    True -> "master: LOADED"
    False -> "master: NOT loaded"


documentDirtyIndicator  model = 
  case model.currentDocumentDirty  of 
    False -> Background.color Widget.indicatorGood
    True -> Background.color Widget.indicatorBad

currentUserNameElement : Model -> Element msg 
currentUserNameElement model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just user -> Element.el [] (Element.text <| "Signed in as " ++ User.username user)


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


-- OUTPUTS

label : Int -> String -> Element msg
label fontSize str =
   Element.el [Font.size fontSize, Font.bold] (text str)


-- INPUTS

passwordInput : Model -> Element Msg
passwordInput model =
    Input.newPassword [width (px 180), height (px 30) , Font.color black] {
        text = model.password 
      , placeholder = Nothing
      , show = False
      , onChange = Just(\str -> AcceptPassword str)
      , label = Input.labelAbove [ Font.size 12, Font.bold, moveDown 0 ] (text "Password")
    }

emailInput : Model -> Element Msg
emailInput model =
    Input.text [width (px 180), height (px 30) , Font.color black] {
        text = model.email 
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptEmail str)
      , label = Input.labelAbove [ Font.size 12, Font.bold, moveDown 0 ] (text "Email")
    }


usernameInput : Model -> Element Msg
usernameInput model =
    Input.text [width (px 180), height (px 30) , Font.color black] {
        text = model.username 
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptUserName str)
      , label = Input.labelAbove [ Font.size 12, Font.bold, moveDown 0 ] (text "User name")
    }



searchInput : Model -> Element Msg
searchInput model =
    Input.text [htmlAttribute (Html.Attributes.id "search-box")
       , width (px 360), height (px 30) , Font.color black] {
        text = model.searchQueryString 
      , placeholder = Just (Input.placeholder [moveUp 5] (text "Search example: type 'quantum', then press Ctrl-Enter"))
      , onChange = Just(\str -> AcceptSearchQuery str)
      , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
    }

documentTitleInput : Model -> Element Msg
documentTitleInput model =
    Input.text [htmlAttribute (Html.Attributes.id "title-input"), width (px 250), height (px 30) , Font.color black] {
        text = model.documentTitle
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptDocumenTitle str)
      , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "Title")
    }


-- BUTTONS

selectImagerLoaderButton : Model -> Element Msg 
selectImagerLoaderButton model = 
  Input.button (Widget.whiteButtonStyle (px 160)) {
    onPress =  Just SelectImageLoader
  , label = Element.el [] (Element.text ("Image Loader"))
  }

publicButton : Document -> Element Msg 
publicButton document = 
  Input.button (Widget.buttonStyleWithColor (publicIndicatorColor document.public True) (px 60)) {
    onPress =  Just (SetDocumentPublic True)
  , label = Element.el [] (Element.text ("Public"))
  }

privateButton : Document -> Element Msg 
privateButton document = 
  Input.button (Widget.buttonStyleWithColor (publicIndicatorColor document.public False) (px 60)) {
    onPress =  Just (SetDocumentPublic False)
  , label = Element.el [] (Element.text ("Private"))
  }  

publicIndicatorColor : Bool -> Bool -> Color 
publicIndicatorColor actual target = 
  case actual == target of 
     True -> Widget.darkRed 
     False -> Widget.buttonColor


miniLatexTypeButton : Model -> Element Msg 
miniLatexTypeButton model = 
  Input.button (textTypeButtonStyle model MiniLatex) {
    onPress =  Just (SetDocumentTextType MiniLatex)
  , label = Element.el [] (Element.text ("MiniLatex"))
  }

asciidocTypeButton : Model -> Element Msg 
asciidocTypeButton model = 
  Input.button (textTypeButtonStyle model Asciidoc) {
    onPress =  Just (SetDocumentTextType Asciidoc)
  , label = Element.el [] (Element.text ("Asciidoc"))
  }

asciidocLatexTypeButton : Model -> Element Msg 
asciidocLatexTypeButton model = 
  Input.button (textTypeButtonStyle model AsciidocLatex) {
    onPress =  Just (SetDocumentTextType AsciidocLatex)
  , label = Element.el [] (Element.text ("Asciidoc Latex"))
  }

markdownTypeButton : Model -> Element Msg 
markdownTypeButton model = 
  Input.button (textTypeButtonStyle model Markdown) {
    onPress =  Just (SetDocumentTextType Markdown)
  , label = Element.el [] (Element.text ("Markdown"))
  }

plainTextTypeButton : Model -> Element Msg 
plainTextTypeButton model = 
  Input.button (textTypeButtonStyle model PlainText) {
    onPress =  Just (SetDocumentTextType PlainText)
  , label = Element.el [] (Element.text ("Plain Text"))
  } 


textTypeButtonStyle : Model -> TextType -> List (Attribute msg) 
textTypeButtonStyle model textType = 
  (
     (listItemStyleNarrow (px 110))  ++  (highLightTextType model.currentDocument.textType textType)
  )

documentTypeButtonStyle : Model -> DocType -> List (Attribute msg) 
documentTypeButtonStyle model docType = 
  (
     (listItemStyleNarrow (px 110))  ++  (highLightDocumentType model.currentDocument.docType docType)
  )

standardDocumentButton : Model -> Element Msg 
standardDocumentButton model = 
  Input.button (documentTypeButtonStyle model Standard) {
    onPress =  Just (SetDocumentType Standard)
  , label = Element.el [] (Element.text ("Standard"))
  }

masterDocumentButton : Model -> Element Msg 
masterDocumentButton model = 
  Input.button (documentTypeButtonStyle model Master) {
    onPress =  Just (SetDocumentType Master)
  , label = Element.el [] (Element.text ("Master"))
  }

highLightDocumentType : DocType -> DocType  -> List (Attribute msg) 
highLightDocumentType docType1 docType2 = 
  case docType1 == docType2 of 
    True -> [Font.bold]
    False -> [Font.light] 

highLightTextType : TextType -> TextType  -> List (Attribute msg) 
highLightTextType textType1 textType2 = 
  case textType1 == textType2 of 
    True -> [Font.bold]
    False -> [Font.light] 


newDocumentButton :  Model -> Element Msg    
newDocumentButton model = 
  case model.appMode of 
    ImageEditing -> Element.none
    Reading -> Element.none 
    Writing -> 
      Input.button (buttonStyle (px 105)) {
          onPress =  Just (NewDocument)
        , label = Element.el [] (Element.text ("New document"))
      }
    Admin -> Element.none


newChildButton :  Model -> Element Msg    
newChildButton model = 
  case model.appMode of 
    Reading -> Element.none 
    Writing -> newChildButton_ model
    ImageEditing -> Element.none
    Admin -> Element.none

newChildButton_ :  Model -> Element Msg    
newChildButton_ model = 
  let 
    headDocument = DocumentList.getFirst model.documentList
  in 
    case headDocument.docType of 
      Standard -> Element.none 
      Master -> newChildButton__ model

newChildButton__ :  Model -> Element Msg    
newChildButton__ model = 
  Input.button (buttonStyle (px 130)) {
    onPress =  Just (NewChildDocument) 
  , label = Element.el [] (Element.text ("New subdocument"))
  }

toggleToolsButton : Length -> Model -> Element Msg    
toggleToolsButton width_ model = 
  case model.appMode  of 
    ImageEditing -> Element.none
    Reading -> Element.none
    Writing -> 
      Input.button (buttonStyle width_ ) {
        onPress =  Just (ToggleToolPanelState)
      , label = Element.el [] (Element.text (toggleToolsTitle model.toolPanelState))
      }
    Admin -> Element.none
   

toggleToolsTitle : ToolPanelState -> String 
toggleToolsTitle toolPanelState =
  case toolPanelState of 
     ShowToolPanel -> "Hide attributes"
     HideToolPanel -> "Edit attributes"



getTokenButton : Length -> Model -> Element Msg    
getTokenButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just SignIn
  , label = Element.el [] (Element.text "Sign in")
  } 

registerUserButton : Length -> Model -> Element Msg    
registerUserButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just RegisterUser
  , label = Element.el [] (Element.text "Sign up")
  } 

cancelRegistrationButton : Length -> Model -> Element Msg    
cancelRegistrationButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just (SetSignupMode SigninMode)
  , label = Element.el [] (Element.text "Cancel")
  } 


gotoRegistrationButton : Length -> Model -> Element Msg    
gotoRegistrationButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just (SetSignupMode RegistrationMode)
  , label = Element.el [] (Element.text "Sign up")
  }


signoutButton : Length -> Model -> Element Msg    
signoutButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Input.button (buttonStyle width_) {
        onPress =  Just SignOut
      , label = Element.el [] (Element.text "Sign out")
      } 


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
  
          
 
imageCatalogueLink : Model -> Element msg   
imageCatalogueLink model = 
  case model.maybeCurrentUser of  
    Nothing -> Element.none 
    Just user ->
      case User.userId user == model.currentDocument.authorId of 
        False -> Element.none 
        True -> 
          Element.newTabLink [] { 
              url = Configuration.backend ++ "/imagecatalogue/documents/" ++ String.fromInt  model.currentDocument.id  
            , label = Element.paragraph [Font.color Widget.blue, width (px 200)] [text <| "Images for " ++ model.currentDocument.title]
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

saveCurrentDocumentButton : Length -> Model -> Element Msg    
saveCurrentDocumentButton width_ model =
  xbutton model (buttonStyle  width_) "Save" (SaveCurrentDocument (Time.millisToPosix 10))  

deleteCurrentDocumentButton : Length -> Model -> Element Msg    
deleteCurrentDocumentButton width_ model = 
    case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ ->
      Input.button (buttonStyleWithColor (deleteButtonBackgroundColor model) width_ ) {
        onPress =  Just (DeleteCurrentDocument)
      , label = Element.el [] (Element.text "Delete")
      } 


cancelDeleteCurrentDocumentButton : Length -> Model -> Element Msg    
cancelDeleteCurrentDocumentButton width_ model = 
  case model.deleteDocumentState of 
    DeleteIsOnSafety -> Element.none 
    DeleteIsArmed -> cancelDeleteCurrentDocumentButton_ width_ model
    

cancelDeleteCurrentDocumentButton_ : Length -> Model -> Element Msg    
cancelDeleteCurrentDocumentButton_ width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (CancelDeleteCurrentDocument)
  , label = Element.el [] (Element.text "Cancel")
  }  

deleteButtonBackgroundColor model =
   case model.deleteDocumentState of 
     DeleteIsOnSafety -> Widget.blue 
     DeleteIsArmed -> Widget.red


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


-- END: BUTTONS


modeButtonStyle appMode buttonMode width_ = 
  case appMode == buttonMode of 
    True -> buttonStyleWithColor Widget.darkRed width_  
    False -> buttonStyleWithColor Widget.blue width_ 

-- IMAGE

viewImageToUpload_ : Model -> Html Msg
viewImageToUpload_ model =
    Html.div [ 
               Html.Attributes.style "padding" "30px"
             , Html.Attributes.style "background-color" "303030"
             , Html.Attributes.style "width" "100%"
             , Html.Attributes.style "height" "100%"
             , Html.Attributes.style "overflow" "scroll"
             , Html.Attributes.style "padding-bottom" "50px"
             ]
        [    Html.p [Html.Attributes.style "color" "white", Html.Attributes.style "font-size" "24pt"] [Html.text "Image loader"]
            , Html.br [] []
            , Html.br [][]
            , Html.input [ type_ "file", on "change" (decodeNodeFile ReadImage), value ""
                , Html.Attributes.style "margin-left" "4px", Html.Attributes.style "margin-bottom" "10px" ] []
            , Html.pre [Html.Attributes.style "color" "white", Html.Attributes.style "margin-left" "4px"   ] [ Html.text <| imageType model]
            , displayMedia (imageType model) model.maybeImageString (AppUtility.imageUrlAtS3 model)
            , Html.p [Html.Attributes.style "color" "white"] [Html.text <| AppUtility.imageUrlAtS3 model]
            , imageNameInput model
            , Html.br [ ] [ ]
            , Html.br [ ] [ ]
            , toggleImageAccessibilityButton (px 100) model
            , Html.br [ ] [ ]
            , Html.br [ ] [ ]
            , makeImageButton (px 90) model
            , Html.br [ ] [ ]
            , Html.br [ ] [ ]
        ]

viewLargeImage : Model -> Element Msg
viewLargeImage model =  
  case 
    model.maybeCurrentImage of 
      Nothing -> Element.none 
      Just image -> 
          Element.column [spacing 10, padding 40, Background.color Widget.veryDarkGrey, scrollbarY] [
              Element.image  [width (fill)] { 
                src = image.url
              , description = image.name
              }
            , Element.el [Font.color Widget.white] (Element.text image.url)
            , Element.el [Font.color Widget.white] (Element.text image.name)
            , Element.el [Font.color Widget.white] (Element.text <| "id: " ++ (String.fromInt image.id))
            , Element.el [Font.color Widget.white] (Element.text <| "public: " ++ (stringFromBool image.public))
            , Element.el [moveDown 30] (selectImagerLoaderButton model)
            , Element.el [height (px 60), moveDown 50] (Element.text "--")
          
          ]

stringFromBool : Bool -> String 
stringFromBool bool =
  case bool of 
    True -> "yes"
    False -> "no"


displayMedia : String -> Maybe String -> String -> Html Msg  
displayMedia imageType_ maybeData url = 
  case maybeData of 
    Nothing -> 
      Html.p [Html.Attributes.style "color" "white", Html.Attributes.style "margin-left" "4px"   ] 
        [ Html.text <| ""]
    Just data -> 
      case imageType_ of 
        "application/pdf" -> displayPdf data 
        "image/jpeg" -> Html.p [] [ Maybe.map displayImage maybeData |> Maybe.withDefault (Html.text "") ]
        "image/png" -> Html.p [] [ Maybe.map displayImage maybeData |> Maybe.withDefault (Html.text "") ]
        "audio/mpeg" -> displayMpegAudio url
        _ -> Html.pre [] [Html.text "Unrecognized media format"]


displayImage : String -> Html msg
displayImage url =
    Html.img [ src url, Html.Attributes.width 460 ] []

displayMpegAudio : String -> Html msg
displayMpegAudio url =
    Html.audio [ src url, Html.Attributes.controls True] []

displayPdf : String -> Html msg
displayPdf data =
    Html.iframe [ src data, Html.Attributes.width 460, Html.Attributes.height 460 ] []

imageType : Model -> String
imageType model = 
  let 
    imageString = ( model.maybeImageString |> Maybe.withDefault "- no image -" )
    i = (String.indexes ";" imageString) |> List.head |> Maybe.withDefault 0
    imageInfo = String.slice 0 i imageString
  in 
    case String.length imageInfo == 0 of 
      True -> "No image"
      False -> String.dropLeft 5 imageInfo

  
viewImageToUpload : Model -> Element Msg 
viewImageToUpload model = 
  case model.maybeCurrentUser of 
    Nothing -> 
        Element.none
    Just user -> 
        Element.html (viewImageToUpload_ model)


imageNameInput model = 
  Html.input [ Html.Attributes.placeholder "Image name"
     , Html.Attributes.style "background-color" "white"
     , Html.Attributes.style "color" "#333"
     , Html.Attributes.style "width" "200px"
     , Html.Events.onInput AcceptImageName ] []

makeImageButton : Length -> Model -> Html Msg    
makeImageButton width_ model = 
    Html.button [ Html.Events.onClick MakeImage ] [ Html.text "Save image data" ]

toggleImageAccessibilityButton : Length -> Model -> Html Msg    
toggleImageAccessibilityButton width_ model = 
    Html.button [ Html.Events.onClick ToggleImageAccessibility ] [ Html.text (imageAccessibilityButtonTitle model) ]

imageAccessibilityButtonTitle : Model -> String 
imageAccessibilityButtonTitle model = 
  case model.imageAccessibility of 
     PublicImage -> "Public image"
     PrivateImage -> "Private image"


decodeDataTransferFile : (Value -> msg) -> Decoder msg
decodeDataTransferFile toMsg =
    Decode.map toMsg (Decode.at ["dataTransfer", "files", "0"] Decode.value)


decodeNodeFile : (Value -> msg) -> Decoder msg
decodeNodeFile toMsg =
    Decode.map toMsg (Decode.at ["target", "files", "0"] Decode.value)



-- Widgets

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
