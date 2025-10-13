'use client'

import { FaPlusCircle } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { FaSearch } from 'react-icons/fa';
import { FaSliders } from 'react-icons/fa6';
import { useModalContext } from "@/context/ModalContext";
import { BsFilter } from 'react-icons/bs';
import { useEffect, useState } from "react";

import AddDeckForm from "./AddDeckForm";
import DeckList from "./DeckList";
import FilterDropdown from "./FilterDropdown";
import FilterTab from "./FilterTab";

const favoriteDecks = 4;


const DeckPageMain = () => {
  const { openModal, closeModal } = useModalContext();
  const [decks, setDecks] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    searchQuery: '',
    status: 'all',
    sortBy: 'newestCreated'
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({...prev, [name]: value}));
  }

  const resetFilters = () => setFilters({
    category: 'all',
    searchQuery: '',
    status: 'all',
    sortBy: 'newestCreated'
  });
    

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <main className="flex flex-col gap-my-lg py-my-lg px-8">

      <div className="flex flex-col 2xs:flex-row 2xs:justify-between items-end gap-my-sm">
        <div className="flex gap-my-md items-end">
          <h1 className="2xs:flex-1 text-3xl font-medium">My Decks</h1>
          <p className="text-black-light">{decks.length} decks</p>
        </div>
      </div>

      <section>
        <div className="flex flex-col gap-my-md">
          <ul className="flex gap-my-xs">
            <li>
              <FilterTab
                name={'category'}
                value={'all'}
                label={'All'}
                count={decks.length}
                isActive={filters.category === 'all'}
                onFilterChange={handleFilterChange}
              />
            </li>
            <li>
              <FilterTab
                name={'category'}
                value={'favorites'}
                label={'Favorites'}
                count={favoriteDecks}
                isActive={filters.category === 'favorites'}
                onFilterChange={handleFilterChange}
              />
            </li> 
          </ul>

          <div className="grid grid-cols-[2fr_3fr] gap-my-md">
            <div className="flex items-center bg-black-xl border border-black-md px-4 py-3 rounded-md">
              <div className="pr-4 border-r border-black-xs">
                <FaSearch size={20} className="text-black-light"/>
              </div>
                
              <input 
                placeholder="Search for a deck by topic"
                className="pl-4 flex-1 bg-transparent outline-none"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              />
            </div>

            <div className="flex gap-my-md">
              
              <FilterDropdown
                id={'filters-options'}
                name={'status'}
                handleFilterChange={handleFilterChange}
                options={[
                  {text: 'All', value: 'all'}, 
                  {text: 'Unfinished', value: 'unfinished'}, 
                  {text: 'Not Started', value: 'notStarted'}, 
                  {text: 'Finished', value: 'finished'}
                ]}
                icon={FaSliders}
              />

              <FilterDropdown
                id={'time-filters-options'}
                name={'sortBy'}
                handleFilterChange={handleFilterChange}
                options={[
                  {text: 'Newest Created', value: 'newestCreated'}, 
                  {text: 'Oldest Created', value: 'oldestCreated'}, 
                  {text: 'Newest Studied', value: 'newestStudied'}, 
                  {text: 'Oldest Studied', value: 'oldestStudied'}
                ]}
                icon={BsFilter}
              />

              <button className="button button--white" onClick={() => resetFilters()}>
                <RiResetLeftFill size={24}/>
              </button>

              <button
                onClick={() => openModal(
                  "Add Deck", 
                  <AddDeckForm setDecks={setDecks} closeModal={closeModal}/>
                )}
                className="flex-1 2xs:w-auto button button--white"
              >
                <span className="flex gap-my-xs items-center">
                  <FaPlusCircle/>
                  Add Deck
                </span>
              </button>
            </div>

          </div>
        </div>
      </section> 

      <DeckList decks={decks}/>
    </main>
  );
};

export default DeckPageMain;