port module Main exposing (main)

{- This app retrieves and displays weather data from openweathermap.org. -}

import Browser
import Browser.Dom as Dom
import Task
import Html
import Html.Attributes
import Http
import Debounce exposing(Debounce)
import Time exposing(Posix)
import List.Extra

import Json.Encode as Encode
import Json.Decode as Decode

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Element.Border as Border
import Element.Lazy

import Widget exposing(..)
import Utility

import Configuration
import User exposing(Token, UserMsg(..), readToken, User)
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
import DocumentList exposing(
     DocumentList
        , DocListMsg(..)
        , findDocuments
        , documentListLength
     )
import DocumentView exposing(view, DocViewMsg(..))
import DocumentListView exposing(DocListViewMsg(..))
import DocumentDictionary exposing(DocumentDictionary, DocDictMsg(..))
import Query 




main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions 
        }


-- TYPES


type alias Flags =
    {
      width : Int
    , height : Int  
    }

type alias Model =
    {   message  : String
      , password : String
      , maybeToken    : Maybe Token
      , maybeCurrentUser : Maybe User
      , docInfo  : String
      , currentDocument : Document
      , maybeMasterDocument : Maybe Document
      , documentList : DocumentList 
      , documentDictionary : DocumentDictionary
      , counter : Int
      , debounceCounter : Int 
      , appMode : AppMode
      , debounce : Debounce String
      , sourceText : String
      , currentDocumentDirty : Bool
      , autosaveDuration : Float
      , toolPanelState : ToolPanelState
      , documentTitle : String
      , tagString : String 
      , windowWidth : Int  
      , windowHeight : Int  
      , maybeViewport : Maybe Dom.Viewport
    }

type AppMode = 
  Reading | Writing
  
type ToolPanelState = 
  ShowToolPanel | HideToolPanel


-- MSG

type Msg
    = NoOp
    | AcceptPassword String
    | AcceptDocInfo String
    | AcceptDocumenTitle String
    | AcceptDocumentTagString String
    | ReverseText
    | GetToken
    | GetDocumentById Int
    | GetPublicDocuments String
    | GetPublicDocumentsRawQuery String
    | GetUserDocuments String
    | LoadMasterDocument String
    | UserMsg User.UserMsg
    | DocMsg Document.DocMsg
    | DocListMsg DocumentList.DocListMsg
    | DocListViewMsg DocumentListView.DocListViewMsg
    | DocViewMsg DocumentView.DocViewMsg
    | DocDictMsg DocumentDictionary.DocDictMsg
    | GoHome
    | ChangeMode AppMode
    | DebounceMsg Debounce.Msg
    | GetContent String
    | UpdateEditorContent String 
    | SaveCurrentDocument Posix
    | UpdateCurrentDocument
    | Outside InfoForElm
    | ToggleToolPanelState 
    | NewDocument
    | NewChildDocument
    | SetDocumentTextType TextType
    | SetDocumentType DocType
    | GetViewport Dom.Viewport
    




-- This defines how the debouncer should work.
-- Choose the strategy for your use case.
debounceConfig : Debounce.Config Msg
debounceConfig =
  { strategy = Debounce.later 250
  , transform = DebounceMsg
  }

updateEditorContentCmd : String -> Cmd Msg
updateEditorContentCmd str =
    Task.perform UpdateEditorContent (Task.succeed str)


-- INIT

init : Flags -> ( Model, Cmd Msg )
init flags =
   let 
        doc = Document.basicDocument 
   in
        ( {   message = "App started"
            , password = ""
            , docInfo = ""
            , maybeToken = Nothing
            , maybeCurrentUser = Nothing
            , currentDocument = { doc | title = "Welcome!"}
            , maybeMasterDocument = Nothing 
            , documentList = DocumentList.empty
            , documentDictionary = DocumentDictionary.empty
            , counter = 0
            , debounceCounter = 0
            , debounce = Debounce.init
            , appMode = Reading 
            , sourceText = ""
            , currentDocumentDirty = False
            , autosaveDuration = 10*1000
            , toolPanelState = HideToolPanel
            , documentTitle = ""
            , tagString = ""
            , windowWidth = flags.width
            , windowHeight = flags.height
            , maybeViewport = Nothing
        }
        , Cmd.batch [ 
            focusSearchBox
          , sendInfoOutside (AskToReconnectDocument Encode.null)
        ])


