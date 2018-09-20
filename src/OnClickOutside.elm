module OnClickOutside exposing
    ( withId
    , withIdElement
    )

{-|

@docs withId, succeedIfClickIsOustideOfId

-}

-- (withId, withIdElement,  succeedIfClickIsOutsideOfId)

import Element
import Html
import Html.Attributes
import Html.Events
import Json.Decode as Decode exposing (Decoder)


succeedOrDecodeParent : String -> (String -> Decoder Bool)
succeedOrDecodeParent targetId =
    \id ->
        if id == targetId then
            Decode.succeed True

        else
            Decode.field "parentNode" (succeedIfBloodlineHasId targetId)


succeedIfBloodlineHasId : String -> Decoder Bool
succeedIfBloodlineHasId targetId =
    Decode.andThen (succeedOrDecodeParent targetId) (Decode.field "id" Decode.string)


mapToBoolDecoder : Maybe a -> Decoder Bool
mapToBoolDecoder maybe =
    if maybe == Nothing then
        Decode.succeed True

    else
        Decode.succeed False


boolDecoder : Decoder a -> Decoder Bool
boolDecoder decoder =
    Decode.andThen mapToBoolDecoder (Decode.maybe decoder)


{-| This is a Json.Decoder that you can use to decode a DOM
[FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent).

It will _fail_ if `event.relatedTarget` or any of its ancestors have the
given DOM id.

It will succeed otherwise.

-}
succeedIfClickIsOutsideOfId : String -> Decoder Bool
succeedIfClickIsOutsideOfId targetId =
    succeedIfBloodlineHasId targetId
        |> Decode.field "relatedTarget"
        |> boolDecoder


{-| The first argument is the DOM id that you want to assign to the element.

The second argument is the message that you want to trigger when the user
clicks outside the element.

The function returns a list of Html.Attributes to apply to the element.

The attributes are `tabindex`, `id` and the `focusout` event handler.

This function is meant to cover most use cases, but if you need more control
on the attributes, you will have to use
[succeedIfClickIsOustideOfId](#succeedIfClickIsOustideOfId) instead.

-}
withId : String -> (Bool -> msg) -> List (Html.Attribute msg)
withId id onClickOutsideMsg =
    [ Html.Attributes.tabindex 0
    , Html.Attributes.id id
    , Html.Events.on "focusout" <| Decode.map onClickOutsideMsg (succeedIfClickIsOutsideOfId id)
    ]


withIdElement : String -> (Bool -> msg) -> List (Element.Attribute msg)
withIdElement id onClickOutsideMsg =
    withId id onClickOutsideMsg |> List.map Element.htmlAttribute
