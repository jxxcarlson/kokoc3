module User exposing(
     Token
   , invalidToken
   , getToken
   , readToken
   , UserMsg(..)
   , User
   , testUser
   , maybeSetToken
   , getTokenString
   ) 


import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http 

import Configuration


-- localhost:4000/api/authentication

-- MODEL

type User = User {
    email: String
  , id : Int 
  , token : Token 
  , username : String 
  }

testUser = User {
    email = "jxxcarlson@gmail.com"
  , id = 1
  , token =  Token "fake"
  , username = "jxxcarlson"
  }

getTokenString : User -> String 
getTokenString (User user) = 
  let
    (Token str) = user.token
  in
    str 

setToken : Token -> User -> User 
setToken token (User user) = 
  User { user | token = token }

maybeSetToken : Token -> Maybe User -> Maybe User 
maybeSetToken token maybeUser = 
   case maybeUser of 
     Nothing -> Nothing 
     Just user -> Just (setToken token user)


type Token = 
   Token String 

type alias TokenClaims =
    { username : String, user_id : Int }


type ValidatedTokenClaims =
  ValidatedTokenClaims TokenClaims 
  | InvalidTokenClaims


{-| Return a default and invalid token -}
invalidToken : Token 
invalidToken =
  Token "invalid" 

{-| Return the token string -}
readToken : Maybe Token -> Maybe String 
readToken maybeToken = 
  case maybeToken of
    Nothing -> Nothing 
    Just (Token str)-> Just str
   

-- MSG

type UserMsg = 
  ReceiveToken (Result Http.Error Token)


-- DECODERS

tokenDecoder : Decoder Token
tokenDecoder =
    Decode.map Token (Decode.field "token" Decode.string) 

-- ENCODERS

authenticationEncoder : String -> String -> Encode.Value
authenticationEncoder email password =
    Encode.object
        [ ( "authenticate"
          , Encode.object
                [ ( "email", Encode.string email )
                , ( "password", Encode.string password )
                ]
          )
        ]


-- REQUEST

tokenRequest : String -> String -> Http.Request Token
tokenRequest email password = 
  Http.request
    { method = "Post"
    , headers = []
    , url = Configuration.backend ++ "/api/authentication/"
    , body = Http.jsonBody (authenticationEncoder email password)
    , expect = Http.expectJson tokenDecoder
    , timeout = Just 5000
    , withCredentials = False
    }

getToken : String  -> String -> Cmd UserMsg 
getToken email password =
    Http.send ReceiveToken <| tokenRequest email password
