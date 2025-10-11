import { IoCloseOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaRegStar } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { FaBookOpen } from 'react-icons/fa6';
import OptionsMenu from "./OptionsMenu";
import OptionsMenuItem from "./OptionsMenuItem";

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

const DeckCard = ({ deck }) => {
  return (
    <div className="relative bg-black-xl rounded-lg border border-black-md p-my-sm">
      <div className="absolute h-my-xs w-full bg-black-md left-0 top-0 rounded-tr-lg rounded-tl-lg">
        <div className="absolute h-my-xs w-[50%] bg-my-secondary left-0 top-0 rounded-tr-lg rounded-br-lg rounded-tl-lg"></div>
      </div>

      <div className="pt-my-xs h-full flex flex-col gap-my-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-my-sm">
            <span className="bg-my-secondary p-1 rounded-full">
              <CgWebsite size={24}/>
            </span>
            <span className="text-xl">{deck.title}</span>
          </div>
          <OptionsMenu options={options} id={`${deck.id}-options`}/>
        </div>  

        <div className="flex flex-col gap-my-xs">
          <p className="text-black-light">Last studied: October 2, 2025</p>
          <p className="text-black-light">Total cards: {deck.cardCount}</p>
          <p className="text-black-light">Progress: 50%</p>
        </div>

        <div className="flex-1 flex items-end">
          <button className="button button--white">
            <div className="flex items-center gap-my-xs">
              <FaBookOpen/>
              Study Now
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};

export default DeckCard;