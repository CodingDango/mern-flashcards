import { MdAddCard } from "react-icons/md";
import DeckCard from './DeckCard';

const DeckList = ({ decks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(250px,_auto)] gap-my-md">
      {decks.length > 0 &&
        decks.map((deck, idx) => (
          <DeckCard
            key={idx}
            deck={deck}
          />
        ))}

      {decks.length === 0 && (
        <div className="grid place-items-center col-span-full">
          <div className="flex items-center flex-col gap-my-sm">
              <div className="bg-my-primary/75 p-my-sm rounded-full">
                <MdAddCard size={50} />
              </div>
              <div className="flex flex-col gap-my-xs text-center">
                <h2 className="text-xl">Add a Card</h2>
                <p>Decks appear here after you add them with the Add Deck button.</p>
              </div>
            </div>
        </div>
        
      )}
    </div>
  );
};

export default DeckList;
