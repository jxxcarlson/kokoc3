module View.View exposing (view)

import AppUtility
import BigEditRecord
import Browser.Dom exposing (Viewport)
import Utility
import Configuration
import Document exposing (DocMsg(..), DocType(..), Document, TextType(..))
import DocumentDictionary
import DocumentList exposing (DocListMsg(..))
import DocumentListView exposing (DocListViewMsg(..))
import DocumentView
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Element.Lazy
import Html exposing (Html)
import Html.Attributes exposing (src, type_, value, style)
import Html.Events exposing (on)
import Json.Decode as Decode exposing (Decoder, Value)
import Json.Encode as Encode
import Spinner
import Color exposing (Color)
import Model
    exposing
        ( AppMode(..)
        , DeleteDocumentState(..)
        , Model
        , Msg(..)
        , SignupMode(..)
        , ToolMenuState(..)
        , ToolPanelState(..)
        , PrintState(..)
        )
import OnClickOutside
import Time
import User exposing (BigUser, Token, User, UserMsg(..), readToken, stringFromMaybeToken)
import View.Admin as Admin
import View.Author as Author
import View.Image as Image
import View.Phone exposing (phoneView)
import View.Reader as Reader
import View.Widget as Widget exposing (..)
import View.Writer as Writer
import VirtualDom exposing (Handler(..))
import Bozo.View


view : Model -> Html Msg
view model =
    case (currentDevice model.viewport).class of
        Phone ->
            phoneView model

        _ ->
            nonPhoneView model


myFocusStyle =
    { borderColor = Nothing, backgroundColor = Nothing, shadow = Nothing }


nonPhoneView : Model -> Html Msg
nonPhoneView model =
    Element.layoutWith { options = [ focusStyle myFocusStyle ] } [ Font.size 14, width fill, height fill, clipY ] <|
        -- Element.layout [ Font.size 14, width fill, height fill, clipY ] <|
        Element.column [ width fill, height (px model.windowHeight) ]
            [ header model
            , body model
            , footer model
            ]


header : Model -> Element Msg
header model =
    Element.row [ width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0, spacing 10, alignLeft ]
        [ Element.row [ spacing 10 ]
            [ searchInput model
            , getRandomDocumentsButton (px 70) model
            , spacer 8
            , startButton (px 90) model
            , spacer 8
            , homeButton (px 55) model
            , spacer 11
            , readerModeButton (px 50) model
            , writerModeButton (px 48) model
            , imageModeButton (px 56) model
            ]
        , authorDisplayModeButton (px 62) model
        , spacer 10
        , viewUserManualLink
        , spacer 10
        , Reader.signoutButton (px 70) model
        , adminModeButton (px 70) model
        , toolMenu model
        ]


body : Model -> Element Msg
body model =
    case model.appMode of
        Reading ->
            Reader.view model

        Writing ->
            Writer.view model

        ImageEditing ->
            Image.view model

        Admin ->
            Admin.view model

        DisplayAuthors ->
            Author.view model


