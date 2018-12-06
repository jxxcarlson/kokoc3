port module Update.Outside
    exposing
        ( InfoForOutside(..)
        , InfoForElm(..)
        , sendInfoOutside
        , eraseLocalStorage
        )

import Json.Encode as Encode
import User exposing (User)
import Document exposing (Document)
import DocumentList


port infoForOutside : GenericOutsideData -> Cmd msg


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


type alias GenericOutsideData =
    { tag : String, data : Encode.Value }


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
