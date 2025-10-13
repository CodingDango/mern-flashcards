import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "./FormField";

const cardSchema = z.object({
  topic: z
    .string()
    .trim()
    .min(3, { message: "Topic is too short. (minimum 3 characters)." })
    .max(20, { message: "Topic is too long. (maximum 20 character)." })
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: "Topic can only contain letters, numbers, and spaces.",
    }),

  question: z
    .string()
    .trim()
    .min(5, { message: "Question is too short. (minimum of 3 characters)." }),

  answer: z.string().trim().nonempty({ message: "Answer cannot be empty." }),
});

const EditCardForm = ({ topic, question, answer, flashcardId, setFlashcards, closePopUp}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(cardSchema),
    defaultValues: {topic, question, answer}
  });

  const onSubmit = ({topic, question, answer}) => {
    if (Object.keys(errors).length > 0) return;

    debugger

    setFlashcards(prev => {
      const copy = [...prev];
      const indexOfCard = copy.findIndex((flashcard) => flashcard.id === flashcardId);
      
      if (indexOfCard >= 0) {
        copy[indexOfCard] = {topic, question, answer, id: flashcardId}
      }

      return copy;
    });
    
    closePopUp();
  };

  return (
    <form className="flex flex-col gap-my-md" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        labelText={"topic"}
        errorMsg={errors.topic?.message}
        input={"input"}
        inputAttributes={{
          ...register("topic"),
          placeholder: "Enter a topic...",
          className: "text-input",
        }}
      />

      <FormField
        labelText={"question"}
        errorMsg={errors.question?.message}
        input={"textarea"}
        inputAttributes={{
          ...register("question"),
          placeholder: "Enter a question...",
          className: "text-input resize-none",
          rows:'3'
        }}
      />

      <FormField
        labelText={"answer"}
        errorMsg={errors.answer?.message}
        input={"input"}
        inputAttributes={{
          ...register("answer"),
          placeholder: "Enter an answer...",
          className: "text-input",
        }}
      />

      <button
        type="submit"
        className="w-full button button--primary items-center gap-my-xs"
      >
        Apply Changes
      </button>
    </form>
  );
};

export default EditCardForm;
