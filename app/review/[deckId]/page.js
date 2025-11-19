"use client";

import AppLayout from "@/components/AppLayout";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { shuffle } from "lodash";

import { ClipLoader } from "react-spinners";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import {
  getCardsByDeck,
  updateLastReviewedDeck,
  updateAnswerCard,
} from "@/libs/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdAddCard } from "react-icons/md";

import ReviewCard from "@/components/ReviewCard";
import InfoPanel from "@/components/InfoPanel";
import ReviewResults from "@/components/ReviewResults";
import Notify from "@/components/Notify";
import Main from "@/components/Main";

const StudyPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { deckId } = unwrappedParams;
  const queryClient = useQueryClient();

  const { mutate: updateStudiedMutation } = useMutation({
    mutationFn: updateLastReviewedDeck,
  });

  const { mutate: answerCardMutation } = useMutation({
    mutationFn: updateAnswerCard,
    onMutate: async ({ itemId }) => {
      await queryClient.cancelQueries({ queryKey: [deckId, "cards"] });

      const previousCardsData = queryClient.getQueryData([deckId, "cards"]);

      queryClient.setQueryData([deckId, "cards"], (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          data: {
            ...oldData.data,
            cards: oldData.data.cards.map((card) =>
              card.id === itemId ? { ...card, answered: true } : card
            ),
          },
        };
      });

      return { previousCardsData };
    },

    onError: (err, variables, context) => {
      if (context.previousCardsData) {
        queryClient.setQueryData([deckId, "cards"], context.previousCardsData);
      }
    },
  });

  const onCorrectHandler = () => {
    const copy = [...cardsInSession];
    copy[cardIdx].status = "correct";
    const cardId = copy[cardIdx].id;

    answerCardMutation({ itemId: cardId });
    setCardsInSession(copy);
    setCardIdx((prev) => prev + 1);
  };

  const onIncorrectHandler = () => {
    const copy = [...cardsInSession];
    copy[cardIdx].status = "incorrect";

    setCardsInSession(copy);
    setCardIdx((prev) => prev + 1);
  };

  const { data, isLoading } = useQuery({
    enabled: !!deckId,
    queryKey: [deckId, "cards"],
    queryFn: ({ queryKey }) => {
      const [deckId, keyName] = queryKey;
      return getCardsByDeck({ deckId });
    },
  });

  useEffect(() => {
    updateStudiedMutation({ itemId: deckId });
  }, [updateStudiedMutation, deckId]);

  const [cardIdx, setCardIdx] = useState(0);
  const [cardsInSession, setCardsInSession] = useState([]);

  const originalCards = useMemo(() => data?.data?.cards || [], [data]);
  const isReviewDone = cardIdx >= cardsInSession.length;

  const deckProgress = useMemo(() => {
    const corrects =
      originalCards.filter((card) => card?.answered)?.length || 0;
    return ((corrects / originalCards.length) * 100).toFixed(1);
  }, [originalCards]);

  useEffect(() => {
    if (cardsInSession.length === 0 && originalCards.length !== 0) {
      const shuffledCards = shuffle(originalCards);

      setCardsInSession(
        shuffledCards.map((card) => ({ ...card, status: null }))
      );
    }
  }, [cardsInSession.length, originalCards]);

  return (
    <AppLayout>
      <div className="h-full w-full flex justify-center items-center">
        <Main
          isLoading={isLoading}
          className="relative max-w-5xl w-full h-full grid grid-rows-[360px] items-start gap-my-md pt-16 pb-8 px-4 lg:px-10 xl:mr-50"
        >
          {originalCards.length > 0 && (
            <AnimatePresence mode="wait">
              {!isReviewDone && (
                <motion.div
                  className="h-full"
                  key={"quiz"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 grid-rows-[360px_auto] md:grid-cols-[1fr_auto] gap-my-md h-full">
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
                          onCorrect={onCorrectHandler}
                          onIncorrect={onIncorrectHandler}
                        />
                      </motion.div>
                    </AnimatePresence>

                    <InfoPanel cardsStatuses={cardsInSession} />
                  </div>
                </motion.div>
              )}

              {isReviewDone && (
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
                    deckProgressPercent={deckProgress}
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
              <ClipLoader color="#ffffff" size={50} />
            </div>
          )}
        </Main>
      </div>
    </AppLayout>
  );
};

export default StudyPage;
