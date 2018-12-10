module Mail exposing (MailMsg(..), sendEmailToUsers)

import Configuration
import Http
import Json.Decode as Decode exposing (Decoder, at, decodeString, int, list, string)
import Json.Encode as Encode
import User exposing (BigUser)


type MailMsg
    = AcknowledgeEmailSent (Result Http.Error String)


sendEmail : String -> String -> String -> BigUser -> Cmd MailMsg
sendEmail tokenString subject text user =
    Http.request
        { method = "Post"
        , headers = [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
        , url = Configuration.backend ++ "/api/mail"
        , body = Http.jsonBody (encodeEmail user.email subject text)
        , expect = Http.expectJson AcknowledgeEmailSent replyDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }


sendEmailToUsers : String -> List BigUser -> String -> String -> Cmd MailMsg
sendEmailToUsers tokenString userList subject text =
    if userList /= [] && subject /= "" && text /= "" then
        sendEmailToUsers_ tokenString userList subject text
    else
        Cmd.none


sendEmailToUsers_ : String -> List BigUser -> String -> String -> Cmd MailMsg
sendEmailToUsers_ tokenString userList subject text =
    userList
        |> List.map (sendEmail tokenString subject text)
        |> Cmd.batch


encodeEmail : String -> String -> String -> Encode.Value
encodeEmail recipient subject text =
    Encode.object
        [ ( "recipient", Encode.string recipient )
        , ( "subject", Encode.string subject )
        , ( "body", Encode.string text )
        , ( "type", Encode.string "plain" )
        ]


replyDecoder : Decoder String
replyDecoder =
    Decode.field "reply" Decode.string
