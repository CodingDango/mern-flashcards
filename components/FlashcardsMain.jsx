'use client'

import { getDecks } from "@/libs/actions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllCards } from "@/libs/actions";
import { useModalContext } from "@/context/ModalContext";

import Main from "./Main";
import CardFilters from "./CardFilters";
import CardList from "./CardList";
import AddCardForm from "./AddCardForm";

const filterStateDefault = {
  category: "all",
  searchQuery: "",
  status: "all",
  sortBy: "newestCreated",
}

export default function FlashcardsMain() {
  const [filters, setFilters] = useState({...filterStateDefault});
  const { openModal, closeModal } = useModalContext()

  const handleFilterChange = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ['cards'],
    queryFn: getAllCards
  })

  const handleAddCard = () => {
    openModal('Add Card', <AddCardForm closeModal={closeModal}/>)
  }

  const allCards = data?.data || [];

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
        onReset={() => setFilters({...filterStateDefault})}
        onAddCard={handleAddCard}
      />

      <CardList
        allCards={allCards}
        filteredCards={allCards}
        isFetching={isLoading}
      />
    </Main>
  )
}