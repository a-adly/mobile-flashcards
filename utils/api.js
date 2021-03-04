import { _initialDecks, DECKS_STORAGE_KEY } from "./_DATA";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getDeck(title) {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return JSON.parse(decks)[title];
  } catch (error) {
    console.error("getDeck error: ", error);
  }
}

export async function getDecks() {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (decks === null) {
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(_initialDecks));
      return _initialDecks;
    }
    return JSON.parse(decks);
  } catch (error) {
    console.error("getDecks error: ", error);
  }
}

export async function addDeck(title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (error) {
    console.error("addDeck error: ", error);
  }
}

export async function addCard(deckTitle, card) {
  try {
    const deck = await getDeck(deckTitle);

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [deckTitle]: {
          questions: deck.questions.concat(card),
        },
      })
    );
  } catch (error) {
    console.error("addCard error: ", error);
  }
}

export async function resetData() {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(_initialDecks));
  } catch (error) {
    console.error("resetData error: ", error);
  }
}
