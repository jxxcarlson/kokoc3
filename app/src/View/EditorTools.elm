module View.EditorTools
    exposing
        ( asciidocLatexTypeButton
        , asciidocTypeButton
        , bodyReaderColumn
        , cancelDeleteCurrentDocumentButton
        , cancelDeleteCurrentDocumentButton_
        , deleteButtonBackgroundColor
        , deleteCurrentDocumentButton
        , deleteDocumentButton
        , displayDocumentList
        , docListTitle
        , documentPanels
        , documentTitleInput
        , documentTypeButtonStyle
        , documentTypePanel
        , elmMarkupTypeButton
        , highLightDocumentType
        , highLightTextType
        , markdownTypeButton
        , masterDocPanel
        , masterDocumentButton
        , miniLatexTypeButton
        , newChildButton
        , newChildButton_
        , newChildButton__
        , newDocumentButton
        , newMasterButton
        , newVersionButton
        , newVersionUrl
        , plainTextTypeButton
        , privateButton
        , publicButton
        , publicControls
        , publicIndicatorColor
        , saveSettingsButton
        , sharingInputPane
        , sharingInputPane_
        , showVersionButton
        , showVersionsUrl
        , standardDocumentButton
        , tagInputPane
        , tagInputPane_
        , textTypeButtonStyle
        , textTypePanel
        , toggleDocumentListDiplayButton
        , toolsOrContents
        , toolsOrContentsForUser
        , toolsOrContentsPublic
        , toolsPanel
        , versionsPanel
        )

import AppUtility
import Browser.Dom exposing (Viewport)
import Configuration
import Document exposing (DocMsg(..), DocType(..), Document, TextType(..))
import DocumentDictionary
import DocumentList
import DocumentListView exposing (DocListViewMsg(..))
import DocumentView
import Element exposing (..)
import Element.Background as Background
import Element.Font as Font
import Element.Input as Input
import Element.Keyed as Keyed
import Html exposing (Html)
import Html.Attributes exposing (src, type_, value)
import Html.Events exposing (on)
import Json.Decode as Decode exposing (Decoder, Value)
import Json.Encode as Encode
import Model
    exposing
        ( AppMode(..)
        , DeleteDocumentState(..)
        , DocumentListSource(..)
        , Model
        , Msg(..)
        , SignupMode(..)
        , ToolPanelState(..)
        )
import Time
import User exposing (BigUser, Token, User, UserMsg(..), readToken, stringFromMaybeToken)
import View.Common as Common
import View.Widget as Widget exposing (..)
import VirtualDom exposing (Handler(..))


toolsOrContents model =
    case model.maybeCurrentUser of
        Nothing ->
            toolsOrContentsPublic model

        Just _ ->
            toolsOrContentsForUser model


toolsOrContentsPublic model =
    Element.map DocListViewMsg
        (DocumentListView.viewWithHeading
            model.windowHeight
            model.masterDocLoaded
            (docListTitle model)
            model.documentList
        )


toolsOrContentsForUser model =
    case model.toolPanelState of
        ShowToolPanel ->
            toolsPanel model

        HideToolPanel ->
            Element.row []
                [ Element.el [ Element.inFront (toggleDocumentListDiplayButton model) ]
                    (displayDocumentList model)
                ]


displayDocumentList : Model -> Element Msg
displayDocumentList model =
    case model.documentListSource of
        SearchResults ->
            Element.map DocListViewMsg
                (DocumentListView.viewWithHeadingShifted
                    (model.windowHeight - 20)
                    model.masterDocLoaded
                    (docListTitle model)
                    model.documentList
                )

        RecentDocumentsQueue ->
            Element.map DocListViewMsg
                (DocumentListView.viewWithHeadingShifted
                    (model.windowHeight - 20)
                    model.masterDocLoaded
                    "Recent documents"
                    (DocumentList.documentQueueToDocumentList model.currentDocument model.recentDocumentQueue)
                )


toggleDocumentListDiplayButton : Model -> Element Msg
toggleDocumentListDiplayButton model =
    Input.button Widget.titleStyle
        { onPress = Just ToggleDocumentSource
        , label = Element.el [] (Element.image [ width (px 30), moveUp 2 ] { src = "https://s3.amazonaws.com/noteimages/jxxcarlson/lazy-s.png", description = "lazy-s" })
        }


docListTitle : Model -> String
docListTitle model =
    let
        documentCount =
            List.length (DocumentList.documents model.documentList)

        firstDocument =
            DocumentList.getFirst model.documentList

        title =
            case firstDocument.docType of
                Standard ->
                    "Search Results"

                Master ->
                    "Contents"
    in
        title ++ " (" ++ String.fromInt documentCount ++ ")"


