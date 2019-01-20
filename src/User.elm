module User
    exposing
        ( BigUser
        , Token(..)
        , User
        , UserMsg(..)
        , decodeUserFromOutside
        , email
        , encodeUserForOutside
        , expAsPosix
        , exp
        , getBigUserRecord
        , getBigUserRecordAtSignIn
        , getToken
        , getTokenCmd
        , getTokenString
        , getTokenStringFromMaybeUser
        , getUsers
        , incrementMediaCountForMaybeUser
        , invalidToken
        , maybeSetToken
        , maybeUserFromEmailAndToken
        , readToken
        , registerUser
        , sessionIsExpired
        , stringFromMaybeToken
        , stringFromToken
        , updateBigUser
        , userId
        , username
        , usernameFromMaybeUser
        )

import Configuration
import Http
import Json.Decode as Decode exposing (Decoder, at, decodeString, field, int, list, string)
import Json.Decode.Pipeline as JPipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode
import Jwt exposing (decodeToken)
import Time exposing (Posix)


-- localhost:4000/api/authentication
-- TYPES


type User
    = User UserRecord


type alias UserRecord =
    { email : String
    , id : Int
    , token : Token
    , username : String
    , exp : Int
    }


type alias RegistrationUserRecord =
    { email : String
    , username : String
    , password : String
    }


type alias BigUserRecord =
    { user : BigUser }



-- ACCESSORS


email : User -> String
email (User user) =
    user.email


exp : User -> Int
exp (User user) =
    user.exp


expAsPosix : User -> Posix
expAsPosix (User user) =
    user.exp |> Time.millisToPosix


userId : User -> Int
userId (User user) =
    user.id


username : User -> String
username (User user) =
    user.username


usernameFromMaybeUser : Maybe User -> String
usernameFromMaybeUser maybeUser =
    case maybeUser of
        Nothing ->
            ""

        Just user ->
            username user


getTokenString : User -> String
getTokenString (User user) =
    case user.token of
        Token str ->
            str

        TokenError str ->
            str


getToken : User -> Token
getToken user =
    Token (getTokenString user)


getTokenStringFromMaybeUser : Maybe User -> String
getTokenStringFromMaybeUser maybeUser =
    case maybeUser of
        Nothing ->
            "invalidTokenString"

        Just user ->
            getTokenString user



-- TOKEN


setToken : Token -> User -> User
setToken token_ (User user) =
    User { user | token = token_ }


maybeSetToken : Token -> Maybe User -> Maybe User
maybeSetToken token_ maybeUser =
    case maybeUser of
        Nothing ->
            Nothing

        Just user ->
            Just (setToken token_ user)


type Token
    = Token String
    | TokenError String



-- | TokenError String


type alias TokenClaims =
    { username : String, userId : Int, exp : Int }


type ValidatedTokenClaims
    = ValidatedTokenClaims TokenClaims
    | InvalidTokenClaims


{-| Return a default and invalid token
-}
invalidToken : Token
invalidToken =
    Token "invalid"


{-| Return the token string
-}
readToken : Maybe Token -> Maybe String
readToken maybeToken =
    case maybeToken of
        Nothing ->
            Nothing

        Just (Token str) ->
            Just str

        Just (TokenError str) ->
            Just str


stringFromMaybeToken : Maybe Token -> String
stringFromMaybeToken maybeToken =
    case maybeToken of
        Nothing ->
            "invalidToken"

        Just (Token str) ->
            str

        Just (TokenError str) ->
            "invalidToken"


stringFromToken : Token -> String
stringFromToken token =
    case token of
        Token str ->
            str

        TokenError str ->
            str



-- MSG


type UserMsg
    = ReceiveToken (Result Http.Error Token)
    | RespondToNewUser (Result Http.Error Token)
    | ListUsers (Result Http.Error (List BigUser))
    | AcknowledgeMediaCountIncrement (Result Http.Error String)
    | ReceiveBigUserRecord (Result Http.Error BigUserRecord)
    | ReceiveBigUserRecordAtSignIn (Result Http.Error BigUserRecord)
    | AcknowlegeBigUserUpdate (Result Http.Error BigUserRecord)
    | AcceptPassword String
    | AcceptEmail String
    | AcceptUserName String
    | SignIn
    | SignOut
    | RegisterUser
    | SessionStatus Posix



-- DECODERS


tokenDecoder : Decoder Token
tokenDecoder =
    Decode.oneOf
        [ Decode.map Token (Decode.field "token" Decode.string)
        , Decode.map TokenError (Decode.field "error" Decode.string)
        ]


jwtDecoder : Decoder TokenClaims
jwtDecoder =
    Decode.succeed TokenClaims
        |> JPipeline.required "username" Decode.string
        |> JPipeline.required "user_id" Decode.int
        |> JPipeline.required "exp" Decode.int


replyDecoder : Decoder String
replyDecoder =
    Decode.field "reply" Decode.string


decodeUserFromOutside : Decoder User
decodeUserFromOutside =
    Decode.map User <|
        Decode.map5 UserRecord
            (field "email" string)
            (field "id" int)
            (Decode.map Token (field "token" string))
            (field "username" string)
            (field "exp" int)


