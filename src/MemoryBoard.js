import { useEffect, useState } from "react";
import Card from "./Card";
import CardForm from "./CardForm";
import { createDeck, shuffle } from "./helpers";

let initDeck = ["x", "y", "z"];
const MemoryBoard = () => {
  let [deckValues, setDeckValues] = useState(initDeck);
  let [deck, setDeck] = useState(createDeck(initDeck));
  let [firstCardId, setFirstCardId] = useState(null);
  let [disableClick, setDisabledClick] = useState(false);

  // shuffle deck on mount
  useEffect(()=>{
     let shuffledDeck = shuffle(deck)
     setDeck(shuffledDeck)
  },[])

  
  const addValue = (value) =>{
      let newDeckValues = [...deckValues, value]
      setDeckValues(newDeckValues)
      // deckValues won't be set HERE need to use
      //  setDeck(createDeck(deckValues))
      setDeck(shuffle(createDeck(newDeckValues)))
  }

  const checkForMatch = (c1Id, c2Id) => {
    // find our two selected cards
    let c1 = deck.find((c) => c.id === c1Id);
    let c2 = deck.find((c) => c.id === c2Id);

    // there is a match: set isMatched on both cards to true and set and return
    if (c1.value === c2.value) {
      let newDeck = deck.map((c) =>
        c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c
      );
      setDeck(newDeck);
      return;
    }
    // did not match
    timedOutToggle();
  };

  // function that waits two seconds to set all cards show values to false
  const timedOutToggle = () => {
    setDisabledClick(true);
    setTimeout(() => {
      let newDeck = deck.map((c) => ({ ...c, show: false }));
      setDeck(newDeck);
      setDisabledClick(false);
    }, 2000);
  };

  const cardClicked = (id) => {
    // show the card that was clicked
    let newDeck = deck.map((c) => (c.id === id ? { ...c, show: true } : c));
    setDeck(newDeck);

    // first card clicked, setID and return
    if (!firstCardId) {
      setFirstCardId(id);
      return;
    }
    // second card clicked, check for win
    checkForMatch(firstCardId, id);
    setFirstCardId(null);
  };

  // taco is a bad name but works, see in Card component where it is used
  // {...c} take all key value pairs in a card and passes them as props
  const renderBoard = () => {
    return deck.map((c) => (
      <Card key={c.id} {...c} taco={cardClicked} disableClick={disableClick} />
    ));
  };
  return (
    <>
      <div className="container">{renderBoard()}</div>
      <hr />
      <CardForm addValue={addValue} />
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
