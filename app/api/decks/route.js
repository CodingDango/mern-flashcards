import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { DateTime } from "luxon";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "data/decks.json");

export async function GET() {
  const decks = await getAllDecks();

  return NextResponse.json({ data: decks });
}

export async function POST(request) {
  const receivedData = await request.json();

  const newDeckData = {
    ...receivedData,
    id: `deck-${randomUUID()}`,
    dateCreated: DateTime.utc().toISO(),
    progress: 0,
    totalCards: 0,
    isFavorite: false,
  };

  const decks = await getAllDecks();

  // check if newDeck's title is unique
  if (
    decks.findIndex(
      (deck) => deck.title.toLowerCase() === newDeckData.title.toLowerCase()
    ) >= 0
  ) {
    return NextResponse.json(
      { reason: 'deck title already exists' },
      { status: 409 }
    );
  }

  decks.push(newDeckData);
  await fs.writeFile(dbPath, JSON.stringify(decks, null, 2));

  // return NextResponse.json({ data: newDeckData, status: "success" });
  return NextResponse.json(
    { data: newDeckData },
    { status: 200 }
  );
}

export async function PUT(request) {
  const { action, deckId, data: newDeck = null } = await request.json();

  const status = {
    statusCode: 400,
    errorText: null,
  };

  try {
    switch (action) {
      case "favorite":
        editDeck(deckId, (deck) => ({ ...deck, isFavorite: !deck.isFavorite }));
        break;

      case "edit":
        editDeck(deckId, (deck) => ({ ...deck, ...newDeck, id: deckId }));
        console.log("Editing the deck!");

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
  const { deckId } = await request.json();

  try {
    const allDecks = await getAllDecks();
    const filteredDecks = allDecks.filter((deck) => deck.id !== deckId);
    fs.writeFile(dbPath, JSON.stringify(filteredDecks, null, 2));

    return NextResponse.json({ status: "success" });
  } catch (err) {
    return NextResponse.json({ status: "failed" });
  }
}

async function getAllDecks() {
  const fileData = await fs.readFile(dbPath);
  const db = JSON.parse(fileData);
  return db;
}

async function editDeck(id, newDataFunc) {
  const decks = await getAllDecks();
  const deckIdx = decks.findIndex((deck) => deck.id === id);

  if (deckIdx !== -1) {
    decks[deckIdx] = newDataFunc(decks[deckIdx]);
    await fs.writeFile(dbPath, JSON.stringify(decks, null, 2));
  } else {
    console.log("edited failed!");
  }
}