focusSearchBox : Cmd Msg
focusSearchBox =
  Task.attempt (\_ -> NoOp) (Dom.focus "search-box")


-- SUBSCRIPITONS

autosaveSubscription : Model -> Sub Msg
autosaveSubscription model =
    if model.currentDocumentDirty then
        Time.every model.autosaveDuration SaveCurrentDocument
    else
        Sub.none

subscriptions model =
    Sub.batch [
      autosaveSubscription model
    ]


-- UPDATE

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        AcceptPassword str ->
            ( { model | password = str }, Cmd.none )

        AcceptDocInfo str ->
            ( { model | docInfo = str }, Cmd.none )

        AcceptDocumenTitle str ->
            ( { model | documentTitle = str }, Cmd.none )

        AcceptDocumentTagString str ->
            ( { model | tagString = str }, Cmd.none )

        ReverseText ->
            ( { model | message = model.message |> String.reverse |> String.toLower }, Cmd.none )

        UserMsg (ReceiveToken result)->
          case result of 
            Ok token -> 
               ({ model | 
                 maybeToken = Just token
                 , maybeCurrentUser = User.maybeSetToken token (Just User.testUser)
                 , message = "token OK"},   Cmd.none  )
            Err err -> 
                ({model | message = "Token error"},   Cmd.none  )

        DocMsg (ReceiveDocument result) ->
          case result of 
            Ok documentRecord -> 
               ({ model | message = "document OK", currentDocument = documentRecord.document},  Cmd.none)
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        -- ### 
        DocMsg (NewDocumentCreated result) ->
          case result of 
            Ok documentRecord -> 
              let   
                nextDocument = documentRecord.document
                selectedDocId_ = selectedDocId nextDocument
                cmd = Cmd.map DocMsg (attachDocumentToMasterBelowCmd  (User.getTokenStringFromMaybeUser model.maybeCurrentUser) selectedDocId_ nextDocument model.maybeMasterDocument)
                nextDocumentList_ = nextDocumentList selectedDocId_ nextDocument model.documentList  -- ###    
              in  
               ({ model | message = "selectedDocId = " ++ (String.fromInt selectedDocId_)
                         , currentDocument = nextDocument
                         , documentList = nextDocumentList_
                },  cmd)
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocMsg (AcknowledgeUpdateOfDocument result) -> 
           case result of 
             Ok documentRecord -> 
               ({ model | message = "document saved: OK"},  Cmd.none)
             Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (ReceiveDocumentList result)->
          case result of 
            Ok documentList -> 
              let 
                currentDocument = DocumentList.getFirst documentList
                nextMaybeMasterDocument = case currentDocument.docType of 
                  Standard -> Nothing 
                  Master -> Just currentDocument
              in
               ({ model | 
                 message = "documentList: " ++ (String.fromInt <| documentListLength documentList)
                 , documentList = DocumentList.selectFirst documentList
                 , currentDocument = DocumentList.getFirst documentList
                 , maybeMasterDocument = nextMaybeMasterDocument
                 }
                 ,  Cmd.map  DocDictMsg <| DocumentDictionary.loadTexMacros (readToken model.maybeToken) currentDocument currentDocument.tags model.documentDictionary   )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (ReceiveDocumentListAndPreserveCurrentSelection result)->
          case result of 
            Ok documentList -> 
              let 
                currentDocument = DocumentList.getFirst documentList
                nextMaybeMasterDocument = case currentDocument.docType of 
                  Standard -> Nothing 
                  Master -> Just currentDocument
                nextDocumentList_ = DocumentList.select (Just model.currentDocument) documentList
              in
                ({ model | 
                    message = "documentList: " ++ (String.fromInt <| documentListLength documentList)
                    , documentList = nextDocumentList_
                    , maybeMasterDocument = nextMaybeMasterDocument 
                    }
                    ,   Cmd.none  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )


        DocListViewMsg (SetCurrentDocument document)->
            let  
              loadMasterCommand = case document.docType of 
                Standard -> Cmd.none 
                Master -> Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser document.id)
            in
               ({ model | 
                 message = "document: " ++ document.title
                 , currentDocument = document
                 , documentList = DocumentList.select (Just document) model.documentList
                 , currentDocumentDirty = False
                 , counter = model.counter + 1
                 }
                 , Cmd.batch[
                        loadMasterCommand
                      , Cmd.map  DocDictMsg <| DocumentDictionary.loadTexMacros (readToken model.maybeToken) document document.tags model.documentDictionary            
                 ]
               )

        DocViewMsg (LoadMaster docId) ->
           (model, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser docId))

        DocViewMsg (LoadMasterWithCurrentSelection docId) ->
         ({model | appMode = Reading, toolPanelState = HideToolPanel} , Cmd.map DocListMsg (DocumentList.loadMasterDocumentWithCurrentSelection model.maybeCurrentUser docId))

        GetToken ->
           (model, Cmd.map UserMsg (User.getToken "jxxcarlson@gmail.com" model.password)  )

        GetDocumentById id ->
           (model, Cmd.map DocMsg (Document.getDocumentById id (readToken model.maybeToken)))

        GetPublicDocuments query ->
           ({ model | 
               message = "query: " ++ query
             , appMode = Reading
             , toolPanelState = HideToolPanel
            }
            , Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse query)))

        GetPublicDocumentsRawQuery query ->
           ({ model | message = "query: " ++ query, appMode = Reading, toolPanelState = HideToolPanel}, 
             Cmd.map DocListMsg (DocumentList.findDocuments Nothing query))
        
        GetUserDocuments query ->
          case model.maybeCurrentUser of 
            Nothing -> ( model, Cmd.none)
            Just user ->
             ({ model | message = "query: " ++ query, toolPanelState = HideToolPanel }, Cmd.map DocListMsg (DocumentList.findDocuments (Just user) (Query.parse query)))
        
        LoadMasterDocument idString ->
              case String.toInt idString  of 
                Nothing ->  ( model, Cmd.none)
                Just id -> 
                 ( model, Cmd.map DocListMsg (DocumentList.loadMasterDocument model.maybeCurrentUser id ))

        DocDictMsg (PutDocumentInDictionaryAsTexMacros result) -> 
          case result of 
            Ok documentRecord -> 
              let 
                dict = model.documentDictionary
                doc = documentRecord.document
              in
                 ({ model | message = "Put texmacros: " ++ (String.fromInt doc.id) 
                 , documentDictionary = DocumentDictionary.put "texmacros" doc dict },   Cmd.none  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )
        GoHome ->
          let  
            doc = Document.basicDocument  
          in 
           ({model | currentDocument = { doc | title = "Welcome!" }}, Cmd.none)

        ChangeMode nextAppMode ->
          ({model | appMode = nextAppMode}, Cmd.none)

        DebounceMsg msg_ ->
            let
                (debounce, cmd) =
                    Debounce.update debounceConfig (Debounce.takeLast updateEditorContentCmd) msg_ model.debounce

                tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser
            in
                ({ model | debounce = debounce, debounceCounter = model.debounceCounter + 1}, Cmd.batch [
                    cmd  
                  , saveDocToLocalStorage model.currentDocument
                  ]
                )  

        GetContent str ->
            let
                (debounce, cmd) =
                   Debounce.push debounceConfig str model.debounce
            in
                ({ model
                    | sourceText = str
                    , currentDocumentDirty = True 
                    , debounce = debounce
                    }
                    , cmd)

        UpdateEditorContent str ->
          let  
            currentDocument = model.currentDocument 
            nextCurrentDocument = { currentDocument | content = str }
          in  
            ( {model | currentDocument = nextCurrentDocument}, Cmd.none )

        SaveCurrentDocument time ->
          let  
              tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser 
          in 
              ( { model | message = "Saved document: " ++ String.fromInt model.currentDocument.id
                        , currentDocumentDirty = False }
                , Cmd.map DocMsg <| Document.saveDocument tokenString model.currentDocument )

        UpdateCurrentDocument ->
          let  
              tokenString = User.getTokenStringFromMaybeUser model.maybeCurrentUser 
              currentDocument = model.currentDocument 
              tags = model.tagString |> String.split "," |> List.map String.trim
              nextCurrentDocument = { currentDocument | title = model.documentTitle, tags = tags}
          in 
              ( { model | message = "Saved document: " ++ String.fromInt model.currentDocument.id
                        , currentDocumentDirty = False 
                        , currentDocument = nextCurrentDocument}
                , Cmd.map DocMsg <| Document.saveDocument tokenString nextCurrentDocument )


        Outside infoForElm_ ->
            ({model | message = "Outside infoForElm"}, Cmd.none)

        ToggleToolPanelState ->
           let  
              nextToolPanelState = 
                case model.toolPanelState of 
                  HideToolPanel -> ShowToolPanel
                  ShowToolPanel -> HideToolPanel
              nextModel = case nextToolPanelState of 
                 HideToolPanel -> { model | toolPanelState = nextToolPanelState }
                 ShowToolPanel -> 
                   { model | 
                      documentTitle  = model.currentDocument.title
                    , toolPanelState = nextToolPanelState
                    }             
          in 
            ( nextModel , Cmd.none)

        NewDocument -> 
          (model, Cmd.map DocMsg (newDocument model))

        NewChildDocument -> 
          (model, Cmd.map DocMsg (newChildDocument model))

        SetDocumentTextType textType -> 
          let  
            document = model.currentDocument 
            nextDocument = { document | textType = textType }
          in 
           ( { model | currentDocument = nextDocument }, Cmd.none)

        SetDocumentType docType ->
           let  
            document = model.currentDocument 
            nextDocument = { document | docType = docType }
          in 
           ( { model | currentDocument = nextDocument }, Cmd.none)

        GetViewport viewport -> 
           ({model | maybeViewport = Just viewport }, Cmd.none)

