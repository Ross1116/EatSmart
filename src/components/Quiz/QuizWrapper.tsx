import { FlashcardArray } from "react-quizlet-flashcard";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { cards } from "./QuizCards";
import { MoveLeft, MoveRight, RefreshCw } from "lucide-react";

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

  useEffect(() => {
    console.log("Understood", understoodCards);
    console.log("Doubtful", doubtCards);

    if (indexCount > newCards.length && indexCount > 1) {
      onPrev();
    }
  }, [understoodCards, doubtCards]);

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

  function onDoubt(index: number) {
    const card = newCards[index - 1];
    if (!doubtCards.includes(card)) {
      setDoubtCards([...doubtCards, card]);
      // onNext();
    } else {
      alert("Card was already added to the doubtfull stack");
    }
    onNext();
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
    <div className="flex flex-col gap-2 justify-center h-dvh">
      {newCards.length > 0 && (
        <>
          <h2 className="text-7xl font-bold py-16">
            Let&apos;s test your knowledge!
          </h2>
          <div className="flex flex-row items-center justify-center gap-2">
          <div>
            <Button className="text-text-950 rounded-full hover:bg-background-100 hover:text-secondary-900" onClick={onPrev}><MoveLeft /></Button>
            </div>
            <div className="w-fit h-fit relative text-text-50">
            <FlashcardArray
              cards={newCards}
              controls={false}
              showCount={false}
              forwardRef={controlRef}
              cycle={true}
              frontCardStyle={{ backgroundColor: "#f0f5d6", color: "#171906" }}
              frontContentStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "500",
                fontSize: "1.5rem",
                padding: "2rem",
              }}
              backCardStyle={{ backgroundColor: "#e0ebad", color: "#171906" }}
              backContentStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "600",
                fontSize: "2rem",
                padding: "2rem",
              }}
            />
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
            <Button className="text-text-950 rounded-full hover:bg-background-100 hover:text-secondary-900" onClick={onNext}><MoveRight /></Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
          <Button className="text-text-950 rounded-full hover:bg-background-100 hover:text-secondary-900" onClick={onReset}><RefreshCw /></Button>
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
