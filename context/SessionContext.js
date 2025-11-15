'use client';

import { createContext, useContext } from "react";

export const SessionContext = createContext({});
export const useSessionContext = () => useContext(SessionContext);