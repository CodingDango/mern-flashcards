import { z } from "zod";
import { FaReact } from "react-icons/fa6";
import { CgWebsite } from 'react-icons/cg';
import GenericForm from "./GenericForm";
import ColorPalletePicker from "./ColorPalletePicker";
import IconSet from "./IconSet";

const themeColors = [
  'oklch(70.4% 0.191 22.216)',
  'oklch(70.5% 0.213 47.604)',
  'oklch(76.9% 0.188 70.08)',
  'oklch(79.5% 0.184 86.047)',
  'oklch(76.8% 0.233 130.85)',
  'oklch(72.3% 0.219 149.579)',
  'oklch(69.6% 0.17 162.48)',
  'oklch(70.4% 0.14 182.503)',
  'oklch(71.5% 0.143 215.221)',
  'oklch(68.5% 0.169 237.323)',
  'oklch(62.3% 0.214 259.815)',
  'oklch(58.5% 0.233 277.117)',
  'oklch(60.6% 0.25 292.717)',
  'oklch(62.7% 0.265 303.9)',
  'oklch(74% 0.238 322.16)',
  '#C90078',
];

const icons = [
  FaReact,
  CgWebsite,
  FaReact,
  FaReact,
  FaReact,
  FaReact,
]

const getEnumFromIndices = (arr) => [...arr.keys()].map(String);

const deckSchema = z.object({
  title: z.string().trim().min(3, { message: "Deck title is too short." }).max(20),
  color: z.enum(getEnumFromIndices(themeColors), {
    message: "Please select a color.",
  }),
  icon: z.enum(getEnumFromIndices(icons), {
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
    colors: themeColors,           
  },
  {
    name: "icon",
    label: "Deck Icon",
    component: IconSet, 
    icons: icons
  },
];

const AddDeckForm = ({ setDecks, closeModal }) => {
  const handleAddDeck = ({ title, color : colorIdx, icon : iconIdx}) => {
    console.log(title, colorIdx, iconIdx);
    // setDecks((prev) => [...prev, { title, color }]);
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
