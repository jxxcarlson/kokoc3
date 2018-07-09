module TestApp exposing (main)

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
import Document exposing(Document, getDocumentById, DocMsg(..))


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
    | UserMsg User.UserMsg
    | DocMsg Document.DocMsg


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

        GetToken ->
           (model, Cmd.map UserMsg (User.getToken "jxxcarlson@gmail.com" model.password)  )

        GetDocumentById id ->
           (model, Cmd.map DocMsg (Document.getDocumentById id (readToken model.token)))
        

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


view model =
   Element.layout [Font.size 14, width (px 400), height (px 600)] <|
        Element.column [ paddingXY 20 20, height (px 240)] [
            Element.column [paddingXY 40 40, spacing 15,  Background.color grey]
                [ label 18 "Test App"
                , passwordInput model
                , getTokenButton model
                , documentInfoInput model
                , getDocumentButton model
                , Element.el [] (text model.message)
                , Element.el [] (Element.html <| Document.view model.currentDocument)
                ]
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
      , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "Password")
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


getTokenButton : Model -> Element Msg    
getTokenButton model = 
  Input.button buttonStyle {
    onPress =  Just GetToken
  , label = Element.text "Get token"
  } 

getDocumentButton : Model -> Element Msg    
getDocumentButton model = 
  Input.button buttonStyle {
    onPress =  Just (GetDocumentById <| idFromDocInfo model.docInfo)
  , label = Element.text "Get document"
  } 

idFromDocInfo str = 
  str |> String.toInt |> Maybe.withDefault 0