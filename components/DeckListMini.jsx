import Link from "next/link";
import { deckIcons, deckThemeColors } from "@/libs/config";
import { formatMyTimeAgo } from "@/utils/date";

const DeckListMini = ({ title, Icon, decks, datePrefix, emptyText }) => {
  return (
    <div className="w-full max-w-[600px] border border-black-md rounded-xl grid grid-rows-[60px_1fr]">
      <div className="bg-black-xl rounded-tr-xl rounded-tl-xl flex items-center gap-my-sm px-my-md ">
        <Icon size={28} />
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
    
      {(decks && decks.length > 0) ? (
        <div className="grid grid-cols-1 grid-rows-3 *:p-my-sm border-t border-black-md">
          {decks.map((deck, idx) => {
            const deckColor = deckThemeColors[deck.colorIdx];
            const DeckIcon = deckIcons[deck.iconIdx];

            return (
              <div
                key={idx}
                className="relative flex justify-between items-center hover:bg-black-lg border-b border-black-md"
              >
                <Link href={`/review/${deck.id}`} className="absolute inset-0 rounded-md:"></Link>
                <div className="flex gap-my-sm items-center">
                  <span
                    className="p-3 rounded-full flex justify-center items-center"
                    style={{ background: deckColor }}
                  >
                    <DeckIcon size={20} />
                  </span>
                  <div>
                    <div className="">{deck.title}</div>
                    <div className="text-black-light">
                      {datePrefix} {formatMyTimeAgo(deck.lastReviewed)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      ) : (
        <div className="h-[244px] grid place-items-center border-t border-black-md">
          <span>{emptyText}</span>
        </div>
      )}
    </div>
  );
};

export default DeckListMini;
