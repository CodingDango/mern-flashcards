"use client";

import { useModalContext } from "@/context/ModalContext";
import { useCards } from "@/hooks/useCards";
import Main from "./Main";
import CardFilters from "./CardFilters";
import CardList from "./CardList";
import AddCardForm from "./AddCardForm";
import EditCardForm from "./EditCardForm";

const filterStateDefault = {
  category: "all",
  searchQuery: "",
  deckId: null,
  sortBy: "newestCreated",
};

export default function FlashcardsMain() {
  const {
    isLoading,
    error,
    filteredCards, // We only need the final, filtered list
    allCards, // For the total count
    allDecks,
    filters,
    handleFilterChange,
    resetFilters,
    decksAsOptions
  } = useCards();

  const { openModal, closeModal } = useModalContext();

  const handleAddCard = () => {
    openModal(
      "Add Card",
      <AddCardForm closeModal={closeModal} decksAsOptions={decksAsOptions} />
    );
  };

  const handleEditCard = (card) => {
    openModal(
      "Add Card",
      <EditCardForm
        closeModal={closeModal}
        decksAsOptions={decksAsOptions}
        card={card}
      />
    );
  };

  return (
    <Main>
      <div className="flex flex-col 2xs:flex-row 2xs:justify-between items-end gap-my-sm">
        <div className="flex gap-my-md items-end">
          <h1 className="2xs:flex-1 text-3xl font-medium">My Cards</h1>
          <p className="text-black-light">{allCards?.length || 0} cards</p>
        </div>
      </div>

      <CardFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
        onAddCard={handleAddCard}
        decksAsOptions={decksAsOptions}
        allCards={allCards}
      />

      <CardList
        allDecks={allDecks} 
        allCards={allCards}
        filteredCards={filteredCards}
        isFetching={isLoading}
        handleEditCard={handleEditCard}
      />
    </Main>
  );
}
