import { FlashcardArray, Flashcard } from "react-quizlet-flashcard";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { cards } from "./QuizCards";

export default function Quiz() {
  const [understoodCards, setUnderstoodCards] = useState([]);
  const doubtCards: any[] = [];
  let newCards: any[] = [];

  const controlRef = useRef({}); // {} should definitely be passed to useRef for it to work
  const currentCardFlipRef = useRef(); // nothing should be passed to useRef for it to work
  const [currentCard, setCurrentCard] = useState(1);

  newCards = cards;

  function onUnderstood(index: number) {
    const card = newCards[index - 1];
    setUnderstoodCards([...understoodCards, card]);
    console.log("Understood", understoodCards);
  }

  return (
    <div className="storyContainer">
      <FlashcardArray
        cards={cards}
        controls={false}
        showCount={false}
        forwardRef={controlRef}
        onCardChange={(id, index) => {
          setCurrentCard(index);
        }}
      />
      <p>
        {currentCard} / {cards.length}
      </p>
      <Button onClick={() => controlRef.current.prevCard()}>Prev</Button>
      <Button onClick={() => controlRef.current.resetArray()}>Reset</Button>
      <Button onClick={() => controlRef.current.nextCard()}>Next</Button>
      <Button onClick={() => onUnderstood(currentCard)}>Understood</Button>

      <FlashcardArray cards={understoodCards}/>
    </div>
  );
}
