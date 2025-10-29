import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const CARDS_PATH = path.join(process.cwd(), "data/cards.json");
const DECKS_PATH = path.join(process.cwd(), "data/decks.json");

export async function GET(request) {
  const cards = await getCardsWithDeck();

  console.log(cards);
  return NextResponse.json({ data: cards });
}

export async function POST(request) {
  const { deckId, question, answer } = await request.json();
  const cards = await getCards();
  cards.push({
    id: `card-${randomUUID()}`,
    question,
    answer,
    isFavorite: false,
    deckId,
  });

  fs.writeFile(CARDS_PATH, JSON.stringify(cards, null, 2));
  return NextResponse.json({ status: 200 });
}

async function getCardsWithDeck() {
  const decksFileContent = await fs.readFile(DECKS_PATH, "utf8");
  const cardsFileContent = await fs.readFile(CARDS_PATH, "utf8");

  const allDecks = JSON.parse(decksFileContent);
  const allCards = JSON.parse(cardsFileContent);

  const decksMap = new Map(allDecks.map((deck) => [deck.id, deck]));

  const cardsWithDeckData = allCards.map((card) => {
    const parentDeck = decksMap.get(card.deckId);
    return {
      ...card,
      deck: parentDeck || null, // Attach the full deck object
    };
  });

  return cardsWithDeckData;
}

async function getCards() {
  const cardsFileContent = await fs.readFile(CARDS_PATH);
  const allCards = JSON.parse(cardsFileContent);

  return allCards;
}