footer : Model -> Element Msg
footer model =
    Element.row [ moveUp 8, spacing 15, width fill, Background.color Widget.grey, height (px 40), paddingXY 20 0 ]
        [ Element.el [ width (px 240), Font.family [ Font.typeface "Courier", Font.monospace ] ] (text model.message)
        , Element.el [ documentDirtyIndicator model, padding 5 ] (text ("id " ++ String.fromInt model.currentDocument.id))
        , Element.el [] (text <| docInfo model.currentDocument)

        --  testButton model
        -- model printDocumentButton
        , alwaysShow model (makePdfButton (px 90))
        , alwaysShow model (downloadArchiveButton (px 90))
        , printSpinner model
        , printPDFButton model
        , exportDocumentlLink model
        , getAuthorsDocumentsButton (px 110) model

        -- , Element.el [] (text <| currentDeviceString model.viewport)
        , Element.el [] (text <| Configuration.client)

        -- , Element.el [] (text <| "access: " ++ (Document.accessDictToString model.currentDocument.access))
        -- , Element.el [] (text <| viewportInfo model)
        -- , Element.map Bozo Bozo.View.buttonUp
        -- , Element.map Bozo Bozo.View.buttonDown
        -- , Bozo.View.view model.bozo
        --  , Element.el [] (text <| "TMX: " ++ (String.fromInt <| String.length <| model.texMacros))
        -- , Element.el [] (text <| timeString model.zone model.time)
        , Element.el [] (text <| expiratonTimeString model.zone model.maybeCurrentUser)
        , expirationTimeIntervalElement model.time model.maybeCurrentUser
        , Element.el [] (text <| mdloaded model)

        -- , Element.el [] (text <| "Print: " ++ model.printReference)
        -- , Element.el [] (text <| "E: " ++ (String.fromInt (expirationInt model.time model.maybeCurrentUser)))
        ]


mdloaded model =
    case model.masterDocLoaded of
        True ->
            "Master: loaded"

        False ->
            "Master: not loaded"


printSpinner : Model -> Element msg
printSpinner model =
    case model.printState of
        NothingToPrint ->
            Element.none

        PdfReadyToPrint ->
            Element.el [ moveDown 20 ] <|
                Element.html <|
                    Html.div
                        [ style "width" "40px", style "height" "40px" ]
                        [ Spinner.view spinnerConfig model.spinner ]


spinnerConfig : Spinner.Config
spinnerConfig =
    { lines = 8
    , length = 10
    , width = 4
    , radius = 6
    , scale = 1
    , corners = 1
    , opacity = 0.5
    , rotate = 0
    , direction = Spinner.Clockwise
    , speed = 1
    , trail = 60
    , translateX = 50
    , translateY = 0
    , shadow = True
    , hwaccel = False
    , color = always Color.black
    }


printPDFButton model =
    case model.currentDocument.textType of
        MiniLatex ->
            if model.printReference == "" then
                Element.none
            else
                Element.newTabLink []
                    { url = printUrl model.printReference
                    , label =
                        Element.el
                            []
                            (printPDFButton2 model)
                    }

        _ ->
            Element.none


printPDFButton2 model =
    Element.map DocMsg <|
        Input.button (Widget.buttonStyleWithColor (rgb255 150 0 0) (px 50))
            { onPress = Just ResetPrintState
            , label = Element.el [] (Element.text "Print")
            }


printPDFStyle model =
    case model.printState of
        PdfReadyToPrint ->
            [ padding 4
            , Font.color <| rgb255 255 255 255
            , Background.color <| rgb255 140 0 0
            ]

        NothingToPrint ->
            [ padding 4
            , Font.color <| rgb255 255 255 255
            , Background.color <| rgb255 80 80 80
            ]


printUrl : String -> String
printUrl printReference =
    Configuration.backend ++ "/print/pdf/" ++ printReference


uname model =
    case model.maybeCurrentUser of
        Nothing ->
            "No user"

        Just user ->
            User.username user


timeString : Time.Zone -> Time.Posix -> String
timeString zone time =
    Utility.dateString zone time ++ " " ++ (time |> Utility.toLocalTimeString zone)


expirationTimeIntervalElement : Time.Posix -> Maybe User -> Element msg
expirationTimeIntervalElement currentTime maybeUser =
    let
        t =
            expirationIntervalMillis currentTime maybeUser

        minutes =
            round <| (toFloat t) / (1000 * 60)

        hours =
            (toFloat t) / (1000 * 60 * 60)
    in
        if minutes > 60 then
            Element.el [] (text <| "(" ++ String.fromFloat (round2 hours) ++ " hrs)")
        else
            Element.el [ Font.bold, Font.color (rgb 255 0 0) ] (text <| "(" ++ (minutes |> String.fromInt) ++ " min)")


