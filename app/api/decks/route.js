import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { createClient } from "@/libs/supabase/server";
import fs from "fs/promises";
import path from "path";

const CARDS_PATH = path.join(process.cwd(), "data/cards.json");
const DECKS_PATH = path.join(process.cwd(), "data/decks.json");

export async function GET() {
  const decks = await getAllDecks();

  console.log(`decks is ${decks}`);

  return NextResponse.json({ data: { decks } });
}

export async function POST(request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  console.log(`user is ${user}`);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, iconIdx, colorIdx } = await request.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const { data: existingDeck, error: checkError } = await supabase
    .from("decks")
    .select("id")
    .eq("user_id", user.user.id) // Check only for the current user
    .ilike("title", title) // `ilike` is a case-insensitive match
    .single(); // We only expect one or none.

  if (checkError) {
    console.error("Error checking for existing deck:", checkError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (existingDeck) {
    return NextResponse.json(
      { error: "A deck with this title already exists" },
      { status: 409 }
    );
  }

  const newDeckData = {
    title: title,
    icon_idx: iconIdx,
    color_idx: colorIdx,
    user_id: user.user.id,
  };

  const { data: createdDeck, error: insertError } = await supabase
    .from("decks")
    .insert(newDeckData)
    .select()
    .single();

  if (insertError) {
    console.error("Error inserting new deck:", insertError);
    return NextResponse.json(
      { error: "Could not create deck" },
      { status: 500 }
    );
  }

  return NextResponse.json(createdDeck, { status: 201 });
}

export async function PUT(request) {
  const {
    action,
    itemId,
    newItemData: newDeck = null,
    newProgress = null,
  } = await request.json();

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
