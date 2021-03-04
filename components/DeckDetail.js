import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import { green, gray } from "../utils/colors";

class DeckDetail extends Component {
  handlePress = (screen) => _ => {
    const { deck, navigation } = this.props;
    navigation.navigate(screen, { deckId: deck.title });
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.deckName}>{deck.title}</Text>
          <Text style={styles.cardsText}>{deck.questions.length} Cards</Text>
        </View>
        <TextButton text="Add Card" icon="plus-circle" color={green} onPress={this.handlePress("AddCard")} />
        <TextButton text="Start Quiz" icon="question-circle" onPress={this.handlePress("Quiz")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
  },
  titleContainer: {
    marginTop: 100,
    marginBottom: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  deckName: {
    fontSize: 32,
    fontWeight: "700",
  },
  cardsText: {
    fontSize: 18,
    color: gray,
  },
});

const mapStateToProps = (state, { route }) => {
  const { deckTitle } = route.params;
  const deck = state[deckTitle];

  return {
    deck,
  };
};

export default connect(mapStateToProps)(DeckDetail);