expiratonTimeString : Time.Zone -> Maybe User -> String
expiratonTimeString zone maybeUser =
    case maybeUser of
        Nothing ->
            "No user"

        Just user ->
            let
                expiration =
                    (User.exp user)
                        |> (\t -> t * 1000)
                        |> Time.millisToPosix
            in
                "Session expires: " ++ Utility.shortDateString zone expiration ++ " " ++ (expiration |> Utility.toLocalHourMinuteString zone)


expirationIntervalMillis : Time.Posix -> Maybe User -> Int
expirationIntervalMillis currentTime maybeUser =
    case maybeUser of
        Nothing ->
            -1

        Just user ->
            let
                expirationMillis =
                    (User.exp user) * 1000

                currentTimeMillis =
                    Time.posixToMillis currentTime
            in
                expirationMillis - currentTimeMillis


expirationIntervalString : Time.Posix -> Maybe User -> String
expirationIntervalString currentTime maybeUser =
    let
        t =
            expirationIntervalMillis currentTime maybeUser

        minutes =
            round <| (toFloat t) / (1000 * 60)

        hours =
            (toFloat t) / (1000 * 60 * 60)
    in
        if minutes > 60 then
            String.fromFloat (round2 hours) ++ " hours"
        else
            (minutes |> String.fromInt) ++ " min"


round2 : Float -> Float
round2 x =
    x
        |> (\u -> 10 * u)
        |> round
        |> toFloat
        |> (\u -> u / 10)



-- 60 * 60 * 1000


viewportInfo : Model -> String
viewportInfo model =
    case model.viewPortOfEditorText of
        Nothing ->
            "--"

        Just vp ->
            let
                x =
                    vp.viewport.x |> String.fromFloat

                y =
                    vp.viewport.y |> String.fromFloat

                h =
                    vp.viewport.height |> String.fromFloat

                w =
                    vp.viewport.width |> String.fromFloat

                sw =
                    vp.scene.width |> String.fromFloat

                sh =
                    vp.scene.height |> String.fromFloat
            in
                "y = " ++ y ++ ", h = " ++ h ++ ", sh = " ++ sh


yCoordinateForRenderedText : Model -> Float
yCoordinateForRenderedText model =
    case model.viewPortOfRenderedText of
        Nothing ->
            0

        Just viewport ->
            viewport.viewport.y


showMaybeUser : Maybe User -> String
showMaybeUser maybeUser =
    case maybeUser of
        Nothing ->
            "No User"

        Just user ->
            User.username user


deviceClassString : DeviceClass -> String
deviceClassString deviceClass =
    case deviceClass of
        Phone ->
            "phone"

        Tablet ->
            "tablet"

        Desktop ->
            "desktop"

        BigDesktop ->
            "big desktop"


currentDevice : Viewport -> Device
currentDevice viewport =
    let
        width =
            viewport.viewport.width

        height =
            viewport.viewport.height
    in
        classifyDevice { width = round width, height = round height }


currentDeviceString : Viewport -> String
currentDeviceString viewport =
    viewport
        |> currentDevice
        |> .class
        |> deviceClassString


spacer : Int -> Element msg
spacer width_ =
    Element.el [ width (px width_) ] (Element.text "")


{-| Not currently used.
-}
documentDictionaryInfo : Model -> String
documentDictionaryInfo model =
    let
        k =
            model.documentDictionary |> DocumentDictionary.keys |> String.join ","

        v =
            model.documentDictionary |> DocumentDictionary.values |> String.join ","
    in
        k ++ ":: " ++ v


documentDirtyIndicator : Model -> Attr decorative msg
documentDirtyIndicator model =
    case model.currentDocumentDirty of
        False ->
            Background.color Widget.indicatorGood

        True ->
            Background.color Widget.indicatorBad



-- OUTPUTS


