module View.Image exposing(view)

import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Html exposing(Html)
import Html.Attributes exposing(src, type_, value)
import Html.Events exposing(on) 
import Json.Encode as Encode
import Json.Decode as Decode exposing(Decoder, Value)


import Model exposing(Model, Msg(..), ImageMode(..), ImageAccessibility(..))
import User exposing(Token, UserMsg(..), readToken, stringFromMaybeToken, User, BigUser)
import FileUploadCredentials as Credentials exposing(FileData, Image)
import Configuration
import AppUtility
import View.Widget as Widget 


view : Model -> Element Msg
view model = 
  Element.row [width fill, height (px (model.windowHeight - 70)), Background.color Widget.white, centerX] [
     imageLeftColumn 2 model,  imageCenterColumn model.windowHeight 7 model, imageRightColumn 2 model
  ]

imageLeftColumn : Int -> Model -> Element Msg
imageLeftColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, 
    Background.color Widget.lightBlue, paddingXY 20 20, spacing 10] [ 
        imageCatalogueLink model
      , Element.el [] (Element.text <| "Images: " ++ (String.fromInt <| List.length model.imageList))
      , viewImages model.imageList
       
  ]

imageCenterColumn : Int -> Int -> Model -> Element Msg
imageCenterColumn windowHeight_ portion_  model  = 
  Element.column [width (fillPortion portion_), height (px (windowHeight_ - 73))
    , Background.color Widget.veryDarkGrey 
    , centerX, centerY
    ] [ loadOrViewImage model ]

loadOrViewImage : Model -> Element Msg
loadOrViewImage model = 
  case model.imageMode of 
    LoadImage ->  viewImageToUpload model
    ViewImage -> viewLargeImage model 



imageRightColumn : Int -> Model -> Element Msg
imageRightColumn portion_ model = 
  Element.column [width (fillPortion portion_), height fill, Background.color Widget.lightBlue, centerX] [
      
  ]

viewImages : List Image -> Element Msg 
viewImages imageList = 
  Element.column [spacing 20, scrollbarY] (List.map viewImage imageList)

viewImage : Image -> Element Msg 
viewImage image = 
  Element.column [spacing 5] [
    Element.image  [width (px 250)] {
      src = image.url
    , description = image.name
    }
    -- , Element.el [] (Element.text image.url)
    -- , Element.el [Font.bold] (Element.text image.name)
    , selectImageButton image
  ]

selectImageButton : Image -> Element Msg 
selectImageButton image = 
    Input.button (Widget.squareButtonStyle  (px 250)) {
      onPress =  Just (SelectImage image)
    , label = Element.el [] (Element.text image.name)
    }


imageCatalogueLink : Model -> Element msg   
imageCatalogueLink model = 
  case model.maybeCurrentUser of  
    Nothing -> Element.none 
    Just user ->
      case User.userId user == model.currentDocument.authorId of 
        False -> Element.none 
        True -> 
          Element.newTabLink [] { 
              url = Configuration.backend ++ "/imagecatalogue/documents/" ++ String.fromInt  model.currentDocument.id  
            , label = Element.paragraph [Font.color Widget.blue, width (px 200)] [text <| "Images for " ++ model.currentDocument.title]
          }


-- IMAGE

viewImageToUpload_ : Model -> Html Msg
viewImageToUpload_ model =
    Html.div [ 
               Html.Attributes.style "padding" "30px"
             , Html.Attributes.style "background-color" "303030"
             , Html.Attributes.style "width" "100%"
             , Html.Attributes.style "height" "100%"
             , Html.Attributes.style "overflow" "scroll"
             , Html.Attributes.style "padding-bottom" "50px"
             ]
        [    Html.p [Html.Attributes.style "color" "white", Html.Attributes.style "font-size" "24pt"] [Html.text "Image loader"]
            , Html.br [] []
            , Html.br [][]
            , Html.input [ type_ "file", on "change" (decodeNodeFile ReadImage), value ""
                , Html.Attributes.style "margin-left" "4px", Html.Attributes.style "margin-bottom" "10px" ] []
            , Html.pre [Html.Attributes.style "color" "white", Html.Attributes.style "margin-left" "4px"   ] [ Html.text <| imageType model]
            , displayMedia (imageType model) model.maybeImageString (AppUtility.imageUrlAtS3 model)
            , Html.p [Html.Attributes.style "color" "white"] [Html.text <| AppUtility.imageUrlAtS3 model]
            , imageNameInput model
            , Html.br [ ] [ ]
            , Html.br [ ] [ ]
            , toggleImageAccessibilityButton (px 100) model
            , Html.br [ ] [ ]
            , Html.br [ ] [ ]
            , makeImageButton (px 90) model
            , Html.br [ ] [ ]
            , Html.br [ ] [ ]
        ]

