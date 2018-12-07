module Model
    exposing
        ( AppMode(..)
        , DeleteDocumentState(..)
        , DocumentListSource(..)
        , ErrorResponse(..)
        , FocusedElement(..)
        , ImageAccessibility(..)
        , ImageMode(..)
        , MiniLatexRenderMode(..)
        , Model
        , Msg(..)
        , PreferencesPanelState(..)
        , SignupMode(..)
        , ToolMenuState(..)
        , ToolPanelState(..)
        , initialModel
        )

import Update.Outside exposing (InfoForElm(..))
import BigEditRecord exposing (BigEditRecord)
import Browser.Dom as Dom exposing (Viewport)
import Configuration
import Debounce exposing (Debounce)
import DocViewMsg exposing (DocViewMsg(..))
import Document exposing (DocMsg(..), DocType(..), Document, TextType(..))
import DocumentDictionary exposing (DocDictMsg(..), DocumentDictionary)
import DocumentList exposing (DocListMsg(..), DocumentList)
import DocumentListView exposing (DocListViewMsg(..))
import FileUploadCredentials as Credentials exposing (FileData, Image)
import Html exposing (Html)
import ImageManager exposing (ImageMsg(..))
import Json.Decode as Decode exposing (Decoder, Value)
import Json.Encode as Encode
import Keyboard exposing (Key(..))
import Mail
import MiniLatex.Differ exposing (EditRecord)
import MiniLatex.MiniLatex as MiniLatex
import Queue exposing (Queue)
import Time exposing (Posix)
import User exposing (BigUser, Token, User, UserMsg(..))
import Bozo.Model exposing (BozoModel, BozoMsg)


type ErrorResponse
    = ShowPasswordReset
    | ShowVerifyAccount
    | NoErrorResponse


type DeleteDocumentState
    = DeleteIsOnSafety
    | DeleteIsArmed


type ImageAccessibility
    = PublicImage
    | PrivateImage


type PreferencesPanelState
    = PreferencesPanelOn
    | PreferencesPanelOff


type AppMode
    = Reading
    | Writing
    | ImageEditing
    | Admin
    | DisplayAuthors


type ImageMode
    = LoadImage
    | ViewImage


type ToolPanelState
    = ShowToolPanel
    | HideToolPanel


type SignupMode
    = RegistrationMode
    | SigninMode


{-| 57 components
-}
type alias Model =
    { message : String
    , bozo : BozoModel

    -- USER
    , password : String
    , username : String
    , email : String
    , signupMode : SignupMode
    , maybeToken : Maybe Token
    , maybeCurrentUser : Maybe User
    , maybeBigUser : Maybe BigUser
    , userList : List BigUser
    , sharingString : String
    , blurb : String
    , emailSubject : String
    , emailText : String

    -- SEARCH
    , searchQueryString : String

    -- DOCUMENT
    , currentDocument : Document
    , texMacros : String
    , bigEditRecord : BigEditRecord Msg
    , selectedDocumentId : Int
    , maybeMasterDocument : Maybe Document
    , documentList : DocumentList
    , documentIdList : DocumentList.IntList
    , documentDictionary : DocumentDictionary
    , counter : Int
    , debounceCounter : Int
    , debounce : Debounce String
    , sourceText : String
    , currentDocumentDirty : Bool
    , autosaveDuration : Float
    , deleteDocumentState : DeleteDocumentState
    , miniLatexRenderMode : MiniLatexRenderMode
    , masterDocLoaded : Bool
    , recentDocumentQueue : Queue Document
    , documentListSource : DocumentListSource
    , seed : Int
    , exportText : String
    , imageUrlList : List String

    -- UI
    , appMode : AppMode
    , toolPanelState : ToolPanelState
    , documentTitle : String
    , tagString : String
    , windowWidth : Int
    , windowHeight : Int
    , viewport : Viewport
    , viewPortOfRenderedText : Maybe Viewport
    , pressedKeys : List Key
    , locationHref : String
    , errorResponse : ErrorResponse
    , preferencesPanelState : PreferencesPanelState
    , toolMenuState : ToolMenuState
    , debugString : String
    , focusedElement : FocusedElement

    -- IMAGE
    , maybeImageString : Maybe String
    , maybeFileData : Maybe FileData
    , fileValue : Encode.Value
    , psurl : String
    , imageName : String
    , imageList : List Image
    , imageMode : ImageMode
    , maybeCurrentImage : Maybe Image
    , imageAccessibility : ImageAccessibility
    }



-- MSG (80)


