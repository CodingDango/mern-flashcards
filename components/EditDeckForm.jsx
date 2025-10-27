"use client";

import { deckThemeColors, deckIcons } from "@/libs/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDeck } from "@/libs/actions";
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

const EditDeckForm = ({ deck, closeModal }) => {
  const queryClient = useQueryClient();

  const editDeckMutation = useMutation({
    mutationFn: editDeck,
    // data is title, icon, and color
    onMutate: async ({ id: deckId, data: { title, iconIdx, colorIdx } }) => {
      await queryClient.cancelQueries({ queryKey: ["decks"] });
      const previousDecksData = queryClient.getQueryData(["decks"]);
      
      queryClient.setQueryData(["decks"], (oldData) => {
        const { data: decks } = oldData;

        if (!oldData || !decks) return oldData;

        const deckIdx = decks.findIndex((deck) => deck.id === deckId);

        if (deckIdx >= 0) {
          console.log(`editing deck ${deckIdx}`);
        }

        return { ...oldData, data: decks };
      });

      return { previousDecksData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["decks"], context.previousDecks);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });

  const handleEditDeck = async ({ title, colorIdx, iconIdx }) => {
    try {
      debugger
      const { } = await editDeckMutation.mutateAsync({
        deckId: deck.id,
        data: { title, colorIdx, iconIdx },
      });
    } catch (err) {
      console.log(err);
    }

    closeModal();
  };

  debugger

  return (
    <>
      <GenericForm
        schema={deckSchema}
        fields={deckFields}
        onSubmit={handleEditDeck}
        submitText="Save Changes"
        onFormClose={closeModal}
        isPending={editDeckMutation.isPending}
        pendingText={"Saving changes..."}
        error={editDeckMutation.error}
        defaultValues={{
          title: deck.title,
          iconIdx: deck.iconIdx,
          colorIdx: deck.colorIdx
        }}
        
      />
    </>
  );
};

export default EditDeckForm;
