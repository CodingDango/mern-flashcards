'use client'

import { FaPlusCircle } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import { FaSliders } from 'react-icons/fa6';
import { FaChevronDown } from 'react-icons/fa6';
import { useModalContext } from "@/context/ModalContext";
import { BsFilter } from 'react-icons/bs';
import { useFlashcardsContext } from "@/context/FlashcardsContext";
import { useState } from "react";

import AddDeckForm from "./AddDeckForm";
import DeckList from "./DeckList";
import FilterDropdown from "./FilterDropdown";

const DeckPageMain = () => {
  const { openModal, closeModal } = useModalContext();
  const { flashcards, setFlashcards, addFlashcard } = useFlashcardsContext();
  const [decks, setDecks] = useState([
    {
      id: 'deck-1',
      title: 'Web Development',
      cardCount: 4,
      progress: '50'
    },
  ]);

  return (
    <main className="flex flex-col gap-my-lg py-my-lg px-8">

      <div className="flex flex-col 2xs:flex-row 2xs:justify-between items-end gap-my-sm">
        <div className="flex gap-my-md items-end">
          <h1 className="2xs:flex-1 text-3xl font-medium">My Decks</h1>
          <p className="text-black-light">6 decks</p>
        </div>
      </div>

      <section>
        <div className="flex flex-col gap-my-md">
          <ul className="flex gap-my-xs">
            <li>
              <button className="button button--white w-[150px]">
                <div className="w-full flex justify-between items-center gap-my-xs font-normal">
                  <span>All</span>
                  <span className="px-3 bg-black-xs/30 rounded-md">6</span>
                </div>
              </button>
            </li>
            <li>
              <button className="button bg-black-lg text-black-light w-[150px] border border-black-md">
              <div className="w-full flex justify-between items-center gap-my-xs font-normal">
                  <span>Favorites</span>
                  <span className="px-3 bg-black-xs/30 rounded-md">2</span>
                </div>
              </button>
            </li> 
          </ul>

          <div className="grid grid-cols-2 gap-my-md">
            <div className="flex items-center bg-black-xl border border-black-md px-4 py-3 rounded-md">
              <div className="pr-4 border-r border-black-xs">
                <FaSearch size={20} className="text-black-light"/>
              </div>
                
              <input 
                placeholder="Search for a deck by topic"
                className="pl-4 flex-1 bg-transparent outline-none"
              />
            </div>

            <div className="flex gap-my-md">

              <FilterDropdown
                text={'filters'}
                id={'filters-options'}
                options={[{text: 'Finished'}, {text: 'Not Started'}]}
                icon={FaSliders}
              />

              <FilterDropdown
                text={'time'}
                id={'time-filters-options'}
                options={[{text: 'Newest Created'}, {text: 'Oldest Created'}, {text: 'Newest Studied'}, {text: 'Oldest Studied'}]}
                icon={BsFilter}
              />

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