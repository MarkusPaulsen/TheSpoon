import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Text, View, Image } from "react-native";
import LoginScreen from "./components/login/LoginScreen";
import SearchPage from "./components/search/Search";
import Loading from "./components/Loading";
import Menu from "./components/menupage/Menu";
import ItemReview from "./components/menupage/ItemReview";

import ReviewAddImage from "./components/review/views/ReviewAddImage";
import ReviewAddRestaurant from "./components/review/views/ReviewAddRestaurant";
import ReviewAddMenu from "./components/review/views/ReviewAddMenu";
import ReviewAddItems from "./components/review/views/ReviewAddItems";
import ReviewItems from "./components/review/views/ReviewItems";
import ReviewOverall from "./components/review/views/ReviewOverall";

import ProfilePage from "./components/profile/profile";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Colors from "./styles/colors";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const SearchStack = createStackNavigator(
  {
    Search: SearchPage,
    Loading: Loading,
    Menu: Menu,
    ItemReview: ItemReview
  },
  {
    initialRouteName: "Search",
    header: null,
    headerMode: "none"
  }
);

const ReviewStack = createStackNavigator(
  {
    ReviewAddImage: ReviewAddImage,
    ReviewAddRestaurant: ReviewAddRestaurant,
    ReviewAddMenu: ReviewAddMenu,
    ReviewAddItems: ReviewAddItems,
    ReviewItems: ReviewItems,
    ReviewOverall: ReviewOverall,
    Login: LoginScreen
  },
  {
    initialRouteName: "ReviewAddImage",
    header: null,
    headerMode: "none"
  }
);
const ProfileStack = createStackNavigator(
  {
    Profile: ProfilePage,
    Login: LoginScreen
  },
  {
    initialRouteName: "Profile",
    header: null,
    headerMode: "none"
  }
);

const bottomTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" size={32} color={tintColor} />
        )
      }
    },
    AddReview: {
      screen: ReviewStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="add-circle-outline" size={32} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={32} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Search",
    tabBarOptions: {
      activeTintColor: "#F3A3A3",
      height: 85
    }
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

export default class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      roboto: require("./assets/fonts/roboto-regular.ttf"),
      robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
      robotoMedium: require("./assets/fonts/Roboto-Medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded) {
      return (
        <ActionSheetProvider>
          <AppContainer />
        </ActionSheetProvider>
      );
    } else {
      return <Loading />;
    }
  }
}
