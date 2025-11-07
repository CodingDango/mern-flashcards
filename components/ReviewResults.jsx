import { RiResetRightFill } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";
import Link from "next/link";

const ReviewResults = ({
  corrects,
  mistakes,
  deckProgressPercent,
  onReviewAgain,
}) => {
  return (
    <div className="">
      <div className="flex flex-col gap-my-lg">
        <div className="bg-black rounded-lg border border-black-md p-9 flex gap-my-lg">
          <Image
            src={"/electron.png"}
            width={275}
            height={275}
            alt="image of an electron"
          />

          <div className="flex flex-col gap-my-md">
            <div className="flex gap-my-xs items-end">
              <span className="text-6xl text-my-primary font-medium">
                {corrects}
              </span>
              <span className="text-5xl mb-1">/</span>
              <span className="text-4xl">{corrects + mistakes}</span>
            </div>
            <p>Well done, you did great!</p>
            <p className="text-black-light">
              Get this image on: Dreamstime | License details Copyright:
              Khondokarshakilrana | Dreamstime.com Want to know where this
              information comes from? Learn more
            </p>
            <div className="flex gap-my-md">
              <button
                onClick={onReviewAgain}
                className="button button--white flex items-center gap-my-xs"
              >
                <RiResetRightFill size={20} />
                Review Again
              </button>
              <Link className="button border" href={"/decks"}>
                Back To Decks
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-my-md">
          <div className="bg-black border border-black-md py-6 px-12 rounded-lg">
            <div className="flex flex-col gap-my-md items-center">
              <h3 className="text-xl font-medium">Deck Progress</h3>
              <div className="max-w-[200px] max-h-[200px] text-3xl font-inter font-medium">
                <CircularProgressbar
                  value={deckProgressPercent}
                  text={`${deckProgressPercent}%`}
                  styles={buildStyles({
                    textColor: "#00c951",
                    textSize: "16px",
                    pathColor: `#00c951`,
                    trailColor: "#262626",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResults;
