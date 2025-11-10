"use client";

import { DateTime } from "luxon";
import { FaBookOpen } from "react-icons/fa6";
import { deckIcons, deckThemeColors } from "@/libs/config";
import { PiCards as CardsIcon } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

import { redirect } from "next/navigation";
import DeckOptionsMenu from "./DeckOptionsMenu";
import { useMemo } from "react";

const handleStudyNow = (e) => {
  e.stopPropagation();
  redirect("/decks/play/");
};

const DeckCard = ({
  id,
  title,
  colorIdx,
  iconIdx,
  dateCreated,
  isFavorite,
  onToggleFavorite,
  onRemove,
  cardCount,
  cards,
  options = true,
  lastReviewed,
}) => {
  if (!title) return;

  const color = deckThemeColors[colorIdx];
  const Icon = deckIcons[iconIdx];

  const localDate = DateTime.fromISO(dateCreated).toLocaleString(
    DateTime.DATE_MED
  );

  let lastReviewedDate = null;

  if (lastReviewed) {
    lastReviewedDate = DateTime.fromISO(lastReviewed).toLocaleString(
      DateTime.DATE_MED
    );
  }

  const deckProgress = useMemo(() => {
    if (!cards || cards?.length === 0) return;

    const corrects = cards.filter((card) => card?.answered).length;
    return Math.floor(((corrects / cards.length) * 100));
  }, [cards]);

  return (
    <div className="min-h-[240px] cursor-pointer relative rounded-xl border border-black-md p-my-sm border-t-transparent">
      <a
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 rounded-xl"
        href={`/decks/${id}`}
      ></a>

      <div className="absolute h-[8px] w-full bg-black-lg left-0 top-0 rounded-tr-lg rounded-tl-lg rounded-bl-none">
        <div
          style={{ background: color, width: `${deckProgress}%` }}
          className="absolute h-[8px] left-0 top-0 rounded-tr-lg  rounded-tl-lg"
        ></div>
      </div>

      <div className="pt-1 h-full flex flex-col gap-my-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-my-sm">
            <span style={{ background: color }} className="p-2 rounded-full">
              <Icon size={22} />
            </span>
            <span className="text-xl font-medium">{title}</span>
          </div>
          {options && (
            <div onClick={(e) => e.stopPropagation()}>
              <DeckOptionsMenu
                deckId={id}
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
                onRemove={onRemove}
                deck={{ title, colorIdx, iconIdx }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 text-black-light">
          <p className="grid grid-cols-[90px_auto]">
            <span>Created: </span>
            <span>{localDate}</span>
          </p>
          <p className="grid grid-cols-[90px_auto]">
            <span>Reviewed: </span>
            <span>{lastReviewedDate || "Not reviewed"}</span>
          </p>
        </div>

        <div className="flex-1 flex items-end">
          <div className="w-full flex justify-between items-center">
            <p className="flex gap-my-xs items-center text-neutral-400">
              <CardsIcon size={20} /> {cardCount}
            </p>
            <a href={`/review/${id}`} className="z-1 button button--dark">
              <div className="flex items-center gap-my-xs">
                <FaBookOpen />
                Review
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
