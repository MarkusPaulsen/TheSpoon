import React, { Component } from "react";
import { Localization } from "expo";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { StyleSheet, Text, View } from "react-native";
import i18n from "i18n-js";
import LoginScreen from "./components/login/login.js";

export default class App extends Component {
  render() {
    return <LoginScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
