"use client";

import { useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import { createClient } from "@/libs/supabase/browser";

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({});
  const [profile, setProfile] = useState(null);
  const user = session?.user;

  const supabase = createClient();

  useEffect(() => {
    if (!user?.id) return;

    const getProfile = async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setProfile(profile);
      }
    };

    getProfile();

    const channel = supabase
      .channel("realtime profiles")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setProfile(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  useEffect(() => {
    // This is the core listener.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update our state with the new session
    });

    // This is the cleanup function. It runs when the component unmounts.
    return () => {
      subscription.unsubscribe();
    };
  }, []); // The empty array [] ensures this runs only once when the app loads.

  return (
    <SessionContext.Provider value={{session, profile}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
