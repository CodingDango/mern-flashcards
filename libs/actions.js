'use server';

import axios from 'axios'

export async function createDeck(deck) {
  const res = await axios.post('http://localhost:3000/api/decks', JSON.stringify(deck));
  return res.data;
}

export async function getDecks() {
  const res = await axios.get('http://localhost:3000/api/decks');
  return res.data;
}