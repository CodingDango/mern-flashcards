import {
  FaBook,
  FaFlask,
  FaCode,
  FaGlobeAmericas,
  FaPaintBrush,
  FaMusic,
  FaGraduationCap,
  FaLandmark,
  FaSeedling,
  FaCog,
  FaLanguage,
  FaLightbulb
} from 'react-icons/fa';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdOutlinePsychology, MdOutlineCalculate } from 'react-icons/md';
import { GiGalaxy } from 'react-icons/gi';
import { z } from "zod";

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
  // --- General & Academia ---
  FaBook,             // For Literature, English, or any book-based subject
  FaGraduationCap,    // For general academia, goals, or a specific course
  MdOutlinePsychology,// For Psychology, Sociology, or cognitive sciences

  // --- STEM ---
  FaFlask,            // For Chemistry or general science
  MdOutlineCalculate, // For Mathematics, Physics, or Accounting
  FaCode,             // For Programming, Computer Science, or IT
  FaSeedling,         // For Biology, Environmental Science, or Botany
  IoBarChartSharp,    // For Economics, Business, Data Analysis, or Statistics
  GiGalaxy,           // For Astronomy, Physics, or space-related topics

  // --- Humanities & Arts ---
  FaGlobeAmericas,    // For Geography, History, or Social Studies
  FaLandmark,         // For History, Architecture, or Government/Civics
  FaLanguage,         // For learning a new language or Linguistics
  FaPaintBrush,       // For Art, Art History, or Design
  FaMusic,            // For Music Theory, Music History, or learning an instrument
  
  // --- Miscellaneous ---
  FaCog,              // For Engineering, Mechanics, or how things work
  FaLightbulb
];

const getEnumFromIndices = (arr) => arr.map((val, idx) => idx.toString());

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
    setDecks(prev => [...prev, {
      id: `deck-${prev.length}`,
      title,
      color: themeColors[colorIdx], 
      Icon: icons[iconIdx],
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
