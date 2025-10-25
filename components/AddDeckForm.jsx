'use client';

import { deckThemeColors, deckIcons } from '@/libs/config';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeck } from '@/libs/actions';
import { z } from "zod";

import GenericForm from "./GenericForm";
import ColorPalletePicker from "./ColorPalletePicker";
import IconSet from "./IconSet";

const getEnumFromIndices = (arr) => arr.map((val, idx) => idx.toString());

const deckSchema = z.object({
  title: z.string().trim().min(3, { message: "Deck title is too short." }).max(20),
  colorIdx: z.enum(getEnumFromIndices(deckThemeColors), {
    message: "Please select a color.",
  }),
  iconKey: z.enum([...Object.keys(deckIcons)], {
    message: "Please select an icon.",
  }),
});

const deckFields = [
  {
    name: "title",
    label: "Deck Title",
    component: 'input', 
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
    name: "iconKey",
    label: "Deck Icon",
    component: IconSet, 
    icons: [...Object.keys(deckIcons)]
  },
];

const AddDeckForm = ({ closeModal }) => {
  const queryClient = useQueryClient();

  const createDeckMutation = useMutation({
    mutationFn: createDeck,
    onSuccess: () => { 
      queryClient.invalidateQueries() 
    },
    queryKey: ['decks']
  });

  const handleAddDeck = async ({ title, colorIdx, iconKey }) => {
    try {
      const {data} = await createDeckMutation.mutateAsync(
        {title, colorIdx, iconKey}
      );
    } catch(err)  {
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
        pendingText={'Adding...'}
        error={createDeckMutation.error}
      />
    </>
  );
};

export default AddDeckForm;
