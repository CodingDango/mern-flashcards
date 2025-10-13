import { createContext, useContext } from "react";

export const OptionsMenuManagerContext = createContext({});
export const useOptionsMenuManagerContext = () => useContext(OptionsMenuManagerContext);