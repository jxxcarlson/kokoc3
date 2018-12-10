module ImageManager exposing (ImageMsg(..), dataStringListDecoder, encodeImageList, getImageList, imageListToString, processImageList, stringDecoder, testData)

import Configuration
import Dict exposing (Dict)
import Document exposing (Document)
import Http
import Json.Decode as Decode exposing (Decoder, at, decodeString, int, list, string)
import Json.Decode.Pipeline as JPipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode
import Time exposing (Posix)
import Utility


type ImageMsg
    = ReceiveImageList (Result Http.Error (List String))
    | ReceiveImageListReply (Result Http.Error String)


dataStringListDecoder : Decoder (List String)
dataStringListDecoder =
    Decode.field "data" (Decode.list Decode.string)


getImageList : Document -> Cmd ImageMsg
getImageList document =
    Http.request
        { method = "Get"
        , headers = []
        , url = Configuration.backend ++ "/api/image_list/" ++ String.fromInt document.id
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson ReceiveImageList dataStringListDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }


processImageList : List String -> Cmd ImageMsg
processImageList imageList =
    Http.request
        { method = "Post"
        , headers = []
        , url = "https://knode.work/processImageList.php"
        , body = Http.multipartBody [ Http.stringPart "data" (imageListToString imageList) ]
        , expect = Http.expectJson ReceiveImageListReply stringDecoder
        , timeout = Just Configuration.timeout
        , tracker = Nothing
        }


encodeImageList : List String -> Encode.Value
encodeImageList imageList =
    Encode.object
        [ ( "data", Encode.list Encode.string imageList )
        ]


testData =
    [ "https://psurl.s3.amazonaws.com/images/jc/sinc2-bcbf.png", "https://psurl.s3.amazonaws.com/images/jc/beats-eca1.png" ]


imageListToString : List String -> String
imageListToString imageList =
    imageList
        |> String.join ","


stringDecoder : Decoder String
stringDecoder =
    Decode.string
