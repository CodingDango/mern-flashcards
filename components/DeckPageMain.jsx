"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDecks, removeDeck } from "@/libs/actions";
import { useMemo, useState } from "react";
import { useModalContext } from "@/context/ModalContext";
import { toggleDeckFavorite } from "@/libs/actions";
import { useDecks } from "@/hooks/useDecks";

import DeckList from "./DeckList";
import DeckFilters from "./DeckFilters";
import AddDeckForm from "./AddDeckForm";
import Main from "./Main";

const DeckPageMain = () => {
  const { openModal, closeModal } = useModalContext();
    
  const {
    isLoading,
    allDecks,
    filteredDecks,
    filters,
    resetFilters,
    handleFilterChange,
    handleToggleFavorite,
    handleRemoveDeck,
    handleEdit,
  } = useDecks();

  const handleAddDeck = () => {
    openModal("Add Deck", <AddDeckForm {...{ closeModal }} />);
  };

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
        onRemove={handleRemoveDeck}
        onEdit={handleEdit}
      />
    </Main>
  );
};

export default DeckPageMain;
