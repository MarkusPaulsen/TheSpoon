import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";

export default class Review extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Profile page</Text>
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
