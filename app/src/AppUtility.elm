module AppUtility exposing(..)

import Model exposing(Model)
import User
import Configuration

imageUrlAtS3 : Model -> String
imageUrlAtS3 model = 
  case model.maybeFileData of  
      Nothing -> ""
      Just fileData -> "https://s3.amazonaws.com/" ++ Configuration.bucket ++ "/" ++ (User.usernameFromMaybeUser model.maybeCurrentUser) ++ "/" ++ fileData.name 
 