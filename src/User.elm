module User exposing(
     Token
   , invalidToken
   , getTokenCmd
   , getToken
   , readToken
   , UserMsg(..)
   , User
   , BigUser
   , maybeSetToken
   , stringFromToken
   , getTokenString
   , getTokenStringFromMaybeUser
   , username
   , email
   , usernameFromMaybeUser
   , userId
   , encodeUserForOutside
   , decodeUserFromOutside
   , maybeUserFromEmailAndToken
   , registerUser
   , stringFromMaybeToken
   , sessionIsExpired
   , getUsers
   , incrementMediaCountForMaybeUser
   ) 


import Json.Encode as Encode    
import Json.Decode as Decode exposing (field, at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http 
import Jwt exposing(decodeToken)
import Time exposing(Posix)

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

type alias RegistrationUserRecord = {
    email: String
  , username : String 
  , password : String 
  
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

usernameFromMaybeUser : Maybe User -> String 
usernameFromMaybeUser maybeUser = 
  case maybeUser of 
    Nothing -> ""
    Just user -> username user  

getTokenString : User -> String 
getTokenString (User user) = 
  let
    (Token str) = user.token
  in
    str 

getToken : User -> Token 
getToken user = 
  Token (getTokenString user)

getTokenStringFromMaybeUser : Maybe User -> String 
getTokenStringFromMaybeUser maybeUser = 
  case maybeUser of 
    Nothing -> "invalidTokenString"
    Just user -> getTokenString user


-- TOKEN

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
    { username : String, userId : Int }


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
   
stringFromMaybeToken : Maybe Token -> String 
stringFromMaybeToken maybeToken = 
  case maybeToken of
    Nothing -> "invalidToken" 
    Just (Token str )-> str


stringFromToken : Token -> String 
stringFromToken (Token str) = 
   str

-- MSG

type UserMsg = 
      ReceiveToken (Result Http.Error Token)
    | RespondToNewUser (Result Http.Error Token)
    | ListUsers (Result Http.Error (List BigUser))
    | AcknowledgeMediaCountIncrement (Result Http.Error String)


-- DECODERS

tokenDecoder : Decoder Token
tokenDecoder =
    Decode.map Token (Decode.field "token" Decode.string) 


jwtDecoder : Decoder TokenClaims
jwtDecoder =
    Decode.succeed TokenClaims
        |> JPipeline.required "username" Decode.string
        |> JPipeline.required "user_id" Decode.int

replyDecoder : Decoder String 
replyDecoder = 
  Decode.field "reply" Decode.string

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


registrationEncoder : String -> String -> String -> String -> Encode.Value
registrationEncoder email_ username_ name_ password_  = 
  Encode.object 
   [ ("user", Encode.object 
       [   ("username", Encode.string username_)
         , ("name", Encode.string name_)
         , ("email", Encode.string email_)
         , ("password", Encode.string password_)
      ])
    ]


-- DECODERS


decodeUserFromOutside : Decoder User
decodeUserFromOutside =
  Decode.map User <|
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
    , timeout = Just Configuration.timeout
    , withCredentials = False
    }

registerUserRequest : String -> String -> String -> String -> Http.Request Token
registerUserRequest email_ username_ name_ password_ = 
  Http.request
    { method = "Post"
    , headers = [Http.header "APIVersion" "V2"]
    , url = Configuration.backend ++ "/api/users"
    , body = Http.jsonBody (registrationEncoder email_ username_ name_ password_)
    , expect = Http.expectJson tokenDecoder
    , timeout = Just Configuration.timeout
    , withCredentials = False
    }
 

registerUser : String -> String -> String -> String -> Cmd UserMsg 
registerUser email_ username_ name_ password_  = 
  Http.send RespondToNewUser <| registerUserRequest email_ username_ name_ password_


-- TOKEN

getTokenCmd : String  -> String -> Cmd UserMsg 
getTokenCmd email_ password =
    Http.send ReceiveToken <| tokenRequest email_ password


maybeUserFromEmailAndToken : String -> String ->  Maybe User
maybeUserFromEmailAndToken email_ token =
    case Jwt.decodeToken jwtDecoder token of
        Ok value ->
            let
                userRecord = { email = email_, id = value.userId, token = Token token, username = value.username}
            in
                Just (User userRecord)

        Err error ->
            Nothing


sessionIsExpired : Posix -> User -> Bool
sessionIsExpired currentTime user =
  case  Jwt.isExpired currentTime (getTokenString user) of 
    (Ok value) -> value 
    _ -> False
  


-- ADMIN


bigUserDecoder : Decoder BigUser
bigUserDecoder =
    Decode.succeed BigUser
        |> JPipeline.required "username" Decode.string
        |> JPipeline.required "name" Decode.string
        |> JPipeline.required "id" Decode.int
        |> JPipeline.required "email" Decode.string
        |> JPipeline.required "blurb" Decode.string
        |> JPipeline.required "admin" Decode.bool
        |> JPipeline.required "active" Decode.bool
        |> JPipeline.required "documentCount" Decode.int
        |> JPipeline.required "mediaCount" Decode.int
        |> JPipeline.required "verified" Decode.bool
        |> JPipeline.required "public" Decode.bool

type alias BigUser = {
      username : String     
    , name : String
    , id : Int
    , email : String 
    , blurb : String 
    , admin : Bool 
    , active : Bool
    , documentCount : Int
    , mediaCount : Int
    , verified : Bool
    , public : Bool
  }


userListDecoder : Decoder (List BigUser)
userListDecoder = 
  Decode.field "users" (Decode.list bigUserDecoder)  

getUsersRequest : String -> Http.Request (List BigUser)
getUsersRequest query = 
  let 
    queryString = case query == "" of 
      True -> ""
      False -> "?" ++ query
  in 
    Http.request
      { method = "Get"
      , headers = [Http.header "APIVersion" "V2"]
      , url = Configuration.backend ++ "/api/users" ++ queryString
      , body = Http.emptyBody
      , expect = Http.expectJson userListDecoder
      , timeout = Just Configuration.timeout
      , withCredentials = False
      }
 

getUsers : String -> Cmd UserMsg 
getUsers query  = 
  Http.send ListUsers <| getUsersRequest query

incrementMediaCountForMaybeUser : Maybe User -> Cmd UserMsg
incrementMediaCountForMaybeUser maybeUser =
  case maybeUser of 
    Nothing -> Cmd.none 
    Just user -> incrementMediaCountForUser user 

incrementMediaCountForUser : User -> Cmd UserMsg 
incrementMediaCountForUser user = 
  Http.send AcknowledgeMediaCountIncrement <| incrementMediaCountRequest user 

incrementMediaCountRequest : User -> Http.Request String 
incrementMediaCountRequest user = 
   Http.request
      { method = "Post"
      , headers = [Http.header "APIVersion" "V2"]
      , url = Configuration.backend ++ "/api/users/increment_media_count/" ++ (String.fromInt <| userId user)
      , body = Http.emptyBody
      , expect = Http.expectJson replyDecoder
      , timeout = Just Configuration.timeout
      , withCredentials = False
      }