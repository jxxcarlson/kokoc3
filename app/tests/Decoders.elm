module Decoders exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)
import Json.Decode as D
import Document
    exposing
        ( basicDocument
        , encodeDocument
        , encodeDocumentForOutside
        , documentDecoder
        , decodeDocumentFromOutside
        , Document
        )


suite : Test
suite =
    describe "Decoder/encoder test"
        [ test "documentDecoder . encodeDocumentForOutside == id" <|
            \_ ->
                let
                    sourceDocument =
                        basicDocument

                    encodedDocument =
                        encodeDocumentForOutside sourceDocument

                    decodedDocument =
                        case D.decodeValue documentDecoder encodedDocument of
                            Ok document ->
                                Just document.title

                            Err _ ->
                                Nothing
                in
                    Expect.equal (Just sourceDocument.title) decodedDocument
        , test "decodeDocumentFromOutside . encodeDocumentForOutside == id" <|
            \_ ->
                let
                    sourceDocument =
                        basicDocument

                    encodedDocument =
                        encodeDocumentForOutside sourceDocument

                    decodedDocument =
                        case D.decodeValue decodeDocumentFromOutside encodedDocument of
                            Ok document ->
                                Just document.title

                            Err _ ->
                                Nothing
                in
                    Expect.equal (Just sourceDocument.title) decodedDocument
        , todo "Implement another test."
        ]
