import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../store/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";
import { blue } from "../utils/colors";

const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

class Home extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Decks"
        backBehavior="initialRoute"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Decks") {
              iconName = focused ? "cards" : "cards-outline";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "AddDeck") {
              iconName = focused ? "plus-square" : "plus-square-o";
              return <Icon name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: blue,
        }}
      >
        <Tab.Screen
          name="Decks"
          component={DeckList}
          options={{ tabBarBadge: this.props.decksNum }}
        />
        <Tab.Screen
          name="AddDeck"
          component={NewDeck}
          options={{ title: "Add Deck" }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return { decksNum: Object.keys(state).length };
};

export default connect(mapStateToProps, { handleInitialData })(Home);
