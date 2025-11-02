import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToggleFavoriteMutation } from "./useToggleFavoriteMutation";
import { useRemoveMutation } from "./useRemoveMutation";
import {
  getDecks,
  toggleDeckFavorite,
  removeDeck,
  editDeck,
} from "../libs/actions"; 

const filterStateDefault = {
  category: "all",
  searchQuery: "",
  status: "all",
  sortBy: "newestCreated",
}

// A custom hook is just a function that starts with "use" and calls other hooks.
export function useDecks() {
  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["decks"],
    queryFn: getDecks,
    refetchOnWindowFocus: false,
  });

  // MUTATIONS (I've collapsed them for brevity, but it's your exact code)
  const { mutate: toggleFavoriteMutate } = useToggleFavoriteMutation(
    ["decks"],
    toggleDeckFavorite,
    "decks"
  );

  const { mutate: removeDeckMutate } = useRemoveMutation(
    ['decks'],
    removeDeck,
    'decks'
  );

  // HANDLERS
  const handleToggleFavorite = (deckId) =>
    toggleFavoriteMutate({ itemId: deckId });

  const handleRemoveDeck = (deckId) => 
    removeDeckMutate({ itemId: deckId });

  // FILTER STATE
  const [filters, setFilters] = useState({...filterStateDefault});
  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));
  const resetFilters = () =>
    setFilters({...filterStateDefault})

  const allDecks = useMemo(() => responseData?.data.decks || [], [responseData]);

  const filteredDecks = useMemo(() => {
    const { searchQuery, category } = filters;

    return allDecks
      .filter((deck) => deck.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((deck) => category === 'favorites' ? deck.isFavorite : true);
  }, [allDecks, filters]);

  // The hook returns an object with everything the UI component needs.
  return {
    isLoading,
    error,
    allDecks,
    filteredDecks,
    filters,
    handleFilterChange,
    resetFilters,
    handleToggleFavorite,
    handleRemoveDeck,
  };
}
