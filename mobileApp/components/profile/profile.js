import React, { Component } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import LoginScreen from "../login/login";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoaded: false
    };
  }

  componentDidMount = async () => {
    AsyncStorage.getItem("userToken").then(token => {
      this.setState({ loggedIn: token !== null, isLoaded: true });
    });
  };
  render() {
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.loggedIn ? (
            <Text>Welcome to your profile {this.state.username}</Text>
          ) : (
            this.props.navigation.navigate("Login")
          )}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
