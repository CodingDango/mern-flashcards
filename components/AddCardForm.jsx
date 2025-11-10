"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCard } from "@/libs/actions";
import { z } from "zod";

import GenericFormNew from "./GenericFormNew";
import ComboBox from "./ComboBox";

const cardSchema = z.object({
  deckId: z
    .string({
      message: 'Please select a deck'
    })
    .trim()
    .nonempty(),
  question: z.string().trim().nonempty({
    message: 'Question cannot be empty'
  }),
  answer: z.string().trim().nonempty({
    message: 'Answer cannot be empty'
  }),
});

const AddCardForm = ({ closeModal, decksAsOptions = []}) => {
  console.log(decksAsOptions);

  const cardFields = [
    {
      name: "deckId",
      label: "Deck Topic",
      placeholder: 'Choose deck topic',
      component: ComboBox,
      options: decksAsOptions
    },
    {
      name: "question",
      label: "Question",
      component: 'textarea',
      placeholder: "Enter question...",
      className: "text-input border border-black-md resize-none",
      autocomplete: 'off'
    },
    {
      name: "answer",
      label: "Answer",
      component: 'input',
      placeholder: "Enter answer...",
      className: "text-input border border-black-md",
      autocomplete: 'off'
    },
  ];

  const queryClient = useQueryClient();

  const addCardMutation = useMutation({
    mutationFn: addCard,    
    onSuccess: () => {
      closeModal();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  const handleAddCard = async ({ deckId, question, answer }) => {
    const { data } = addCardMutation.mutateAsync({
      deckId, question, answer
    })
  };

  return (
    <>
      <GenericFormNew
        schema={cardSchema}
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
