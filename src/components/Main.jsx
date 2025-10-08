import { IoIosAdd } from "react-icons/io";
import FlashcardList from "./FlashcardList";
import { usePopUpContext } from "../context/PopUpContext";

const Main = () => {
  const popUpContext = usePopUpContext();

  const flashcards = [
    {
      topic: "Web Development",
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis quas quisquam quasi cumque dolores. Quibusdam quis debitis alias molestiae?",
      answer: "I dont know",
    },
    {
      topic: "Web Development",
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis quas quisquam quasi cumque dolores. Quibusdam quis debitis alias molestiae?",
      answer: "I dont know",
    },
  ];

  return (
    <div className="flex flex-col gap-my-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Flash Cards Deck</h1>
        <button
          onClick={() => popUpContext.openPopUp("Hello world")}
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
