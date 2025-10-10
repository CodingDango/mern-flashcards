import { IoIosAdd } from "react-icons/io";
import { usePopUpContext } from "../context/PopUpContext";
import { useFlashcardsContext } from "../context/FlashcardsContext";
import FlashcardList from "./FlashcardList";
import AddCardForm from "./AddCardForm";

const Main = () => {
  const { openPopUp } = usePopUpContext();
  const { flashcards, setFlashcards, addFlashcard } = useFlashcardsContext();

  return (
    <div className="flex flex-col gap-my-md">

      <div className="flex flex-col 2xs:flex-row 2xs:justify-between items-center gap-my-sm">
        <h1 className="2xs:flex-1 text-2xl font-medium">Flash Cards Deck</h1>
        <button
          onClick={() => openPopUp("Add Flash Card", <AddCardForm addFlashcard={addFlashcard}/>)}
          className="w-full 2xs:w-auto button button--white"
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