label : Int -> String -> Element msg
label fontSize str =
    Element.el [ Font.size fontSize, Font.bold ] (text str)



-- INPUTS


searchInput : Model -> Element Msg
searchInput model =
    Input.text
        ([ htmlAttribute (Html.Attributes.id "search-box")
         , width (px 360)
         , height (px 30)
         , Font.color black
         ]
            ++ OnClickOutside.withIdElement "search-box" UserClicksOutsideSearchBox
        )
        { text = model.searchQueryString
        , placeholder = Just (Input.placeholder [ moveUp 5 ] (text <| searchPlaceHolderText model))
        , onChange = \str -> AcceptSearchQuery str
        , label = Input.labelLeft [ Font.size 14, Font.bold ] (text "")
        }


searchPlaceHolderText : Model -> String
searchPlaceHolderText model =
    case model.appMode of
        ImageEditing ->
            "Example: type 'aust', press Enter"

        DisplayAuthors ->
            "Example: type 'fred' or 'physics', press Enter"

        Admin ->
            "Example: type 'alpha' or 'physics', press Enter"

        _ ->
            "Example: type 'quantum', press Enter"



-- BUTTONS AND LINKS


prepareImagesButton : Model -> Element Msg
prepareImagesButton model =
    Input.button (Widget.buttonStyle (px 115))
        { onPress = Just Test
        , label = Element.el [] (Element.text "Prepare Images")
        }


testButton : Model -> Element Msg
testButton model =
    Input.button (Widget.buttonStyle (px 115))
        { onPress = Just Test
        , label = Element.el [] (Element.text "Test")
        }


viewUserManualLink : Element msg
viewUserManualLink =
    Element.link []
        { url = Configuration.client ++ "/" ++ String.fromInt Configuration.userManualId
        , label = Element.el [ Font.bold ] (text "Manual")
        }


exportDocumentlLink : Model -> Element Msg
exportDocumentlLink model =
    case model.currentDocument.textType of
        MiniLatex ->
            case model.maybeCurrentUser of
                Nothing ->
                    Element.none

                Just user ->
                    case User.userId user == model.currentDocument.authorId of
                        False ->
                            Element.none

                        True ->
                            exportDocumentButton (px 90) model

        _ ->
            Element.none



-- Widget.linkButtonFat (exportUrl model.currentDocument) "Export" (px 60)


exportDocumentButton : Length -> Model -> Element Msg
exportDocumentButton width_ model =
    Element.map DocMsg <|
        Input.button (buttonStyle width_)
            { onPress = Just ExportLatex
            , label = Element.el [] (Element.text "Export")
            }


makePdfButton : Length -> Model -> Element Msg
makePdfButton width_ model =
    case model.currentDocument.textType of
        MiniLatex ->
            Element.map DocMsg <|
                Input.button (buttonStyle width_)
                    { onPress = Just PrintToPdf
                    , label = Element.el [] (Element.text "Make PDF")
                    }

        _ ->
            Element.none

downloadArchiveButton : Length -> Model -> Element Msg
downloadArchiveButton width_ model =
    case model.currentDocument.textType of
        MiniLatex ->
            Element.map DocMsg <|
                Input.button (buttonStyle width_)
                    { onPress = Just DownloadArchive
                    , label = Element.el [] (Element.text "Archive")
                    }

        _ ->
            Element.none



modeButtonStyle appMode buttonMode width_ =
    case appMode == buttonMode of
        True ->
            buttonStyleWithColor Widget.darkRed width_

        False ->
            buttonStyleWithColor Widget.blue width_


basicButton : List (Attribute msg) -> String -> msg -> Element msg
basicButton style_ label_ msg =
    Input.button style_
        { onPress = Just msg
        , label = Element.el [] (Element.text label_)
        }


xbutton : Model -> List (Attribute msg) -> String -> msg -> Element msg
xbutton model style_ label_ msg =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just _ ->
            Input.button style_
                { onPress = Just msg
                , label = Element.el [] (Element.text label_)
                }


