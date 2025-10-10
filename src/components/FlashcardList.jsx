import { MdAddCard } from "react-icons/md";
import Flashcard from "./FlashCard";

const FlashcardList = ({ flashcards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(280px,_auto)] gap-my-md">
      {flashcards.length > 0 &&
        flashcards.map((flashcard, idx) => (
          <Flashcard
            key={flashcard.id}
            topic={flashcard.topic}
            question={flashcard.question}
            answer={flashcard.answer}
            flashcardId={flashcard.id}
          />
        ))}

      {flashcards.length === 0 && (
        <div className="grid place-items-center col-span-full">
          <div className="flex items-center flex-col gap-my-sm">
              <div className="bg-my-primary/75 p-my-sm rounded-full">
                <MdAddCard size={50} />
              </div>
              <div className="flex flex-col gap-my-xs text-center">
                <h2 className="text-xl">Add a Card</h2>
                <p>Flashcards appear here after you add them with the Add Card button.</p>
              </div>
            </div>
        </div>
        
      )}
    </div>
  );
};

export default FlashcardList;
