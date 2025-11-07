import { useState } from "react";

const ReviewCard = ({ title, question, answer, onCorrect, onIncorrect }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group h-full w-full rounded-lg [perspective:1000px]">
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
          className="max-h-[360px] h-full [backface-visibility:hidden]"
        >
          <div className="h-full max-w-2xl w-full p-9 rounded-lg bg-black border border-black-md">
            <div className="h-full flex-1 flex flex-col gap-my-md overflow-y-scroll">
              <span className="text-xl text-black-light">{title}</span>
              <p className="flex-1">{question}</p>
              <div className="flex justify-end">
                <button
                  className="button button--white"
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
            className="flex flex-col h-full gap-my-sm rounded-lg border bg-transparent border-black-md"
          >
            <div className="h-full max-w-2xl w-full rounded-lg bg-black p-9">
              <div className="h-full flex flex-col gap-my-md overflow-y-scroll">
                <span className="text-xl text-black-light">Answer</span>
                <p className="flex-1 text-2xl font-medium">{answer}</p>
                <div className="flex-1 flex justify-end items-end gap-my-sm">
                  <button
                    className="button border text-green-400"
                    onClick={() => {
                      onCorrect()
                    }}
                  >
                    Were you Correct?
                  </button>
                  <button
                    className="button border text-red-400 border-red-400"
                    onClick={() => {
                      onIncorrect()
                    }}
                  >
                    Were you Incorrect?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
