import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import { lightBlue, darkBlue } from "../utils/colors";
import {
  setLocalNotification,
  clearLocalNotification,
} from "../utils/notifications";

class QuizResult extends Component {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  navigateTo = (screen) => () => {
    const { navigation, route } = this.props,
      { deckId } = route.params;
    navigation.navigate(screen, { deckId });
  };

  render() {
    const { props, navigateTo } = this,
      { route } = props,
      { correctAnswers, totalQuestions } = route.params,
      percentage = ((correctAnswers / totalQuestions) * 100).toFixed(0);

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Quiz Completed!</Text>
        <View style={styles.scoreCard}>
          <Text style={styles.percentage}>{percentage}%</Text>
          <Text style={styles.scoreText}>
            {correctAnswers} correct answers out of {totalQuestions}
          </Text>
        </View>
        <TextButton text="Restart Quiz" onPress={navigateTo("Quiz")} />
        <TextButton text="Back to Deck" onPress={navigateTo("DeckDetail")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 24,
  },
  headerText: {
    fontSize: 32,
    textAlign: "center",
  },
  scoreCard: {
    marginBottom: 40,
    marginTop: 40,
    backgroundColor: lightBlue,
    borderWidth: 1,
    alignSelf: "stretch",
    flexBasis: 200,
    justifyContent: "center",
  },

  scoreText: {
    fontSize: 20,
    textAlign: "center",

    color: darkBlue,
  },
  percentage: {
    fontSize: 48,
    textAlign: "center",
  },
});

export default QuizResult;
