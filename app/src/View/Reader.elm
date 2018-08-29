module View.Reader exposing(view, signoutButton)

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
    , ErrorResponse(..)
    , PreferencesPanelState(..)

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
import View.Widget as Widget exposing(..)


-- READER

view : Model -> Element Msg
view model = 
  Element.row [width (fillPortion 4), height fill, Background.color Widget.white, centerX] [
     leftColumn 2 model,  body model.viewport 7 model, rightColumn 2 model
  ]


body : Viewport -> Int -> Model -> Element Msg
body viewport portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (round <| viewport.viewport.height - 73)), paddingXY 20 20
    , Background.color Widget.lightGrey, centerX, clipX, clipY] [
      Element.map DocViewMsg (DocumentView.view viewport model.counter model.debounceCounter (Common.texMacros model) model.currentDocument)
  ]


leftColumn : Int -> Model -> Element Msg
leftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        Element.row [spacing 10] [ Common.toggleToolsButton (px 90) model, EditorTools.newDocumentButton model ]
      , EditorTools.newChildButton model 
      , EditorTools.toolsOrContents model
  ]


rightColumn : Int -> Model -> Element Msg
rightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
     Background.color Widget.lightBlue, centerX
     , paddingXY 15 0, spacing 15] [
      loginOrSignUpPanel model
    , logoutPanel model
    , togglePreferencesButton (px 110) model
    , userPreferencesPanel model
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
      Element.column [paddingXY 0 20, spacing 20] [
          Element.el [Font.bold, Font.size 18] (text "Sign in")
        , emailInput model
        , passwordInput model
        , Element.row [spacing 15] [
              signInButton (px 66) model
            , gotoRegistrationButton (px 66) model
        ] 
        , Element.paragraph [Font.color Widget.darkRed, width (px 160)] [text <| filterMessageForSignIn model.message]
        , resetPasswordLink model
        , verifyUserLink model
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
      Element.column [paddingXY 0 20, spacing 20] [
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
      Element.column [paddingXY 0 20, spacing 20] [
          currentUserNameElement model
       
        
      ]




signInButton : Length -> Model -> Element Msg    
signInButton width_ model = 
  Input.button (buttonStyle width_) {
    onPress =  Just SignIn
  , label = Element.el [] (Element.text "Sign in")
  } 

resetPasswordLink :  Model -> Element Msg    
resetPasswordLink  model = 
  case model.errorResponse of 
    ShowPasswordReset -> 
      newTabLink []
        { url = Configuration.backend ++ "/api/password/request"
        , label = text "Reset password?"
        }
    _ -> Element.none
 
verifyUserLink :  Model -> Element Msg    
verifyUserLink  model = 
  case model.errorResponse of 
    ShowVerifyAccount -> 
      newTabLink []
        { url = Configuration.backend ++ "/api/request_verification"
        , label = text "Request verification?"
        }
    _ -> Element.none



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




userPreferencesPanel model = 
  case model.preferencesPanelState of 
    PreferencesPanelOff -> Element.none
    PreferencesPanelOn -> 
      Element.column [spacing 10] [
         blurbInput model (px 200) (px 100) "Blurb"
       , toggleUserPublicPrivateButton (px 90) model
       , updatePreferencesButton (px 90) model 
      ]

togglePreferencesButton : Length -> Model -> Element Msg    
togglePreferencesButton width_ model = 
  case model.maybeCurrentUser of 
    Nothing -> Element.none 
    Just _ -> 
      Input.button (listItemStyleLarge width_) {
        onPress =  Just TogglePreferencesPanel
      , label = Element.el [] (Element.text "Preferences")
      } 



blurbInput model width_  height_ label_  =
    Keyed.row []
        [ ( (String.fromInt model.counter)
          , Input.multiline 
                [ width (width_), height (height_), paddingXY 10 10, scrollbarY ]
                { onChange = Just AcceptBlurb
                , text = model.blurb
                , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "Blurb")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]

updatePreferencesButton : Length -> Model -> Element Msg    
updatePreferencesButton width_ model = 
  case model.maybeBigUser of 
    Nothing -> Element.none 
    Just _ -> 
      Input.button (buttonStyle width_) {
        onPress =  Just UpdateBigUser
      , label = Element.el [] (Element.text "Update")
      } 

toggleUserPublicPrivateButton : Length -> Model -> Element Msg    
toggleUserPublicPrivateButton width_ model = 
  case model.maybeBigUser of 
    Nothing -> Element.none 
    Just _ -> 
      Input.button (buttonStyle width_) {
        onPress =  Just ToggleUserPublicPrivate
      , label = Element.el [] (Element.text <| toggleUserPublicPrivateButtonTitle model)
      } 

toggleUserPublicPrivateButtonTitle : Model -> String 
toggleUserPublicPrivateButtonTitle model =
  case model.maybeBigUser of 
    Nothing -> "---"
    Just bigUser ->
      case bigUser.public of 
        True -> "Public"
        False -> "Private"

-- ### User.updateBigUser bigUser