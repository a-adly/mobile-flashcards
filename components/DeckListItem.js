import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { blue, white, lightBlue } from "../utils/colors";

class DeckListItem extends Component {
  
  handlePress = () => {
    const { title, navigation } = this.props;
    navigation.navigate("DeckDetail", { deckTitle: title });
  };

  render() {
    const { title, cardsCount } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.cards}>{cardsCount} Cards</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingTop: 30,
    paddingBottom: 30,
    margin: 15,
    backgroundColor: blue,
  },
  name: {
    fontSize: 25,
    fontWeight: "700",
    color: white,
  },
  cards: {
    fontSize: 15,
    color: lightBlue,
  },
});

export default DeckListItem;
