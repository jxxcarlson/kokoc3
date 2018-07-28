module SystemDocument exposing(
      signIn
    , signedUp
    , signedOut
    , welcome
   )

import Configuration 
import Document  exposing(Document, basicDocument)

welcome : Document 
welcome = 
  { basicDocument | title = "Welcome!" }

signIn : Document 
signIn = 
  { basicDocument | title = "You are signed in", content = Configuration.signInText}

signedOut : Document 
signedOut = 
  { basicDocument | title = "Signed out", content = Configuration.signedOutText}

signedUp : Document 
signedUp = 
  { basicDocument | title = "Welcome to kNode!!", content = Configuration.signedUpText}