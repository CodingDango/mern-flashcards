import { createContext, useContext } from "react";

export const PopUpContext = createContext({});
export const usePopUpContext = () => useContext(PopUpContext);