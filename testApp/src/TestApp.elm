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

import User exposing(Token, UserMsg(..), readToken)
import Document exposing(Document, DocMsg(..))
import DocumentList exposing(DocumentList, DocListMsg(..), findPublicDocuments, documentListLength)
import DocumentView exposing(view)



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
      , docInfo  : String
      , currentDocument : Document
    }


type Msg
    = NoOp
    | AcceptPassword String
    | AcceptDocInfo String
    | ReverseText
    | GetToken
    | GetDocumentById Int
    | GetPublicDocuments String
    | UserMsg User.UserMsg
    | DocMsg Document.DocMsg
    | DocListMsg DocumentList.DocListMsg


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
            , currentDocument = { doc | title = "Welcome!"}
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
               ({ model | token = token, message = "token OK"},   Cmd.none  )
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
               ({ model | message = "documentList: " ++ (String.fromInt <| documentListLength documentList)},   Cmd.none  )
            Err err -> 
                ({model | message = handleHttpError err},   Cmd.none  )

        GetToken ->
           (model, Cmd.map UserMsg (User.getToken "jxxcarlson@gmail.com" model.password)  )

        GetDocumentById id ->
           (model, Cmd.map DocMsg (Document.getDocumentById id (readToken model.token)))

        GetPublicDocuments query ->
           (model, Cmd.map DocListMsg (DocumentList.findPublicDocuments query))
        

handleHttpError : Http.Error -> String 
handleHttpError error = 
  case error of 
    Http.BadUrl str -> str 
    Http.Timeout -> "timeout"
    Http.NetworkError -> "Network error"
    Http.BadStatus resp -> "Bad status: " ++ "darn! ++"  ++ (Debug.toString resp)
    Http.BadPayload str1 resp -> "Bad payload: " ++ str1  ++ ", payload = " ++ "bad payload"

-- handleErrorReponse : Http.Resonse 
-- handleErrorReponse resp =
  


-- VIEW 


-- view1 model =
--    Element.layout [Font.size 14, width (px 400), height (px 600)] <|
--         Element.column [ paddingXY 20 20, height (px 240)] [
--             Element.column [paddingXY 40 40, spacing 15,  Background.color grey]
--                 [ label 18 "Test App"

--                 , 
--                 , 
--                 , DocumentView.view model.currentDocument
--                 ]
        -- ]
        

view  model =
   Element.layout [Font.size 14, width fill, height fill, clipY] <|
        Element.column [ width fill, height fill] [
            header model
            , body model
            , footer model
        ]
        

header model = 
  Element.row [width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0, spacing 10] [
      passwordInput model, getTokenButton (px 75) model
  ]

body model = 
  Element.row [width fill, height fill, Background.color Widget.white, centerX] [
     bodyLeftColumn model,  bodyCenterColumn model, bodyRightColumn model
  ]

bodyLeftColumn model = 
  Element.column [width (px 250), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [
       documentInfoInput model
     , getDocumentButton (px 135) model
     , getPublicDocumentsButton (px 135) model
  ]

bodyCenterColumn model = 
  Element.column [width fill, height fill, paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      DocumentView.view model.currentDocument
  ]

bodyRightColumn model = 
  Element.column [width (px 250), height fill, Background.color Widget.lightBlue, centerX] [
      text "RC"
  ]

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
    onPress =  Just (GetPublicDocuments <| model.docInfo)
  , label = Element.text "Get public docs"
  } 

idFromDocInfo str = 
  str |> String.toInt |> Maybe.withDefault 0