-- UPDATE END


saveDocToLocalStorage : Document -> Cmd msg
saveDocToLocalStorage document =
    let
        value =
            Document.encodeDocumentForOutside document
    in
        sendInfoOutside (DocumentData value)



handleHttpError : Http.Error -> String 
handleHttpError error = 
  case error of 
    Http.BadUrl str -> str 
    Http.Timeout -> "timeout"
    Http.NetworkError -> "Network error"
    Http.BadStatus resp -> "Bad status: " ++ "darn!"
    Http.BadPayload str1 resp -> "Bad payload: " ++ str1  ++ ", payload = " ++ "bad payload"
      

-- OUTSIDE



type InfoForElm = 
  DocumentDataFromOutside Document


port infoForOutside : GenericOutsideData -> Cmd msg

port infoForElm : (GenericOutsideData -> msg) -> Sub msg


type InfoForOutside =
    DocumentData Encode.Value 
  | AskToReconnectDocument Encode.Value


type alias GenericOutsideData =
    { tag : String, data : Encode.Value }


sendInfoOutside : InfoForOutside -> Cmd msg
sendInfoOutside info =
    case info of
        DocumentData value ->
            infoForOutside { tag = "DocumentData", data = value }

        AskToReconnectDocument value ->
            infoForOutside { tag = "AskToReconnectDocument", data = Encode.null }