bigUserRecordDecoder : Decoder BigUserRecord
bigUserRecordDecoder =
    Decode.succeed BigUserRecord
        |> JPipeline.required "user" bigUserDecoder


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
        |> JPipeline.required "created" (Decode.map ((\x -> x * 1000) >> Time.millisToPosix) Decode.int)
        |> JPipeline.required "documentIds" (Decode.list Decode.int)



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
        [ ( "email", Encode.string <| email user )
        , ( "id", Encode.int <| userId user )
        , ( "token", Encode.string <| getTokenString user )
        , ( "username", Encode.string <| username user )
        , ( "exp", Encode.int <| exp user )
        ]


registrationEncoder : String -> String -> String -> String -> Encode.Value
registrationEncoder email_ username_ name_ password_ =
    Encode.object
        [ ( "user"
          , Encode.object
                [ ( "username", Encode.string username_ )
                , ( "name", Encode.string name_ )
                , ( "email", Encode.string email_ )
                , ( "password", Encode.string password_ )
                ]
          )
        ]



-- REQUEST


registerUser : String -> String -> String -> String -> Cmd UserMsg
registerUser email_ username_ name_ password_ =
    Http.request
        { method = "Post"
        , headers = [ Http.header "APIVersion" "V2" ]
        , url = Configuration.backend ++ "/api/users"
        , body = Http.jsonBody (registrationEncoder email_ username_ name_ password_)
        , expect = Http.expectJson RespondToNewUser tokenDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }



-- TOKEN


getTokenCmd : String -> String -> Cmd UserMsg
getTokenCmd email_ password =
    Http.request
        { method = "Post"
        , headers = []
        , url = Configuration.backend ++ "/api/authentication/"
        , body = Http.jsonBody (authenticationEncoder email_ password)
        , expect = Http.expectJson ReceiveToken tokenDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }


maybeUserFromEmailAndToken : String -> String -> Maybe User
maybeUserFromEmailAndToken email_ token =
    case Jwt.decodeToken jwtDecoder token of
        Ok value ->
            let
                userRecord =
                    { email = email_
                    , id = value.userId
                    , token = Token token
                    , username = value.username
                    , exp = value.exp
                    }
            in
                Just (User userRecord)

        Err error ->
            Nothing


sessionIsExpired : Posix -> User -> Bool
sessionIsExpired currentTime user =
    case Jwt.isExpired currentTime (getTokenString user) of
        Ok value ->
            value

        _ ->
            False



-- ADMIN


bigUserEncoder : BigUser -> Encode.Value
bigUserEncoder bigUser =
    Encode.object
        [ ( "name", Encode.string bigUser.name )
        , ( "blurb", Encode.string bigUser.blurb )
        , ( "public", Encode.bool bigUser.public )
        , ( "document_ids", Encode.list Encode.int bigUser.documentIds )
        ]


bigUserRecordEncoder : BigUser -> Encode.Value
bigUserRecordEncoder bigUser =
    Encode.object [ ( "user", bigUserEncoder bigUser ) ]


type alias BigUser =
    { username : String
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
    , created : Posix
    , documentIds : List Int
    }


userListDecoder : Decoder (List BigUser)
userListDecoder =
    Decode.field "users" (Decode.list bigUserDecoder)


getUsers : String -> Cmd UserMsg
getUsers query =
    let
        queryString =
            case query == "" of
                True ->
                    ""

                False ->
                    "?" ++ query
    in
        Http.request
            { method = "Get"
            , headers = [ Http.header "APIVersion" "V2" ]
            , url = Configuration.backend ++ "/api/users" ++ queryString
            , body = Http.emptyBody
            , expect = Http.expectJson ListUsers userListDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


getBigUserRecord : Int -> Cmd UserMsg
getBigUserRecord userId_ =
    Http.request
        { method = "Get"
        , headers = [ Http.header "APIVersion" "V2" ]
        , url = Configuration.backend ++ "/api/users/" ++ String.fromInt userId_
        , body = Http.emptyBody
        , expect = Http.expectJson ReceiveBigUserRecord bigUserRecordDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }


getBigUserRecordAtSignIn : Int -> Cmd UserMsg
getBigUserRecordAtSignIn userId_ =
    Http.request
        { method = "Get"
        , headers = [ Http.header "APIVersion" "V2" ]
        , url = Configuration.backend ++ "/api/users/" ++ String.fromInt userId_
        , body = Http.emptyBody
        , expect = Http.expectJson ReceiveBigUserRecordAtSignIn bigUserRecordDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }


updateBigUser : String -> BigUser -> Cmd UserMsg
updateBigUser tokenString bigUser =
    Http.request
        { method = "Put"
        , headers = [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
        , url = Configuration.backend ++ "/api/users/" ++ String.fromInt bigUser.id
        , body = Http.jsonBody (bigUserRecordEncoder bigUser)
        , expect = Http.expectJson AcknowlegeBigUserUpdate bigUserRecordDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }


incrementMediaCountForMaybeUser : Maybe User -> Cmd UserMsg
incrementMediaCountForMaybeUser maybeUser =
    case maybeUser of
        Nothing ->
            Cmd.none

        Just user ->
            incrementMediaCountForUser user


incrementMediaCountForUser : User -> Cmd UserMsg
incrementMediaCountForUser user =
    Http.request
        { method = "Post"
        , headers = [ Http.header "APIVersion" "V2" ]
        , url = Configuration.backend ++ "/api/users/increment_media_count/" ++ (String.fromInt <| userId user)
        , body = Http.emptyBody
        , expect = Http.expectJson AcknowledgeMediaCountIncrement replyDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }
