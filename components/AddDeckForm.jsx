import { DateTime } from 'luxon'
import { date, z } from "zod";
import { deckThemeColors, deckIcons } from '@/libs/config';

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
  const handleAddDeck = async ({ title, color : colorIdx, icon : iconKey}) => { 
    const res = await fetch('/api/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, colorIdx, iconKey})
    });

    const {received: data} = await res.json();
    const createdDate = DateTime.fromISO(data.dateCreated);
    const localDate = createdDate.toLocaleString(DateTime.DATE_MED);

    debugger

    setDecks(prev => [...prev, {
      ...data,
      dateCreated: localDate,
      color: deckThemeColors[data.colorIdx],
      Icon: deckIcons[data.iconKey],
      date
    }]);
  };

  return (
    <>
      <GenericForm
        schema={deckSchema}
        fields={deckFields}
        onSubmit={handleAddDeck}
        submitText="Add New Deck"
        onFormClose={closeModal}
      />
    </>
  );
};

export default AddDeckForm;
