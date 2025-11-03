import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCardsWithDeck } from "../libs/actions";
import { deckIcons, deckThemeColors } from "@/libs/config";
import { filter } from "lodash";


const filterStateDefault = {
  deckId: null,
  searchQuery: "",
  category: "all",
  sortBy: "newestCreated",
};

// A custom hook is just a function that starts with "use" and calls other hooks.
export function useCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cards"],
    queryFn: getAllCardsWithDeck,
    refetchOnWindowFocus: false,
  });

  // FILTER STATE
  const [filters, setFilters] = useState({ ...filterStateDefault });

  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  const resetFilters = () => setFilters({ ...filterStateDefault });

  const allCards = useMemo(() => data?.data.cards || [], [data]);
  const allDecks = useMemo(() => data?.data?.decks || [], [data]);

  const filteredCards = useMemo(() => {
    const { searchQuery, category, sortBy } = filters;

    let filtered = [...allCards].filter((card) =>
      card.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered = filtered.filter((card) =>
      category === "favorites" ? card.isFavorite : true
    );

    filtered = filtered.filter((card) => filters.deckId === null ? true : card.deckId === filters.deckId );

    const sortedAndFiltered = filterBySort(filtered, sortBy);

    return sortedAndFiltered;
  }, [allCards, filters]);

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

  // The hook returns an object with everything the UI component needs.
  return {
    isLoading,
    error,
    allCards,
    filteredCards,
    filters,
    handleFilterChange,
    resetFilters,
    decksAsOptions
  };
}

function filterBySort(cards, sortBy) {
  // sortBy can be newestCreated or oldestCreated. which uses the dateCreated property of the card. its uh, its a string, or utc iso string.
  // sortBy can also be newestStudied and oldestStudied. which uses the lastStudied property. its also a utc iso string.

  let sortedCards = [...cards];

  switch (sortBy) {
    case "newestCreated":
      sortedCards.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      break;

    case "oldestCreated":
      sortedCards.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      break;
  }

  return sortedCards;
}