getInfoFromOutside : (InfoForElm -> msg) -> (String -> msg) -> Sub msg
getInfoFromOutside tagger onError =
    infoForElm
        (\outsideInfo ->
            case outsideInfo.tag of
                "ReconnectDocument" ->
                    case Decode.decodeValue Document.decodeDocumentFromOutside outsideInfo.data of
                        Ok result ->
                            tagger <| DocumentDataFromOutside result

                        Err e ->
                            onError "Bad decode (getInfoFromOutside)"
                _ ->
                    onError <| "Unexpected info from outside"
        )




-- VIEW

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
      Element.row [ spacing 20]  [
         documentInfoInput model
        , getDocumentsButton (px 60) model
        , getRandomDocumentsButton (px 70) model
        , Element.el [ Font.size 24] (text <| appTitle model.appMode)
        , homeButton (px 55) model 
        , readerModeButton (px 52) model
        , writerModeButton (px 52) model]
        , passwordInput model
        , getTokenButton (px 80) model
  ]

appTitle : AppMode -> String 
appTitle appMode =
  case appMode of 
    Reading -> "kNode Reader"
    Writing -> "kNode Writer"
  

body : Model -> Element Msg 
body model =
  case model.appMode of 
    Reading -> readerBody model 
    Writing -> writerBody model  


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
        Element.row [spacing 10] [ toggleToolsButton (px 80) model, newDocumentButton model ]
      , newChildButton model 
      , toolsOrContents model
  ]

-- TOOLS

toolsOrContents model = 
  case model.toolPanelState of 
    ShowToolPanel -> toolsPanel model
    HideToolPanel -> Element.map DocListViewMsg (DocumentListView.viewWithHeading model.windowHeight (docListTitle model) model.documentList)

