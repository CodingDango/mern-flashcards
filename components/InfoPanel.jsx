import { PiCards as CardsIcon } from "react-icons/pi";
import { HiOutlineSquare3Stack3D as StackIcon } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useMemo } from "react";

const InfoPanel = ({ cardsStatuses }) => {
  const [correctCount, incorrectCount] = useMemo(() => {
    const correctsArray = cardsStatuses.filter(
      ({status}) => status === "correct"
    );
    const incorrectArray = cardsStatuses.filter(
      ({status}) => status === "incorrect"
    );

    return [correctsArray.length, incorrectArray.length];
  }, [cardsStatuses]);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-my-md flex-1">
      <div className="bg-black-xl p-6 rounded-lg text-lg text-black-light flex items-center gap-my-xs">
        <StackIcon size={20} /> Precalculus
      </div>
      <div className="bg-black-xl p-6 rounded-lg h-full max-h-[268px] overflow-y-auto flex flex-col gap-my-md">
        <div className="flex justify-between items-center gap-my-md">
          <h3 className="text-lg text-black-light flex gap-my-xs items-center">
            <CardsIcon size={20} /> Cards List
          </h3>

          <div className="flex gap-my-md justify-end font-my-mono">
            <span className="flex items-center gap-my-xs">
              <MdClose className="text-red-400" size={20} />{incorrectCount}
            </span>
            <span className="flex items-center gap-my-xs">
              <FaCheck size={16} className="text-my-primary" />{correctCount}
            </span>
          </div>
        </div>

        {/* per card */}
        <div className="font-my-mono grid grid-cols-5 place-items-center gap-my-xs gap-y-my-sm justify-center text-black-light">
          {cardsStatuses.map(({ status }, index) => {
            let statusClass = null;

            if (status === "correct") {
              statusClass = "bg-green-500/90";
            } else if (status === "incorrect") {
              statusClass = "bg-red-400/80";
            }

            return (
              <div
                key={index}
                className={`w-[24px] h-[24px] border border-black-md rounded-md text-white text-sm text-center ${statusClass}`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
