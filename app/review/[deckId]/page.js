"use client";

import AppLayout from "@/components/AppLayout";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { shuffle } from "lodash";

import { ClipLoader } from "react-spinners";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import {
  getCardsByDeck,
  updateDeckProgress,
  updateLastReviewedDeck,
} from "@/libs/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdAddCard } from "react-icons/md";

import ReviewCard from "@/components/ReviewCard";
import InfoPanel from "@/components/InfoPanel";
import ReviewResults from "@/components/ReviewResults";
import Notify from "@/components/Notify";

const StudyPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { deckId } = unwrappedParams;

  const { mutate: updateStudiedMutation } = useMutation({
    mutationFn: updateLastReviewedDeck,
  });

  const { mutate: updateDeckProgressMutation } = useMutation({
    mutationFn: updateDeckProgress,
  });

  const updateProgressHandler = useCallback(
    (newProgress) =>
      updateDeckProgressMutation({ itemId: deckId, newProgress }),
    [updateDeckProgressMutation, deckId]
  );

  const { data, isLoading } = useQuery({
    enabled: !!deckId,
    queryKey: ["cards", deckId],
    queryFn: ({ queryKey }) => {
      const [keyName, deckId] = queryKey;
      return getCardsByDeck({ deckId });
    },
  });

  useEffect(() => {
    updateStudiedMutation({ itemId: deckId });
  }, [updateStudiedMutation, deckId]);

  const [cardIdx, setCardIdx] = useState(0);
  const [cardsInSession, setCardsInSession] = useState([]);
  const [highestDeckPercentage, setHighestDeckPercentage] = useState(0);

  const originalCards = useMemo(() => data?.data?.cards || [], [data]);
  const deckData = useMemo(() => data?.data?.deck || {}, [data]);
  const isReviewDone = cardIdx >= cardsInSession.length;

  useEffect(() => {
    if (cardsInSession.length === 0 && originalCards.length !== 0) {
      const shuffledCards = shuffle(originalCards);

      setCardsInSession(
        shuffledCards.map((card) => ({ ...card, status: null }))
      );
    }
  }, [cardsInSession.length, originalCards]);

  useEffect(() => {
    if (isReviewDone) {
      const corrects = cardsInSession.filter(
        (card) => card.status === "correct"
      ).length;

      const mistakes = cardsInSession.filter(
        (card) => card.status === "incorrect"
      ).length;

      const totalAnswered = corrects + mistakes;
      let progressPercentage = 0;

      if (totalAnswered > 0) {
        progressPercentage = Math.floor((corrects / totalAnswered) * 100);
      }

      const highestPercentage = Math.max(progressPercentage, deckData.progress);
      setHighestDeckPercentage(highestPercentage);
      updateProgressHandler(highestPercentage);
    }
  }, [isReviewDone, cardsInSession, updateProgressHandler, deckData]);

  return (
    <AppLayout>
      <div className="h-full w-full flex justify-center items-center">
        <div className="relative max-w-5xl w-full h-full grid grid-rows-[360px] items-start gap-my-md pt-16 pb-8 px-10 mr-50">
          {originalCards.length > 0 && (
            <AnimatePresence mode="wait">
              {!isReviewDone ? (
                <motion.div
                  className="h-full"
                  key={"quiz"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-[1fr_auto] gap-my-md h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={cardIdx}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ReviewCard
                          title={`Question #${cardIdx + 1}`}
                          question={cardsInSession[cardIdx]?.question}
                          answer={cardsInSession[cardIdx]?.answer}
                          onCorrect={() => {
                            const copy = [...cardsInSession];
                            copy[cardIdx].status = "correct";

                            setCardsInSession(copy);
                            setCardIdx((prev) => prev + 1);
                          }}
                          onIncorrect={() => {
                            const copy = [...cardsInSession];
                            copy[cardIdx].status = "incorrect";

                            setCardsInSession(copy);
                            setCardIdx((prev) => prev + 1);
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    <InfoPanel cardsStatuses={cardsInSession} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="h-full"
                  key={"results"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ReviewResults
                    corrects={
                      cardsInSession.filter((card) => card.status === "correct")
                        .length
                    }
                    mistakes={
                      cardsInSession.filter(
                        (card) => card.status === "incorrect"
                      ).length
                    }
                    deckProgressPercent={highestDeckPercentage}
                    onReviewAgain={() => {
                      const shuffledCards = shuffle(cardsInSession);

                      setCardsInSession(
                        shuffledCards.map((card) => ({ ...card, status: null }))
                      );

                      setCardIdx(0);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {!isLoading && originalCards.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <Notify
                title={"Add a Card"}
                body="Add cards to this deck in the `Cards` route in order to start reviewing."
                Icon={MdAddCard}
              />
            </div>
          )}

          {/* Okay.. not working. */}
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center">
              <ClipLoader color="#ffffff" size={50}/>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default StudyPage;
