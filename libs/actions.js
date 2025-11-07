"use server";

import axios from "axios";

const DECKS_ENDPOINT = "http://localhost:3000/api/decks";
const CARDS_ENDPOINT = "http://localhost:3000/api/cards"

// deck is {title, colorIdx, iconKey}
export async function createDeck(deck) {
  const res = await axios.post(
    DECKS_ENDPOINT,
    JSON.stringify(deck)
  );

  return res.data;
}

export async function getDecks() {
  const res = await axios.get(DECKS_ENDPOINT);
  return res.data;
}

export async function toggleDeckFavorite({ itemId }) {
  const res = await axios.put(
    DECKS_ENDPOINT,
    JSON.stringify({ action: "favorite", itemId})
  );

  return res.data;
}

export async function removeDeck({ itemId }) {
  const res = await axios.delete(
    DECKS_ENDPOINT,
    {data: JSON.stringify({ itemId })}
  );

  return res.data;
}

export async function editDeck({ itemId, newItemData }) {
  const res = await axios.put(
  DECKS_ENDPOINT,
    JSON.stringify({ action: "edit", itemId, newItemData})
  );

  return res.status;
}

export async function editCard({ itemId, newItemData }) {
  console.log('Lets go! editing card Lmao');
  
  const res = await axios.put(
    CARDS_ENDPOINT,
    JSON.stringify({ action: "edit", itemId, newItemData})
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


export async function toggleCardFavorite({ itemId }) {
  console.log('Okay, toggling favorites on card');

  const res = await axios.put(
    CARDS_ENDPOINT,
    JSON.stringify({ action: "favorite", itemId })
  );

  return res.data;
}

export async function removeCard({ itemId }) {
  const res = await axios.delete(
    CARDS_ENDPOINT,
    {data: JSON.stringify({ itemId })}
  );

  return res.data;
}

export async function updateLastReviewedDeck({ itemId }) {
  const res = await axios.put(
    DECKS_ENDPOINT,
    JSON.stringify({action: 'review', itemId})
  );

  return res.data;
}

export async function getCardsByDeck({ deckId }) {
  const res = await axios.get(
    CARDS_ENDPOINT,
    { params: {deckId} }
  );

  return res.data;
}

export async function updateDeckProgress({ itemId, newProgress }) {
  const res = await axios.put(
    DECKS_ENDPOINT,
    JSON.stringify({action: 'progress', itemId, newProgress })
  );

  return res.data;
}