toolsPanel model = Element.column [ spacing 15, padding 10, height shrink, scrollbarY] [ 
  Element.el [Font.bold, Font.size 18] (text "Tools Panel")
  , Element.row [spacing 10] [updateDocumentButton model]
  , masterDocPanel model
  , documentTitleInput model
  , documentPanels model
  , tagInputPane model (px 250) (px 140) "Tags"
  , versionsPanel model
  ]

-- masterDocPanel model = 
--   let  
--     headDocument = DocumentList.getFirst  model.documentList 
--   in 
--     case headDocument.docType of 
--       Master -> masterDocPanelWithMaster headDocument model  
--       Standard -> Element.none 

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

printDocument model =
  case model.currentDocument.id > 0 of 
    True -> printDocument_ model  
    False -> Element.none  


printDocument_ model =
    printButton model.currentDocument

printButton document =
    Widget.linkButtonFat (printUrl document) "Print" (px 50)


printUrl : Document -> String
printUrl document =
    Configuration.backend ++ "/print/documents" ++ "/" ++ (String.fromInt document.id) ++ "?" ++ printTypeString document



printTypeString : Document -> String
printTypeString document =
    case document.textType of
        Asciidoc ->
            "text=adoc"

        AsciidocLatex ->
            "text=adoc_latex"

        MiniLatex ->
            "text=latex"

        PlainText ->
            "text=latex"

        Markdown ->
            "text=markdown"

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
      Element.none
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
        Element.el [] (text model.message)
      , Element.el [documentDirtyIndicator  model, padding 5] (text ("id " ++ (String.fromInt model.currentDocument.id )))
      , saveCurrentDocumentButton (px 50) model
      , printDocument model 
      , getAuthorsDocumentsButton (px 90) model

      , Element.el [] (text <| access model.currentDocument)
      , Element.el [] (text <| "Author: " ++ model.currentDocument.authorName )
      , Element.el [] (text <| currentUserName model.maybeCurrentUser)
      , Element.el [] (text <| (String.fromInt (Document.wordCount model.currentDocument)) ++ " words")

    --  , Element.el [] (text ("keys: " ++ (showKeys model)))
    --  , Element.el [] (text <| displayCurrentMasterDocument model)
    --  , Element.el [] (text <| "Window height: " ++ (String.fromInt model.windowHeight))
  ] 

documentDirtyIndicator  model = 
  case model.currentDocumentDirty  of 
    False -> Background.color Widget.indicatorGood
    True -> Background.color Widget.indicatorBad

currentUserName : Maybe User -> String  
currentUserName maybeCurrentUser =
  case maybeCurrentUser of 
    Nothing -> "User: NONE"
    Just user -> "User: " ++ User.username user

access : Document -> String 
access doc = 
  case doc.public of 
    True -> "Public document"
    False -> "Private document"

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
    Input.newPassword [width (px 100), height (px 30) , Font.color black] {
        text = model.password 
      , placeholder = Nothing
      , show = False
      , onChange = Just(\str -> AcceptPassword str)
      , label = Input.labelLeft [ Font.size 12, Font.bold, moveDown 10 ] (text "Password")
    }

documentInfoInput : Model -> Element Msg
documentInfoInput model =
    Input.text [htmlAttribute (Html.Attributes.id "search-box"), width (px 400), height (px 30) , Font.color black] {
        text = model.docInfo 
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptDocInfo str)
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

miniLatexTypeButton : Model -> Element Msg 
miniLatexTypeButton model = 
  Input.button (textTypeButtonStyle model MiniLatex) {
    onPress =  Just (SetDocumentTextType MiniLatex)
  , label = Element.text ("MiniLatex")
  }

asciidocTypeButton : Model -> Element Msg 
asciidocTypeButton model = 
  Input.button (textTypeButtonStyle model Asciidoc) {
    onPress =  Just (SetDocumentTextType Asciidoc)
  , label = Element.text ("Asciidoc")
  }

asciidocLatexTypeButton : Model -> Element Msg 
asciidocLatexTypeButton model = 
  Input.button (textTypeButtonStyle model AsciidocLatex) {
    onPress =  Just (SetDocumentTextType AsciidocLatex)
  , label = Element.text ("Asciidoc Latex")
  }

markdownTypeButton : Model -> Element Msg 
markdownTypeButton model = 
  Input.button (textTypeButtonStyle model Markdown) {
    onPress =  Just (SetDocumentTextType Markdown)
  , label = Element.text ("Markdown")
  }

