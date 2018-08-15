module FileUploadCredentials exposing(
      Credentials
    , CredentialsWrapper
    , FileMsg(..)
    , getS3PresignedUrl
    , getS3Credentials
    , fileInfoTestRecord
    , FileData 
    , decodeFileData
    , encodeFileData
    , encodeFileValueWithUrl
    , encodeCredentialsWrapper
  )

import Json.Encode as Encode
import Json.Decode as Decode exposing(field, map2, map7)
import Http 
import Configuration

type FileMsg = 
     ReceivePresignedUrl (Result Http.Error String)
     | ReceiveFileCredentials (Result Http.Error CredentialsWrapper)
  

type alias Credentials =
    { signature : String
    , date : String
    , credential : String
    , algorithm : String
    , policy : String
    , key : String
    , acl : String
    }


type alias CredentialsWrapper =
    { credentials : Credentials
    , url : String
    }


type alias FileData = 
  {   name : String
    , lastModified : Int  
    , webkitRelativePath : String 
    , size : Int  
    , mimetype : String
   }

decodeFileData : Decode.Decoder FileData
decodeFileData =
    Decode.map5 FileData
        (field "name" Decode.string)
        (field "lastModified" Decode.int)
        (field "webkitRelativePath" Decode.string)
        (field "size" Decode.int)
        (field "type" Decode.string)

encodeFileData : FileData -> Encode.Value
encodeFileData fileData =
    Encode.object
        [ 
          ( "name", Encode.string <| fileData.name )
        , ( "lastModified", Encode.int <| fileData.lastModified )
        , ( "webkitRelativePath", Encode.string <| fileData.webkitRelativePath )
        , ( "size", Encode.int <| fileData.size )
        , ( "type", Encode.string <| fileData.mimetype )
        ]

encodeFileValueWithUrl : Encode.Value -> String -> Encode.Value 
encodeFileValueWithUrl value url =
    Encode.object
        [ 
          ( "fileValue", value )
        , ( "url", Encode.string <| url )
        ]

decodeCredentials : Decode.Decoder Credentials
decodeCredentials =
    Decode.map7 Credentials
        (field "x-amz-signature" Decode.string)
        (field "x-amz-date" Decode.string)
        (field "x-amz-credential" Decode.string)
        (field "x-amz-algorithm" Decode.string)
        (field "policy" Decode.string)
        (field "key" Decode.string)
        (field "acl" Decode.string)
 
        
decodeCredentialsWrapper : Decode.Decoder CredentialsWrapper
decodeCredentialsWrapper =
    Decode.map2 CredentialsWrapper
        (field "credentials" decodeCredentials)
        (field "url" Decode.string)

encodeCredentials : Credentials -> Encode.Value
encodeCredentials credentials =
    Encode.object
        [ 
          ( "signature", Encode.string <| credentials.signature )
        , ( "date", Encode.string <| credentials.date )
        , ( "credential", Encode.string <| credentials.credential )
        , ( "algorithm", Encode.string <| credentials.algorithm )
        , ( "policy", Encode.string <| credentials.policy )
        , ( "key", Encode.string <| credentials.key )
        , ( "acl", Encode.string <| credentials.acl )
        ]


encodeCredentialsWrapper : CredentialsWrapper -> Encode.Value 
encodeCredentialsWrapper credentialsWrapper =
    Encode.object
        [ 
          ( "credentials", encodeCredentials credentialsWrapper.credentials )
        , ( "url", Encode.string <| credentialsWrapper.url )
        ]


type alias FileInfo = 
  {   filename : String
    , mimetype : String
    , bucket : String
    , path : String
  }

fileInfoTestRecord = 
  {
        filename = "foo.jpg"
      , mimetype = "image/jpeg"
      , bucket = "noteimages"
      , path = "bar"
  }

queryStringFromFileInfo : FileInfo -> String 
queryStringFromFileInfo fileInfo =
  [    
       "filename=" ++ fileInfo.filename
        , "mimetype=" ++ fileInfo.mimetype
        , "bucket=" ++ fileInfo.bucket
        , "path=" ++ fileInfo.path
  ] |> String.join "&" |> (\x -> "?" ++ x)



getS3PresignedUrlRequest : String -> String -> String -> Http.Request String
getS3PresignedUrlRequest tokenString bucket path = 
    Http.request
        { method = "Get"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/presigned" ++ "?bucket=" ++ bucket ++ "&path=" ++ path
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson Decode.string
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }

getS3PresignedUrl : String -> String -> String -> Cmd FileMsg 
getS3PresignedUrl tokenString bucket path =
    Http.send ReceivePresignedUrl <| getS3PresignedUrlRequest tokenString bucket path


getS3CredentialsRequest : String -> FileInfo -> Http.Request CredentialsWrapper
getS3CredentialsRequest tokenString fileInfo = 
    Http.request
        { method = "Get"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/credentials" ++ (queryStringFromFileInfo fileInfo)
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson decodeCredentialsWrapper
        , timeout = Just Configuration.timeout
        , withCredentials = False
        }

getS3Credentials : String -> FileInfo -> Cmd FileMsg 
getS3Credentials tokenString fileInfo =
    Http.send ReceiveFileCredentials <| getS3CredentialsRequest tokenString fileInfo


-- ELLIE ADAPTED FROM @ILIAS: https://ellie-test-19-cutover.now.sh/YmXW6MBCmBa1
-- https://ellie-test-19-cutover.now.sh/Yn444vwKpFa1 (0.19 drag/drop)

-- Maybe do more on the backend with this:  https://github.com/handnot2/sigaws
--                                       :  https://hexdocs.pm/sigaws/Sigaws.html

-- S3 uploads with JS:  https://chrisguitarguy.com/2018/06/16/s3-javascript-uploads/
-- GITHUB REPO:         https://github.com/chrisguitarguy/s3-uploads-example

-- AWS DOCS   :         https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html



 -- ## BUCKET PERMISSIONS: https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-2


 
--   ANOMYMOUS USER READ PERMISSION:

--         {
--             "Version":"2012-10-17",
--             "Statement":[
--                 {
--                 "Sid":"AddPerm",
--                 "Effect":"Allow",
--                 "Principal": "*",
--                 "Action":["s3:GetObject"],
--                 "Resource":["arn:aws:s3:::examplebucket/*"]
--                 }
--             ]
--         }
 
 
--   ## Examples
--   ##  ExAws.S3.list_objects("noteimages")  |> ExAws.request(region: "us-east-1")

--   ## iex(3)> ExAws.Config.new(:s3) |> ExAws.S3.presigned_url(:put, "noteimages", "foo.jpg")
--   ## {:ok,
--   ## "https://s3.amazonaws.com/noteimages/foo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJQYJYCIAWH6DGHIQ%2F20180807%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180807T232859Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=14fcb5ef6f845ce95e3a22beb92a663e001c4bad698f41ecea1885360516adf2"}
  
-- DATA URI: https://humanwhocodes.com/blog/2009/10/27/data-uris-explained/

-- DATA URI TO BLOB: https://gist.github.com/davoclavo/4424731

-- Leif Batterman: https://gist.github.com/battermann/dbef69061ec22f4063d0a7bb9f749fd9

-- Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

-- Filereader: http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api

-- Ports and files in Elm: https://www.paramander.com/blog/using-ports-to-deal-with-files-in-elm-0-17

-- 0.19 DROP ZONE: https://ellie-test-19-cutover.now.sh/Yn444vwKpFa1