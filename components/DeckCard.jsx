"use client";

import { DateTime } from "luxon";
import { FaBookOpen } from "react-icons/fa6";
import { deckIcons, deckThemeColors } from "@/libs/config";
import { PiCards as CardsIcon } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";

import { redirect } from "next/navigation";
import DeckOptionsMenu from "./DeckOptionsMenu";

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
  cardCount = 0,
  progress = "0",
  options = true,
  lastStudied,
}) => {
  if (!title) return;

  const color = deckThemeColors[colorIdx];
  const Icon = deckIcons[iconIdx];

  const localDate = DateTime.fromISO(dateCreated).toLocaleString(
    DateTime.DATE_MED
  );

  let lastStudiedDate = null;

  if (lastStudied) {
    lastStudiedDate = DateTime.fromISO(lastStudied).toLocaleString(
      DateTime.DATE_MED
    );
  }

  return (
    <div className="min-h-[240px] cursor-pointer relative rounded-xl border border-black-md p-my-sm border-t-transparent">
      <a
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 rounded-xl"
        href={`/decks/${id}`}
      ></a>

      <div className="absolute h-[8px] w-full bg-black-lg left-0 top-0 rounded-tr-lg rounded-tl-lg">
        <div
          style={{ background: color, width: `${progress}%` }}
          className="absolute h-[8px] left-0 top-0 rounded-tr-lg rounded-br-lg rounded-tl-lg"
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
          <p className="grid grid-cols-[110px_auto]">
            <span>Created On: </span>
            <span>{localDate}</span>
          </p>
          <p className="grid grid-cols-[110px_auto]">
            <span>Last Studied: </span>
            <span>{lastStudiedDate || "Not studied"}</span>
          </p>
        </div>

        <div className="flex-1 flex items-end">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-my-sm text-neutral-400">
              <p className="flex gap-my-xs items-center">
                <CardsIcon size={20} />
                12
              </p>
              <p className="flex gap-my-xs items-center">
                <FaCheck size={16} />3
              </p>
            </div>
            <a href={`/play/${id}`} className="z-1 button button--dark">
              <div className="flex items-center gap-my-xs">
                <FaBookOpen />
                Study Now
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
