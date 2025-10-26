'use client'

import { DateTime } from 'luxon';
import { FaBookOpen } from 'react-icons/fa6';
import { startCase } from 'lodash';
import { deckIcons, deckThemeColors } from '@/libs/config';
import { PiCards as CardsIcon } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa';

import DeckOptionsMenu from "./DeckOptionsMenu";

const handleViewDeck = (e) => {
  console.log('navigating to view!');
}

const handleStudyNow = (e) => {
  console.log('studying deck!');
  e.stopPropagation();
}

const DeckCard = ({ 
  id, 
  title, 
  colorIdx, 
  iconKey, 
  dateCreated,
  isFavorite,
  onToggleFavorite, 
  onRemove,
  cardCount = 0,
  progress = '0', 
  options=true
}) => {
  if (!title) return;

  const color = deckThemeColors[colorIdx];
  const Icon = deckIcons[iconKey];

  const date = DateTime.fromISO(dateCreated);
  const localDate = date.toLocaleString(DateTime.DATE_MED);

  return (
    <div 
      onClick={handleViewDeck}
      className="min-h-[240px] cursor-pointer relative rounded-xl border border-black-md p-my-sm">

      <div className="absolute h-2 w-full bg-black-lg left-0 top-0 rounded-tr-lg rounded-tl-lg">
        <div 
          style={{background: color, width: `${progress}%`}}
          className="absolute h-2 left-0 top-0 rounded-tr-lg rounded-br-lg rounded-tl-lg">
        </div>
      </div>

      <div className="pt-my-xs h-full flex flex-col gap-my-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-my-sm">
            <span
              style={{background: color}} 
              className="p-2 rounded-full">
              <Icon size={22}/>
            </span>
            <span className="text-xl">{startCase(title)}</span>
          </div>
          {options && (
            <div onClick={(e) => e.stopPropagation()}>
              <DeckOptionsMenu
                deckId={id}
                isFavorite={isFavorite} 
                onToggleFavorite={onToggleFavorite}
                onRemove={onRemove}
              />
            </div>
          )}
        </div>  

        <div className="flex flex-col gap-1 text-black-light">
          <p className='grid grid-cols-[110px_auto]'>
            <span>Created On: </span>
            <span>{localDate}</span>
          </p>
          <p className='grid grid-cols-[110px_auto]'>
            <span>Last Studied: </span>
            <span>{localDate}</span>
          </p>
        </div>

        <div className="flex-1 flex justify-between items-end">
          <button 
            onClick={handleStudyNow}
            className="button bg-black-lg border border-black-md">
            <div className="flex items-center gap-my-xs">
              <FaBookOpen/>
              Study Now
            </div>
          </button>

          <div className="flex gap-my-xs text-neutral-300">
            <p className='px-my-sm py-my-xs bg-black-lg rounded-md flex gap-my-xs items-center'>
              <CardsIcon size={20}/>
              12
            </p>
            <p className='px-my-sm py-my-xs bg-black-lg rounded-md flex gap-my-xs items-center'>
              <FaCheck size={16}/>
              3
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DeckCard;