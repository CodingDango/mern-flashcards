'use client'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDecks } from "@/libs/actions";
import { useMemo, useState } from "react";
import { useModalContext } from "@/context/ModalContext";
import { toggleDeckFavorite } from "@/libs/actions";

import DeckList from "./DeckList";
import DeckFilters from "./DeckFilters";
import AddDeckForm from "./AddDeckForm";
import Main from "./Main";

const DeckPageMain = () => {
  const queryClient = useQueryClient();

  const { openModal, closeModal } = useModalContext();
  
  const { data: responseData, isLoading, error } = useQuery({
    queryKey: ['decks'],
    queryFn: getDecks,
    refetchOnWindowFocus: false
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: toggleDeckFavorite, 

    onMutate: async ({ deckId }) => {
      await queryClient.cancelQueries({ queryKey: ['decks'] });
      const previousDecksData = queryClient.getQueryData(['decks']);

      queryClient.setQueryData(['decks'], (oldData) => {
        if (!oldData || !oldData.data) return oldData;

        const updatedDecks = oldData.data.map(deck => {
          // THE FIX: Compare them as strings so types don't matter.
          if (String(deck.id) === String(deckId)) {
            return { ...deck, isFavorite: !deck.isFavorite };
          }
          return deck;
        });

        return { ...oldData, data: updatedDecks };
      });

      return { previousDecksData };
    },

    // If the mutation fails, use the context we returned from onMutate to roll back
    onError: (err, deckId, context) => {
      queryClient.setQueryData(['decks'], context.previousDecks);
      // You would also show a toast notification here, e.g., toast.error("Failed to update favorite");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
  });

  // A simple handler to call the mutation
  const handleToggleFavorite = (deckId) => {
    toggleFavoriteMutation.mutate({ deckId });
  };

  const [filters, setFilters] = useState({
    category: "all",
    searchQuery: "",
    status: "all",
    sortBy: "newestCreated",
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      searchQuery: "",
      status: "all",
      sortBy: "newestCreated",
    });
  };

  const handleAddDeck = () => {
    openModal("Add Deck", <AddDeckForm {...{ closeModal }} />);
  };

  const allDecks = responseData?.data || [];
  const filteredDecks = useMemo(() => {
    const { searchQuery } = filters;
    return allDecks.filter((deck) =>
      deck.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allDecks, filters]);

  return (
    <Main>
      <div className="flex flex-col 2xs:flex-row 2xs:justify-between items-end gap-my-sm">
        <div className="flex gap-my-md items-end">
          <h1 className="2xs:flex-1 text-3xl font-medium">My Decks</h1>
          <p className="text-black-light">{allDecks.length} decks</p>
        </div>
      </div>

      <DeckFilters
        allDecks={allDecks}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
        onAddDeck={handleAddDeck}
      />

      <DeckList
        allDecks={allDecks}
        filteredDecks={filteredDecks}
        isFetching={isLoading}
        onToggleFavorite={handleToggleFavorite}
      />
    </Main>
  );``
};

export default DeckPageMain;