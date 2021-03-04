import { getDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export function receiveDecks(decks) {
  return { type: RECEIVE_DECKS, decks };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function addCardToDeck(deckTitle, card) {
  return {
    type: ADD_CARD,
    deckTitle,
    card,
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      decks && dispatch(receiveDecks(decks));
    });
  };
}
