module MasterDocument exposing (updateDocumentListWithMaster, updateMasterFromSubdocument)

import Document exposing (Document, DocType(..))
import DocumentList exposing (DocumentList(..))
import Set
import Parser
    exposing
        ( Parser
        , run
        , variable
        , int
        , (|.)
        , (|=)
        , spaces
        , succeed
        , chompWhile
        , getChompedString
        )
import Parser.Extras exposing (many)
import List.Extra


-- Master Document


type alias SubdocumentItem =
    { level : Int
    , docId : Int
    , title : String
    }


parseIndicator : Parser Int
parseIndicator =
    variable { start = \c -> c == '=', inner = \c -> c == '=', reserved = Set.empty }
        |> Parser.map String.length


parseTitle : Parser String
parseTitle =
    getChompedString <|
        succeed ()
            |. chompWhile (\c -> c /= '\n')


parseSubdocumentItem : Parser SubdocumentItem
parseSubdocumentItem =
    succeed SubdocumentItem
        |. spaces
        |= parseIndicator
        |. spaces
        |= int
        |. spaces
        |= parseTitle


type alias SubdocumentList =
    List SubdocumentItem


updateMasterFromSubdocument : DocumentList -> Document -> Maybe Document
updateMasterFromSubdocument documentList subDocument =
    let
        firstDocument =
            DocumentList.getFirst documentList

        maybeMasterDocument =
            case firstDocument.id == subDocument.parentId of
                False ->
                    Nothing

                True ->
                    Just firstDocument

        maybeSubdocumentList =
            Maybe.andThen getSubdocumentList maybeMasterDocument

        subdocumentItem =
            { docId = subDocument.id
            , level = subDocument.level
            , title = subDocument.title
            }

        maybeNextSubdocumentListAsString =
            Maybe.map2 updateSubdocumentList (Just subdocumentItem) maybeSubdocumentList
                |> Maybe.map subdocumentListToString
    in
        case maybeNextSubdocumentListAsString of
            Nothing ->
                Nothing

            Just newContent ->
                Maybe.map
                    (\doc -> { doc | content = newContent })
                    maybeMasterDocument


updateDocumentListWithMaster : Document -> DocumentList -> DocumentList
updateDocumentListWithMaster masterDocument (DocumentList latexState_ documentList_ maybeDocument) =
    let
        newDocumentList =
            List.Extra.setIf (\runningDoc -> runningDoc.id == masterDocument.id) masterDocument documentList_
    in
        (DocumentList latexState_ newDocumentList maybeDocument)


getSubdocumentList : Document -> Maybe SubdocumentList
getSubdocumentList document =
    case document.docType of
        Standard ->
            Nothing

        Master ->
            case (Parser.run parseSubdocumentItems document.content) of
                Ok subDocumentList ->
                    Just subDocumentList

                _ ->
                    Nothing


parseSubdocumentItems : Parser SubdocumentList
parseSubdocumentItems =
    many parseSubdocumentItem


updateSubdocumentList : SubdocumentItem -> SubdocumentList -> SubdocumentList
updateSubdocumentList subdocumentItem subDocumentList =
    List.Extra.setIf (\runningItem -> runningItem.docId == subdocumentItem.docId) subdocumentItem subDocumentList


subdocumentListToString : SubdocumentList -> String
subdocumentListToString subDocumentList =
    subDocumentList
        |> List.foldl (\item acc -> acc ++ subdocumentItemToString item) ""


subdocumentItemToString subdocumentItem =
    levelToString subdocumentItem.level
        ++ " "
        ++ (subdocumentItem.docId |> String.fromInt)
        ++ " "
        ++ subdocumentItem.title
        ++ "\n"


levelToString : Int -> String
levelToString k =
    String.repeat k "="


testString =
    """
== 978 Fundamental Units
== 979 Entropy
== 980 Boltzmann distribution
== 981 Quantum harmonic oscillator
== 982 Black body radiation
"""
