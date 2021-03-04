import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import { lightBlue, darkBlue, white, red, green, blue } from "../utils/colors";

class Quiz extends Component {
  state = {
    show: "question",
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  };

  handleAnswer = (ans) => () => {
    this.setState(
      {
        show: "question",
        [ans]: this.state[ans] + 1,
      },
      () => {
        const totalQuestions = this.props.questions.length;
        const { currentQuestion, correctAnswers } = this.state;

        if (currentQuestion === totalQuestions - 1) {
          this.setState({
            show: "question",
            currentQuestion: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
          });

          this.props.navigation.navigate("QuizResult", {
            correctAnswers,
            totalQuestions,
            deckId: this.props.deckId,
          });
        } else {
          this.setState({ currentQuestion: currentQuestion + 1 });
        }
      }
    );
  };

  toggleCard = () => {
    const { show } = this.state;
    this.setState({ show: show === "question" ? "answer" : "question" });
  };

  render() {
    const { state, props, toggleCard, handleAnswer } = this,
      { show, currentQuestion } = state,
      { questions } = props,
      totalQuestions = questions.length;

    if (totalQuestions === 0) {
      return (
        <View style={styles.container}>
          <Text>This deck has no cards</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 8 }}>
          {currentQuestion + 1}/{totalQuestions}
        </Text>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Text style={{ color: white, fontSize: 16 }}>
              {show === "question" ? "Front" : "Back"}
            </Text>
          </View>
          <Text style={[styles.questionText, styles[show]]}>
            {show === "question"
              ? questions[currentQuestion].question
              : questions[currentQuestion].answer}
          </Text>
        </View>

        <TextButton
          text={`Show ${show === "question" ? "Answer" : "Question"}`}
          onPress={toggleCard}
        />
        <TextButton
          text="Correct"
          onPress={handleAnswer("correctAnswers")}
          color={green}
          icon="check-circle"
        />
        <TextButton
          text="Incorrect"
          onPress={handleAnswer("incorrectAnswers")}
          color={red}
          icon="times-circle"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 24,
  },
  card: {
    borderWidth: 1,
    alignSelf: "stretch",
    backgroundColor: lightBlue,
  },
  cardTitle: {
    alignItems: "center",
    padding: 6,
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
    height: 300,
  },
  question: {
    backgroundColor: blue,
  },
  answer: {
    backgroundColor: darkBlue,
  },
});

const mapStateToProps = (state, { route }) => {
  const { deckId } = route.params;
  return {
    deckId,
    questions: state[deckId].questions,
  };
};

export default connect(mapStateToProps)(Quiz);
