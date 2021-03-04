import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { blue, white } from "../utils/colors";

class TextButton extends Component {
  render() {
    const { text, onPress, color, icon } = this.props,
      colorStyles = color ? { backgroundColor: color } : {};
    return (
      <TouchableOpacity style={[styles.button, colorStyles]} onPress={onPress}>
        {icon && <Icon name={icon} size={18} color={white} />}
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 15,
    backgroundColor: blue,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: white,
    textTransform: "capitalize",
  },
});

export default TextButton;
