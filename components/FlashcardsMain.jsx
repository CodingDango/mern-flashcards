"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAllCardsWithDeck, toggleCardFavorite } from "@/libs/actions";
import { useModalContext } from "@/context/ModalContext";

import Main from "./Main";
import CardFilters from "./CardFilters";
import CardList from "./CardList";
import AddCardForm from "./AddCardForm";
import { deckThemeColors, deckIcons } from "@/libs/config";

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

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: toggleCardFavorite,
    onMutate: async ({ cardId }) => {
      debugger;

      await queryClient.cancelQueries({ queryKey: ["cards"] });
      const previousCardsWithDecks = queryClient.getQueryData(["cards"]);

      queryClient.setQueryData(["cards"], (oldData) => {
        if (!oldData || !oldData.data) return oldData;

        const previousDecks = oldData?.data?.decks;
        const previousCards = oldData?.data?.cards;

        const updatedCards = previousCards.map((card) => {
          if (String(card.id) === String(cardId)) {
            return { ...card, isFavorite: !card.isFavorite };
          }
          return card;
        });

        return {
          ...oldData,
          data: {
            cards: updatedCards,
            decks: previousDecks,
          },
        };
      });

      return { previousCardsWithDecks };
    },

    onError: (err, cardId, context) => {
      queryClient.setQueryData(["cards"], context.previousDecks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  const handleAddCard = () => {
    openModal(
      "Add Card",
      <AddCardForm closeModal={closeModal} decksAsOptions={decksAsOptions} />
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
      />

      <CardList
        allCards={allCards}
        filteredCards={allCards}
        isFetching={isLoading}
        toggleFavorite={toggleFavorite}
      />
    </Main>
  );
}
