import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title: title,
          questions: [],
        },
      };
    case ADD_CARD:
      const { deckTitle, card } = action;

      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: state[deckTitle].questions.concat(card),
        },
      };

    default:
      return state;
  }
}
