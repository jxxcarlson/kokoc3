module DocumentDictionary
    exposing
        ( DocDictMsg(..)
        , DocumentDictionary
        , empty
        , get
        , keys
        , loadTexMacros
        , matchId
        , member
        , put
        , putTexMacroDocumentInDictionaryById
        , values
        )

import Dict exposing (Dict)
import Document exposing (Document, DocumentRecord)
import Http
import Utility
import Configuration
import Json.Encode as Encode


type DocumentDictionary
    = DocumentDictionary (Dict String Document)


type DocDictMsg
    = PutDocumentInDictionaryAsTexMacros (Result Http.Error DocumentRecord)



-- CONSTRUCTORS


empty =
    DocumentDictionary Dict.empty



-- MODIFIERS


put : String -> Document -> DocumentDictionary -> DocumentDictionary
put key document (DocumentDictionary dict) =
    DocumentDictionary (Dict.insert key document dict)



-- PROPERTIES


keys : DocumentDictionary -> List String
keys (DocumentDictionary dict) =
    Dict.keys dict


values : DocumentDictionary -> List String
values (DocumentDictionary dict) =
    Dict.values dict |> List.map .id |> List.map String.fromInt


get : String -> DocumentDictionary -> Maybe Document
get key (DocumentDictionary dict) =
    Dict.get key dict


member : String -> DocumentDictionary -> Bool
member key (DocumentDictionary dict) =
    Dict.member key dict


matchId : Int -> String -> DocumentDictionary -> Bool
matchId id key (DocumentDictionary dict) =
    let
        maybeDocument =
            Dict.get key dict
    in
        case maybeDocument of
            Nothing ->
                False

            Just doc ->
                doc.id == id



-- CMD


putTexMacroDocumentInDictionaryById : Int -> Maybe String -> Cmd DocDictMsg
putTexMacroDocumentInDictionaryById id maybeTokenString =
    let
        ( route, headers ) =
            case maybeTokenString of
                Nothing ->
                    ( "/api/public/documents/" ++ String.fromInt id, [ Http.header "APIVersion" "V2" ] )

                Just tokenString ->
                    ( "/api/documents/" ++ String.fromInt id
                    , [ Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString) ]
                    )
    in
        Http.request
            { method = "Get"
            , headers = headers
            , url = Configuration.backend ++ route
            , body = Http.jsonBody Encode.null
            , expect = Http.expectJson PutDocumentInDictionaryAsTexMacros Document.documentRecordDecoder
            , timeout = Just Configuration.timeout
            , tracker = Nothing
            }


loadTexMacros : Maybe String -> Document -> List String -> DocumentDictionary -> Cmd DocDictMsg
loadTexMacros maybeTokenString document tagList documentDictionary =
    let
        id_ =
            document.texMacroDocumentId

        ( texMacrosPresent, id ) =
            if document.texMacroDocumentId == 0 then
                ( False, 0 )
            else
                let
                    matches =
                        matchId id_ "texmacros" documentDictionary
                in
                    ( matches, id_ )
    in
        case ( texMacrosPresent, id ) of
            ( False, 0 ) ->
                Cmd.none

            ( _, idx ) ->
                putTexMacroDocumentInDictionaryById idx maybeTokenString
