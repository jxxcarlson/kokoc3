module Model exposing(
      Msg(..)
    , Model
    , AppMode(..)
    , ImageMode(..)
    , SignupMode(..)
    , ToolPanelState(..)
    , DeleteDocumentState(..)
    , ImageAccessibility(..)
    , InfoForElm(..)
    , initialModel
  )

import Time exposing(Posix)
import Json.Decode as Decode exposing(Decoder, Value)
import Keyboard exposing (Key(..))
import Browser.Dom as Dom
import Debounce exposing(Debounce)
import Json.Encode as Encode



import FileUploadCredentials as Credentials exposing(FileData, Image)
import Document exposing(Document, DocType(..), DocMsg(..), TextType(..))
import User exposing(Token, UserMsg(..), User, BigUser)
import DocumentList exposing( DocumentList , DocListMsg(..) )
import DocumentDictionary exposing(DocumentDictionary, DocDictMsg(..))
import DocumentView exposing(view, DocViewMsg(..))
import DocumentListView exposing(DocListViewMsg(..))
import Configuration


type InfoForElm = 
   DocumentDataFromOutside Document
 | DocumentListDataFromOutside DocumentList.IntList
 | UserDataFromOutside User 


type DeleteDocumentState = DeleteIsOnSafety | DeleteIsArmed

type ImageAccessibility = PublicImage | PrivateImage

type AppMode = 
  Reading | Writing | ImageEditing | Admin 

type ImageMode = 
  LoadImage | ViewImage 
  
type ToolPanelState = 
  ShowToolPanel | HideToolPanel

type SignupMode = RegistrationMode | SigninMode 

type alias Model =
    {   message  : String
      , password : String
      , username : String
      , email : String
      , signupMode : SignupMode
      , maybeToken    : Maybe Token
      , maybeCurrentUser : Maybe User
      , searchQueryString  : String
      , currentDocument : Document
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
      , maybeViewport : Maybe Dom.Viewport
      , deleteDocumentState : DeleteDocumentState
      , pressedKeys : List Key
      , previousKey : Key
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
    }



type Msg
    = NoOp
    | Test
    | AcceptPassword String
    | AcceptEmail String
    | AcceptUserName String 
    | AcceptSearchQuery String
    | AcceptDocumenTitle String
    | AcceptDocumentTagString String
    | AcceptImageName String
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
    | FileMsg Credentials.FileMsg
    | DocListMsg DocumentList.DocListMsg
    | DocListViewMsg DocumentListView.DocListViewMsg
    | DocViewMsg DocumentView.DocViewMsg
    | DocDictMsg DocumentDictionary.DocDictMsg
    | GoToStart
    | GoHome
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
    | MakeImage
    | SelectImage Image
    | SelectImageLoader
    | ToggleImageAccessibility
    

initialModel : String -> Int -> Int -> Document -> Model 
initialModel locationHref windowWidth windowHeight document =
    {   message = "Not signed in"
            , password = ""
            , username = ""
            , email = ""
            , signupMode = SigninMode
            , searchQueryString = ""
            , maybeToken = Nothing
            , maybeCurrentUser = Nothing
            , currentDocument = document
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
            , maybeViewport = Nothing
            , deleteDocumentState = DeleteIsOnSafety
            , pressedKeys = []
            , previousKey = F20
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
        }
