module Main exposing (main)

{- This app retrieves and displays weather data from openweathermap.org. -}

import Browser
import Browser.Dom as Dom
import Task
import Html
import Html.Attributes
import Http
import Widget exposing(..)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy

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
            , appMode = Reading 
        }
        , focusSearchBox
        )

focusSearchBox : Cmd Msg
focusSearchBox =
  Task.attempt (\_ -> NoOp) (Dom.focus "search-box")


subscriptions model =
    Sub.none


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
               ({ model | maybeToken = Just token, maybeCurrentUser = User.maybeSetToken token model.maybeCurrentUser, message = "token OK"},   Cmd.none  )
            Err err -> 
                ({model | message = "Token error"},   Cmd.none  )

        DocMsg (ReceiveDocument result)->
          case result of 
            Ok documentRecord -> 
               ({ model | message = "document OK", currentDocument = documentRecord.document},  Cmd.none)
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
        

handleHttpError : Http.Error -> String 
handleHttpError error = 
  case error of 
    Http.BadUrl str -> str 
    Http.Timeout -> "timeout"
    Http.NetworkError -> "Network error"
    Http.BadStatus resp -> "Bad status: " ++ "darn!"
    Http.BadPayload str1 resp -> "Bad payload: " ++ str1  ++ ", payload = " ++ "bad payload"
      

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
  Element.row [width fill, height fill, Background.color Widget.white, centerX] [
     bodyLeftColumn model,  bodyCenterColumn model, bodyRightColumn model
  ]

bodyLeftColumn : Model -> Element Msg
bodyLeftColumn model = 
  Element.column [width (px 250), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
      Element.map DocListViewMsg (DocumentListView.viewWithHeading (docListTitle model) model.documentList)
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

bodyCenterColumn : Model -> Element Msg
bodyCenterColumn model = 
  Element.column [width fill, height fill, paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view model.counter (texMacros model) model.currentDocument)
  ]

texMacros : Model -> String
texMacros model = 
  case DocumentDictionary.get "texmacros"  model.documentDictionary of 
    Nothing -> ""
    Just doc -> doc.content
    
  
bodyRightColumn : Model -> Element Msg
bodyRightColumn model = 
  Element.column [width (px 250), height fill, Background.color Widget.lightBlue, centerX] [
      Element.none
  ]

footer : Model -> Element Msg
footer model = 
  Element.row [spacing 15, width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0] [
        Element.el [] (text model.message)
      , Element.el [] (text ("id " ++ (String.fromInt model.currentDocument.id )))
      , Element.el [] (text ("keys: " ++ (showKeys model)))
  ] 

showKeys : Model -> String 
showKeys model = 
  DocumentDictionary.keys model.documentDictionary |> String.join ", "


showIf condition element =
    if condition then
        element
    else
        text ""


-- OUPUTS

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
    onPress =  Just (GetPublicDocuments model.docInfo)
  , label = Element.text "Search"
  } 

getRandomDocumentsButton : Length -> Model -> Element Msg    
getRandomDocumentsButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GetPublicDocumentsRawQuery "random=public")
  , label = Element.text "Random"
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

