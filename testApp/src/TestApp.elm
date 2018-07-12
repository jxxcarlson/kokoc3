module Main exposing (main)

{- This app retrieves and displays weather data from openweathermap.org. -}

import Browser
import Html
import Http
import Widget exposing(..)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Border as Border
import Element.Lazy

import User exposing(Token, UserMsg(..), readToken, User)
import Document exposing(Document, DocMsg(..))
import DocumentList exposing(
     DocumentList
        , DocListMsg(..)
        , findDocuments
        , documentListLength
     )
import DocumentView exposing(view, DocViewMsg(..))
import DocumentListView exposing(DocListViewMsg(..))
import DocumentDictionary exposing(DocumentDictionary, DocDictMsg(..))



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
      , token    : Token
      , maybeCurrentUser : Maybe User
      , docInfo  : String
      , currentDocument : Document
      , documentList : DocumentList 
      , documentDictionary : DocumentDictionary
      , counter : Int
    }


type Msg
    = NoOp
    | AcceptPassword String
    | AcceptDocInfo String
    | ReverseText
    | GetToken
    | GetDocumentById Int
    | GetPublicDocuments String
    | GetUserDocuments String
    | LoadMasterDocument String
    | UserMsg User.UserMsg
    | DocMsg Document.DocMsg
    | DocListMsg DocumentList.DocListMsg
    | DocListViewMsg DocumentListView.DocListViewMsg
    | DocViewMsg DocumentView.DocViewMsg
    | DocDictMsg DocumentDictionary.DocDictMsg


-- INIT

