module User exposing(
     Token
   , defaultToken
   , getToken
   , UserMsg(..)) 


import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http 

import Configuration


-- localhost:4000/api/authentication

-- MODEL

type Token = 
   Token String 

defaultToken : Token 
defaultToken =
  Token "invalid" 


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
