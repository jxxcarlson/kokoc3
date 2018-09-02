module View.EditorTools exposing(..)



import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed

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
  )
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import DocumentListView exposing(DocListViewMsg(..))
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
import DocumentView
import DocumentList
import DocumentDictionary
import Configuration
import AppUtility
import View.Common as Common
import View.Widget as Widget exposing(..)


toolsOrContents model = 
  case model.maybeCurrentUser of 
    Nothing -> toolsOrContentsPublic model
    Just _ -> toolsOrContentsForUser model


toolsOrContentsPublic model = 
     Element.map Model.DocListViewMsg 
        ( DocumentListView.viewWithHeading 
          (model.windowHeight) model.masterDocLoaded 
          (docListTitle model) 
          model.documentList
        )

toolsOrContentsForUser model = 
  case model.toolPanelState of 
    ShowToolPanel -> toolsPanel model
    HideToolPanel -> 
      Element.row [ ] [
          Element.el [ Element.inFront (toggleDocumentListDiplayButton model)]
          (displayDocumentList model)
      ]
    

displayDocumentList : Model -> Element Msg    
displayDocumentList model =  
  case model.documentListSource of 
    Model.SearchResults ->    
     Element.map Model.DocListViewMsg 
        ( DocumentListView.viewWithHeadingShifted 
          (model.windowHeight - 20) model.masterDocLoaded 
          (docListTitle model) 
          model.documentList
        )
    Model.RecentDocumentsQueue ->  
      Element.map Model.DocListViewMsg 
       ( DocumentListView.viewWithHeadingShifted 
          (model.windowHeight - 20) model.masterDocLoaded 
          ("Recent documents") 
          (DocumentList.documentQueueToDocumentList model.currentDocument model.recentDocumentQueue)
        )

toggleDocumentListDiplayButton : Model -> Element Msg 
toggleDocumentListDiplayButton model = 
  Input.button Widget.titleStyle {
    onPress =  Just (ToggleDocumentSource)
  , label = Element.el [Font.bold] (Element.text ("<=>"))
  }

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
 


toolsPanel model = Element.column [ spacing 15, padding 10, height shrink, scrollbarY] [ 
   publicControls model
  , deleteDocumentButton model
  , masterDocPanel model
  , documentTitleInput model
  , documentPanels model
  , tagInputPane model (px 250) (px 100) "Tags"
  , versionsPanel model
  , sharingInputPane model (px 250) (px 100) "Sharing"
  ]


versionsPanel model = 
  Element.column [spacing 5] [
     Element.el [Font.bold] (text <| "Version: " ++ (String.fromInt model.currentDocument.version))
     , Element.column [] [
         Element.el [moveLeft 6] (showVersionButton model)
        , Element.el [moveLeft 12] (newVersionButton model)
       ]
  ]


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

sharingInputPane model width_ height_ label_  = 
  Element.column [] [
      Element.el [Font.bold] (text label_)
    , sharingInputPane_ model width_ height_ label_ 
  ]

sharingInputPane_ model width_ height_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (height_), padding 10, scrollbarY ]
                { onChange = Just AcceptSharingString
                , text = model.currentDocument.access |> Document.accessDictToString
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


documentTitleInput : Model -> Element Msg
documentTitleInput model =
    Input.text [htmlAttribute (Html.Attributes.id "title-input"), width (px 250), height (px 30) , Font.color black] {
        text = model.documentTitle
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptDocumenTitle str)
      , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "Title")
    }

 


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

publicControls : Model -> Element Msg 
publicControls model = 
  Element.row [spacing 5] [ publicButton model.currentDocument, privateButton model.currentDocument]




showVersionButton model = 
  linkButton (showVersionsUrl model.currentDocument) " Show versions" (px 100)
  
-- newVersionButton model = 
--   linkButton (newVersionUrl model.currentDocument) "New version" (px 100)


showVersionsUrl : Document -> String
showVersionsUrl document =
    Configuration.backend ++ "/archive/versions" ++ "/" ++ (String.fromInt document.id)


newVersionUrl : Document -> String
newVersionUrl document =
    Configuration.backend ++ "/archive/new_version" ++ "/" ++(String.fromInt document.id)

newVersionButton : Model -> Element Msg 
newVersionButton model = 
  Input.button (textTypeButtonStyle model MiniLatex) {
    onPress =  Just (IncrementVersion)
  , label = Element.el [] (Element.text ("New version"))
  }


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


masterDocumentButton : Model -> Element Msg 
masterDocumentButton model = 
  Input.button (documentTypeButtonStyle model Master) {
    onPress =  Just (SetDocumentType Master)
  , label = Element.el [] (Element.text ("Master"))
  }


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
    Writing -> 
      Input.button (buttonStyle (px 90)) {
          onPress =  Just (NewDocument)
        , label = Element.el [] (Element.text ("New doc"))
      }
    _ -> Element.none


newChildButton :  Model -> Element Msg    
newChildButton model = 
  case model.appMode of 
    Writing -> newChildButton_ model
    _ -> Element.none

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
  Input.button (buttonStyle (px 90)) {
    onPress =  Just (NewChildDocument) 
  , label = Element.el [] (Element.text ("New subdoc"))
  }

newMasterButton :  Model -> Element Msg    
newMasterButton model = 
  Input.button (buttonStyle (px 90)) {
    onPress =  Just (NewMasterDocument) 
  , label = Element.el [] (Element.text ("New master"))
  }


bodyReaderColumn : Viewport -> Int -> Model -> Element Msg
bodyReaderColumn viewport portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (round <| viewport.viewport.width - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view viewport model.counter model.debounceCounter (Common.texMacros model) model.currentDocument)
  ]