plainTextTypeButton : Model -> Element Msg 
plainTextTypeButton model = 
  Input.button (textTypeButtonStyle model PlainText) {
    onPress =  Just (SetDocumentTextType PlainText)
  , label = Element.text ("Plain Text")
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
  , label = Element.text ("Standard")
  }

masterDocumentButton : Model -> Element Msg 
masterDocumentButton model = 
  Input.button (documentTypeButtonStyle model Master) {
    onPress =  Just (SetDocumentType Master)
  , label = Element.text ("Master")
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
    Reading -> Element.none 
    Writing -> newDocumentButton_ model

newDocumentButton_ :  Model -> Element Msg    
newDocumentButton_ model = 
  Input.button (buttonStyle (px 110)) {
    onPress =  Just (NewDocument)
  , label = Element.text ("New document")
  }

newChildButton :  Model -> Element Msg    
newChildButton model = 
  case model.appMode of 
    Reading -> Element.none 
    Writing -> newChildButton_ model

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
  , label = Element.text ("New subdocument")
  }

updateDocumentButton :  Model -> Element Msg    
updateDocumentButton model = 
  Input.button (buttonStyle (px 130)) {
    onPress =  Just (UpdateCurrentDocument)
  , label = Element.text ("Update document")
  }

toggleToolsButton : Length -> Model -> Element Msg    
toggleToolsButton width_ model = 
  case model.appMode  of 
    Writing -> toggleToolsButton_ width_ model
    Reading -> Element.none


toggleToolsButton_ : Length -> Model -> Element Msg    
toggleToolsButton_ width_ model = 
  Input.button (buttonStyle width_ ) {
    onPress =  Just (ToggleToolPanelState)
  , label = Element.text (toggleToolsTitle model.toolPanelState)
  }

toggleToolsTitle : ToolPanelState -> String 
toggleToolsTitle toolPanelState =
  case toolPanelState of 
     ShowToolPanel -> "Hide tools"
     HideToolPanel -> "Show tools"



getTokenButton : Length -> Model -> Element Msg    
getTokenButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just GetToken
  , label = Element.text "Get token"
  } 


getDocumentsButton : Length -> Model -> Element Msg    
getDocumentsButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just ((getDocumentMsg model.appMode model.docInfo))
  , label = Element.text "Search"
  } 

getDocumentMsg : AppMode -> String -> Msg 
getDocumentMsg appMode docInfo = 
  case appMode of 
    Reading -> GetPublicDocuments docInfo
    Writing -> GetUserDocuments docInfo

getRandomDocumentsButton : Length -> Model -> Element Msg    
getRandomDocumentsButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GetPublicDocumentsRawQuery "random=public")
  , label = Element.text "Random"
  } 


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
    Input.button (buttonStyle  width_) {
      onPress =  Just (GetPublicDocumentsRawQuery ("authorname=" ++ authorname))
    , label = Element.text "Author docs"
    } 

saveCurrentDocumentButton : Length -> Model -> Element Msg    
saveCurrentDocumentButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (SaveCurrentDocument (Time.millisToPosix 10))
  , label = Element.text "Save"
  } 

homeButton : Length -> Model -> Element Msg    
homeButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GoHome)
  , label = Element.text "Home"
  } 

readerModeButton : Length -> Model -> Element Msg    
readerModeButton width_ model = 
  Input.button (modeButtonStyle model.appMode Reading  width_) {
    onPress =  Just (ChangeMode Reading)
  , label = Element.text "Read"
  } 

writerModeButton : Length -> Model -> Element Msg    
writerModeButton width_ model = 
  Input.button (modeButtonStyle model.appMode Writing  width_) {
    onPress =  Just (ChangeMode Writing)
  , label = Element.text "Write"
  } 

modeButtonStyle appMode buttonMode width_ = 
  case appMode == buttonMode of 
    True -> buttonStyleWithColor Widget.darkRed width_  
    False -> buttonStyleWithColor Widget.blue width_ 



idFromDocInfo str = 
  str |> String.toInt |> Maybe.withDefault 0

-- HELPERS


newDocument : Model ->Cmd DocMsg
newDocument model =
  case model.maybeCurrentUser of 
    Nothing -> Cmd.none
    Just user -> newDocumentForUser user model

