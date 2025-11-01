import { useEffect, useRef, useState } from "react";
import { useOptionsMenuManagerContext } from "@/context/OptionsMenuManagerContext";
import { deckIcons, deckThemeColors } from "@/libs/config";
import { startCase } from "lodash";

import CardOptionsMenu from "./CardOptionsMenu";

const Flashcard = ({
  question,
  answer,
  id,
  isFavorite,
  deck,
  toggleFavorite
}) => {
  if (!deck) return;

  const { openOptionsMenuId } = useOptionsMenuManagerContext();
  const [ isFlipped, setIsFlipped ] = useState(false);
  const optionsMenuId = `${id}-options`
  const isOptionsMenuOpen = openOptionsMenuId === optionsMenuId;
  const color = deckThemeColors[deck.colorIdx];
  const Icon = deckIcons[deck.iconIdx];

  const showAnswerBtn = useRef(null);
  const hideAnswerBtn = useRef(null);

  const handleOptionsClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isFlipped) {
      hideAnswerBtn.current.focus();
    } else {
      showAnswerBtn.current.focus();
    }
  }, [isFlipped]);

  return (
    <div
      className={`group h-full w-full rounded-lg [perspective:1000px] ${
        isOptionsMenuOpen ? "z-5" : "z-0"
      }`}
    >
      {/* The Inner container that actually flips. */}
      <div
        className={`
            relative w-full h-full rounded-lg transition-transform duration-400 
            [transform-style:preserve-3d] 
            ${isFlipped ? "rotate-y-180" : ""}
          `}
      >
        {/* === FRONT FACE === */}
        <div
          inert={isFlipped ? true : undefined}
          className="max-h-[240px] h-full [backface-visibility:hidden]"
        >
          <div className="h-full justify-start flex flex-col gap-my-sm p-my-sm rounded-lg border bg-transparent border-black-md">
            <div className="flex justify-between gap-x-my-sm">
              <div className="flex items-center gap-my-sm">
                <span style={{ background: color }} className="p-2 rounded-full">
                  <Icon size={22} />
                </span>
                <span className="text-xl line-clamp-1">{deck.title}</span>
              </div>

              <div>
                <CardOptionsMenu
                  cardId={id}
                  card={{question, answer}}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onRemove={() => null}
                />
              </div>
            </div>

            <p
              className="line-clamp-3 overflow-hidden"
              // onWheel={(e) => {
              //   e.stopPropagation();
              //   e.currentTarget.scrollTop += e.deltaY * 0.25;
              // }}
            >
              {question}
            </p>

            <div className="flex-1 flex items-end">
              <div className="w-full flex justify-between items-center">
                <p className="text-black-light">Oct 7, 2023</p>
                <button
                  ref={showAnswerBtn}
                  className="button--dark button button--primary font-medium"
                  onClick={() => setIsFlipped(true)}
                >
                  Show Answer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === BACK FACE === */}
        <div className="h-full absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div
            inert={isFlipped ? undefined : true}
            className="flex flex-col h-full gap-my-sm p-my-sm rounded-lg border bg-transparent border-black-md"
          >
            {/* You might want a header on the back too */}
            <div className="flex justify-between gap-x-my-md">
              <div className="flex items-center gap-my-sm">
                <span className="text-black-light line-clamp-1">{startCase(question)}</span>
              </div>
              <div className="ml-auto">
                <CardOptionsMenu
                  cardId={id}
                  card={{question, answer}}
                  isFavorite={isFavorite}
                  onToggleFavorite={() => null}
                  onRemove={() => null}
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="font-medium text-lg line-clamp-3">{answer}</p>
            </div>
            <div className="flex items-end">
             <div className="w-full flex items-center justify-end">
                <button
                  ref={hideAnswerBtn}
                  className="button button--white font-medium"
                  onClick={() => setIsFlipped(false)}
                >Hide Answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
