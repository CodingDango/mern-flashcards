import { MdAddCard } from "react-icons/md";
import { HiOutlineSquare3Stack3D as StackIcon } from "react-icons/hi2";
import { ClipLoader } from "react-spinners";
import { groupBy } from "lodash";

import Notify from "./Notify";
import DeckCard from "./DeckCard";
import { useMemo } from "react";

const DeckList = ({
  allDecks,
  allCards,
  filteredDecks,
  deckProgressMap,
  isFetching,
  onToggleFavorite,
  onRemove,
}) => {
  const parentClass = `
    grid grid-cols-1 md:grid-cols-2 
    xl:grid-cols-3 auto-rows-[minmax(240px,_auto)] 
    gap-x-my-md gap-y-8
  `;

  const cardsGroupedByDeck = useMemo(() => (
    groupBy(allCards, 'deckId')
  ), [allCards]);

  debugger

  const decksToDisplay =
    filteredDecks &&
    filteredDecks.map((deck) => (
      <DeckCard 
        key={deck.id} 
        onToggleFavorite={onToggleFavorite}
        onRemove={onRemove}
        cardCount={cardsGroupedByDeck[deck.id]?.length || 0}
        deckProgress={deckProgressMap.get(deck.id)}
        {...deck}
      />
    ));

  const status = getStatus(allDecks, filteredDecks, isFetching);

  return (
    <div className={parentClass}>
      {status ? (
        <div className="col-span-full grid place-items-center">{status}</div>
      ) : (
        decksToDisplay
      )}
    </div>
  );
};

const getStatus = (allDecks, filteredDecks, isFetching) => {
  let notification = null;

  if (isFetching) {
    notification = <ClipLoader color="#ffffff" size={50} />;
  } else if (!allDecks?.length) {
    notification = (
      <Notify
        title={"Add a Deck"}
        body="Decks appear here after you add them with the Add Deck button"
        Icon={MdAddCard}
      />
    );
  } else if (!filteredDecks?.length) {
    notification = (
      <Notify
        title={"No Deck Found"}
        body="Try adjusting your search terms or filters"
        Icon={StackIcon}
      />
    );
  }

  return notification;
};

export default DeckList;
