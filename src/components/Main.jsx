import { IoIosAdd } from "react-icons/io";
import { usePopUpContext } from "../context/PopUpContext";
import { useState } from 'react';
import FlashcardList from "./FlashcardList";
import AddCardForm from "./AddCardForm";

const Main = () => {
  const popUpContext = usePopUpContext();
  const [flashcards, setFlashcards] = useState([]);

  return (
    <div className="flex flex-col gap-my-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Flash Cards Deck</h1>
        <button
          onClick={() => popUpContext.openPopUp("Add Flash Card", <AddCardForm setFlashcards={setFlashcards}/>)}
          className="button button--white"
        >
          <span className="flex gap-my-xs items-center font-medium">
            Add Card
            <IoIosAdd size={24} />
          </span>
        </button>
      </div>

      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default Main;
