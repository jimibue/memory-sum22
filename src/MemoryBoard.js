import { useState } from "react";
import Card from "./Card";
import { createDeck } from "./helpers";

let initDeck = ["x", "y", "z"];
const MemoryBoard = () => {
  let [deckValues, setDeckValues] = useState(initDeck);
  let [deck, setDeck] = useState(createDeck(initDeck));
  let [firstCardId, setFirstCardId] = useState(null);
  let [disableClick, setDisabledClick] = useState(false);

  const checkForMatch = (c1Id, c2Id) => {
    let c1 = deck.find((c) => c.id === c1Id);
    let c2 = deck.find((c) => c.id === c2Id);
    let newDeck;
    if (c1.value === c2.value) {
      // match
      newDeck = deck.map((c) =>
        c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c
      );
      setDeck(newDeck);
    } else {
      setDisabledClick(true)
      setTimeout(() => {
        newDeck = deck.map((c) => ({ ...c, show: false }));
        setDeck(newDeck);
        setDisabledClick(false)
      }, 2000);
    }
  };

  const cardClicked = (id) => {
    // toggle visibity of a card
    let newDeck = deck.map((c) => (c.id === id ? { ...c, show: true } : c));
    setDeck(newDeck);

    if (!firstCardId) {
      setFirstCardId(id);
    } else {
      // i do have selected second card selected
      checkForMatch(firstCardId, id);
      setFirstCardId(null);
    }
  };

  const renderBoard = () => {
    return deck.map((c) => <Card key={c.id} {...c} taco={cardClicked} disableClick={disableClick} />);
  };
  return (
    <>
      <div className="container">{renderBoard()}</div>
      <div>
        <h1>DEV YO</h1>
        <h1>deckValues</h1>
        {JSON.stringify(deckValues)}
        <h1>deck</h1>
        {JSON.stringify(deck)}
      </div>
    </>
  );
};
export default MemoryBoard;
// UI -> flip
// flip function
// click event on card
// click one card -> show
// click another card -> show
// on second click -> check for match
// -> if they match set isMatched on both cards to true
// -> else wait 1 sec and toggle both cards back to hide
