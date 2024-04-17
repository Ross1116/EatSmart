import { FlashcardArray } from "react-quizlet-flashcard";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { cards } from "./QuizCards";
import { MoveLeft, MoveRight, RefreshCw } from "lucide-react";
import Image from "next/image";
import arrow from "../../assets/arrow.svg";

export default function Quiz() {
  const [understoodCards, setUnderstoodCards] = useState([]);
  const [doubtCards, setDoubtCards] = useState([]);
  const [newCards, setNewCards] = useState(cards);
  const [indexCount, setIndexCount] = useState(1);

  const controlRef = useRef({
    nextCard: () => {},
    prevCard: () => {},
    resetArray: () => {},
  });

  // const currentCardFlipRef = useRef();

  useEffect(() => {
    console.log("Understood", understoodCards);
    console.log("Doubtful", doubtCards);

    if (indexCount > newCards.length && indexCount > 1) {
      onPrev();
    }
  }, [understoodCards, doubtCards, indexCount, newCards.length, onPrev]);

  function onUnderstood(index: number) {
    const card = newCards[index - 1];
    if (!understoodCards.includes(card)) {
      setUnderstoodCards([...understoodCards, card]);
      setNewCards(newCards.filter((_, i) => i !== index - 1));
      if (newCards.length === 2) {
        onPrev();
      }
    }
  }

  const currentCardFlipRef = useRef<() => void>();

  function onDoubt(index: number) {
    const card = newCards[index - 1];
    if (!doubtCards.includes(card)) {
      setDoubtCards([...doubtCards, card]);
      // onNext();
    } else {
      alert("Card was already added to the doubtfull stack");
    }
    if (currentCardFlipRef.current) {
      currentCardFlipRef.current();
    }
  }

  function onNext() {
    controlRef.current.nextCard();
    if (indexCount < newCards.length) {
      setIndexCount(indexCount + 1);
    } else {
      setIndexCount(1);
    }
  }

  function onPrev() {
    controlRef.current.prevCard();
    if (indexCount > 1) {
      setIndexCount(indexCount - 1);
    } else {
      setIndexCount(newCards.length);
    }
  }

  function onReset() {
    controlRef.current.resetArray();
    setIndexCount(1);
  }

  return (
    <div className="relative flex flex-col gap-2 justify-center h-dvh">
      {newCards.length > 0 ? (
        <>
          <h2 className="text-7xl font-bold py-24">
            Let&apos;s test your knowledge!
          </h2>

          <div className="absolute bottom-[13%] right-0 flex justify-center items-center w-1/3 opacity-75">
            <Image
              className="dark:invert rotate-y-180"
              src={arrow}
              width={100}
              height={60}
              alt="arrow"
            />
            <p className="text-2xl font-bold text-start">
              Click on the card to reveal answers
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <div>
              <Button
                className="text-text-950 rounded-full hover:bg-background-100 hover:text-secondary-900"
                onClick={onPrev}
              >
                <MoveLeft />
              </Button>
            </div>
            <div className="w-fit h-fit relative text-text-50">
              <button
                className="w-fit h-fit relative text-text-50"
                onClick={() => currentCardFlipRef.current()}
              >
                <FlashcardArray
                  cards={newCards}
                  controls={false}
                  showCount={false}
                  forwardRef={controlRef}
                  currentCardFlipRef={currentCardFlipRef}
                  cycle={true}
                  frontCardStyle={{
                    backgroundColor: "#f0f5d6",
                    color: "#171906",
                  }}
                  frontContentStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    padding: "2rem",
                  }}
                  backCardStyle={{
                    backgroundColor: "#e0ebad",
                    color: "#171906",
                  }}
                  backContentStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "2rem",
                    padding: "2rem",
                  }}
                />
              </button>
              <div className="absolute bottom-0 left-0 m-4">
                <Button
                  className="bg-primary-500"
                  onClick={() => onUnderstood(indexCount)}
                >
                  Understood
                </Button>
              </div>
              <div className="absolute bottom-0 right-0 m-4">
                <Button
                  disabled={doubtCards.includes(newCards[indexCount - 1])}
                  className="bg-secondary-500"
                  onClick={() => onDoubt(indexCount)}
                >
                  Doubtful
                </Button>
              </div>
            </div>

            <div>
              <Button
                className="text-text-950 rounded-full hover:bg-background-100 hover:text-secondary-900"
                onClick={onNext}
              >
                <MoveRight />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button
              className="text-text-950 rounded-full hover:bg-background-100 hover:text-secondary-900"
              onClick={onReset}
            >
              <RefreshCw />
            </Button>
            <p className="pb-2">
              {indexCount} / {newCards.length}
            </p>
            {/* <div>
              <Button onClick={onPrev}>Prev</Button>
              <Button onClick={onReset}>Reset</Button>
              <Button onClick={onNext}>Next</Button>
            </div> */}
          </div>
        </>
      ) : (
        <div className="flex items-start -mt-2 justify-center mx-36 pb-12">
          <div className="flex flex-col justify-center items-center w-1/2">
            <span className="text-7xl text-center font-semibold leading-relaxed">Congratulations!</span>
            <span className="text-center text-2xl">You have understood all the cards.</span>
          </div>
        </div>
      )}
      <div>
        <div className="w-full bg-background-950 rounded-full h-2.5">
          <div
            className="bg-primary-500 h-2.5 rounded-full"
            style={{
              width: `${(understoodCards.length / cards.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="mt-2 text-sm font-medium text-gray-500 text-center">
          Understood Cards: {understoodCards.length} / {cards.length}
        </p>
      </div>

      <div>
        <div className="w-full bg-background-950 rounded-full h-2.5 mt-4">
          <div
            className="bg-secondary-500 h-2.5 rounded-full"
            style={{
              width: `${(doubtCards.length / cards.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="mt-2 text-sm font-medium text-gray-500 text-center">
          Doubtful Cards: {doubtCards.length} / {cards.length}
        </p>
      </div>
    </div>
  );
}
