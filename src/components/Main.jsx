import { FaPlusCircle } from "react-icons/fa";
import { usePopUpContext } from "../context/PopUpContext";
import { useFlashcardsContext } from "../context/FlashcardsContext";
import FlashcardList from "./FlashcardList";
import AddCardForm from "./AddCardForm";

const Main = () => {
  const { openPopUp } = usePopUpContext();
  const { flashcards, setFlashcards, addFlashcard } = useFlashcardsContext();

  return (
    <main className="flex flex-col gap-my-lg py-8 px-8">

      <div className="flex flex-col 2xs:flex-row 2xs:justify-between items-end gap-my-sm">
        <div className="flex gap-my-md items-end">
          <h1 className="2xs:flex-1 text-3xl font-medium">My Decks</h1>
          <p className="text-black-light">6 decks</p>
        </div>

        <button
          onClick={() => openPopUp("Add Flash Card", <AddCardForm addFlashcard={addFlashcard}/>)}
          className="w-full 2xs:w-auto button button--primary"
        >
          <span className="flex gap-my-xs items-center font-medium">
            <FaPlusCircle/>
            Add new Deck
          </span>
        </button>
      </div>

      <section>
        <ul className="flex gap-my-xs">
          <li>
            <button className="button button--primary w-[150px]">
              <div className="w-full flex justify-between items-center gap-my-xs font-normal">
                <span>All</span>
                <span className="px-3 bg-black-xs/30 rounded-md">6</span>
              </div>
            </button>
          </li>
          <li>
            <button className="button bg-black-md text-black-light w-[150px]">
            <div className="w-full flex justify-between items-center gap-my-xs font-normal">
                <span>Favorites</span>
                <span className="px-3 bg-black-xs/30 rounded-md">2</span>
              </div>
            </button>
          </li>
        </ul>
      </section>

      <section>
        <div className="grid grid-cols-[1fr_auto] gap-my-sm">
          <input 
            placeholder="Search for a deck by topic"
            className="bg-black-md px-4 py-3 rounded-md"
          />

          <div className="flex gap-my-sm">
            <button className="button button--white">Filters</button>
            <button className="button button--white">Time</button>
          </div>
        </div>
      </section>

      <FlashcardList flashcards={flashcards} />
    </main>
  );
};

export default Main;
