"use client";

import { deckThemeColors, deckIcons } from "@/libs/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDeck } from "@/libs/actions";
import { useEditMutation } from "@/hooks/useEditMutation";
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
  const {
    mutateAsync: editMutateAsync,
    isPending,
    error,
  } = useEditMutation(["decks"], editDeck, "decks");

  const handleEditDeck = async ({ title, colorIdx, iconIdx }) => {
    try {
      await editMutateAsync({
        itemId: deck.id,
        newItemData: { title, colorIdx, iconIdx },
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
        onSubmit={handleEditDeck}
        submitText="Save Changes"
        onFormClose={closeModal}
        isPending={isPending}
        pendingText={"Saving changes..."}
        error={error}
        defaultValues={{
          deckId: deck.title,
          iconIdx: deck.iconIdx,
          colorIdx: deck.colorIdx,
        }}
      />
    </>
  );
};

export default EditDeckForm;
