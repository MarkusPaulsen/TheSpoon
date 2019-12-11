import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity, StyleSheet } from "react-native";

export default class ContinueButton extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name={"chevron-left"} size={40} style={styles.button} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 20
  }
});
