import Flashcard from "./FlashCard";

const FlashcardList = ({flashcards}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(280px,_auto)] gap-my-md'>
      {flashcards.map((flashcard, idx) => (
        <Flashcard
          optionsMenuId={`flashcard-options-${idx}`} 
          topic={flashcard.topic} 
          question={flashcard.question}
          answer={flashcard.answer}
          key={`flashcard-${idx}`}
        />
      ))}
    </div>
  );
}

export default FlashcardList;