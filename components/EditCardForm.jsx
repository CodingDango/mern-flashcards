import { useEditMutation } from "@/hooks/useEditMutation";
import { editCard } from "@/libs/actions";
import { z } from "zod";

import GenericFormNew from "./GenericFormNew";
import ComboBox from "./ComboBox";

const cardSchema = z.object({
  deckId: z
    .string({
      required_error: "Please select a deck.", // Use required_error for better messaging
    })
    .nonempty("Please select a deck."), // nonEmpty is a good fallback
  question: z.string().trim().nonempty("Question cannot be empty."),
  answer: z.string().trim().nonempty("Answer cannot be empty."),
});

const EditCardForm = ({ card, closeModal, decksAsOptions = [] }) => {
  

  const cardFields = [
    {
      name: "deckId",
      label: "Deck Topic",
      placeholder: "Choose deck topic",
      component: ComboBox,
      options: decksAsOptions,
    },
    {
      name: "question",
      label: "Question",
      component: "textarea",
      placeholder: "Enter question...",
      className: "text-input border border-black-md resize-none",
    },
    {
      name: "answer",
      label: "Answer",
      component: "input",
      placeholder: "Enter answer...",
      className: "text-input border border-black-md",
    },
  ];

  const {
    mutateAsync: editMutateAsync,
    isPending,
    error,
  } = useEditMutation(["cards"], editCard, "cards");

  const handleEditCard = async ({ deckId, question, answer }) => {
    try {
      debugger

      await editMutateAsync({
        itemId: card.id,
        newItemData: { deckId, question, answer },
      });
  } catch (err) {
      console.log(err);
    }

    closeModal();
  };

  return (
    <>
      <GenericFormNew
        schema={cardSchema}
        fields={cardFields}
        onSubmit={handleEditCard}
        submitText={"Edit Flashcard"} 
        onFormClose={closeModal}
        isPending={isPending}
        pendingText={"Saving Changes..."}
        error={error} 
        defaultValues={{
          deckId: card.deckId,
          question: card.question,
          answer: card.answer
        }}
      ></GenericFormNew>
    </>
  );
};

export default EditCardForm;
