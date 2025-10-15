import { DateTime } from 'luxon'
import { z } from "zod";
import { createDeck } from '@/libs/actions';
import { deckThemeColors, deckIcons } from '@/libs/config';
import { useState } from 'react';

import GenericForm from "./GenericForm";
import ColorPalletePicker from "./ColorPalletePicker";
import IconSet from "./IconSet";

const getEnumFromIndices = (arr) => arr.map((val, idx) => idx.toString());

const deckSchema = z.object({
  title: z.string().trim().min(3, { message: "Deck title is too short." }).max(20),
  color: z.enum(getEnumFromIndices(deckThemeColors), {
    message: "Please select a color.",
  }),
  icon: z.enum([...Object.keys(deckIcons)], {
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
    name: "color",
    label: "Deck Color",
    component: ColorPalletePicker, 
    colors: deckThemeColors,           
  },
  {
    name: "icon",
    label: "Deck Icon",
    component: IconSet, 
    icons: [...Object.keys(deckIcons)]
  },
];

const AddDeckForm = ({ setDecks, closeModal }) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleAddDeck = async ({ title, color : colorIdx, icon : iconKey}) => { 
    setIsPending(true);

    setTimeout(async () => {
      try {
        const data = await createDeck({title, colorIdx, iconKey});
        setDecks(prev => [...prev, data]);
        setIsPending(true);
        closeModal();
      } catch(e) {
        setError(e);
        setIsPending(false);
      } 
    }, 2000);
  };

  return (
    <>
      <GenericForm
        schema={deckSchema}
        fields={deckFields}
        onSubmit={handleAddDeck}
        submitText="Add New Deck"
        onFormClose={closeModal}
        isPending={isPending}
        pendingText={'Adding...'}
        error={error}
      />
    </>
  );
};

export default AddDeckForm;
