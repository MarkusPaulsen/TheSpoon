import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/login/login";
import HomeScreen from './components/home/homescreen';
import LandingPage from './components/landingpage/landingpage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen, 
    Start: LandingPage
  },
  {
    initialRouteName: 'Start',
    header: null, 
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

