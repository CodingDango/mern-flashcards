import { IoCloseOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaRegStar } from 'react-icons/fa';
import OptionsMenu from "./OptionsMenu"

const DeckOptionsMenu = ({id}) => {
  const options = [
    {
      icon: <FaRegStar size={16}/>,
      text: 'favorite',
      callback: () => console.log('Pressed options menu edit!')
    },
    {
      icon: <FaRegEdit size={16}/>,
      text: 'edit',
      callback: () => console.log('Pressed options menu edit!')
    },
    {
      icon: <IoCloseOutline size={16} className="scale-125" />,
      text: 'remove',
      callback: () => console.log('Pressed options menu remove!')
    },
  ]

  return (
    <OptionsMenu options={options} id={id}/>
  );
}

export default DeckOptionsMenu;