import { MdAddCard } from "react-icons/md";
import { HiOutlineSquare3Stack3D as StackIcon } from "react-icons/hi2";
import { ClipLoader } from "react-spinners";

import Notify from "./Notify";
import Flashcard from "./Flashcard";

const CardList = ({
  allCards,
  filteredCards,
  isFetching,
}) => {
  const parentClass = `
    grid grid-cols-1 md:grid-cols-2 
    lg:grid-cols-3 auto-rows-[minmax(240px,_auto)] 
    gap-x-my-md gap-y-8
  `;

  const decksToDisplay =
    filteredCards &&
    filteredCards.map((card) => (
      <Flashcard 
        key={card.id} 
        question={card.question}
        answer={card.answer}
        id={card.id}
        isFavorite={card.isFavorite}
        deck={card.deck}
      />
    ));

  const status = getStatus(allCards, filteredCards, isFetching);

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

const getStatus = (allCards, filteredCards, isFetching) => {
  let notification = null;

  if (isFetching) {
    notification = <ClipLoader color="#ffffff" size={50} />;
  } else if (!allCards.length) {
    notification = (
      <Notify
        title={"Add a Card"}
        body="Cards appear inside your deck after you add them with the Add Card button"
        Icon={MdAddCard}
      />
    );
  } else if (!filteredCards.length) {
    notification = (
      <Notify
        title={"No Card Found"}
        body="Try adjusting your search terms or filters"
        Icon={StackIcon}
      />
    );
  }

  return notification;
};

export default CardList;
