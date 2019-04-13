```
type Msg
    = LoadFont (Result String Bytes)

loadFont : Cmd Msg
loadFont =
    Http.request
        { method = "GET"
        , headers = [ Http.header "Accept-Ranges" "bytes" ]
        , url = currentFont.url

        --, url = "../Raleway-v4020-Regular.otf"
        , body = Http.emptyBody
        , expect = Http.expectBytesResponse LoadFont keepBytes
        , timeout = Nothing
        , tracker = Nothing
        }
keepBytes : Http.Response Bytes -> Result String Bytes
keepBytes response =
    case response of
        Http.GoodStatus_ _ bytes ->
            Ok bytes

        _ ->
            Err (Debug.toString response)```
```

jxxcarlson [1:48 PM]
@joelq — great, I will look there.  And @folkertdev, thankyou!!!

folkertdev [1:49 PM]
specifically `Http.expectBytesResponse` will give access to it, and then you have to transform the http response into a result as shown

joelq [1:50 PM]
Looks like requests can have a `bytesBody` or a `fileBody` as their payload (in addition to the more traditional string and JSON options)

## NGINX

Configuration file at `/etc/nginx/nginx.conf`