import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { addCardToDeck } from "../store/actions";
import TextButton from "./TextButton";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleSubmit = () => {
    const { question, answer } = this.state;
    if (!question || !answer) {
      alert("Please enter both question and answer.");
      return;
    }
    const { dispatch, route, navigation } = this.props;
    const deckId = route.params.deckId;
    dispatch(addCardToDeck(deckId, { question, answer }));
    navigation.navigate("DeckDetail", { deckTitle: deckId });
  };

  handleChangeText = (item) => (text) => {
    this.setState({ [item]: text });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Add New Card</Text>
        <TextInput
          style={styles.input}
          placeholder={"Question"}
          value={question}
          onChangeText={this.handleChangeText("question")}
        />
        <TextInput
          style={styles.input}
          placeholder={"Answer"}
          value={answer}
          onChangeText={this.handleChangeText("answer")}
        />
        <TextButton text="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 300,
    marginTop: 24,
  },
  headerText: {
    fontSize: 32,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "stretch",
    marginTop: 24,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default connect()(NewCard);
