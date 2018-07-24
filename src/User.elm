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
   , getTokenStringFromMaybeUser
   , username
   , userId
   , encodeUserForOutside
  
   ) 


import Json.Encode as Encode    
import Json.Decode as Decode exposing (field, at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http 

import Configuration


-- localhost:4000/api/authentication

-- MODEL

type User = User UserRecord


type alias UserRecord = {
    email: String
  , id : Int 
  , token : Token 
  , username : String 
  }

-- ACCESSORS

email : User -> String
email (User user) =
  user.email

userId : User -> Int
userId (User user) =
  user.id  

username : User -> String
username (User user) =
  user.username

getTokenString : User -> String 
getTokenString (User user) = 
  let
    (Token str) = user.token
  in
    str 

getTokenStringFromMaybeUser : Maybe User -> String 
getTokenStringFromMaybeUser maybeUser = 
  case maybeUser of 
    Nothing -> "invalidTokenString"
    Just user -> getTokenString user

testUser = User {
    email = "jxxcarlson@gmail.com"
  , id = 1
  , token =  Token "fake"
  , username = "jxxcarlson"
  }


setToken : Token -> User -> User 
setToken token_ (User user) = 
  User { user | token = token_ }

maybeSetToken : Token -> Maybe User -> Maybe User 
maybeSetToken token_ maybeUser = 
   case maybeUser of 
     Nothing -> Nothing 
     Just user -> Just (setToken token_ user)


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
authenticationEncoder email_ password =
    Encode.object
        [ ( "authenticate"
          , Encode.object
                [ ( "email", Encode.string email_ )
                , ( "password", Encode.string password )
                ]
          )
        ]

encodeUserForOutside : User -> Encode.Value
encodeUserForOutside user = 
  Encode.object 
   [
        ("email", Encode.string <| email user)
      , ("id", Encode.int <| userId user)
      , ("token", Encode.string <| getTokenString user)
      , ("username", Encode.string <| username user) 
    ]


decodeUserRecordFromOutside : Decoder UserRecord
decodeUserRecordFromOutside =
    Decode.map4 UserRecord
       (field "email" string)
       (field "id" int)
       (Decode.map Token (field "token" string))
       (field "username" string)


    

-- REQUEST

tokenRequest : String -> String -> Http.Request Token
tokenRequest email_ password = 
  Http.request
    { method = "Post"
    , headers = []
    , url = Configuration.backend ++ "/api/authentication/"
    , body = Http.jsonBody (authenticationEncoder email_ password)
    , expect = Http.expectJson tokenDecoder
    , timeout = Just 5000
    , withCredentials = False
    }

getToken : String  -> String -> Cmd UserMsg 
getToken email_ password =
    Http.send ReceiveToken <| tokenRequest email_ password
