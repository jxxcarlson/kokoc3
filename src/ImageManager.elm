module ImageManager exposing(..)

import Document exposing(Document)
import Dict exposing(Dict)
import Time exposing(Posix)
import Json.Encode as Encode    
import Json.Decode as Decode exposing (at, int, list, string, decodeString, Decoder)
import Json.Decode.Pipeline as JPipeline exposing (required, optional, hardcoded)
import Http

import Configuration
import Utility

type ImageMsg = 
    ReceiveImageList (Result Http.Error (List String))
  | ReceiveImageListReply (Result Http.Error String)


dataStringListDecoder : Decoder (List String)
dataStringListDecoder =
    Decode.field "data" (Decode.list Decode.string)


getImageListRequest : Document -> Http.Request (List String)
getImageListRequest document = 
  Http.request
        { method = "Get"
        , headers =  []  
        , url = Configuration.backend ++ "/api/image_list/" ++ String.fromInt document.id 
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson dataStringListDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }

getImageList : Document -> Cmd ImageMsg 
getImageList document =
    Http.send ReceiveImageList <| getImageListRequest document


processImageListRequest : List String -> Http.Request String
processImageListRequest imageList = 
  Http.request
        { method = "Post"
        , headers =  []    
        , url = "https://knode.work/processImageList.php"
        , body = Http.multipartBody [Http.stringPart "data" (imageListToString imageList)]
        , expect = Http.expectJson stringDecoder
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }

processImageList : List String -> Cmd ImageMsg 
processImageList imageList =
    Http.send ReceiveImageListReply <| processImageListRequest imageList

encodeImageList : List String -> Encode.Value 
encodeImageList imageList = 
  Encode.object [
       ("data", Encode.list Encode.string imageList)
  ]
   
testData = ["https://psurl.s3.amazonaws.com/images/jc/sinc2-bcbf.png","https://psurl.s3.amazonaws.com/images/jc/beats-eca1.png"]

imageListToString : List String -> String 
imageListToString imageList =
  imageList 
    |> String.join(",")
        

stringDecoder : Decoder String
stringDecoder =
    Decode.string
