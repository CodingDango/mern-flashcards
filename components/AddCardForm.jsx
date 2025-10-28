"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addCard } from "@/libs/actions";
import { z } from "zod";

import GenericForm from "./GenericForm";

const cardFields = [
  {
    name: "deckId",
    label: "Deck Topic",
    component: "input",
    type: "text",
    placeholder: "Enter deck id...",
    className: "text-input border border-black-md",
  },
  {
    name: "question",
    label: "Question",
    component: 'textarea',
    placeholder: "Enter question...",
    className: "text-input border border-black-md resize-none",
  },
  {
    name: "answer",
    label: "Answer",
    component: 'input',
    placeholder: "Enter answer...",
    className: "text-input border border-black-md",
  },
];

const deckSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Deck title is too short." })
    .max(20),
  question: z.string().trim().nonempty(),
  answer: z.string().trim().nonempty(),
});

const AddCardForm = ({ closeModal }) => {
  const queryClient = useQueryClient();

  const addCardMutation = useMutation({
    mutationFn: addCard,

    onMutate: async (newDeckData) => {
      await queryClient.cancelQueries({ queryKey: ["cards"] });
      const previousDecksData = queryClient.getQueryData(["cards"]);
      const optimisticDeck = {
        id: `card-temp-${Date.now()}`, 
        ...newDeckData, 
        dateCreated: new Date().toISOString(), 
      };

      queryClient.setQueryData(["cards"], (oldData) => ({
        ...oldData,
        data: [...oldData.data, optimisticDeck],
      }));
      
      return { previousDecksData };
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });


  const handleAddCard = async ({ title, question, answer }) => {
    try {
      // const { data } = await createDeckMutation.mutateAsync({
      //   title,
      //   colorIdx,
      //   iconIdx,
      // });
    } catch (err) {
      console.log(err);
    }

    closeModal();
  };

  return (
    <>
      <GenericForm
        schema={deckSchema}
        fields={cardFields}
        onSubmit={handleAddCard}
        submitText="Add New Flashcard"
        onFormClose={closeModal}
        isPending={addCardMutation.isPending}
        pendingText={"Adding card..."}
        error={addCardMutation.error}
      />
    </>
  );
};

export default AddCardForm;
