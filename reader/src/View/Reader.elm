module View.Reader exposing(view, signoutButton)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed

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
import View.EditorTools as EditorTools
import Widget exposing(..)


-- READER

view : Model -> Element Msg
view model = 
  Element.row [width (fillPortion 4), height fill, Background.color Widget.white, centerX] [
     bodyLeftColumn 2 model,  bodyReaderColumn model.windowHeight 7 model, bodyRightColumn 2 model
  ]


bodyReaderColumn : Int -> Int -> Model -> Element Msg
bodyReaderColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX] [
      Element.map DocViewMsg (DocumentView.view windowHeight_ model.counter model.debounceCounter (Common.texMacros model) model.currentDocument)
  ]


bodyLeftColumn : Int -> Model -> Element Msg
bodyLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        Element.row [spacing 10] [ Common.toggleToolsButton (px 105) model, EditorTools.newDocumentButton model ]
      , EditorTools.newChildButton model 
      , EditorTools.toolsOrContents model
  ]


bodyRightColumn : Int -> Model -> Element Msg
bodyRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, Background.color Widget.lightBlue, centerX] [
      loginOrSignUpPanel model
    , logoutPanel model
  ]


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

-- AHEM!

currentUserNameElement : Model -> Element msg 
currentUserNameElement model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just user -> Element.el [] (Element.text <| "Signed in as " ++ User.username user)


-- TOOLS




