import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToggleFavoriteMutation } from "./useToggleFavoriteMutation";
import { useRemoveMutation } from "./useRemoveMutation";
import {
  getAllCardsWithDeck,
  toggleDeckFavorite,
  removeDeck,
  editDeck,
} from "../libs/actions";
import { DateTime } from "luxon";

const filterStateDefault = {
  category: "all",
  searchQuery: "",
  status: "all",
  sortBy: "newestCreated",
};

// A custom hook is just a function that starts with "use" and calls other hooks.
export function useDecks() {
  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["decks"],
    queryFn: getAllCardsWithDeck,
    refetchOnWindowFocus: false,
  });

  // MUTATIONS (I've collapsed them for brevity, but it's your exact code)
  const { mutate: toggleFavoriteMutate } = useToggleFavoriteMutation(
    ["decks"],
    toggleDeckFavorite,
    "decks"
  );

  const { mutate: removeDeckMutate } = useRemoveMutation(
    ["decks"],
    removeDeck,
    "decks"
  );

  // HANDLERS
  const handleToggleFavorite = (deckId) =>
    toggleFavoriteMutate({ itemId: deckId });

  const handleRemoveDeck = (deckId) => removeDeckMutate({ itemId: deckId });

  // FILTER STATE
  const [filters, setFilters] = useState({ ...filterStateDefault });
  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));
  const resetFilters = () => setFilters({ ...filterStateDefault });

  const allDecks = useMemo(
    () => responseData?.data?.decks || [],
    [responseData]
  );

  const allCards = useMemo(
    () => responseData?.data?.cards || [],
    [responseData]
  );

  const deckProgressMap = useMemo(() => {
    return new Map(
      allDecks.map((deck) => {
        const cardsOfDeck = allCards.filter((card) => card.deckId === deck.id);
        const deckProgress = getDeckProgress(cardsOfDeck);
        return [deck.id, deckProgress];
      })
    );
  }, [allCards, allDecks]);

  const filteredDecks = useMemo(() => {
    const { searchQuery, category, sortBy, status } = filters;

    let filtered = [...allDecks].filter((deck) =>
      deck.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered = filtered.filter((deck) =>
      category === "favorites" ? deck.isFavorite : true
    );

    filtered = filterByProgress(filtered, deckProgressMap, status);

    const sortedAndFiltered = sortByDate(filtered, sortBy);

    return sortedAndFiltered;
  }, [allDecks, filters, deckProgressMap]);

  return {
    isLoading,
    error,
    allDecks,
    allCards,
    filteredDecks,
    filters,
    deckProgressMap,
    handleFilterChange,
    resetFilters,
    handleToggleFavorite,
    handleRemoveDeck,
  };
}

function filterByProgress(decks, deckProgressMap, filterBy) {
  console.log(deckProgressMap);

  switch (filterBy) {
    case "unfinished":
      return decks.filter((deck) => deckProgressMap.get(deck.id) < 100);

    case "finished":
      return decks.filter((deck) => deckProgressMap.get(deck.id) === 100);
  }

  return decks;
}

export function sortByDate(decks, sortBy) {
  // sortBy can be newestCreated or oldestCreated. which uses the dateCreated property of the card. its uh, its a string, or utc iso string.
  // sortBy can also be newestStudied and oldestStudied. which uses the lastStudied property. its also a utc iso string.

  let sortedDecks = [...decks];

  switch (sortBy) {
    case "newestCreated":
      sortedDecks.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      break;

    case "oldestCreated":
      sortedDecks.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      break;

    case "newestReviewed":
      sortedDecks.sort((a, b) => {
        if (a.lastReviewed === null && b.lastReviewed === null) return 0;
        if (a.lastReviewed === null) return 1;
        if (b.lastReviewed === null) return -1;

        return new Date(b.lastReviewed) - new Date(a.lastReviewed);
      });
      break;

    case "oldestReviewed":
      sortedDecks.sort((a, b) => {
        if (a.lastReviewed === null && b.lastReviewed === null) return 0;
        if (a.lastReviewed === null) return -1;
        if (b.lastReviewed === null) return 1;

        return new Date(a.lastReviewed) - new Date(b.lastReviewed);
      });
      break;
  }

  return sortedDecks;
}

export function getDeckProgress(cards) {
  if (!cards || cards?.length === 0) return 0;

  const corrects = cards.filter((card) => card?.answered).length;
  return Math.floor((corrects / cards.length) * 100);
}
