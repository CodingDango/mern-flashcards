'use client'

import { getDecks } from "@/libs/actions";
import { useQuery } from "@tanstack/react-query";

export default function FlashcardsMain() {
  const { data: {data}, isLoading, error } = useQuery({
    queryKey: ['flashcards'],
    queryFn: getDecks
  });

  return (
    <>
      {isLoading && <p>{isLoading ? 'Loading...' : ''}</p>}
      {error && <p>{error}</p>}
      
      <div>
        {data && JSON.stringify(data)}
      </div>
    </>
  );
}