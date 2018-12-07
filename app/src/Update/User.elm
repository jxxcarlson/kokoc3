module Update.User exposing (..)

import Model exposing (Model, Msg(..), ErrorResponse(..), initialModel, DocumentListSource(..))
import Queue
import User exposing (UserMsg(..))
import Update.HttpError as HttpError
import Update.Outside as Outside
import Update.Time
import DocumentList
import SystemDocument
import Document


update : UserMsg -> Model -> ( Model, Cmd Msg )
update userMsg model =
    case userMsg of
        AcceptPassword str ->
            ( { model | password = str }, Cmd.none )

        AcceptEmail str ->
            ( { model | email = str }, Cmd.none )

        AcceptUserName str ->
            ( { model | username = str }, Cmd.none )

        SignIn ->
            signIn model

        SignOut ->
            signOutCurrentUser model

        SessionStatus t ->
            let
                sessionExpired =
                    case model.maybeCurrentUser of
                        Nothing ->
                            True

                        Just user ->
                            User.sessionIsExpired t user

                sessionString =
                    case sessionExpired of
                        True ->
                            "Not signed in"

                        False ->
                            "UTC " ++ Update.Time.toUtcString t
            in
                case ( sessionExpired, model.maybeCurrentUser ) of
                    ( True, Just _ ) ->
                        signOutCurrentUser model

                    ( _, _ ) ->
                        ( { model | message = sessionString }, Cmd.none )

        -- Handler: RespondToNewUser
        RegisterUser ->
            case String.length model.password < 8 of
                True ->
                    ( { model | message = "Password must have at least 8 characters" }, Cmd.none )

                False ->
                    ( model, Cmd.map UserMsg (User.registerUser model.email model.username "anon" model.password) )

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


signOutCurrentUser : Model -> ( Model, Cmd Msg )
signOutCurrentUser model =
    let
        freshModel =
            initialModel "" model.windowWidth model.windowHeight SystemDocument.signedOut
    in
        ( { freshModel
            | maybeCurrentUser = Nothing
            , maybeToken = Nothing
            , message = "Signed out"
            , currentDocumentDirty = False
          }
        , Cmd.batch
            [ Outside.eraseLocalStorage

            -- , Update.Document.saveCurrentDocumentIfDirty model --ACHTUNG!!
            ]
        )


signIn : Model -> ( Model, Cmd Msg )
signIn model =
    case String.length model.password < 8 of
        True ->
            ( { model | message = "Password must contain at least 8 characters" }, Cmd.none )

        False ->
            let
                basicDoc =
                    Document.basicDocument

                startupDoc =
                    SystemDocument.signIn

                freshModel =
                    initialModel "" model.windowWidth model.windowHeight startupDoc

                documentListSource =
                    RecentDocumentsQueue
            in
                ( freshModel
                , Cmd.batch
                    [ Cmd.map UserMsg (User.getTokenCmd model.email model.password)
                    , Outside.eraseLocalStorage
                    ]
                )


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
