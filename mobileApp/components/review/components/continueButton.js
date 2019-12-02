import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";

export default class ContinueButton extends Component {
  render() {
    const color = this.props.color;

    return (
      <View style={[styles.button, { backgroundColor: color }]}>
        <Text style={[Typography.FONT_H4_WHITE, { textAlign: "center" }]}>
          CONTINUE
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 145,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    marginVertical: 20
  }
});
