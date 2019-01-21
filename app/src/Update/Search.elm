module Update.Search exposing (..)

import Model
    exposing
        ( Model
        , Msg(..)
        , AppMode(..)
        , ToolMenuState(..)
        , ToolPanelState(..)
        , DocumentListSource(..)
        )
import Query
import Update.Document
import DocumentList
import FileUploadCredentials as Credentials exposing (FileData, Image)
import User


doSearch : Model -> ( Model, Cmd Msg )
doSearch model =
    case model.appMode of
        Reading ->
            case model.maybeCurrentUser of
                Nothing ->
                    getPublicDocuments model model.searchQueryString

                Just _ ->
                    case String.contains "shared" model.searchQueryString of
                        True ->
                            Update.Document.getUserDocuments model model.searchQueryString

                        False ->
                            Update.Document.getUserDocuments model (model.searchQueryString ++ ", docs=any")

        Writing ->
            Update.Document.getUserDocuments model model.searchQueryString

        ImageEditing ->
            searchForImages model

        Admin ->
            searchForUsers model

        DisplayAuthors ->
            searchForUsers model


searchForUsersCmd : Model -> Cmd Msg
searchForUsersCmd model =
    case String.contains "=" model.searchQueryString of
        True ->
            Cmd.map UserMsg (User.getUsers <| model.searchQueryString)

        False ->
            Cmd.map UserMsg (User.getUsers <| "is_user=" ++ model.searchQueryString)


searchForUsers : Model -> ( Model, Cmd Msg )
searchForUsers model =
    ( { model | toolMenuState = HideToolMenu, documentListSource = SearchResults }, searchForUsersCmd model )


searchForImages : Model -> ( Model, Cmd Msg )
searchForImages model =
    let
        queryString =
            case model.searchQueryString == "" of
                True ->
                    ""

                False ->
                    model.searchQueryString
    in
        ( { model | toolMenuState = HideToolMenu, documentListSource = SearchResults }, Cmd.map FileMsg (Credentials.getImages "" (imageQuery model queryString)) )


searchForUsersCmdWithQuery : String -> Model -> Cmd Msg
searchForUsersCmdWithQuery searchQueryString model =
    Cmd.map UserMsg (User.getUsers <| searchQueryString)


getPublicDocuments : Model -> String -> ( Model, Cmd Msg )
getPublicDocuments model queryString =
    ( { model
        | appMode = Reading
        , toolPanelState = HideToolPanel
        , masterDocLoaded = False
        , currentDocumentDirty = False
        , documentListSource = SearchResults
      }
    , Cmd.batch
        [ Cmd.map DocListMsg (DocumentList.findDocuments Nothing (Query.parse queryString))
        , Update.Document.saveCurrentDocumentIfDirty model
        ]
    )


getPublicDocumentsRawQuery : Model -> String -> ( Model, Cmd Msg )
getPublicDocumentsRawQuery model query =
    ( { model
        | appMode = Reading
        , toolPanelState = HideToolPanel
        , documentListSource = SearchResults
        , masterDocLoaded = False
        , currentDocumentDirty = False
        , toolMenuState = HideToolMenu
      }
    , Cmd.batch
        [ Cmd.map DocListMsg (DocumentList.findDocuments Nothing query)
        , Update.Document.saveCurrentDocumentIfDirty model
        ]
    )


getDocumentsRawQuery : Model -> String -> ( Model, Cmd Msg )
getDocumentsRawQuery model query =
    ( { model
        | appMode = Reading
        , toolPanelState = HideToolPanel
        , documentListSource = SearchResults
        , masterDocLoaded = False
        , currentDocumentDirty = False
        , toolMenuState = HideToolMenu
      }
    , Cmd.batch
        [ Cmd.map DocListMsg (DocumentList.findDocuments model.maybeCurrentUser query)
        , Update.Document.saveCurrentDocumentIfDirty model
        ]
    )


imageQuery : Model -> String -> String
imageQuery model basicQuery =
    case model.maybeCurrentUser of
        Nothing ->
            "123XY.uuk#m!!t"

        Just user ->
            case basicQuery == "" of
                True ->
                    Query.parse <| "user_id=" ++ (String.fromInt <| User.userId user)

                False ->
                    case basicQuery == "random" of
                        True ->
                            Query.parse <| "random=yes"

                        False ->
                            Query.parse <| "user_id=" ++ (String.fromInt <| User.userId user) ++ "&" ++ Query.stringToQueryString "name" basicQuery
