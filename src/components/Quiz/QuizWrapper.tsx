import { FlashcardArray, Flashcard } from "react-quizlet-flashcard";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { cards } from "./QuizCards";

export default function Quiz() {
  const [understoodCards, setUnderstoodCards] = useState([]);
  const [doubtCards, setDoubtCards] = useState([]);
  const [newCards, setNewCards] = useState(cards);

  const controlRef = useRef({});
  const [currentCard, setCurrentCard] = useState(1);

  function onUnderstood(index: number) {
    const card = newCards[index - 1];
    setUnderstoodCards([...understoodCards, card]);
    setNewCards(newCards.filter((c) => c.id !== card.id));
    controlRef.current.nextCard();
    console.log("Understood", understoodCards);
  }

  function onDoubt(index: number) {
    const card = newCards[index - 1];
    setDoubtCards([...understoodCards, card]);
    controlRef.current.nextCard();
    console.log("Doubtful", doubtCards);
  }

  return (
    <div className="storyContainer">
      <div className="w-fit h-fit relative text-text-50">
      <FlashcardArray
        cards={newCards}
        controls={false}
        showCount={false}
        forwardRef={controlRef}
        onCardChange={(id, index) => {
          setCurrentCard(index);
        }}
      />
        <div className="absolute bottom-0 m-4">
            <Button className="bg-primary-500" onClick={() => onUnderstood(currentCard)}>Understood</Button>
          </div>
          <div className="absolute bottom-0 right-0 m-4">
            <Button className="bg-secondary-500" onClick={() => onDoubt(currentCard)}>Doubtful</Button>
          </div>
          
        
      </div>
      <div className="flex flex-col items-center justify-center">
      <p className="pt-2">
        {currentCard} / {newCards.length}
      </p>
        <div>
          <Button onClick={() => controlRef.current.prevCard()}>Prev</Button>
          <Button onClick={() => controlRef.current.resetArray()}>Reset</Button>
          <Button onClick={() => controlRef.current.nextCard()}>Next</Button>
        </div>
      </div>

      {/* <FlashcardArray cards={understoodCards} /> */}
    </div>
  );
}
