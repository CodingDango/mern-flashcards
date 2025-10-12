// AddDeckForm.jsx
import GenericForm from "./GenericForm";
import ColorPalletePicker from "./ColorPalletePicker";
import { z } from "zod";
import { useEffect, useState } from "react";

const deckSchema = z.object({
  title: z.string().trim().min(3, { message: "Deck title is too short." }),
  colors: z.enum(["option-a", "option-b", "option-c"], {
    message: "Please select an option",
  }),
  // icon: z.string()...
});

const deckFields = [
  {
    name: "title",
    labelText: "Deck Title",
    placeholder: "Enter a title...",
    inputComponent: "input",
    className: "text-input border border-black-md",
  },
  {
    name: "color",
    labelText: "Deck Color",
    inputComponent: "radio",
    className:
      "p-1 h-10 w-full block bg-neutral-900 border border-neutral-700 cursor-pointer rounded-lg disabled:cursor-not-allowed disabled:opacity-50",
    inputAttributes: { type: "color" },
  },
  // ... you would add your icon selector field here
];

const AddDeckForm = ({ setDecks, closeModal }) => {
  const [pickedColor, setPickedColor] = useState(null);

  useEffect(() => {

  })

  const handleAddDeck = ({ title, color }) => {
    setDecks((prev) => [...prev, { title, color }]);
  };

  return (
    <>
      <GenericForm
      schema={deckSchema}
      onSubmit={handleAddDeck}
      fields={deckFields}
      submitText="Add New Deck"
      onFormClose={closeModal}
      />
      <ColorPalletePicker
        colors={['#4E56C0', '#9B5DE0', '#D78FEE', '#FDCFFA', '#4E56C0', '#9B5DE0', '#D78FEE', '#FDCFFA', '#4E56C0', '#9B5DE0', '#D78FEE', '#FDCFFA', '#4E56C0', '#9B5DE0', '#D78FEE', '#FDCFFA']}
        setPickedColor={setPickedColor}
      />
    </>
  );
};

export default AddDeckForm;
