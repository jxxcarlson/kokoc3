module Queue exposing
    ( Queue
    , capacity
    , dropLast
    , enqueue
    , enqueueUnique
    , enqueueUniqueWithProperty
    , fromList
    , list
    , remove
    , removeWithPredicate
    , replaceUsingPredicate
    )

import Utility


type Queue a
    = Queue (List a) Int


fromList : List a -> Int -> Queue a
fromList list_ capacity_ =
    Queue (List.take capacity_ list_) capacity_


list : Queue a -> List a
list (Queue list_ capacity_) =
    list_


capacity : Queue a -> Int
capacity (Queue list_ capacity_) =
    capacity_


remove : a -> Queue a -> Queue a
remove element (Queue list_ capacity_) =
    Queue (List.filter (\x -> x /= element) list_) capacity_


{-| Remove x from Queue if property x == preperty element.
-}
removeUsingProperty : (a -> b) -> a -> Queue a -> Queue a
removeUsingProperty property element (Queue list_ capacity_) =
    Queue (List.filter (\x -> property x /= property element) list_) capacity_


removeWithPredicate : (a -> Bool) -> Queue a -> Queue a
removeWithPredicate predicate (Queue list_ capacity_) =
    Queue (List.filter (not << predicate) list_) capacity_


enqueue : a -> Queue a -> Queue a
enqueue element (Queue list_ capacity_) =
    case List.length list_ == capacity_ of
        True ->
            Queue (element :: allButLast list_) capacity_

        False ->
            Queue (element :: list_) capacity_


enqueueUnique : a -> Queue a -> Queue a
enqueueUnique element queue =
    enqueue element (remove element queue)


replaceUsingPredicate : (a -> Bool) -> a -> Queue a -> Queue a
replaceUsingPredicate predicate element (Queue l c) =
    Queue (Utility.replaceIf predicate element l) c


enqueueUniqueWithProperty : (a -> b) -> a -> Queue a -> Queue a
enqueueUniqueWithProperty property element queue =
    enqueue element (removeUsingProperty property element queue)


dropLast : Queue a -> Queue a
dropLast (Queue list_ capacity_) =
    Queue (allButLast list_) capacity_


first : Queue a -> Maybe a
first (Queue list_ capacity_) =
    List.head list_


last : Queue a -> Maybe a
last (Queue list_ capacity_) =
    List.drop (List.length list_ - 1) list_ |> List.head


allButLast : List a -> List a
allButLast list_ =
    let
        n =
            List.length list_
    in
    List.take (n - 1) list_
