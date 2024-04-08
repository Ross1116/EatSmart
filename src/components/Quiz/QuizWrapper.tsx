import { FlashcardArray } from "react-quizlet-flashcard";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { cards } from "./QuizCards";

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
    }
    else {
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
    <div className="storyContainer">
      {newCards.length > 0 && (
        <>
          <div className="w-fit h-fit relative text-text-50">
            <FlashcardArray
              cards={newCards}
              controls={false}
              showCount={false}
              forwardRef={controlRef}
              cycle={true}
            />
            <div className="absolute bottom-0 m-4">
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

          <div className="flex flex-col items-center justify-center">
            <p className="pt-2">
              {indexCount} / {newCards.length}
            </p>
            <div>
              <Button onClick={onPrev}>Prev</Button>
              <Button onClick={onReset}>Reset</Button>
              <Button onClick={onNext}>Next</Button>
            </div>
          </div>
        </>
      )}
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

<div className="w-full bg-background-950 rounded-full h-2.5 mt-4">
  <div
    className="bg-accent-500 h-2.5 rounded-full"
    style={{
      width: `${(doubtCards.length / cards.length) * 100}%`,
    }}
  ></div>
</div>
<p className="mt-2 text-sm font-medium text-gray-500 text-center">
  Doubtful Cards: {doubtCards.length} / {cards.length}
</p>
    </div>
  );
}
