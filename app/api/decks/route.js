import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { DateTime } from "luxon";
import fs from "fs/promises";
import path from "path";

const CARDS_PATH = path.join(process.cwd(), "data/cards.json");
const DECKS_PATH = path.join(process.cwd(), "data/decks.json");

export async function GET() {
  const decks = await getAllDecks();

  return NextResponse.json({ data: { decks } });
}

export async function POST(request) {
  const receivedData = await request.json();

  const newDeckData = {
    ...receivedData,
    id: `deck-${randomUUID()}`,
    dateCreated: DateTime.utc().toISO(),
    progress: 0,
    isFavorite: false,
    lastReviewed: null,
  };

  const decks = await getAllDecks();

  // check if newDeck's title is unique
  if (
    decks.findIndex(
      (deck) => deck.title.toLowerCase() === newDeckData.title.toLowerCase()
    ) >= 0
  ) {
    return NextResponse.json(
      { reason: "deck title already exists" },
      { status: 409 }
    );
  }

  decks.push(newDeckData);
  await fs.writeFile(DECKS_PATH, JSON.stringify(decks, null, 2));

  // return NextResponse.json({ data: newDeckData, status: "success" });
  return NextResponse.json({ data: newDeckData }, { status: 200 });
}

export async function PUT(request) {
  const { action, itemId, newItemData: newDeck = null, newProgress = null } = await request.json();

  const status = {
    statusCode: 400,
    errorText: null,
  };

  try {
    switch (action) {
      case "favorite":
        editDeck(itemId, (deck) => ({ ...deck, isFavorite: !deck.isFavorite }));
        break;

      case "edit":
        const { title, colorIdx, iconIdx } = newDeck;
        editDeck(itemId, (deck) => ({ ...deck, title, colorIdx, iconIdx }));

      case "review":
        editDeck(itemId, (deck) => ({
          ...deck,
          lastReviewed: DateTime.utc().toISO(),
        }));

      default:
        break;
    }
  } catch (err) {
    status.code = 200;
    status.errorText = err;
  }

  return NextResponse.json({ status });
}

export async function DELETE(request) {
  const { itemId: deckId } = await request.json();

  try {
    const allDecks = await getAllDecks();
    const allCards = await getCards();

    const filteredDecks = allDecks.filter((deck) => deck.id !== deckId);
    const filteredCards = allCards.filter((card) => card.deckId !== deckId);

    fs.writeFile(DECKS_PATH, JSON.stringify(filteredDecks, null, 2));
    fs.writeFile(CARDS_PATH, JSON.stringify(filteredCards, null, 2));

    return NextResponse.json({ status: "success" });
  } catch (err) {
    return NextResponse.json({ status: "failed" });
  }
}

async function getAllDecks() {
  const fileData = await fs.readFile(DECKS_PATH);
  const db = JSON.parse(fileData);
  return db;
}

async function getCards() {
  const fileData = await fs.readFile(CARDS_PATH);
  const db = JSON.parse(fileData);
  return db;
}

async function editDeck(itemId, newItemFn) {
  const decks = await getAllDecks();
  const deckIdx = decks.findIndex((deck) => deck.id === itemId);

  if (deckIdx !== -1) {
    decks[deckIdx] = newItemFn(decks[deckIdx]);
    await fs.writeFile(DECKS_PATH, JSON.stringify(decks, null, 2));
  } else {
    console.log("edited failed!");
  }
}