toolsPanel model =
    Element.column [ spacing 15, padding 10, height shrink, scrollbarY ]
        [ masterDocPanel model
        , coverArtUrlInput model
        , texMacroIdInput model
        , documentPanels model
        , tagInputPane model (px 250) (px 80) "Tags"
        , sharingInputPane model (px 250) (px 80) "Sharing"
        , Element.el [ height (px 20) ] (text "")
        ]


texMacroIdInput : Model -> Element Msg
texMacroIdInput model =
    case model.currentDocument.textType of
        MiniLatex ->
            Element.map DocMsg <|
                Input.text [ htmlAttribute (Html.Attributes.id "texmacroid-input"), width (px 80), height (px 30), Font.color black ]
                    { text = String.fromInt model.currentDocument.texMacroDocumentId
                    , placeholder = Nothing
                    , onChange = \str -> AcceptTexMacroId str
                    , label = Input.labelLeft [ Font.size 14, Font.bold ] (Element.el [ moveDown 8, paddingEach { top = 0, left = 0, right = 8, bottom = 0 } ] (text "TexMacro Id"))
                    }

        _ ->
            Element.none


coverArtUrlInput : Model -> Element Msg
coverArtUrlInput model =
    case model.currentDocument.docType of
        Master ->
            Element.map DocMsg <|
                Input.text [ htmlAttribute (Html.Attributes.id "coverArt-input"), width (px 145), height (px 30), Font.color black ]
                    { text = model.currentDocument.coverArtUrl
                    , placeholder = Nothing
                    , onChange = \str -> AcceptCoverArtUrl str
                    , label = Input.labelLeft [ Font.size 14, Font.bold ] (Element.el [ moveDown 8, paddingEach { top = 0, left = 0, right = 8, bottom = 0 } ] (text "Cover art URL"))
                    }

        _ ->
            Element.none


versionsPanel model =
    Element.column [ width <| px 55, height <| px 90, spacingXY 12 6, padding 8, Background.color blue ]
        [ Element.el [ Font.bold, Font.color (rgb255 200 200 200) ] (text <| "v: " ++ String.fromInt model.currentDocument.version)
        , Element.column []
            [ Element.el [ moveLeft 0 ] (showVersionButton model)
            , Element.el [ moveLeft 22 ] (newVersionButton model)
            ]
        ]


tagInputPane model width_ height_ label_ =
    Element.map DocMsg <|
        Element.column []
            [ Element.el [ Font.bold ] (text label_)
            , tagInputPane_ model width_ height_ label_
            ]