getRandomDocumentsButton : Length -> Model -> Element Msg
getRandomDocumentsButton width_ model =
    Input.button (buttonStyle width_)
        { onPress = Just (randomItemMsg model)
        , label = Element.el [] (Element.text "Random")
        }


randomItemMsg : Model -> Msg
randomItemMsg model =
    case model.appMode of
        ImageEditing ->
            GetImages "random=yes"

        _ ->
            GetPublicDocumentsRawQuery "random=public"


getAuthorsDocumentsButton : Length -> Model -> Element Msg
getAuthorsDocumentsButton width_ model =
    if model.currentDocument.id > 0 then
        getAuthorsDocumentsButton_ width_ model
    else
        Element.none


getAuthorsDocumentsButton_ : Length -> Model -> Element Msg
getAuthorsDocumentsButton_ width_ model =
    let
        authorname =
            model.currentDocument.authorName
    in
        case authorname == "" of
            True ->
                Element.none

            False ->
                case authorname == User.usernameFromMaybeUser model.maybeCurrentUser of
                    False ->
                        Input.button (buttonStyle width_ ++ [ Font.center ])
                            { onPress = Just (GetPublicDocumentsRawQuery ("authorname=" ++ authorname ++ "&sort=title"))
                            , label = Element.el [] (Element.text authorname)
                            }

                    True ->
                        Element.map DocListMsg <|
                            Input.button (buttonStyle width_ ++ [ Font.center ])
                                { onPress = Just (GetUserDocuments ("authorname=" ++ authorname ++ "&sort=title" ++ "&docs=any"))
                                , label = Element.el [] (Element.text authorname)
                                }


{-| Not used.
-}
saveCurrentDocumentButton : Length -> Model -> Element Msg
saveCurrentDocumentButton width_ model =
    Element.map DocMsg <|
        xbutton model (buttonStyle width_) "Save" (SaveCurrentDocument (Time.millisToPosix 10))


startButton : Length -> Model -> Element Msg
startButton width_ model =
    Input.button (titleButtonStyle width_)
        { onPress = Just GoToStart
        , label = Element.el [ width (px 60) ] (Element.text "kNode")
        }


homeButton : Length -> Model -> Element Msg
homeButton width_ model =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just _ ->
            Input.button (buttonStyle width_)
                { onPress = Just GoHome
                , label = Element.el [] (Element.text "Home")
                }


readerModeButton : Length -> Model -> Element Msg
readerModeButton width_ model =
    Input.button (modeButtonStyle model.appMode Reading width_)
        { onPress = Just (ChangeMode Reading)
        , label = Element.el [] (Element.text "Read")
        }


writerModeButton : Length -> Model -> Element Msg
writerModeButton width_ model =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just _ ->
            Input.button (modeButtonStyle model.appMode Writing width_)
                { onPress = Just (ChangeMode Writing)
                , label = Element.el [] (Element.text "Write")
                }


adminModeButton : Length -> Model -> Element Msg
adminModeButton width_ model =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just user ->
            case User.username user == Configuration.adminUsername of
                False ->
                    Element.none

                True ->
                    Input.button (modeButtonStyle model.appMode Admin width_)
                        { onPress = Just (ChangeMode Admin)
                        , label = Element.el [] (Element.text "Admin")
                        }


imageModeButton : Length -> Model -> Element Msg
imageModeButton width_ model =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just user ->
            Input.button (modeButtonStyle model.appMode ImageEditing width_)
                { onPress = Just (ChangeMode ImageEditing)
                , label = Element.el [] (Element.text "Image")
                }


authorDisplayModeButton : Length -> Model -> Element Msg
authorDisplayModeButton width_ model =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just user ->
            Input.button (modeButtonStyle model.appMode DisplayAuthors width_)
                { onPress = Just (ChangeMode DisplayAuthors)
                , label = Element.el [] (Element.text "Authors")
                }


