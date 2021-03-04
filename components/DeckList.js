import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, FlatList } from "react-native";
import DeckListItem from "./DeckListItem";

class DeckList extends Component {
  render() {
    const { decks, navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={(deck) => (
            <DeckListItem
              title={deck.item.title}
              cardsCount={deck.item.questions.length}
              navigation={navigation}
            />
          )}
          keyExtractor={(deck) => deck.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap:"wrap",
    alignItems: "stretch",
    alignContent: "stretch",
    justifyContent: "center",
    overflow:"scroll",
    padding: 10,
    marginTop: 25,
    height:"100%"
  },
});

const mapStateToProps = (state) => {
  return { decks: state };
};

export default connect(mapStateToProps)(DeckList);