newDocumentForUser : User -> Model -> Cmd DocMsg
newDocumentForUser user model =  
  let  
    headDocument = DocumentList.getFirst  model.documentList
    parentId = case headDocument.docType of 
      Master -> headDocument.id 
      Standard -> 0 
    selectedDocumentId = case  DocumentList.selected model.documentList of 
       Nothing -> 0 
       Just selectedDoc -> selectedDoc.id
  in  
    Document.createDocument (User.getTokenString user) (makeNewDocument user )

makeNewDocument : User -> Document
makeNewDocument user =
    let
        newDocument_ = Document.basicDocument
    in
       { newDocument_ | 
            title = "New Document"
          , authorId =  User.userId user
          , authorName = User.username user
        }
  

newChildDocument : Model ->Cmd DocMsg
newChildDocument model =
  case model.maybeCurrentUser of 
    Nothing -> Cmd.none
    Just user -> newDocumentForUserWithParent user model

newDocumentForUserWithParent : User -> Model -> Cmd DocMsg
newDocumentForUserWithParent user model =  
  let  
    headDocument = DocumentList.getFirst  model.documentList
    parentId = case headDocument.docType of 
      Master -> headDocument.id 
      Standard -> 0 
    parentTitle = case headDocument.docType of 
      Master -> headDocument.title 
      Standard -> "" 
    selectedDocumentId = case  DocumentList.selected model.documentList of 
       Nothing -> 0 
       Just selectedDoc -> selectedDoc.id
  in  
    Document.createDocument (User.getTokenString user) (makeNewDocumentWithParent parentId parentTitle selectedDocumentId user )
  

makeNewDocumentWithParent : Int -> String -> Int -> User -> Document
makeNewDocumentWithParent parentId parentTitle selectedDocumentId user =
    let
        newDocument_ = Document.basicDocument
    in
       { newDocument_ | 
            title = "New Child Document"
          , authorId =  User.userId user
          , authorName = User.username user
          , parentId = parentId
          , parentTitle = parentTitle
          , content = "New Child Document of " ++ parentTitle ++ ", placeUnder:" ++ (String.fromInt selectedDocumentId)
        }

selectedDocId : Document -> Int 
selectedDocId document = 
  document.content 
      |> String.split "," 
      |> List.drop 1 
      |> List.head 
      |> Maybe.withDefault "placeUnder:0"
      |> String.trim
      |> String.split ":"
      |> List.drop 1
      |> List.head 
      |> Maybe.withDefault "0"
      |> String.toInt
      |> Maybe.withDefault 0


attachDocumentToMasterBelowCmd : String -> Int -> Document -> Maybe Document -> Cmd DocMsg
attachDocumentToMasterBelowCmd  tokenString selectedDocId_ childDocument maybeMasterDocument =
  case maybeMasterDocument of 
    Nothing -> Cmd.none 
    Just masterDocument -> attachDocumentToMasterBelowCmd_  tokenString selectedDocId_ childDocument masterDocument

attachDocumentToMasterBelowCmd_ : String -> Int -> Document -> Document -> Cmd DocMsg
attachDocumentToMasterBelowCmd_  tokenString selectedDocId_ childDocument masterDocument =
  let  
    masterDocumentId = childDocument.parentId 
    query =  ("attach=below&child=" ++ (String.fromInt childDocument.id) ++ "&current=" ++ (String.fromInt selectedDocId_))
  in  
    case masterDocumentId == masterDocument.id of 
      False -> Cmd.none 
      True ->  (Document.updateDocumentWithQueryString tokenString query masterDocument)   

displayCurrentMasterDocument model = 
  case model.maybeMasterDocument of 
    Nothing -> "Master: none"
    Just doc -> "Master: " ++ (String.fromInt doc.id) 


nextDocumentList1 : Int -> Document -> DocumentList -> DocumentList
nextDocumentList1 docId document documentList =
  DocumentList.prepend document documentList

nextDocumentList : Int -> Document -> DocumentList -> DocumentList
nextDocumentList targetDocId document documentList = 
  case targetDocId == 0 of 
    True ->  DocumentList.prepend document documentList
    False ->
      let  
        maybeTargetIndex = List.Extra.findIndex (\doc -> doc.id ==  targetDocId) (DocumentList.documents documentList)
      in  
        case maybeTargetIndex of 
          Nothing -> DocumentList.prepend document documentList
          Just k -> 
            DocumentList.setDocuments (Utility.listInsertAt (k+1) document (DocumentList.documents documentList)) documentList
              |> DocumentList.select (Just document)


getViewPort = Task.perform GetViewport Dom.getViewport

-- ###