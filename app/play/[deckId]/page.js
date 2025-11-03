'use client'

import AppLayout from "@/components/AppLayout";
import Sidebar from "@/components/Sidebar";
import { use, useEffect } from "react";
import { updateLastStudiedDeck } from "@/libs/actions";
import { useMutation } from "@tanstack/react-query";

const StudyPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { deckId: itemId } = unwrappedParams; 

  const { mutate } = useMutation({
    mutationFn: updateLastStudiedDeck
  });

  useEffect(() => {
    mutate({ itemId });
  }, [mutate, itemId]);

  return (
    <AppLayout>
      <Sidebar/>
      <h1>Studying!</h1>
    </AppLayout>
  );
};

export default StudyPage;
