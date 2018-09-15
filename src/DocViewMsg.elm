module DocViewMsg exposing(..)

type DocViewMsg = 
    LoadMaster Int
  | LoadMasterWithSelection Int Int 
  | LoadMasterWithCurrentSelection Int
  | GetPublicDocumentsRawQuery2 String