type Msg
    = NoOp
    | Test
    | Bozo BozoMsg
      --| UI UIMsg
      -- USER
    | SetSignupMode SignupMode
    | AcceptSearchQuery String
    | SendEmail
    | AcceptEmailSubject String
    | AcceptEmailText String
    | AcceptBlurb String
    | UserMsg User.UserMsg
    | GetUsers
    | GetBigUser
    | UpdateBigUser
      -- DOCUMENT
    | Search
    | AcceptSharingString String
    | AcceptImageName String
    | SetDocumentTextType TextType
    | SetDocumentType DocType
    | GetPublicDocumentsRawQuery String
    | LoadMasterDocument String
    | DocMsg Document.DocMsg
    | DocListMsg DocumentList.DocListMsg
    | DocListViewMsg DocumentListView.DocListViewMsg
    | DocViewMsg DocViewMsg
    | DocDictMsg DocumentDictionary.DocDictMsg
    | GetContent String
    | UpdateEditorContent String
    | SaveCurrentDocument Posix
    | UpdateCurrentDocument
    | NewDocument
    | NewMasterDocument
    | NewChildDocument
    | FindViewportOfRenderedText (Result Dom.Error Dom.Viewport)
    | DeleteCurrentDocument
    | CancelDeleteCurrentDocument
    | SetDocumentPublic Bool
    | IncrementVersion
    | ToggleDocumentSource
    | PrintDocument
    | GenerateSeed
    | NewSeed Int
    | DoFullRender
    | ExportLatex
      -- IMAGE
    | GetImages String
    | ImageMsg ImageManager.ImageMsg
    | MailMsg Mail.MailMsg
    | FileMsg Credentials.FileMsg
    | ReadImage Value
    | ImageRead Value
    | MakeImage
    | SelectImage Image
    | SelectImageLoader
    | ToggleImageAccessibility
      -- UI
    | GoToStart
    | GoHome
    | GoToUsersHomePage BigUser
    | ChangeMode AppMode
    | DebounceMsg Debounce.Msg
    | Outside InfoForElm
    | LogErr String
    | ToggleToolPanelState
    | GetViewport Dom.Viewport
    | KeyMsg Keyboard.Msg
    | GetUserManual
    | UrlChanged String
    | TogglePreferencesPanel
    | ToggleUserPublicPrivate
    | ToggleToolMenu
    | UserClicksOutsideSearchBox Bool
    | SetFocusOnSearchBox (Result Dom.Error ())


initialModel : String -> Int -> Int -> Document -> Model
initialModel locationHref windowWidth windowHeight document =
    { message = "Not signed in"
    , bozo = Bozo.Model.init
    , password = ""
    , username = ""
    , email = ""
    , signupMode = SigninMode
    , searchQueryString = ""
    , maybeToken = Nothing
    , maybeCurrentUser = Nothing
    , maybeBigUser = Nothing
    , currentDocument = document
    , texMacros = ""
    , bigEditRecord = BigEditRecord.empty 0 0
    , selectedDocumentId = 0
    , maybeMasterDocument = Nothing
    , documentList = DocumentList.empty
    , documentIdList = DocumentList.emptyIntList
    , documentDictionary = DocumentDictionary.empty
    , counter = 0
    , debounceCounter = 0
    , debounce = Debounce.init
    , appMode = Reading
    , sourceText = ""
    , currentDocumentDirty = False
    , autosaveDuration = Configuration.autosaveDuration
    , toolPanelState = HideToolPanel
    , documentTitle = ""
    , tagString = ""
    , windowWidth = windowWidth
    , windowHeight = windowHeight
    , viewport =
        { scene = { width = toFloat windowWidth, height = toFloat windowHeight }
        , viewport = { x = 0, y = 0, width = toFloat windowWidth, height = toFloat windowHeight }
        }
    , viewPortOfRenderedText = Nothing
    , deleteDocumentState = DeleteIsOnSafety
    , pressedKeys = []
    , locationHref = locationHref
    , masterDocLoaded = False
    , maybeImageString = Nothing
    , maybeFileData = Nothing
    , fileValue = Encode.null
    , psurl = ""
    , userList = []
    , imageName = ""
    , imageList = []
    , imageMode = LoadImage
    , maybeCurrentImage = Nothing
    , imageAccessibility = PrivateImage
    , emailSubject = ""
    , emailText = ""
    , errorResponse = NoErrorResponse
    , blurb = ""
    , preferencesPanelState = PreferencesPanelOff
    , sharingString = "Debug: nothing"
    , toolMenuState = HideToolMenu
    , recentDocumentQueue = Queue.fromList [] Configuration.documentQueueCapacity
    , documentListSource = SearchResults
    , debugString = ""
    , focusedElement = NoFocus
    , seed = 0
    , miniLatexRenderMode = RenderIncremental
    , exportText = ""
    , imageUrlList = []
    }


type ToolMenuState
    = HideToolMenu
    | ShowToolMenu


type DocumentListSource
    = SearchResults
    | RecentDocumentsQueue


type FocusedElement
    = FocusOnSearchBox
    | NoFocus


type MiniLatexRenderMode
    = RenderFull
    | RenderIncremental
