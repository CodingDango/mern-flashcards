'use server';

import axios from 'axios'

// deck is {title, colorIdx, iconKey}
export async function createDeck({title, colorIdx, iconKey}) {
  const res = await axios.post(
    'http://localhost:3000/api/decks', 
    JSON.stringify({title, colorIdx, iconKey})
  );

  return res.data;
}

export async function getDecks() {
  const res = await axios.get('http://localhost:3000/api/decks');
  return res.data;
}