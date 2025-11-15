"use client";

import { useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import { createClient } from "@/libs/supabase/browser";

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({});
  const supabase = createClient();

  useEffect(() => {
    // This is the core listener.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session change!', session);
      setSession(session); // Update our state with the new session
    });

    // This is the cleanup function. It runs when the component unmounts.
    return () => {
      subscription.unsubscribe();
    };
  }, []); // The empty array [] ensures this runs only once when the app loads.

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
