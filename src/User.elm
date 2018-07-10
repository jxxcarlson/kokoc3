module User exposing(
     Token
   , invalidToken
   , getToken
   , readToken
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
readToken : Token -> String 
readToken (Token str) = 
   str

-- readToken1 : Token -> String 
-- readToken1 token = 
--   case token of 
--     Token str -> str



-- tokenClaimsDecoder : Decoder ValidatedTokenClaims
-- tokenClaimsDecoder =
--     Decode.succeed ValidatedTokenClaims
--         |> JPipeline.required "username" Decode.string
--         |> JPipeline.required "user_id" Decode.int

-- decodeToken : Token -> ValidatedTokenClaims 
-- decodeToken token =
--   case token of 
--     Token tokenValue ->
--         case Jwt.decodeToken tokenClaimsDecoder tokenValue of
--                     Ok tokenClaims -> ValidatedTokenClaims tokenClaims
--                     Err error -> InvalidTokenClaims
                        


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
