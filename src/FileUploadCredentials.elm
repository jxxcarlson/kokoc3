module FileUploadCredentials exposing(
      Credentials
    , CredentialsWrapper
    , FileMsg(..)
    , getS3Credentials
    , getS3PresignedUrl
    , fileInfoTestRecord
    , FileData 
    , decodeFileData
    , encodeFileData
  )

import Json.Encode as Encode
import Json.Decode as Decode exposing(field, map2, map7)
import Http 
import Configuration

type FileMsg = 
    ReceiveFileCredentials (Result Http.Error CredentialsWrapper)
    | ReceivePresignedUrl (Result Http.Error String)
  
-- ELLIE ADAPTED FROM @ILIAS: https://ellie-test-19-cutover.now.sh/YmXW6MBCmBa1
-- https://ellie-test-19-cutover.now.sh/Yn444vwKpFa1 (0.19 drag/drop)

-- Maybe do more on the backend with this:  https://github.com/handnot2/sigaws
--                                       :  https://hexdocs.pm/sigaws/Sigaws.html

-- S3 uploads with JS:  https://chrisguitarguy.com/2018/06/16/s3-javascript-uploads/
-- GITHUB REPO:         https://github.com/chrisguitarguy/s3-uploads-example

-- AWS DOCS   :         https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

{-

  ## Examples
  ##  ExAws.S3.list_objects("noteimages")  |> ExAws.request(region: "us-east-1")

  ## iex(3)> ExAws.Config.new(:s3) |> ExAws.S3.presigned_url(:put, "noteimages", "foo.jpg")
  ## {:ok,
  ## "https://s3.amazonaws.com/noteimages/foo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJQYJYCIAWH6DGHIQ%2F20180807%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180807T232859Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=14fcb5ef6f845ce95e3a22beb92a663e001c4bad698f41ecea1885360516adf2"}
  

$.ajax({
  url: presignedUrl, // the presigned URL
  type: 'PUT',
  data: 'data to upload into URL',
  success: function() { console.log('Uploaded data successfully.'); }
});

From koko_client, Image.Upload (using native file module)
We will have to do this on the JS side.

PURE JS HTTP REQUESTS: https://www.kirupa.com/html5/making_http_requests_js.htm
            EXCELLENT:  https://stackoverflow.com/questions/6396101/pure-javascript-send-post-data-without-a-form

multiPartBody : Credentials -> FR.NativeFile -> Http.Body
multiPartBody creds nf =
    Http.multipartBody
        [ stringPart "key" nf.name
        , stringPart "x-amz-algorithm" creds.algorithm
        , stringPart "x-amz-credential" creds.credential
        , stringPart "x-amz-date" creds.date
        , stringPart "policy" creds.policy
        , stringPart "x-amz-signature" creds.signature
        , FR.filePart "file" nf
        ]


uploadRequest : Credentials -> NativeFile -> Request String
uploadRequest creds file =
    Http.request
        { method = "POST"
        , headers = []
        , url = "https://noteimages.s3.amazonaws.com"
        , body = multiPartBody creds file
        , expect = Http.expectString
        , timeout = Nothing
        , withCredentials = False
        }

-}

{-
RESPONSE TO: http://localhost:4000/api/credentials?filename=foo.jpg&mimetype=image/jpeg&bucket=noteimages&path=bar

    {
        "url": "https://noteimages.s3.amazonaws.com",
        "credentials": {
            "x-amz-signature": "3b0297fefc1cad2481d62a3df0535bfca7e20074a3b7989126e3f47b3452a5e0",
            "x-amz-date": "20180805T000000Z",
            "x-amz-credential": "AKIAJQYJYCIAWH6DGHIQ/20180805/us-east-1/s3/aws4_request",
            "x-amz-algorithm": "AWS4-HMAC-SHA256",
            "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wOC0wNVQxODowODoxNloiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJub3RlaW1hZ2VzIn0seyJhY2wiOiJwdWJsaWMtcmVhZCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFKUVlKWUNJQVdINkRHSElRLzIwMTgwODA1L3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWRhdGUiOiIyMDE4MDgwNVQwMDAwMDBaIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCJpbWFnZS9qcGVnIl0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIvanh4Il1dfQ==",
            "key": "/jxx/foo.jpg",
            "acl": "public-read"
        }
    }

-}

{-
    $.ajax({
    url: presignedUrl, // the presigned URL
    type: 'PUT',
    data: 'data to upload into URL',
    success: function() { console.log('Uploaded data successfully.'); }
    });
-}

{-
   http://localhost:4000/api/credentials?filename=foo.jpg&mimetype=image/jpeg&bucket=noteimages&path=bar

  {
    "url": "https://noteimages.s3.amazonaws.com",
    "credentials": {
        "x-amz-signature": "3b0297fefc1cad2481d62a3df0535bfca7e20074a3b7989126e3f47b3452a5e0",
        "x-amz-date": "20180805T000000Z",
        "x-amz-credential": "AKIAJQYJYCIAWH6DGHIQ/20180805/us-east-1/s3/aws4_request",
        "x-amz-algorithm": "AWS4-HMAC-SHA256",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wOC0wNVQxODowODoxNloiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJub3RlaW1hZ2VzIn0seyJhY2wiOiJwdWJsaWMtcmVhZCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFKUVlKWUNJQVdINkRHSElRLzIwMTgwODA1L3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWRhdGUiOiIyMDE4MDgwNVQwMDAwMDBaIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCJpbWFnZS9qcGVnIl0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIvanh4Il1dfQ==",
        "key": "/jxx/foo.jpg",
        "acl": "public-read"
    }
}
-}

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


getS3CredentialsRequest : String -> FileInfo -> Http.Request CredentialsWrapper
getS3CredentialsRequest tokenString fileInfo = 
    Http.request
        { method = "Get"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/credentials" ++ (queryStringFromFileInfo fileInfo)
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson decodeCredentialsWrapper
        , timeout = Just 5000
        , withCredentials = False
        }

getS3Credentials : String -> FileInfo -> Cmd FileMsg 
getS3Credentials tokenString fileInfo =
    Http.send ReceiveFileCredentials <| getS3CredentialsRequest tokenString fileInfo


getS3PresignedUrlRequest : String -> String -> String -> Http.Request String
getS3PresignedUrlRequest tokenString bucket path = 
    Http.request
        { method = "Get"
        , headers = [Http.header "APIVersion" "V2", Http.header "Authorization" ("Bearer " ++ tokenString)]
        , url = Configuration.backend ++ "/api/presigned" ++ "?bucket=" ++ bucket ++ "&path=" ++ path
        , body = Http.jsonBody Encode.null
        , expect = Http.expectJson Decode.string
        , timeout = Just 5000
        , withCredentials = False
        }

getS3PresignedUrl : String -> String -> String -> Cmd FileMsg 
getS3PresignedUrl tokenString bucket path =
    Http.send ReceivePresignedUrl <| getS3PresignedUrlRequest tokenString bucket path
