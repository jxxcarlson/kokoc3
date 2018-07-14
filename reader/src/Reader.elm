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

import User exposing(Token, UserMsg(..), readToken, User)
import Document exposing(Document, DocType(..), DocMsg(..))
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
    {}

type alias Model =
    {   message  : String
      , password : String
      , maybeToken    : Maybe Token
      , maybeCurrentUser : Maybe User
      , docInfo  : String
      , currentDocument : Document
      , documentList : DocumentList 
      , documentDictionary : DocumentDictionary
      , counter : Int
      , appMode : AppMode
      , debounce : Debounce String
      , sourceText : String
      , currentDocumentDirty : Bool
      , autosaveDuration : Float
    }

type AppMode = 
  Reading | Writing


type Msg
    = NoOp
    | AcceptPassword String
    | AcceptDocInfo String
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
    | Outside InfoForElm




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
            , documentList = DocumentList.empty
            , documentDictionary = DocumentDictionary.empty
            , counter = 0
            , debounce = Debounce.init
            , appMode = Reading 
            , sourceText = ""
            , currentDocumentDirty = False
             , autosaveDuration = 10*1000
        }
        , focusSearchBox
        )

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
              in
               ({ model | 
                 message = "documentList: " ++ (String.fromInt <| documentListLength documentList)
                 , documentList = DocumentList.selectFirst documentList
                 , currentDocument = DocumentList.getFirst documentList
                 }
                 ,  Cmd.map  DocDictMsg <| DocumentDictionary.loadTexMacros (readToken model.maybeToken) currentDocument currentDocument.tags model.documentDictionary   )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (ReceiveDocumentListAndPreserveCurrentSelection result)->
          case result of 
            Ok documentList -> 
              let 
                nextDocumentList = DocumentList.select (Just model.currentDocument) documentList
              in
                ({ model | 
                    message = "documentList: " ++ (String.fromInt <| documentListLength documentList)
                    , documentList = nextDocumentList
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
         (model, Cmd.map DocListMsg (DocumentList.loadMasterDocumentWithCurrentSelection model.maybeCurrentUser docId))

        GetToken ->
           (model, Cmd.map UserMsg (User.getToken "jxxcarlson@gmail.com" model.password)  )

        GetDocumentById id ->
           (model, Cmd.map DocMsg (Document.getDocumentById id (readToken model.maybeToken)))

        GetPublicDocuments query ->
           ({ model | message = "query: " ++ query}, Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse query)))

        GetPublicDocumentsRawQuery query ->
           ({ model | message = "query: " ++ query}, Cmd.map DocListMsg (DocumentList.findDocuments Nothing query))
        
        GetUserDocuments query ->
          case model.maybeCurrentUser of 
            Nothing -> ( model, Cmd.none)
            Just user ->
             ({ model | message = "query: " ++ query}, Cmd.map DocListMsg (DocumentList.findDocuments (Just user) (Query.parse query)))
        
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
                ({ model | debounce = debounce}, Cmd.batch [
                  cmd, 
                  Cmd.map DocMsg <| Document.saveDocument tokenString model.currentDocument
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
            currentDocument = model.currentDocument -- ###
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

        Outside infoForElm_ ->
            ({model | message = "Outside infoForElm"}, Cmd.none)

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


type InfoForOutside
    = DocumentData Encode.Value


type alias GenericOutsideData =
    { tag : String, data : Encode.Value }


sendInfoOutside : InfoForOutside -> Cmd msg
sendInfoOutside info =
    case info of
        DocumentData value ->
            infoForOutside { tag = "DocumentData", data = value }


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
   Element.layout [Font.size 14, width fill, height fill] <|
        Element.column [ width fill, height fill] [
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
     bodyLeftColumn 2 model,  bodyReaderColumn 7 model, bodyRightColumn 2 model
  ]
writerBody : Model -> Element Msg
writerBody model = 
  Element.row [width fill, height fill, Background.color Widget.white, centerX] [
     bodyLeftColumn 2 model,  bodyEditorColumn 5 model, bodyReaderColumn 5 model
  ]

bodyLeftColumn : Int -> Model -> Element Msg
bodyLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
      Element.map DocListViewMsg (DocumentListView.viewWithHeading (docListTitle model) model.documentList)
  ]

bodyReaderColumn : Int -> Model -> Element Msg
bodyReaderColumn portion_  model  = 
  Element.column [width (fillPortion portion_ ), height (px 720), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view model.counter (texMacros model) model.currentDocument)
  ]


bodyEditorColumn : Int -> Model -> Element Msg
bodyEditorColumn portion_ model  = 
  Element.column [width (fillPortion portion_), height fill
    , Background.color Widget.lightYellow, centerX] [
     textArea model (fillPortion portion_) (px 720) "Editor"
  ]

textArea model width_ height_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (height_), padding 10, scrollbarY ]
                { onChange = Just GetContent
                , text = model.currentDocument.content
                , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]


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
  Element.row [spacing 15, width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0] [
        Element.el [] (text model.message)
      , Element.el [documentDirtyIndicator  model, padding 5] (text ("id " ++ (String.fromInt model.currentDocument.id )))
      , saveCurrentDocumentButton (px 50) model
      , Element.el [] (text <| access model.currentDocument)
      , Element.el [] (text <| currentUserName model.maybeCurrentUser)
      , Element.el [] (text ("keys: " ++ (showKeys model)))
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



-- CONTROLS


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

