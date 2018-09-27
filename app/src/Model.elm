module Model exposing
    ( AppMode(..)
    , DeleteDocumentState(..)
    , DocumentListSource(..)
    , ErrorResponse(..)
    , FocusedElement(..)
    , ImageAccessibility(..)
    , ImageMode(..)
    , InfoForElm(..)
    , MiniLatexRenderMode(..)
    , Model
    , Msg(..)
    , PreferencesPanelState(..)
    , SignupMode(..)
    , ToolMenuState(..)
    , ToolPanelState(..)
    , initialModel
    )

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


type InfoForElm
    = DocumentDataFromOutside Document
    | DocumentListDataFromOutside DocumentList.IntList
    | RecentDocumentQueueDataFromOutside (List Int)
    | UserDataFromOutside User


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


type alias Model =
    { message : String
    , password : String
    , username : String
    , email : String
    , signupMode : SignupMode
    , maybeToken : Maybe Token
    , maybeCurrentUser : Maybe User
    , maybeBigUser : Maybe BigUser
    , searchQueryString : String
    , currentDocument : Document
    , bigEditRecord : BigEditRecord Msg
    , selectedDocumentId : Int
    , maybeMasterDocument : Maybe Document
    , documentList : DocumentList
    , documentIdList : DocumentList.IntList
    , documentDictionary : DocumentDictionary
    , counter : Int
    , debounceCounter : Int
    , appMode : AppMode
    , debounce : Debounce String
    , sourceText : String
    , currentDocumentDirty : Bool
    , autosaveDuration : Float
    , toolPanelState : ToolPanelState
    , documentTitle : String
    , tagString : String
    , windowWidth : Int
    , windowHeight : Int
    , viewport : Viewport
    , viewPortOfRenderedText : Maybe Viewport
    , deleteDocumentState : DeleteDocumentState
    , pressedKeys : List Key
    , locationHref : String
    , masterDocLoaded : Bool
    , maybeImageString : Maybe String
    , maybeFileData : Maybe FileData
    , fileValue : Encode.Value
    , psurl : String
    , userList : List BigUser
    , imageName : String
    , imageList : List Image
    , imageMode : ImageMode
    , maybeCurrentImage : Maybe Image
    , imageAccessibility : ImageAccessibility
    , emailSubject : String
    , emailText : String
    , errorResponse : ErrorResponse
    , blurb : String
    , preferencesPanelState : PreferencesPanelState
    , sharingString : String
    , toolMenuState : ToolMenuState
    , recentDocumentQueue : Queue Document
    , documentListSource : DocumentListSource
    , debugString : String
    , focusedElement : FocusedElement
    , seed : Int
    , miniLatexRenderMode : MiniLatexRenderMode
    }



-- MSG


type Msg
    = NoOp
    | Test
    | AcceptPassword String
    | AcceptEmail String
    | AcceptUserName String
    | AcceptSearchQuery String
    | Search
    | AcceptDocumenTitle String
    | AcceptDocumentTagString String
    | AcceptSharingString String
    | AcceptImageName String
    | AcceptEmailSubject String
    | AcceptEmailText String
    | AcceptBlurb String
    | SendEmail
    | SignIn
    | SignOut
    | RegisterUser
    | SetSignupMode SignupMode
    | GetDocumentById Int
    | GetPublicDocuments String
    | GetPublicDocumentsRawQuery String
    | GetImages String
    | GetUserDocuments String
    | LoadMasterDocument String
    | UserMsg User.UserMsg
    | DocMsg Document.DocMsg
    | ImageMsg ImageManager.ImageMsg
    | MailMsg Mail.MailMsg
    | FileMsg Credentials.FileMsg
    | DocListMsg DocumentList.DocListMsg
    | DocListViewMsg DocumentListView.DocListViewMsg
    | DocViewMsg DocViewMsg
    | DocDictMsg DocumentDictionary.DocDictMsg
    | GoToStart
    | GoHome
    | GoToUsersHomePage BigUser
    | ChangeMode AppMode
    | DebounceMsg Debounce.Msg
    | GetContent String
    | UpdateEditorContent String
    | SaveCurrentDocument Posix
    | UpdateCurrentDocument
    | Outside InfoForElm
    | LogErr String
    | ToggleToolPanelState
    | NewDocument
    | NewChildDocument
    | SetDocumentTextType TextType
    | SetDocumentType DocType
    | GetViewport Dom.Viewport
    | FindViewportOfRenderedText (Result Dom.Error Dom.Viewport)
    | DeleteCurrentDocument
    | CancelDeleteCurrentDocument
    | KeyMsg Keyboard.Msg
    | GetUserManual
    | UrlChanged String
    | SetDocumentPublic Bool
    | ReadImage Value
    | ImageRead Value
    | SessionStatus Posix
    | PrintDocument
    | GetUsers
    | GetBigUser
    | UpdateBigUser
    | MakeImage
    | SelectImage Image
    | SelectImageLoader
    | ToggleImageAccessibility
    | TogglePreferencesPanel
    | ToggleUserPublicPrivate
    | NewMasterDocument
    | ToggleToolMenu
    | IncrementVersion
    | ToggleDocumentSource
    | UserClicksOutsideSearchBox Bool
    | SetFocusOnSearchBox (Result Dom.Error ())
    | GenerateSeed
    | NewSeed Int
    | DoFullRender


initialModel : String -> Int -> Int -> Document -> Model
initialModel locationHref windowWidth windowHeight document =
    { message = "Not signed in"
    , password = ""
    , username = ""
    , email = ""
    , signupMode = SigninMode
    , searchQueryString = ""
    , maybeToken = Nothing
    , maybeCurrentUser = Nothing
    , maybeBigUser = Nothing
    , currentDocument = document
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
