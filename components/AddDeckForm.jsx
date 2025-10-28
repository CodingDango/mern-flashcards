"use client";

import { deckThemeColors, deckIcons } from "@/libs/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeck } from "@/libs/actions";
import { z } from "zod";

import GenericForm from "./GenericForm";
import ColorPalletePicker from "./ColorPalletePicker";
import IconSet from "./IconSet";

const getEnumFromIndices = (arr) => arr.map((val, idx) => idx.toString());

const deckSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Deck title is too short." })
    .max(20),
  colorIdx: z.enum(getEnumFromIndices(deckThemeColors), {
    message: "Please select a color.",
  }),
  iconIdx: z.enum(getEnumFromIndices(deckIcons), {
    message: "Please select an icon.",
  }),
});

const deckFields = [
  {
    name: "title",
    label: "Deck Title",
    component: "input",
    type: "text",
    placeholder: "Enter a title...",
    className: "text-input border border-black-md",
  },
  {
    name: "colorIdx",
    label: "Deck Color",
    component: ColorPalletePicker,
    colors: deckThemeColors,
  },
  {
    name: "iconIdx",
    label: "Deck Icon",
    component: IconSet,
    icons: deckIcons,
  },
];

const AddDeckForm = ({ closeModal }) => {
  const queryClient = useQueryClient();

 const createDeckMutation = useMutation({
    mutationFn: createDeck,

    onMutate: async (newDeckData) => {
      await queryClient.cancelQueries({ queryKey: ["decks"] });
      const previousDecksData = queryClient.getQueryData(["decks"]);
      const optimisticDeck = {
        id: `deck-temp-${Date.now()}`, 
        ...newDeckData, 
        dateCreated: new Date().toISOString(), 
        cards: [], 
      };

      queryClient.setQueryData(["decks"], (oldData) => ({
        ...oldData,
        data: [...oldData.data, optimisticDeck],
      }));
      
      return { previousDecksData };
    },

    onError: (err, variables, context) => {
      if (context?.previousDecksData) {
        queryClient.setQueryData(["decks"], context.previousDecksData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
});


  const handleAddDeck = async ({ title, colorIdx, iconIdx }) => {
    try {
      const { data } = await createDeckMutation.mutateAsync({
        title,
        colorIdx,
        iconIdx,
      });
    } catch (err) {
      console.log(err);
    }

    closeModal();
  };

  return (
    <>
      <GenericForm
        schema={deckSchema}
        fields={deckFields}
        onSubmit={handleAddDeck}
        submitText="Add New Deck"
        onFormClose={closeModal}
        isPending={createDeckMutation.isPending}
        pendingText={"Adding..."}
        error={createDeckMutation.error}
      />
    </>
  );
};

export default AddDeckForm;
