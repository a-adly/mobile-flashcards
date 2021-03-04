import React, { Component } from "react";
import { connect } from "react-redux";
import { addDeck } from "../store/actions";
import { View, Text, StyleSheet, TextInput } from "react-native";
import TextButton from "./TextButton";
import { gray } from "../utils/colors";

class NewDeck extends Component {
  state = {
    title: "",
  };

  handleSubmit = () => {
    const { title } = this.state;
    if (!title) {
      alert("Please enter a deck title first");
      return;
    }
    const { dispatch, navigation } = this.props;
    dispatch(addDeck(title));
    navigation.navigate("DeckDetail", { deckTitle: title });
    this.setState({ title: "" });
  };

  handleChangeText = (title) => {
    this.setState({ title });
  };

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Enter the new deck title</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Name..."
          value={title}
          onChangeText={this.handleChangeText}
        />
        <TextButton text="Add New Deck" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  headerText: {
    marginBottom: 20,
    fontSize: 20,
    // alignSelf:"flex-start"
  },
  input: {
    borderColor: gray,
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default connect()(NewDeck);
