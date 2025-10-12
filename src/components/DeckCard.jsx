import { CgWebsite } from 'react-icons/cg';
import { FaBookOpen } from 'react-icons/fa6';
import DeckOptionsMenu from "./DeckOptionsMenu";

const handleViewDeck = (e) => {
  console.log('navigating to view!');
}

const handleStudyNow = (e) => {
  console.log('studying deck!');
  e.stopPropagation();
}

const DeckCard = ({ deck }) => {
  return (
    <div 
      onClick={handleViewDeck}
      className="cursor-pointer relative bg-black-xl rounded-lg border border-black-md p-my-sm">

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
          <div onClick={(e) => e.stopPropagation()}>
            <DeckOptionsMenu id={`${deck.id}-options`}/>
          </div>
        </div>  

        <div className="flex flex-col gap-my-xs">
          <p className="text-black-light">Last studied: October 2, 2025</p>
          <p className="text-black-light">Total cards: {deck.cardCount}</p>
          <p className="text-black-light">Cards Completed: 2</p>
        </div>

        <div className="flex-1 flex items-end">
          <button 
            onClick={handleStudyNow}
            className="button button--white">
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