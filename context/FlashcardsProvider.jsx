'use client';

import { useEffect, useState } from "react";
import { FlashcardsContext } from "./FlashcardsContext";

const FlashcardsProvider = ({children}) => {
  const [flashcards, setFlashcards] = useState(() => {
    const savedFlashcards = localStorage.getItem('flashcards');

    if (savedFlashcards) {
      try {
        return JSON.parse(savedFlashcards);
      } catch (err) {
        console.log(`Could not load localStorage flashcards: ${err}`);
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const valueToProvide = { 
    setFlashcards, 
    addFlashcard(topic, question, answer) {
      setFlashcards(prev => [...prev, {
        topic, 
        question, 
        answer, 
        id: `flashcard-${prev.length}`
      }]);
    },

    flashcards,
  };

  return (
    <FlashcardsContext.Provider value={valueToProvide}>
      {children}
    </FlashcardsContext.Provider>
  );
}


export default FlashcardsProvider;