alwaysShow : Model -> (Model -> Element Msg) -> Element Msg
alwaysShow model element =
    element model


neverShow : Model -> (Model -> Element Msg) -> Element Msg
neverShow model element =
    Element.none


ifAdmin : Model -> (Model -> Element Msg) -> Element Msg
ifAdmin model element =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just user ->
            case User.username user == Configuration.adminUsername of
                False ->
                    Element.none

                True ->
                    element model


ifNotAdmin : Model -> (Model -> Element Msg) -> Element Msg
ifNotAdmin model element =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just user ->
            case User.username user == Configuration.adminUsername of
                False ->
                    element model

                True ->
                    Element.none


printDocumentButton model =
    case model.currentDocument.id > 0 of
        True ->
            printButton model

        False ->
            Element.none


printButton model =
    case model.currentDocument.textType of
        MiniLatex ->
            printLatexButton model

        _ ->
            Widget.linkButtonFat (Document.printReference model.currentDocument) "Print" (px 45)


printLatexButton : Model -> Element Msg
printLatexButton model =
    Element.map DocMsg <|
        Input.button (Widget.buttonStyle (px 45))
            { onPress = Just PrintDocument
            , label = Element.el [] (Element.text "Print")
            }



-- STRING HELPERS


appTitle : AppMode -> String
appTitle appMode =
    case appMode of
        Admin ->
            "Admin"

        _ ->
            "kNode"


exportUrl : Document -> String
exportUrl document =
    Configuration.backend ++ "/export/documents/" ++ String.fromInt document.id


access : Document -> String
access doc =
    case doc.public of
        True ->
            "public"

        False ->
            "private"


docInfo : Document -> String
docInfo document =
    let
        wordCount =
            String.fromInt (Document.wordCount document) ++ " words"

        access_ =
            access document
    in
        "(" ++ access_ ++ ", " ++ wordCount ++ ")"


showKeys : Model -> String
showKeys model =
    DocumentDictionary.keys model.documentDictionary |> String.join ", "



-- INPUTS


toolMenu : Model -> Element Msg
toolMenu model =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just _ ->
            Element.row [ spacing 5, Background.color charcoal, Font.color white, padding 10 ]
                [ Element.el
                    [ Element.below (displayMenuItems model)
                    ]
                    toggleToolMenu
                ]


displayMenuItems : Model -> Element Msg
displayMenuItems model =
    case model.toolMenuState of
        HideToolMenu ->
            Element.none

        ShowToolMenu ->
            Element.column [ moveLeft 10 ]
                [ separator
                , createdRecentlyItem model
                , updatedRecentlyItem model
                , separator
                , randomDocumentItem model
                , goToStartItem
                , homeItem model
                , readerModeItem model
                , writerModeItem model
                , imageModeItem model
                , authorModeItem model
                , separator
                , saveCurrentDocumentItem
                , newStandardDocItem
                , newSampledDocItem
                , newMasterDocItem
                , newSubDocumentItem
                , incrementVersionItem
                , separator
                , fullRenderItem
                , separator
                , toggleEditPanelItem
                , toggleUserPreferencesItem
                , printItem
                ]


separator =
    Element.el (Widget.menuSeparatorStyle (px 160)) (Element.text "———————-———————")


toggleToolMenu =
    Input.button (Widget.menuItemStyle (px 140))
        { onPress = Just ToggleToolMenu
        , label = Element.el [] (Element.text "TOOLS")
        }


saveCurrentDocumentItem : Element Msg
saveCurrentDocumentItem =
    Element.map DocMsg <|
        Input.button (Widget.menuItemStyle (px 160))
            { onPress = Just UpdateCurrentDocument
            , label = Element.el [] (Element.text "Save doc Ctrl-S")
            }


