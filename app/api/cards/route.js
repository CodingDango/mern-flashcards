import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const CARDS_PATH = path.join(process.cwd(), "data/cards.json");
const DECKS_PATH = path.join(process.cwd(), "data/decks.json");

export async function GET(request) {
  const [cards, decks] = await getCardsWithDeck();
  return NextResponse.json({ data: {cards, decks} });
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

  return [cardsWithDeckData, allDecks];
}

async function getCards() {
  const cardsFileContent = await fs.readFile(CARDS_PATH);
  const allCards = JSON.parse(cardsFileContent);

  return allCards;
}

export async function PUT(request) {
  const { action, itemId, newItemData: newCard = null } = await request.json();

  const status = {
    statusCode: 400,
    errorText: null,
  };

  console.log(`Item id ${itemId}`);
  console.log(`New item data ${JSON.stringify(newCard)}`);

  try {
    switch (action) {
      case "favorite":
        editCard(itemId, (card) => ({ ...card, isFavorite: !card.isFavorite }));
        break;

      case "edit":
        const { question, answer, deckId } = newCard;
        editCard(itemId, (card) => ({ ...card, question, answer, deckId }));

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
  const { itemId } = await request.json();
  

  try {
    const allCards = await getCards();
    const filteredCards = allCards.filter((card) => card.id !== itemId);

    fs.writeFile(CARDS_PATH, JSON.stringify(filteredCards, null, 2));

    return NextResponse.json({ status: "success" });
  } catch (err) {
    return NextResponse.json({ status: "failed" });
  }
}

async function editCard(itemId, newItemFn) {
  const cards = await getCards();
  const cardIdx = cards.findIndex((card) => card.id === itemId);

  if (cardIdx !== -1) {
    cards[cardIdx] = newItemFn(cards[cardIdx]);
    await fs.writeFile(CARDS_PATH, JSON.stringify(cards, null, 2));
  } else {
    console.log("edited failed!");
  }
}

