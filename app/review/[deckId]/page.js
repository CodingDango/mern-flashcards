"use client";

import AppLayout from "@/components/AppLayout";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { shuffle } from "lodash";

import { ClipLoader } from "react-spinners";
import { use, useEffect, useMemo, useState } from "react";
import { getCardsByDeck, updateLastReviewedDeck } from "@/libs/actions";
import { useMutation, useQuery } from "@tanstack/react-query";

import ReviewCard from "@/components/ReviewCard";
import InfoPanel from "@/components/InfoPanel";
import ReviewResults from "@/components/ReviewResults";

const StudyPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { deckId } = unwrappedParams;

  const { mutate } = useMutation({
    mutationFn: updateLastReviewedDeck,
  });

  const { data } = useQuery({
    enabled: !!deckId,
    queryKey: ["cards", deckId],
    queryFn: ({ queryKey }) => {
      const [keyName, deckId] = queryKey;
      return getCardsByDeck({ deckId });
    },
  });

  useEffect(() => {
    mutate({ itemId: deckId });
  }, [mutate, deckId]);

  const originalCards = useMemo(() => data?.data?.cards || [], [data]);
  const [cardIdx, setCardIdx] = useState(0);
  const [cardsInSession, setCardsInSession] = useState([]);

  useEffect(() => {
    if (cardsInSession.length === 0 && originalCards.length !== 0) {
      const shuffledCards = shuffle(originalCards);

      debugger;

      setCardsInSession(
        shuffledCards.map((card) => ({ ...card, status: null }))
      );
    }
  }, [cardsInSession.length, originalCards]);

  return (
    <AppLayout>
      <Sidebar />
      {originalCards.length > 0 ? (
        <div className="h-full w-full flex justify-center items-center">
          <div className="max-w-5xl w-full h-full grid grid-rows-[360px] items-start gap-my-md pt-16 pb-8 px-10 mr-50">
            <AnimatePresence mode="wait">
              {cardIdx < cardsInSession.length ? (
                <motion.div
                  className="h-full"
                  key={'quiz'}
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
                    key={'results'}
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
                      deckProgressPercent={50}
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
          </div>
        </div>
      ) : (
        <ClipLoader />
      )}
    </AppLayout>
  );
};

export default StudyPage;
