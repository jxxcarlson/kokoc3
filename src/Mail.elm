module Mail exposing(sendEmailToUsers, MailMsg(..))


import Http
import Json.Encode as Encode
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)

import User exposing(BigUser)
import Configuration


type MailMsg = 
     AcknowledgeEmailSent (Result Http.Error String)

sendEmailRequest : String -> BigUser -> String -> String -> Http.Request String
sendEmailRequest tokenString user subject text = 
    Http.request
        { method = "Post"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/mail" 
        , body = Http.jsonBody (encodeEmail  user.email subject text)
        , expect = Http.expectJson replyDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }


sendEmail : String ->  String -> String -> BigUser -> Cmd MailMsg 
sendEmail  tokenString subject text user =
    Http.send AcknowledgeEmailSent <| sendEmailRequest tokenString user subject text

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
  Encode.object [
      ("recipient", Encode.string recipient)
    , ("subject", Encode.string subject)
    , ("body", Encode.string text)
    , ("type", Encode.string "plain")
  ]

replyDecoder : Decoder String 
replyDecoder = 
  Decode.field "reply" Decode.string