"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAllCardsWithDeck, toggleCardFavorite } from "@/libs/actions";
import { useModalContext } from "@/context/ModalContext";
import { useToggleFavoriteMutation } from "@/hooks/useToggleFavoriteMutation";

import Main from "./Main";
import CardFilters from "./CardFilters";
import CardList from "./CardList";
import AddCardForm from "./AddCardForm";
import { deckThemeColors, deckIcons } from "@/libs/config";
import EditCardForm from "./EditCardForm";

const filterStateDefault = {
  category: "all",
  searchQuery: "",
  deckId: null,
  sortBy: "newestCreated",
};

export default function FlashcardsMain() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ ...filterStateDefault });
  const { openModal, closeModal } = useModalContext();

  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  const { data, isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: getAllCardsWithDeck,
  });

  const allCards = data?.data?.cards || [];
  const allDecks = data?.data?.decks || [];

  const decksAsOptions = useMemo(
    () =>
      allDecks.map((deck) => {
        const deckColor = deckThemeColors[deck.colorIdx];
        const DeckIcon = deckIcons[deck.iconIdx];

        return {
          value: deck.id,
          text: deck.title,
          icon: (
            <span
              style={{ background: deckColor }}
              className="p-1 rounded-full"
            >
              <DeckIcon size={16} />
            </span>
          ),
        };
      }),
    [allDecks]
  );

  const handleAddCard = () => {
    openModal(
      "Add Card",
      <AddCardForm closeModal={closeModal} decksAsOptions={decksAsOptions} />
    );
  };

  const handleEditCard = (card) => {
    openModal(
      "Add Card",
      <EditCardForm closeModal={closeModal} decksAsOptions={decksAsOptions} card={card}/>
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
        onReset={() => setFilters({ ...filterStateDefault })}
        onAddCard={handleAddCard}
        decksAsOptions={decksAsOptions}
        allCards={allCards}
      />

    <CardList
        allCards={allCards}
        filteredCards={allCards}
        isFetching={isLoading}
        handleEditCard={handleEditCard}
      />
    </Main>
  );
}
