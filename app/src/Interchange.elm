module Interchange exposing (downloadArchive)

import Document exposing (DocType(..), Document, Child, AccessDict, TextType)
import Json.Encode as Encode exposing (Value)
import Prng.Uuid as Uuid exposing (Uuid)
import Random.Pcg.Extended exposing (Seed, initialSeed, step)
import Dict exposing(Dict)
import Model exposing(Model, Msg)
import File.Download as Download
import DocumentList exposing(DocumentList(..))


type Permission
    = ReadPermission
    | WritePermission
    | NoPermission


type UserPermission
    = UserPermission String Permission

downloadArchive : Seed -> Model -> ( Model, Cmd Msg )
downloadArchive seed model =
    let
        (DocumentList _ docList _) = model.documentList
        userDocuments = docList
    in
    ( model, Download.string "documents.json" "application/json" (encodeDocumentList seed userDocuments) )

-- ENCODER

encodeDocument : (Dict Int Uuid) -> Document -> String
encodeDocument idMap doc =
    Encode.encode 4 (documentEncoder idMap doc)


encodeDocumentList : Seed -> List Document -> String
encodeDocumentList seed docList =
  let
      idMap = makeIdMap seed docList
  in
    Encode.encode 4 (documentListEncoder idMap docList)


documentListEncoder : (Dict Int Uuid) -> List Document -> Value
documentListEncoder idMap docList =
    Encode.list (documentEncoder idMap) docList



makeIdMap : Seed -> List Document ->  Dict Int Uuid
makeIdMap seed docList =
  let
     ids = List.map .id docList
     uuids = makeUuidList seed ids
     idPairs = List.map2 (\id uuid -> (id, uuid)) ids uuids
  in
     Dict.fromList idPairs

getId : Int -> (Dict Int Uuid) -> Uuid
getId k idDict =
    Dict.get k idDict |> Maybe.withDefault defaultUuid


makeUuidList : Seed ->  List Int -> List Uuid
makeUuidList seed list =
    let
        f : Int -> (Seed, List Uuid) -> (Seed, List Uuid)
        f k (s, list_) =
          let
            (uuid, newSeed_) = step Uuid.generator s
          in
            (newSeed_, uuid::list_)

    in
      List.foldl f (seed, []) list
        |> Tuple.second


documentEncoder : (Dict Int Uuid) -> Document -> Value
documentEncoder idMap doc =
    let
        uuid = (getId doc.id idMap)
        slug = makeSlug uuid doc.authorIdentifier doc.title
    in
    Encode.object
        [ ( "id", Encode.string (Uuid.toString uuid))
        , ( "title", Encode.string doc.title )
        , ( "authorIdentifier", Encode.string doc.authorName )
        , ( "content", Encode.string doc.content )
        , ( "public", Encode.bool doc.public )
        , ( "tags", Encode.list Encode.string doc.tags )
        , ( "slug", Encode.string slug)
        , ( "docType", Encode.string "MiniLaTeX" )
        , ( "childInfo", Encode.list (encodeChild idMap) doc.children )
        , ( "permissions", Encode.list Encode.string [] )
        ]

encodeChild : Dict Int Uuid -> Child -> Value
encodeChild idMap child =
  let
     uuid = getId child.docId idMap
  in
    Encode.string <| "(" ++ Uuid.toString uuid ++ "," ++ String.fromInt child.level ++ ")"


makeSlug : Uuid -> String -> String -> String
makeSlug uuid authorIdentifier title =
    let
        endOfHash =
            Uuid.toString uuid |> String.right 6

        shortHash =
            String.left 4 endOfHash
    in
    authorIdentifier ++ "." ++ compress title ++ "." ++ shortHash

compress : String -> String
compress str =
    str
        |> String.words
        |> List.map String.toLower
        |> filterNoise
        |> List.map silencePunctuation
        |> List.filter (\item -> item /= "")
        |> String.join "-"


silencePunctuation : String -> String
silencePunctuation str =
    str
        |> String.split ""
        |> List.filter isAlphaNumOrWhiteSpace
        |> String.join ""

filterNoise : List String -> List String
filterNoise list =
    List.filter (\word -> not (List.member word lowInfoWords)) list

lowInfoWords =
    [ "a", "about", "the", "in", "is", "it", "its", "on", "of", "for", "to", "from", "with", "without", "that", "this", "and", "or" ]


isAlphaNumOrWhiteSpace : String -> Bool
isAlphaNumOrWhiteSpace x =
    List.member x [ " ", "\n", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "z", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]


defaultUuid : Uuid
defaultUuid =
    Uuid.fromString "3db857d2-1422-47a9-8f04-4fc6efe871cc"
        |> Maybe.withDefault id0


id0 =
    step Uuid.generator (initialSeed 0 [ 1, 2, 3, 4 ]) |> Tuple.first

