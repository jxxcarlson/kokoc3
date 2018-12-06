port module Update.Outside
    exposing
        ( InfoForOutside(..)
        , InfoForElm(..)
        , sendInfoOutside
        , getInfoFromOutside
        , eraseLocalStorage
        , saveDocToLocalStorage
        , sendMaybeUserDataToLocalStorage
        , saveRecentDocumentQueueToLocalStorage
        , saveDocumentListToLocalStorage
        )

import Json.Encode as Encode
import Json.Decode as Decode
import User exposing (User)
import Document exposing (Document)
import DocumentList exposing (DocumentList)
import Queue exposing (Queue)


port infoForOutside : GenericOutsideData -> Cmd msg


port infoForElm : (GenericOutsideData -> msg) -> Sub msg


type alias GenericOutsideData =
    { tag : String, data : Encode.Value }


type InfoForElm
    = DocumentDataFromOutside Document
    | DocumentListDataFromOutside DocumentList.IntList
    | RecentDocumentQueueDataFromOutside (List Int)
    | UserDataFromOutside User


type InfoForOutside
    = DocumentData Encode.Value
    | DocumentListData Encode.Value
    | DocumentQueueData Encode.Value
    | AskToReconnectDocument Encode.Value
    | AskToReconnectDocumentList Encode.Value
    | AskToReconnectRecentDocumentQueue Encode.Value
    | UserData Encode.Value
    | AskToReconnectUser Encode.Value
    | AskToEraseLocalStorage Encode.Value


getInfoFromOutside : (InfoForElm -> msg) -> (String -> msg) -> Sub msg
getInfoFromOutside tagger onError =
    infoForElm
        (\outsideInfo ->
            case outsideInfo.tag of
                "ReconnectDocument" ->
                    case Decode.decodeValue Document.decodeDocumentFromOutside outsideInfo.data of
                        Ok result ->
                            tagger <| DocumentDataFromOutside result

                        Err e ->
                            onError <| "No doc to retrieve"

                "ReconnectDocumentList" ->
                    case Decode.decodeValue DocumentList.intListDecoder outsideInfo.data of
                        Ok result ->
                            tagger <| DocumentListDataFromOutside result

                        Err e ->
                            onError <| "No doc to retrieve"

                "ReconnectDocumentQueue" ->
                    case Decode.decodeValue DocumentList.intListForDocumentQueueDecoder outsideInfo.data of
                        Ok result ->
                            tagger <| RecentDocumentQueueDataFromOutside result

                        Err e ->
                            onError <| "No document queue to retrieve"

                "ReconnectUser" ->
                    case Decode.decodeValue User.decodeUserFromOutside outsideInfo.data of
                        Ok result ->
                            tagger <| UserDataFromOutside result

                        Err e ->
                            onError <| ""

                --   "Bad decode (getInfoFromOutside)"  ++ (Decode.errorToString e))
                _ ->
                    onError <| "Unexpected info from outside"
        )


sendInfoOutside : InfoForOutside -> Cmd msg
sendInfoOutside info =
    case info of
        DocumentData value ->
            infoForOutside { tag = "DocumentData", data = value }

        DocumentListData value ->
            infoForOutside { tag = "DocumentListData", data = value }

        DocumentQueueData value ->
            infoForOutside { tag = "DocumentQueueData", data = value }

        UserData value ->
            infoForOutside { tag = "UserData", data = value }

        AskToReconnectDocument value ->
            infoForOutside { tag = "AskToReconnectDocument", data = Encode.null }

        AskToReconnectDocumentList value ->
            infoForOutside { tag = "AskToReconnectDocumentList", data = Encode.null }

        AskToReconnectRecentDocumentQueue value ->
            infoForOutside { tag = "AskToReconnectRecentDocumentQueue", data = Encode.null }

        AskToReconnectUser value ->
            infoForOutside { tag = "AskToReconnectUser", data = Encode.null }

        AskToEraseLocalStorage value ->
            infoForOutside { tag = "AskToEraseLocalStorage", data = Encode.null }


eraseLocalStorage : Cmd msg
eraseLocalStorage =
    sendInfoOutside (AskToEraseLocalStorage Encode.null)


sendMaybeUserDataToLocalStorage : Maybe User -> Cmd msg
sendMaybeUserDataToLocalStorage maybeUser =
    case maybeUser of
        Nothing ->
            Cmd.none

        Just user ->
            sendInfoOutside (UserData (User.encodeUserForOutside user))


saveDocToLocalStorage : Document -> Cmd msg
saveDocToLocalStorage document =
    sendInfoOutside (DocumentData (Document.encodeDocumentForOutside document))


saveRecentDocumentQueueToLocalStorage : Queue Document -> Cmd msg
saveRecentDocumentQueueToLocalStorage documentQueue =
    sendInfoOutside (DocumentQueueData (DocumentList.encodeDocumentQueue documentQueue))


saveDocumentListToLocalStorage : DocumentList -> Cmd msg
saveDocumentListToLocalStorage documentList =
    sendInfoOutside (DocumentListData (DocumentList.documentListEncoder documentList))
