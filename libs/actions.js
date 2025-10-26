"use server";

import axios from "axios";

const DECK_ENDPOINT = "http://localhost:3000/api/decks";

// deck is {title, colorIdx, iconKey}
export async function createDeck({ title, colorIdx, iconKey }) {
  const res = await axios.post(
    DECK_ENDPOINT,
    JSON.stringify({ title, colorIdx, iconKey })
  );

  return res.data;
}

export async function getDecks() {
  const res = await axios.get(DECK_ENDPOINT);
  return res.data;
}

export async function toggleDeckFavorite({ deckId }) {
  const res = await axios.put(
    DECK_ENDPOINT,
    JSON.stringify({ action: "favorite", deckId })
  );

  return res.data;
}

export async function removeDeck({ deckId }) {
  const res = await axios.delete(
    DECK_ENDPOINT,
    { data: JSON.stringify({ deckId })}
  );

  return res.data;
}