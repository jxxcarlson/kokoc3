module TarManager
    exposing
        ( expectBytes
        , getImageTask
        , authorityFromUrl
        , extension
        , mimeType
        , saveBytes
        , downloadTarArchiveCmd
        , sendTarArchiveCmd
        , resetTarArchiveCmd
        , s3AdjustUrl
        , simpleFilenameFromUrl
        , shortFilenameFromUrl
        , prepareStringData
        )

import Bytes exposing (Bytes)
import Bytes.Decode exposing (Decoder)
import Bytes.Encode exposing (encode)
import File.Download as Download
import Maybe.Extra
import Url
import Http
import Parser exposing (..)
import Dict exposing (Dict)
import Task exposing (Task)
import Tar exposing (Data(..), FileRecord, defaultFileRecord)
import Document exposing (DocMsg(..))
import Configuration


downloadTarArchiveCmd : List ( String, String ) -> List ( String, Bytes ) -> Cmd DocMsg
downloadTarArchiveCmd stringList dataList =
    let
        data =
            (List.map prepareData dataList) ++ (List.map prepareStringData stringList)

        archive =
            Tar.encodeFiles data |> encode
    in
        saveBytes "archive" archive


sendTarArchiveCmd : String -> List ( String, String ) -> List ( String, Bytes ) -> Cmd DocMsg
sendTarArchiveCmd url stringList dataList =
    let
        data =
            (List.map prepareData dataList) ++ (List.map prepareStringData stringList)

        archive : Bytes
        archive =
            Tar.encodeFiles data |> encode
    in
        Http.request
            { method = "Post"
            , headers = []
            , url = url
            , body = Http.bytesBody "application/tar" archive
            , expect = Http.expectString PrintPdfFile
            , timeout = Nothing
            , tracker = Nothing
            }


resetTarArchiveCmd : String -> Cmd DocMsg
resetTarArchiveCmd printReference =
    let
        url =
            Configuration.backend ++ "/api/print/reset/" ++ printReference
    in
        Http.request
            { method = "Post"
            , headers = []
            , url = url
            , body = Http.emptyBody
            , expect = Http.expectString AcknowledgeTarArchiveReset
            , timeout = Nothing
            , tracker = Nothing
            }


saveBytes : String -> Bytes -> Cmd DocMsg
saveBytes archiveName bytes =
    Download.bytes (archiveName ++ ".tar") "application/x-tar" bytes


prepareStringData : ( String, String ) -> ( FileRecord, Data )
prepareStringData ( name, str ) =
    ( { defaultFileRecord | filename = String.toLower name }, StringData str )


prepareData : ( String, Bytes ) -> ( FileRecord, Data )
prepareData ( url, bytes ) =
    case authorityFromUrl url of
        Nothing ->
            ( defaultFileRecord, BinaryData bytes )

        Just filename ->
            ( { defaultFileRecord | filename = filename }, BinaryData bytes )


getImageTask : String -> Task Http.Error Bytes
getImageTask url_ =
    Http.task
        { method = "get"
        , headers = []
        , url = url_
        , body = Http.emptyBody
        , resolver = Http.bytesResolver bytesResponse
        , timeout = Nothing
        }



--Http.header "User-Agent" "image/*"


bytesResponse : Http.Response Bytes -> Result Http.Error Bytes
bytesResponse response =
    case response of
        Http.BadUrl_ url ->
            Err (Http.BadUrl url)

        Http.Timeout_ ->
            Err Http.Timeout

        Http.NetworkError_ ->
            Err Http.NetworkError

        Http.BadStatus_ metadata body ->
            Err (Http.BadStatus metadata.statusCode)

        Http.GoodStatus_ metadata body ->
            Ok body


expectBytes : (Result Http.Error Bytes -> msg) -> Http.Expect msg
expectBytes toMsg =
    Http.expectBytesResponse toMsg <|
        \response ->
            case response of
                Http.BadUrl_ url ->
                    Err (Http.BadUrl url)

                Http.Timeout_ ->
                    Err Http.Timeout

                Http.NetworkError_ ->
                    Err Http.NetworkError

                Http.BadStatus_ metadata body ->
                    Err (Http.BadStatus metadata.statusCode)

                Http.GoodStatus_ metadata body ->
                    Ok body



--
-- FIlENAME PARSER
--


parse : Parser String
parse =
    succeed identity
        |. oneOf [ symbol "http://", symbol "https://" ]
        |= parseBody


parseBody : Parser String
parseBody =
    getChompedString <|
        succeed ()
            |. chompWhile (\c -> c /= '?')


authorityFromUrl : String -> Maybe String
authorityFromUrl url =
    case run parse url of
        Ok authority ->
            Just authority

        Err _ ->
            Nothing


prefix : String -> String -> Maybe String
prefix separator str =
    String.split separator str
        |> List.head


suffix : String -> String -> Maybe String
suffix separator str =
    String.split separator str
        |> List.reverse
        |> List.head


s3AdjustUrl : String -> Maybe String
s3AdjustUrl url =
    let
        proto =
            Url.fromString url

        host =
            Maybe.map .host proto

        prefix_ =
            Maybe.andThen (prefix ".") host
                |> Maybe.withDefault ""

        path =
            Maybe.map .path proto
                |> Maybe.map (String.dropLeft 1)
    in
        case String.contains ".s3." url of
            False ->
                Just url

            True ->
                let
                    altHost =
                        Maybe.map (String.replace prefix_ "") host
                            |> Maybe.map (String.dropLeft 1)
                in
                    Maybe.map (String.join "/")
                        (Maybe.Extra.combine
                            [ Just "https:/", altHost, Just prefix_, path ]
                        )


simpleFilenameFromUrl : String -> Maybe String
simpleFilenameFromUrl url =
    Maybe.map .path (Url.fromString url)
        |> Maybe.map (String.dropLeft 1)
        |> Maybe.andThen (suffix "/")


shortFilenameFromUrl : String -> String
shortFilenameFromUrl url =
    case simpleFilenameFromUrl url of
        Nothing ->
            "https://image/" ++ url

        Just url_ ->
            "https://image/" ++ url_



-- https://psurl.s3.amazonaws.com/images/jc/sinc2-bcbf.png


{-| Filename.extension "<http://foo.a.jpg"> == Just "jpg" : Maybe String
Filename.extension "<http://foo"> == Nothing
-}
extension : String -> Maybe String
extension str =
    str
        |> authorityFromUrl
        |> Maybe.map (String.split ".")
        |> Maybe.map List.reverse
        |> Maybe.andThen filter
        |> Maybe.andThen List.head


filter : List String -> Maybe (List String)
filter list =
    if List.length list < 2 then
        Nothing
    else
        Just list


mimeTypeDict =
    Dict.fromList
        [ ( "png", "image/png" )
        , ( "jpg", "image/jpeg" )
        , ( "jpeg", "image/jpeg" )
        , ( "gif", "image/gif" )
        , ( "svg", "image/svg+xml" )
        ]


{-| Filename.mimeType "<http://foo.a.jpg"> == Just "image/jpeg"
Filename.mimeType "<http://foo.a.yak"> ==nNothing
-}
mimeType : String -> Maybe String
mimeType url =
    url
        |> extension
        |> Maybe.andThen (\x -> Dict.get x mimeTypeDict)
