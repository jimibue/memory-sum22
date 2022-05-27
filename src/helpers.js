
// ['x','y'] => [{x},{x},{y},{y}]
// takes our array of strings and converts them to our deck
export const createDeck = (cardValues) => {
  return cardValues.reduce((cards, cardString, index) => {
    let cardObj = {
      id: index * 2+1,
      value: cardString,
      show: false,
      isMatched: false,
    };
    let cardObj1 = {
      id: index * 2 + 2,
      value: cardString,
      show: false,
      isMatched: false,
    };
    return [...cards, cardObj, cardObj1];
  }, []);
};

export const shuffle = (cards) => {
 return cards
    .map((foo) => ({ ...foo, sortNum: Math.random() }))
    .sort((a, b) => a.sortNum - b.sortNum)
    .map((bar) => ({
      id: bar.id,
      value: bar.value,
      show: false,
      isMatched: false,
    }));
};