init : Flags -> ( Model, Cmd Msg )
init flags =
   let 
        doc = Document.basicDocument 
   in
        ( {   message = "App started"
            , password = ""
            , docInfo = "369"
            , token = User.invalidToken
            , maybeCurrentUser = Just User.testUser
            , currentDocument = { doc | title = "Welcome!"}
            , documentList = DocumentList.empty
            , documentDictionary = DocumentDictionary.empty
            , counter = 0
        }
        , Cmd.none
        )


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
               ({ model | token = token, maybeCurrentUser = User.maybeSetToken token model.maybeCurrentUser, message = "token OK"},   Cmd.none  )
            Err err -> 
                ({model | message = "Token error"},   Cmd.none  )

        DocMsg (ReceiveDocument result)->
          case result of 
            Ok documentRecord -> 
               ({ model | message = "document OK", currentDocument = documentRecord.document},   Cmd.none  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        DocListMsg (ReceiveDocumentList result)->
          case result of 
            Ok documentList -> 
               ({ model | 
                 message = "documentList: " ++ (String.fromInt <| documentListLength documentList)
                 , documentList = documentList
                 }
                 ,   Cmd.none  )
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
               ({ model | 
                 message = "document: " ++ document.title
                 , currentDocument = document
                 , documentList = DocumentList.select (Just document) model.documentList
                 , counter = model.counter + 1
                 }
                 , Cmd.map  DocDictMsg <| DocumentDictionary.loadTexMacros (readToken model.token) document document.tags model.documentDictionary  )

        DocViewMsg (LoadMaster docId) ->
          case model.maybeCurrentUser of 
            Nothing -> (model, Cmd.none)
            Just user ->  (model, Cmd.map DocListMsg (DocumentList.loadMasterDocument user docId))

        DocViewMsg (LoadMasterWithCurrentSelection docId) ->
          case model.maybeCurrentUser of 
            Nothing -> (model, Cmd.none)
            Just user ->  (model, Cmd.map DocListMsg (DocumentList.loadMasterDocumentWithCurrentSelection user docId))

        GetToken ->
           (model, Cmd.map UserMsg (User.getToken "jxxcarlson@gmail.com" model.password)  )

        GetDocumentById id ->
           (model, Cmd.map DocMsg (Document.getDocumentById id (readToken model.token)))

        GetPublicDocuments query ->
           ({ model | message = "query: " ++ query}, Cmd.map DocListMsg (DocumentList.findDocuments Nothing query))
        
        GetUserDocuments query ->
          case model.maybeCurrentUser of 
            Nothing -> ( model, Cmd.none)
            Just user ->
             ({ model | message = "query: " ++ query}, Cmd.map DocListMsg (DocumentList.findDocuments (Just user) query))
        
        LoadMasterDocument idString ->
          case model.maybeCurrentUser of 
            Nothing -> ( model, Cmd.none)
            Just user ->
              case String.toInt idString  of 
                Nothing ->  ( model, Cmd.none)
                Just id -> 
                 ( model, Cmd.map DocListMsg (DocumentList.loadMasterDocument user id ))

        DocDictMsg (PutDocumentInDictionaryAsTexMacros result) -> 
          case result of 
            Ok documentRecord -> 
              let 
                dict = model.documentDictionary
                doc = documentRecord.document
              in
                 ({ model | documentDictionary = DocumentDictionary.put "texmacros" doc dict },   Cmd.none  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )
        

handleHttpError : Http.Error -> String 
handleHttpError error = 
  case error of 
    Http.BadUrl str -> str 
    Http.Timeout -> "timeout"
    Http.NetworkError -> "Network error"
    Http.BadStatus resp -> "Bad status: " ++ "darn!"
    Http.BadPayload str1 resp -> "Bad payload: " ++ str1  ++ ", payload = " ++ "bad payload"
      

view  model =
   Element.layout [Font.size 14, width fill, height fill, clipY] <|
        Element.column [ width fill, height fill] [
            header model
            , body model
            , footer model
        ]
        
header : Model -> Element Msg
header model = 
  Element.row [width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0, spacing 10] [
      passwordInput model, getTokenButton (px 75) model
  ]

body : Model -> Element Msg
body model = 
  Element.row [width fill, height fill, Background.color Widget.white, centerX] [
     bodyLeftColumn model,  bodyCenterColumn model, bodyRightColumn model
  ]

bodyLeftColumn : Model -> Element Msg
bodyLeftColumn model = 
  Element.column [width (px 250), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [
       documentInfoInput model
     , getDocumentButton (px 135) model
     , getPublicDocumentsButton (px 135) model
     , getUserDocumentsButton (px 135) model
     , loadMasterDocumentButton (px 135) model
     , Element.map DocListViewMsg (DocumentListView.view model.documentList)
  ]

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
      text "RC"
  ]

footer : Model -> Element Msg
footer model = 
  Element.row [width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0] [
      Element.el [] (text model.message)
  ] 

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
    Input.text [width (px 200), height (px 30) , Font.color black] {
        text = model.password 
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptPassword str)
      , label = Input.labelLeft [ Font.size 14, Font.bold, moveDown 10 ] (text "Password")
    }

documentInfoInput : Model -> Element Msg
documentInfoInput model =
    Input.text [width (px 200), height (px 30) , Font.color black] {
        text = model.docInfo 
      , placeholder = Nothing
      , onChange = Just(\str -> AcceptDocInfo str)
      , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "Doc Info")
    }

-- CONTROLS


getTokenButton : Length -> Model -> Element Msg    
getTokenButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just GetToken
  , label = Element.text "Get token"
  } 

getDocumentButton : Length -> Model -> Element Msg    
getDocumentButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GetDocumentById <| idFromDocInfo model.docInfo)
  , label = Element.text "Get document by id"
  } 

getPublicDocumentsButton : Length -> Model -> Element Msg    
getPublicDocumentsButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GetPublicDocuments model.docInfo)
  , label = Element.text "Get public docs"
  } 

getUserDocumentsButton : Length -> Model -> Element Msg    
getUserDocumentsButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (GetUserDocuments model.docInfo)
  , label = Element.text "Get user docs"
  } 

loadMasterDocumentButton : Length -> Model -> Element Msg    
loadMasterDocumentButton width_ model = 
  Input.button (buttonStyle  width_) {
    onPress =  Just (LoadMasterDocument model.docInfo)
  , label = Element.text "Load master doc"
  } 

idFromDocInfo str = 
  str |> String.toInt |> Maybe.withDefault 0