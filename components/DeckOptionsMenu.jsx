import { IoCloseOutline } from "react-icons/io5";
import { FaRegEdit, FaRegStar, FaStar } from 'react-icons/fa';
import { useMemo } from "react";
import OptionsMenu from "./OptionsMenu"

const DeckOptionsMenu = ({ 
  deckId, 
  isFavorite, 
  onToggleFavorite,
  onRemove 
}) => {
  const menuId = useMemo(() => `${deckId}-options`);

  const options = [
    {
      icon: isFavorite ? <FaStar size={16}/> : <FaRegStar size={16}/>,
      text: isFavorite ? 'unfavorite' : 'favorite',
      callback: () => onToggleFavorite(deckId)
    },
    {
      icon: <FaRegEdit size={16}/>,
      text: 'edit',
      callback: () => console.log('Pressed options menu edit!')
    },
    {
      icon: <IoCloseOutline size={16} className="scale-125" />,
      text: 'remove',
      callback: () => onRemove(deckId)
    },
  ]

  return (
    <OptionsMenu options={options} id={menuId}/>
  );
}

export default DeckOptionsMenu;