import "react-native-gesture-handler";
import React, { Component } from "react";
import { store } from "./store";
import { setLocalNotification } from "./utils/notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import Home from "./components/Home";
import DeckDetail from "./components/DeckDetail";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";
import { blue, white } from "./utils/colors";


const Stack = createStackNavigator();

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: blue,
              },
              headerTintColor: white,
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DeckDetail"
              component={DeckDetail}
              options={({ route }) => ({ title: route.params.deckTitle })}
            />
            <Stack.Screen
              name="AddCard"
              component={NewCard}
              options={{ title: "Add Card" }}
            />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen
              name="QuizResult"
              component={QuizResult}
              options={{ title: "Result" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