randomDocumentItem : Model -> Element Msg
randomDocumentItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just (randomItemMsg model)
        , label = Element.el [] (Element.text "Random docs Ctrl-/")
        }


createdRecentlyItem : Model -> Element Msg
createdRecentlyItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just GetDocsCreatedRecently
        , label = Element.el [] (Element.text "Recently created Ctrl-[")
        }


updatedRecentlyItem : Model -> Element Msg
updatedRecentlyItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just GetDocsUpdatedRecently
        , label = Element.el [] (Element.text "Recently updated Ctrl-]")
        }


doSearchItem : Element Msg
doSearchItem =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just Search
        , label = Element.el [] (Element.text "Search Enter")
        }


writerModeItem : Model -> Element Msg
writerModeItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just (ChangeMode Writing)
        , label = Element.el [] (Element.text "Write mode Ctrl-W")
        }


readerModeItem : Model -> Element Msg
readerModeItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just (ChangeMode Reading)
        , label = Element.el [] (Element.text "Read mode Ctrl-R")
        }


imageModeItem : Model -> Element Msg
imageModeItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just (ChangeMode ImageEditing)
        , label = Element.el [] (Element.text "Image upload Ctrl-I")
        }


authorModeItem : Model -> Element Msg
authorModeItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just (ChangeMode DisplayAuthors)
        , label = Element.el [] (Element.text "Author list Ctrl-A")
        }


homeItem : Model -> Element Msg
homeItem model =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just GoHome
        , label = Element.el [] (Element.text "Home Ctrl-H")
        }


newStandardDocItem : Element Msg
newStandardDocItem =
    Element.map DocMsg <|
        Input.button (Widget.menuItemStyle (px 160))
            { onPress = Just NewDocument
            , label = Element.el [] (Element.text "New document Ctrl-N")
            }


newSampledDocItem : Element Msg
newSampledDocItem =
    Element.map DocMsg <|
        Input.button (Widget.menuItemStyle (px 160))
            { onPress = Just SampleDocument
            , label = Element.el [] (Element.text "Sample document Ctrl-1")
            }


newSubDocumentItem : Element Msg
newSubDocumentItem =
    Element.map DocMsg <|
        Input.button (Widget.menuItemStyle (px 160))
            { onPress = Just NewChildDocument
            , label = Element.el [] (Element.text "New subdocument Ctrl-J")
            }


newMasterDocItem : Element Msg
newMasterDocItem =
    Element.map DocMsg <|
        Input.button (Widget.menuItemStyle (px 160))
            { onPress = Just NewMasterDocument
            , label = Element.el [] (Element.text "New master doc Ctrl-M")
            }


toggleEditPanelItem : Element Msg
toggleEditPanelItem =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just ToggleToolPanelState
        , label = Element.el [] (Element.text "Edit Tools Ctrl-E")
        }


printItem : Element Msg
printItem =
    Element.map DocMsg <|
        Input.button (Widget.menuItemStyle (px 160))
            { onPress = Just PrintDocument
            , label = Element.el [] (Element.text "Print Ctrl-P")
            }


goToStartItem : Element Msg
goToStartItem =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just GoToStart
        , label = Element.el [] (Element.text "kNode Ctrl-0")
        }


incrementVersionItem : Element Msg
incrementVersionItem =
    Element.map DocMsg <|
        Input.button (Widget.menuItemStyle (px 160))
            { onPress = Just IncrementVersion
            , label = Element.el [] (Element.text "New version")
            }


toggleUserPreferencesItem : Element Msg
toggleUserPreferencesItem =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just TogglePreferencesPanel
        , label = Element.el [] (Element.text "User preferences Ctrl-U")
        }


fullRenderItem : Element Msg
fullRenderItem =
    Input.button (Widget.menuItemStyle (px 160))
        { onPress = Just DoFullRender
        , label = Element.el [] (Element.text "Full Render Ctrl-F")
        }
