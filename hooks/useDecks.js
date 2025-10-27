// hooks/useDecks.js
import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDecks,
  toggleDeckFavorite,
  removeDeck,
  editDeck,
} from "../libs/actions"; // Import your API functions

// A custom hook is just a function that starts with "use" and calls other hooks.
export function useDecks() {
  const queryClient = useQueryClient();

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
  const toggleFavoriteMutation = useMutation({
    mutationFn: toggleDeckFavorite,

    onMutate: async ({ deckId }) => {
      await queryClient.cancelQueries({ queryKey: ["decks"] });
      const previousDecksData = queryClient.getQueryData(["decks"]);

      queryClient.setQueryData(["decks"], (oldData) => {
        if (!oldData || !oldData.data) return oldData;

        const updatedDecks = oldData.data.map((deck) => {
          if (String(deck.id) === String(deckId)) {
            return { ...deck, isFavorite: !deck.isFavorite };
          }
          return deck;
        });

        return { ...oldData, data: updatedDecks };
      });

      return { previousDecksData };
    },

    onError: (err, deckId, context) => {
      queryClient.setQueryData(["decks"], context.previousDecks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });

  const removeDeckMutation = useMutation({
    mutationFn: removeDeck,
    onMutate: async ({ deckId }) => {
      await queryClient.cancelQueries({ queryKey: ["decks"] });
      const previousDecksData = queryClient.getQueryData(["decks"]);

      queryClient.setQueryData(["decks"], (oldData) => {
        const { data: decks } = oldData;

        if (!oldData || !decks) return oldData;

        const filteredDecks = decks.filter((deck) => deck.id !== deckId);
        return { ...oldData, data: filteredDecks };
      });

      return { previousDecksData };
    },
    onError: (err, deckId, context) => {
      queryClient.setQueryData(["decks"], context.previousDecks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });

  const editDeckMutation = useMutation({
    mutationFn: editDeck,
    // data is title, icon, and color
    onMutate: async ({ deckId, data: { title, iconIdx, colorIdx } }) => {
      await queryClient.cancelQueries({ queryKey: ["decks"] });
      const previousDecksData = queryClient.getQueryData(["decks"]);
      
      queryClient.setQueryData(["decks"], (oldData) => {
        const { data: decks } = oldData;

        if (!oldData || !decks) return oldData;

        const deckIdx = decks.findIndex((deck) => deck.id === deckId);

        if (deckIdx >= 0) {
          console.log(`editing deck ${deckIdx}`);
        }

        return { ...oldData, data: decks };
      });

      return { previousDecksData };
    },
    onError: (err, deckId, context) => {
      queryClient.setQueryData(["decks"], context.previousDecks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });

  // HANDLERS
  const handleToggleFavorite = (deckId) =>
    toggleFavoriteMutation.mutate({ deckId });

  const handleRemoveDeck = (deckId) => 
    removeDeckMutation.mutate({ deckId });

  const handleEdit = (deckId, data) =>
    editDeckMutation.mutate({ deckId, data });

  // FILTER STATE
  const [filters, setFilters] = useState({
    category: "all",
    searchQuery: "",
    status: "all",
    sortBy: "newestCreated",
  });
  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));
  const resetFilters = () =>
    setFilters({
      /* ... */
    });

  const allDecks = useMemo(() => responseData?.data || [], [responseData]);

  const filteredDecks = useMemo(() => {
    const { searchQuery } = filters;
    return allDecks.filter((deck) =>
      deck.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
    handleEdit,
  };
}