viewLargeImage : Model -> Element Msg
viewLargeImage model =  
  case 
    model.maybeCurrentImage of 
      Nothing -> Element.none 
      Just image -> 
          Element.column [spacing 10, padding 40, Background.color Widget.veryDarkGrey, scrollbarY] [
              Element.image  [width (fill)] { 
                src = image.url
              , description = image.name
              }
            , Element.el [Font.color Widget.white] (Element.text image.url)
            , Element.el [Font.color Widget.white] (Element.text image.name)
            , Element.el [Font.color Widget.white] (Element.text <| "id: " ++ (String.fromInt image.id))
            , Element.el [Font.color Widget.white] (Element.text <| "public: " ++ (stringFromBool image.public))
            , Element.el [moveDown 30] (selectImagerLoaderButton model)
            , Element.el [height (px 60), moveDown 50] (Element.text "--")
          
          ]

stringFromBool : Bool -> String 
stringFromBool bool =
  case bool of 
    True -> "yes"
    False -> "no"


displayMedia : String -> Maybe String -> String -> Html Msg  
displayMedia imageType_ maybeData url = 
  case maybeData of 
    Nothing -> 
      Html.p [Html.Attributes.style "color" "white", Html.Attributes.style "margin-left" "4px"   ] 
        [ Html.text <| ""]
    Just data -> 
      case imageType_ of 
        "application/pdf" -> displayPdf data 
        "image/jpeg" -> Html.p [] [ Maybe.map displayImage maybeData |> Maybe.withDefault (Html.text "") ]
        "image/png" -> Html.p [] [ Maybe.map displayImage maybeData |> Maybe.withDefault (Html.text "") ]
        "audio/mpeg" -> displayMpegAudio url
        _ -> Html.pre [] [Html.text "Unrecognized media format"]


displayImage : String -> Html msg
displayImage url =
    Html.img [ src url, Html.Attributes.width 460 ] []

displayMpegAudio : String -> Html msg
displayMpegAudio url =
    Html.audio [ src url, Html.Attributes.controls True] []

displayPdf : String -> Html msg
displayPdf data =
    Html.iframe [ src data, Html.Attributes.width 460, Html.Attributes.height 460 ] []

imageType : Model -> String
imageType model = 
  let 
    imageString = ( model.maybeImageString |> Maybe.withDefault "- no image -" )
    i = (String.indexes ";" imageString) |> List.head |> Maybe.withDefault 0
    imageInfo = String.slice 0 i imageString
  in 
    case String.length imageInfo == 0 of 
      True -> "No image"
      False -> String.dropLeft 5 imageInfo

  
viewImageToUpload : Model -> Element Msg 
viewImageToUpload model = 
  case model.maybeCurrentUser of 
    Nothing -> 
        Element.none
    Just user -> 
        Element.html (viewImageToUpload_ model)


imageNameInput model = 
  Html.input [ Html.Attributes.placeholder "Image name"
     , Html.Attributes.style "background-color" "white"
     , Html.Attributes.style "color" "#333"
     , Html.Attributes.style "width" "200px"
     , Html.Events.onInput AcceptImageName ] []

makeImageButton : Length -> Model -> Html Msg    
makeImageButton width_ model = 
    Html.button [ Html.Events.onClick MakeImage ] [ Html.text "Save image data" ]

toggleImageAccessibilityButton : Length -> Model -> Html Msg    
toggleImageAccessibilityButton width_ model = 
    Html.button [ Html.Events.onClick ToggleImageAccessibility ] [ Html.text (imageAccessibilityButtonTitle model) ]

imageAccessibilityButtonTitle : Model -> String 
imageAccessibilityButtonTitle model = 
  case model.imageAccessibility of 
     PublicImage -> "Public image"
     PrivateImage -> "Private image"


decodeDataTransferFile : (Value -> msg) -> Decoder msg
decodeDataTransferFile toMsg =
    Decode.map toMsg (Decode.at ["dataTransfer", "files", "0"] Decode.value)


decodeNodeFile : (Value -> msg) -> Decoder msg
decodeNodeFile toMsg =
    Decode.map toMsg (Decode.at ["target", "files", "0"] Decode.value)


-- BUTTONS


selectImagerLoaderButton : Model -> Element Msg 
selectImagerLoaderButton model = 
  Input.button (Widget.whiteButtonStyle (px 160)) {
    onPress =  Just SelectImageLoader
  , label = Element.el [] (Element.text ("Image Loader"))
  }
