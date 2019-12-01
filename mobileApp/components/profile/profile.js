import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet, AsyncStorage
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";

export default class Review extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const username = navigation.getParam("username", "000");
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Welcome to your profile {username}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
