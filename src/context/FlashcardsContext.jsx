import { createContext, useContext } from "react";

export const FlashcardsContext = createContext({});
export const useFlashcardsContext = () => useContext(FlashcardsContext);