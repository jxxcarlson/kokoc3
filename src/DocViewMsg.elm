module DocViewMsg exposing (DocViewMsg(..))


type DocViewMsg
    = LoadMaster Int
    | LoadMasterWithSelection Int Int
    | LoadMasterWithCurrentSelection Int
    | GetPublicDocumentsRawQuery2 String
