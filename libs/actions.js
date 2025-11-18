"use server";

import { createClient } from "./supabase/server";
import { toCamel } from "@/utils/converter";

// deck is {title, colorIdx, iconKey}
export async function createDeck({ title, colorIdx, iconIdx }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError ) {
    throw new Error("Unauthorized to create deck");
  }

  if (!title) {
    return { error: "Title is required", status: 400 };
  }

  const { data: existingDeck, error: checkError } = await supabase
    .from("decks")
    .select("id")
    .eq("user_id", user.id) // Check only for the current user
    .ilike("title", title) // `ilike` is a case-insensitive match
    .maybeSingle(); // We only expect one or none.

  if (checkError) {
    throw new Error("Database error");
  }

  if (existingDeck) {
    throw new Error("A deck with this title already exists");
  }

  const newDeckData = {
    title: title,
    icon_idx: iconIdx,
    color_idx: colorIdx,
    user_id: user.id,
  };

  const { data: createdDeck, error: insertError } = await supabase
    .from("decks")
    .insert(newDeckData)
    .select()
    .single();

  if (insertError) {
    throw new Error("Could not create deck");
  }

  return {
    data: { deck: toCamel(createdDeck) },
  };
}

export async function toggleDeckFavorite({ itemId }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to favorite a deck");
  }

  const { data: deck, error: deckError } = await supabase
    .from("decks")
    .select("is_favorite")
    .eq("id", itemId)
    .eq("user_id", user?.id)
    .single();

  if (deckError || !deck) {
    throw new Error("Deck not found or you do not have permission to edit it.");
  }

  const newFavoriteStatus = !deck.is_favorite;

  const { data: updatedDeck, error: updateError } = await supabase
    .from("decks")
    .update({ is_favorite: newFavoriteStatus }) // The update payload
    .eq("id", itemId)
    .eq("user_id", user.id) // IMPORTANT: Repeat the security check here!
    .select() // Select all columns of the updated row to return
    .single();

  if (updateError) {
    throw new Error("Could not update the deck's favorite status.");
  }

  return {
    data: {
      deck: toCamel(updatedDeck),
    },
  };
}

export async function removeDeck({ itemId }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to delete a deck");
  }

  const { error: deleteError } = await supabase
    .from("decks")
    .delete()
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (deleteError) {
    throw new Error("Could not delete deck. Please try again");
  }
}

export async function editDeck({ itemId, newItemData }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to edit a deck");
  }

  const { data: deck, error: deckError } = await supabase
    .from("decks")
    .select("*")
    .eq("id", itemId)
    .eq("user_id", user?.id)
    .single();

  if (deckError || !deck) {
    throw new Error("Deck not found or you do not have permission to edit it.");
  }

  const newDeckData = {
    ...deck,
    title: newItemData.title,
    icon_idx: newItemData.iconIdx,
    color_idx: newItemData.colorIdx,
  };

  const { data: updatedDeck, error: updateError } = await supabase
    .from("decks")
    .update(newDeckData) // The update payload
    .eq("id", itemId)
    .eq("user_id", user.id) // IMPORTANT: Repeat the security check here!
    .select() // Select all columns of the updated row to return
    .single();

  if (updateError) {
    throw new Error("Could not update the deck's favorite status.");
  }

  return {
    data: {
      deck: toCamel(updatedDeck),
    },
  };
}

export async function editCard({ itemId, newItemData }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to edit a card");
  }

  const { data: card, error: cardError } = await supabase
    .from("cards")
    .select("*")
    .eq("id", itemId)
    .eq("user_id", user?.id)
    .single();

  if (cardError || !card) {
    throw new Error("Card not found or you do not have permission to edit it.");
  }

  const newCard = {
    ...card,
    deck_id: newItemData.deckId,
    question: newItemData.question,
    answer: newItemData.answer,
  };

  const { data: updatedCard, error: updateError } = await supabase
    .from("cards")
    .update(newCard)
    .eq("id", itemId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (updateError) {
    throw new Error("Could not edit the card. Please try again later.");
  }
}

export async function getAllCardsWithDeck() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to get decks");
  }

  const { data: userDecks, error: decksError } = await supabase
    .from("decks")
    .select("*")
    .eq("user_id", user.id);

  const { data: userCards, error: cardsError } = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", user.id);

  return {
    data: {
      decks: toCamel(userDecks),
      cards: toCamel(userCards),
    },
  };
}

export async function addCard({ deckId, question, answer }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed add a card");
  }

  const newCard = {
    deck_id: deckId,
    user_id: user.id,
    question,
    answer,
  };

  const { error: addError } = await supabase.from("cards").insert(newCard);

  if (addError) {
    throw new Error("Error adding deck. Please try again");
  }

  // optimistic update impossible here. dunno why

  // return {
  //   data: {
  //     card: toCamel(card)
  //   }
  // };
}

export async function toggleCardFavorite({ itemId }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to favorite a card");
  }

  const { data: card, error: cardError } = await supabase
    .from("cards")
    .select("is_favorite")
    .eq("id", itemId)
    .eq("user_id", user?.id)
    .single();

  if (cardError || !card) {
    throw new Error("Card not found or you do not have permission to edit it.");
  }

  const newFavoriteStatus = !card.is_favorite;

  const { data: updatedCard, error: updateError } = await supabase
    .from("cards")
    .update({ is_favorite: newFavoriteStatus }) // The update payload
    .eq("id", itemId)
    .eq("user_id", user.id) // IMPORTANT: Repeat the security check here!
    .select() // Select all columns of the updated row to return
    .single();

  if (updateError) {
    throw new Error("Could not update the deck's favorite status.");
  }

  return {
    data: {
      deck: toCamel(updatedCard),
    },
  };
}

export async function removeCard({ itemId }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to delete a card");
  }

  const { error: deleteError } = await supabase
    .from("cards")
    .delete()
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (deleteError) {
    throw new Error("Could not delete card. Please try again");
  }
}

export async function updateLastReviewedDeck({ itemId }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to study a deck");
  }

  // how do i let uh, supabase update it for me, the timestampz by the NOW()
  // or do i have to manually do it?
  const { error: reviewError } = await supabase
    .from("decks")
    .update({ last_reviewed: "now()" })
    .eq("user_id", user.id)
    .eq("id", itemId);

  console.log(reviewError);

  if (reviewError) {
    throw new Error(
      "Could not update the deck's review time. Please try again."
    );
  }
}

export async function getCardsByDeck({ deckId }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to fetch a card");
  }

  const { data: cards, error: fetchCardsError } = await supabase
    .from("cards")
    .select("*")
    .eq("deck_id", deckId)
    .eq("user_id", user.id);

  if (fetchCardsError) {
    throw new Error("Error fetching cards. Please try again");
  }

  return {
    data: {
      cards: cards,
    },
  };
}

export async function updateAnswerCard({ itemId }) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Must be signed up to answer a card");
  }

  const { error: answerError } = await supabase
    .from("cards")
    .update({ answered: true })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (answerError) {
    throw new Error("Error updating answer status on card. Please try again");
  }
}
