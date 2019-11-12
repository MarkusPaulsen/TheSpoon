import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/login/login";
import SearchPage from "./components/search/search";
import LandingPage from "./components/landingpage/landingpage";
import LoadingPage from "./components/loading";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";

const RootStack = createStackNavigator(
  {
    Search: SearchPage,
    Login: LoginScreen,
    Loading: LoadingPage,
    Start: LandingPage
  },
  {
    initialRouteName: "Start",
    header: null,
    headerMode: "none"
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
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      roboto: require("./assets/fonts/roboto-regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded) {
      console.log("font loaded");
      return <AppContainer />;
    } else {
      return <LoadingPage />;
    }
  }
}
