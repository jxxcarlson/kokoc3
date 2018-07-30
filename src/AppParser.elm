module AppParser exposing(UrlResult, urlPathParser, urlResultString)

import Parser exposing(Parser, int, symbol, oneOf, getChompedString, succeed, chompIf, chompWhile, (|=), (|.))


type UrlResult = 
    PublicQuery String 
  | PrivateQuery String 
  | NumericalDocumentID Int 
  | DocumentUUID String 

urlPathParser : Parser UrlResult
urlPathParser =
  (oneOf [publicQuery, privateQuery, idParser ])

publicQuery : Parser UrlResult
publicQuery = 
  succeed PublicQuery 
    |. symbol "/api/public/documents"
    |= queryString

privateQuery : Parser UrlResult
privateQuery = 
  succeed PrivateQuery 
    |. symbol "/api/documents"
    |= queryString


queryString : Parser String
queryString = 
  Parser.map (String.dropLeft 1) (getChompedString <|
    succeed ()
      |. chompIf (\char -> char == '?') 
      |. chompWhile isQueryChar
  )

isQueryChar : Char -> Bool
isQueryChar char =
  Char.isAlpha char|| Char.isDigit char ||  char == '=' ||  char == '&'


idParser: Parser UrlResult
idParser =  
    succeed identity
      |. symbol "/api/document/"
      |= oneOf [Parser.map NumericalDocumentID int, Parser.map DocumentUUID uuidString]
    


uuid : Parser UrlResult
uuid = 
  succeed DocumentUUID
    |. symbol "/api/document/"
    |= uuidString 

uuidString : Parser String
uuidString =
  getChompedString <|
    succeed ()
      |. chompIf isStartChar
      |. chompWhile isInnerChar

isStartChar : Char -> Bool
isStartChar char =
  Char.isAlpha char

isInnerChar : Char -> Bool
isInnerChar char =
  isStartChar char || Char.isDigit char ||  char == '_' ||  char == '.'

urlResultString : UrlResult -> String 
urlResultString urlResult = 
  case urlResult of 
    NumericalDocumentID k -> "Numerical document ID: " ++ (String.fromInt k)
    DocumentUUID str -> "Document UUID: " ++ str
    PublicQuery str -> "Public query: " ++ str 
    PrivateQuery str -> "Private query: " ++ str 



urlMessage url = 
  let 
    pathAndQuery =
      case url.query of 
        Nothing -> url.path 
        Just query -> url.path ++ "?" ++ query
  in 
    case (Parser.run urlPathParser pathAndQuery) of 
      Ok urlResult -> urlResultString urlResult 
      Err _ -> "Nothing parseable in URL.  Try one of the links above"
