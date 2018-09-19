module SystemDocument exposing
    ( newDocument
    , newUser
    , signIn
    , signedOut
    , signedUp
    , welcome
    )

import Configuration
import Document exposing (Document, basicDocument)


newUser : Document
newUser =
    { basicDocument | title = "Welcome!", content = Configuration.newUserText }


newDocument : Document
newDocument =
    { basicDocument | title = "New document", public = False, content = Configuration.newMiniLatexDocumentText }


welcome : Document
welcome =
    { basicDocument | title = "Welcome!" }


signIn : Document
signIn =
    { basicDocument | title = "You are signed in", content = Configuration.signInText }


signedOut : Document
signedOut =
    { basicDocument | title = "Signed out", content = Configuration.signedOutText }


signedUp : Document
signedUp =
    { basicDocument | title = "Welcome to kNode!!", content = Configuration.signedUpText }
