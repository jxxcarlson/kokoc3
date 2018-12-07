module Update.User exposing (..)

import Model exposing (Model, Msg(..), ErrorResponse(..))
import Queue
import User exposing (UserMsg(..))
import Update.HttpError as HttpError
import Update.Outside as Outside
import DocumentList
import SystemDocument


update : UserMsg -> Model -> ( Model, Cmd Msg )
update userMsg model =
    case userMsg of
        ListUsers result ->
            case result of
                Ok userList ->
                    ( { model | userList = userList, message = "Users: " ++ (String.fromInt <| List.length userList) }, Cmd.none )

                Err error ->
                    ( { model | message = HttpError.handle error }, Cmd.none )

        AcknowledgeMediaCountIncrement result ->
            case result of
                Ok reply ->
                    ( { model | message = reply }, Cmd.none )

                Err error ->
                    ( { model | message = HttpError.handle error }, Cmd.none )

        ReceiveBigUserRecord result ->
            case result of
                Ok bigUserRecord ->
                    ( { model
                        | blurb = bigUserRecord.user.blurb
                        , maybeBigUser = Just bigUserRecord.user
                      }
                    , Cmd.none
                    )

                Err error ->
                    ( { model | blurb = "No blurb", message = HttpError.handle error }, Cmd.none )

        ReceiveBigUserRecordAtSignIn result ->
            case result of
                Ok bigUserRecord ->
                    ( { model
                        | blurb = bigUserRecord.user.blurb
                        , maybeBigUser = Just bigUserRecord.user
                      }
                    , Cmd.map DocListMsg (DocumentList.retrievRecentDocumentQueueFromIntListAtSignIn model.maybeCurrentUser bigUserRecord.user.documentIds)
                    )

                Err error ->
                    ( { model | blurb = "No blurb", message = HttpError.handle error }, Cmd.none )

        AcknowlegeBigUserUpdate result ->
            case result of
                Ok bigUserRecord ->
                    ( { model | message = "BIG USER OK" }, Cmd.none )

                Err error ->
                    ( { model | message = "BIG USER ERROR" }, Cmd.none )

        ReceiveToken result ->
            case result of
                Ok token ->
                    let
                        maybeToken =
                            Just token

                        maybeCurrentUser =
                            User.maybeUserFromEmailAndToken model.email (User.stringFromToken token)

                        bigUserCmd =
                            case maybeCurrentUser of
                                Nothing ->
                                    Cmd.none

                                Just user ->
                                    Cmd.map UserMsg <| User.getBigUserRecordAtSignIn (User.userId user)
                    in
                        ( { model
                            | maybeToken = maybeToken
                            , maybeCurrentUser = maybeCurrentUser
                            , message = "Signed in"
                            , email = ""
                            , password = ""
                            , username = ""
                          }
                        , Cmd.batch
                            [ Outside.sendMaybeUserDataToLocalStorage maybeCurrentUser
                            , bigUserCmd
                            ]
                        )

                Err err ->
                    let
                        errorMessage =
                            String.trim <| HttpError.handle err

                        errorResponse =
                            if errorMessage == "Incorrect email or password" then
                                ShowPasswordReset
                            else if errorMessage == "Account not verified" then
                                ShowVerifyAccount
                            else
                                NoErrorResponse
                    in
                        ( { model | message = errorMessage, errorResponse = errorResponse }, Cmd.none )

        RespondToNewUser result ->
            case result of
                Ok token ->
                    let
                        maybeToken =
                            Just token

                        maybeCurrentUser =
                            User.maybeUserFromEmailAndToken model.email (User.stringFromToken token)
                    in
                        ( { model
                            | maybeToken = maybeToken
                            , maybeCurrentUser = maybeCurrentUser
                            , message = "Signed up"
                            , email = ""
                            , password = ""
                            , username = ""
                            , currentDocument = SystemDocument.newUser
                          }
                        , Outside.sendMaybeUserDataToLocalStorage maybeCurrentUser
                        )

                Err err ->
                    ( { model | message = HttpError.handle err }, Cmd.none )


updateBigUserCmd : Model -> Cmd Msg
updateBigUserCmd model =
    case model.maybeBigUser of
        Nothing ->
            Cmd.none

        Just bigUser ->
            let
                nextBigUser =
                    { bigUser | blurb = model.blurb, documentIds = List.map .id <| Queue.list model.recentDocumentQueue }
            in
                Cmd.map UserMsg <| User.updateBigUser (User.getTokenStringFromMaybeUser model.maybeCurrentUser) nextBigUser
