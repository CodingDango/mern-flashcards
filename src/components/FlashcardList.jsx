import Flashcard from "./FlashCard";

const FlashcardList = ({flashcards}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(280px,_auto)] gap-my-sm'>
      {flashcards.map((flashcard, idx) => (
        <Flashcard
          optionsMenuId={`flashcard-${idx}`} 
          topic={flashcard.topic} 
          question={flashcard.question}
          answer={flashcard.answer}
          key={idx}
        />
      ))}
    </div>
  );
}

export default FlashcardList;