module Shorthand exposing (transform, testString, testString2)


testString =
    """
This is some text.

| theorem

This is some more text.
Ho ho ho!

Another paragraph.
Ha ha ha!
"""


testString2 =
    """
This is some text.

| theorem.

This is some more text.
Ho ho ho!

Another paragraph.
Ha ha ha!
"""


{-| transform testString
"""
This is some text.

\begin{theorem
xxx
\end{theorem}

This is some more text.
Ho ho ho!

Another paragraph.
Ha ha ha!
"""

-}
transform : String -> String
transform str =
    str
        |> String.lines
        |> List.map transformLine
        |> String.join "\n"


transformLine : String -> String
transformLine str =
    let
        str_ =
            String.trim str
    in
        case ( String.left 1 str_, String.right 1 str_ ) of
            ( "|", "." ) ->
                transformLineAux str_

            _ ->
                str


transformLineAux : String -> String
transformLineAux str =
    str
        |> String.dropLeft 1
        |> String.trim
        |> (\term -> block (String.dropRight 1 term))


block : String -> String
block term =
    "\\begin{" ++ term ++ "}\nxxx\n\\end{" ++ term ++ "}"