tagInputPane_ model width_ height_ label_ =
    Keyed.row []
        [ ( String.fromInt model.counter
          , Input.multiline
                [ width width_, height height_, padding 10, scrollbarY ]
                { onChange = AcceptDocumentTagString
                , text = model.currentDocument.tags |> String.join ", "
                , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]


sharingInputPane model width_ height_ label_ =
    Element.column []
        [ Element.el [ Font.bold ] (text label_)
        , sharingInputPane_ model width_ height_ label_
        ]


sharingInputPane_ model width_ height_ label_ =
    Keyed.row []
        [ ( String.fromInt model.counter
          , Input.multiline
                [ width width_, height height_, padding 10, scrollbarY ]
                { onChange = AcceptSharingString
                , text = model.currentDocument.access |> Document.accessDictToString
                , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "")
                , placeholder = Nothing
                , spellcheck = False
                }
          )
        ]


documentPanels model =
    Element.column [ height shrink, spacing 10 ]
        [ Element.el [ Font.bold ] (text "Text type")
        , textTypePanel model
        , Element.el [ Font.bold ] (text "Document type")
        , documentTypePanel model
        ]


textTypePanel model =
    Element.column [ spacing 5 ]
        [ miniLatexTypeButton model

        -- , elmMarkupTypeButton model
        , asciidocTypeButton model

        -- , asciidocLatexTypeButton model
        , markdownTypeButton model

        -- , plainTextTypeButton model
        ]


documentTypePanel model =
    Element.column [ spacing 5 ]
        [ standardDocumentButton model
        , masterDocumentButton model
        ]


documentTitleInput : Model -> Element Msg
documentTitleInput model =
    Element.map DocMsg <|
        Input.text [ htmlAttribute (Html.Attributes.id "title-input"), width (px 250), height (px 30), Font.color black ]
            { text = model.currentDocument.title
            , placeholder = Nothing
            , onChange = \str -> AcceptDocumentTitle str
            , label = Input.labelAbove [ Font.size 14, Font.bold ] (text "Title")
            }


deleteDocumentButton : Model -> Element Msg
deleteDocumentButton model =
    Element.row [ spacing 10 ]
        [ deleteCurrentDocumentButton (px 90) model
        , cancelDeleteCurrentDocumentButton (px 90) model
        ]


masterDocPanel model =
    Element.column [ spacing 5 ]
        [ Element.row [ spacing 8 ]
            [ Element.el [] (text <| "Master doc: " ++ String.fromInt model.currentDocument.parentId)
            , propagateSettingsButton model
            ]
        ]


publicControls : Model -> Element Msg
publicControls model =
    Element.row [ spacing 5 ] [ publicButton model.currentDocument, privateButton model.currentDocument ]


showVersionButton model =
    linkButtonWhite (showVersionsUrl model.currentDocument) "Show" (px 50)


showVersionsUrl : Document -> String
showVersionsUrl document =
    Configuration.backend ++ "/archive/versions" ++ "/" ++ String.fromInt document.id


newVersionUrl : Document -> String
newVersionUrl document =
    Configuration.backend ++ "/archive/new_version" ++ "/" ++ String.fromInt document.id


newVersionButton : Model -> Element Msg
newVersionButton model =
    Element.map DocMsg <|
        Input.button (textTypeButtonStyleWhite model MiniLatex)
            { onPress = Just IncrementVersion
            , label = Element.el [] (Element.text "New")
            }


miniLatexTypeButton : Model -> Element Msg
miniLatexTypeButton model =
    Element.map DocMsg <|
        Input.button (textTypeButtonStyle model MiniLatex)
            { onPress = Just (SetDocumentTextType MiniLatex)
            , label = Element.el [] (Element.text "MiniLatex")
            }


elmMarkupTypeButton : Model -> Element Msg
elmMarkupTypeButton model =
    Element.map DocMsg <|
        Input.button (textTypeButtonStyle model ElmMarkup)
            { onPress = Just (SetDocumentTextType ElmMarkup)
            , label = Element.el [] (Element.text "Elm markup")
            }


asciidocTypeButton : Model -> Element Msg
asciidocTypeButton model =
    Element.map DocMsg <|
        Input.button (textTypeButtonStyle model Asciidoc)
            { onPress = Just (SetDocumentTextType Asciidoc)
            , label = Element.el [] (Element.text "Asciidoc")
            }


asciidocLatexTypeButton : Model -> Element Msg
asciidocLatexTypeButton model =
    Element.map DocMsg <|
        Input.button (textTypeButtonStyle model AsciidocLatex)
            { onPress = Just (SetDocumentTextType AsciidocLatex)
            , label = Element.el [] (Element.text "Asciidoc Latex")
            }


markdownTypeButton : Model -> Element Msg
markdownTypeButton model =
    Element.map DocMsg <|
        Input.button (textTypeButtonStyle model Markdown)
            { onPress = Just (SetDocumentTextType Markdown)
            , label = Element.el [] (Element.text "Markdown")
            }


plainTextTypeButton : Model -> Element Msg
plainTextTypeButton model =
    Element.map DocMsg <|
        Input.button (textTypeButtonStyle model PlainText)
            { onPress = Just (SetDocumentTextType PlainText)
            , label = Element.el [] (Element.text "Plain Text")
            }


textTypeButtonStyle : Model -> TextType -> List (Attribute msg)
textTypeButtonStyle model textType =
    listItemStyleNarrow (px 110) ++ highLightTextType model.currentDocument.textType textType


textTypeButtonStyleWhite : Model -> TextType -> List (Attribute msg)
textTypeButtonStyleWhite model textType =
    listItemStyleNarrowWhite (px 110) ++ highLightTextType model.currentDocument.textType textType


documentTypeButtonStyle : Model -> DocType -> List (Attribute msg)
documentTypeButtonStyle model docType =
    listItemStyleNarrow (px 110) ++ highLightDocumentType model.currentDocument.docType docType


standardDocumentButton : Model -> Element Msg
standardDocumentButton model =
    Element.map DocMsg <|
        Input.button (documentTypeButtonStyle model Standard)
            { onPress = Just (SetDocumentType Standard)
            , label = Element.el [] (Element.text "Standard")
            }


publicButton : Document -> Element Msg
publicButton document =
    Input.button (Widget.buttonStyleWithColor (publicIndicatorColor document.public True) (px 60))
        { onPress = Just (SetDocumentPublic True)
        , label = Element.el [] (Element.text "Public")
        }


privateButton : Document -> Element Msg
privateButton document =
    Input.button (Widget.buttonStyleWithColor (publicIndicatorColor document.public False) (px 60))
        { onPress = Just (SetDocumentPublic False)
        , label = Element.el [] (Element.text "Private")
        }


publicIndicatorColor : Bool -> Bool -> Color
publicIndicatorColor actual target =
    case actual == target of
        True ->
            Widget.darkRed

        False ->
            Widget.buttonColor


masterDocumentButton : Model -> Element Msg
masterDocumentButton model =
    Element.map DocMsg <|
        Input.button (documentTypeButtonStyle model Master)
            { onPress = Just (SetDocumentType Master)
            , label = Element.el [] (Element.text "Master")
            }


saveSettingsButton : Model -> Element Msg
saveSettingsButton model =
    Element.map DocMsg <|
        Input.button (buttonStyle (px 90))
            { onPress = Just UpdateCurrentDocument
            , label = Element.el [] (Element.text "Save")
            }


propagateSettingsButton : Model -> Element Msg
propagateSettingsButton model =
    Element.map DocMsg <|
        Input.button (buttonStyle (px 90))
            { onPress = Just PropagateSettings
            , label = Element.el [] (Element.text "Propagate")
            }


deleteCurrentDocumentButton : Length -> Model -> Element Msg
deleteCurrentDocumentButton width_ model =
    case model.maybeCurrentUser of
        Nothing ->
            Element.none

        Just _ ->
            Element.map DocMsg <|
                Input.button (buttonStyleWithColor (deleteButtonBackgroundColor model) width_)
                    { onPress = Just DeleteCurrentDocument
                    , label = Element.el [] (Element.text "Delete")
                    }


cancelDeleteCurrentDocumentButton : Length -> Model -> Element Msg
cancelDeleteCurrentDocumentButton width_ model =
    case model.deleteDocumentState of
        DeleteIsOnSafety ->
            Element.none

        DeleteIsArmed ->
            cancelDeleteCurrentDocumentButton_ width_ model


cancelDeleteCurrentDocumentButton_ : Length -> Model -> Element Msg
cancelDeleteCurrentDocumentButton_ width_ model =
    Element.map DocMsg <|
        Input.button
            (buttonStyle width_)
            { onPress = Just CancelDeleteCurrentDocument
            , label = Element.el [] (Element.text "Cancel")
            }


deleteButtonBackgroundColor model =
    case model.deleteDocumentState of
        DeleteIsOnSafety ->
            Widget.blue

        DeleteIsArmed ->
            Widget.red



-- highLightDocumentType : DocType -> DocType  -> List (Attribute msg)


highLightDocumentType docType1 docType2 =
    case docType1 == docType2 of
        True ->
            [ Font.bold ]

        False ->
            [ Font.light ]


highLightTextType textType1 textType2 =
    case textType1 == textType2 of
        True ->
            [ Font.bold ]

        False ->
            [ Font.light ]


newDocumentButton : Model -> Element Msg
newDocumentButton model =
    case model.appMode of
        Writing ->
            Element.map DocMsg <|
                Input.button (buttonStyle (px 90))
                    { onPress = Just NewDocument
                    , label = Element.el [] (Element.text "New doc")
                    }

        _ ->
            Element.none


newChildButton : Model -> Element Msg
newChildButton model =
    case model.appMode of
        Writing ->
            newChildButton_ model

        _ ->
            Element.none


newChildButton_ : Model -> Element Msg
newChildButton_ model =
    let
        headDocument =
            DocumentList.getFirst model.documentList
    in
        case headDocument.docType of
            Standard ->
                Element.none

            Master ->
                newChildButton__ model


newChildButton__ : Model -> Element Msg
newChildButton__ model =
    Element.map DocMsg <|
        Input.button (buttonStyle (px 90))
            { onPress = Just NewChildDocument
            , label = Element.el [] (Element.text "New subdoc")
            }


newMasterButton : Model -> Element Msg
newMasterButton model =
    Element.map DocMsg <|
        Input.button (buttonStyle (px 90))
            { onPress = Just NewMasterDocument
            , label = Element.el [] (Element.text "New master")
            }


bodyReaderColumn : Viewport -> Int -> Model -> Element Msg
bodyReaderColumn viewport portion_ model =
    Element.column
        [ width (fillPortion portion_)
        , height (px (round <| viewport.viewport.width - 73))
        , paddingXY 20 20
        , Background.color Widget.lightGrey
        , centerX
        ]
        [ DocumentView.view model
        ]
