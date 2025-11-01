"use server";

import axios from "axios";

const DECK_ENDPOINT = "http://localhost:3000/api/decks";
const CARDS_ENDPOINT = "http://localhost:3000/api/cards"

// deck is {title, colorIdx, iconKey}
export async function createDeck(deck) {
  const res = await axios.post(
    DECK_ENDPOINT,
    JSON.stringify(deck)
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

export async function editDeck({ deckId, data }) {
  const res = await axios.put(
    DECK_ENDPOINT,
    JSON.stringify({ action: "edit", deckId, data})
  );

  return res.status;
}

export async function getAllCardsWithDeck() {
  const res = await axios.get(CARDS_ENDPOINT);
  return res.data;
}

export async function addCard({deckId, question, answer}) {
  const res = await axios.post(
    CARDS_ENDPOINT,
    JSON.stringify({deckId, question, answer})
  );

  return res.data;
}


export async function toggleCardFavorite({ cardId }) {
  console.log('Okay, toggling favorites on card');

  const res = await axios.put(
    CARDS_ENDPOINT,
    JSON.stringify({ action: "favorite", cardId })
  );

  return res.data;
}