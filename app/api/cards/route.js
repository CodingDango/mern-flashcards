import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), 'data/cards.json');
const dataDir = path.join(process.cwd(), 'data');

export async function GET(request) {
    const cards = await getAllCards();
    return NextResponse.json({ data: cards });
}

async function getAllCards() {
  const decksFileContent = await fs.readFile(path.join(dataDir, 'decks.json'), 'utf8');
  const cardsFileContent = await fs.readFile(path.join(dataDir, 'cards.json'), 'utf8');
  
  const allDecks = JSON.parse(decksFileContent);
  const allCards = JSON.parse(cardsFileContent);

  const decksMap = new Map(allDecks.map(deck => [deck.id, deck]));

  const cardsWithDeckData = allCards.map(card => {
    const parentDeck = decksMap.get(card.deckId);
    return {
      ...card,
      deck: parentDeck || null, // Attach the full deck object
    };
  });

  return cardsWithDeckData;
}