"use client";

import { HiOutlineSquare3Stack3D as StackIcon } from "react-icons/hi2";
import { PiCards as CardsIcon } from "react-icons/pi";
import { FaArrowRight as ArrowRight } from "react-icons/fa6";
import { RiProgress2Fill as ProgressIcon } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { TbActivityHeartbeat as HeartBeat } from "react-icons/tb";
import { FaRegEye as Eye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllCardsWithDeck } from "@/libs/actions";
import Main from "./Main";
import Link from "next/link";
import { useMemo } from "react";
import { sortByDate } from "@/hooks/useDecks";
import { getDeckProgress } from "@/hooks/useDecks";

import DeckListMini from "./DeckListMini";

const calculateTotalProgress = (cards) => {
  if (!cards || cards.length === 0) return 0;

  const totalCompletedCards = cards.filter((card) => card?.answered).length;
  const overallProgress = (totalCompletedCards / cards.length) * 100;
  return overallProgress.toFixed(1);
};

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllCardsWithDeck,
    queryKey: ["decks", "cards"],
  });

  const decks = data?.data?.decks || [];
  const cards = data?.data?.cards || [];

  const totalDeckProgress = useMemo(
    () => calculateTotalProgress(cards),
    [cards]
  );

  const deckProgressMap = useMemo(() => {
    return new Map(
      decks.map((deck) => {
        const cardsOfDeck = cards.filter((card) => card.deckId === deck.id);
        const deckProgress = getDeckProgress(cardsOfDeck);
        return [deck.id, deckProgress];
      })
    );
  }, [cards, decks]);

  const newestReviewedDecks = useMemo(() => {
    const newestReviewed = sortByDate(decks, "newestReviewed");
    const threeNewestReviewed = newestReviewed.slice(0, 3);
    return threeNewestReviewed.filter((deck) => deck.lastReviewed !== null);
  }, [decks]);

  const needsReviewDecks = useMemo(() => {
    const oldestReviewed = sortByDate(decks, "oldestReviewed");

    const incompleteDecks = [];
    const completedDecks = [];

    oldestReviewed.forEach((deck) => {
      const progress = deckProgressMap.get(deck.id) ?? 0;
      if (progress < 100) {
        incompleteDecks.push(deck);
      } else {
        completedDecks.push(deck);
      }
    });

    const combinedDecks = [...incompleteDecks, ...completedDecks];

    const newestReviewedDecksMap = new Map(newestReviewedDecks.map((deck) => ([deck.id, deck])));

    // filter 
    const filtered = combinedDecks.filter((deck) => {
      const isDeckNewlyReviewed = newestReviewedDecksMap.has(deck.id);
      return !isDeckNewlyReviewed;
    });


    return filtered.slice(0, 3);
  }, [decks, deckProgressMap, newestReviewedDecks]);

  console.log("newest reviewed decks", newestReviewedDecks);

  return (
    <Main isLoading={isLoading}>
      <h2 className="text-3xl font-medium">Dashboard</h2>

      <div className="flex flex-col gap-y-my-lg gap-x-my-md md:gap-x-my-md">
        
        <div className="flex gap-my-md flex-col md:flex-row">
          
          <div className="flex gap-my-md flex-col sm:flex-row">

            <div className="w-full md:w-auto flex flex-col gap-my-xs border border-black-md px-my-md p-my-md rounded-xl ">
              <div className="flex justify-between items-center gap-my-md">
                <div className="flex gap-my-xs items-center">
                  <StackIcon size={24} />
                  <span className="text-lg">Total Decks</span>
                </div>
              </div>
              <span className="text-xl font-medium">{decks.length}</span>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-my-xs border border-black-md p-my-md rounded-xl ">
              <div className="flex justify-between items-center gap-my-md">
                <div className="flex gap-my-xs items-center">
                  <CardsIcon size={24} />
                  <span className="text-lg">Total Cards</span>
                </div>
              </div>
              <span className="text-xl font-medium">{cards.length}</span>
            </div>
          </div>

          <div className="flex flex-col gap-my-xs bg-my-primary/75 p-my-md rounded-xl justify-center">
            <div className="flex justify-between items-center gap-my-md">
              <div className="flex gap-my-xs items-center">
                <ProgressIcon size={24} />
                <span className="text-lg">Progress</span>
              </div>
            </div>
            <span className="text-xl font-medium">{totalDeckProgress}%</span>
          </div>
        </div>

        <div className="flex gap-my-md flex-col sm:flex-row">
          <DeckListMini
            Icon={HeartBeat}
            title={"Recently Studied"}
            decks={newestReviewedDecks}
            datePrefix={"Reviewed"}
            emptyText={'Go and review some decks...'}
          />

          <DeckListMini
            Icon={Eye}
            title={"Needs Review"}
            decks={needsReviewDecks}
            datePrefix={"Reviewed"}
            emptyText={'No decks that need to be reviewed...'}
          />
        </div>
      </div>
    </Main>
  );
};

export default Dashboard;
