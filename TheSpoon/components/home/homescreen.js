import React, { Component } from "react";
import {
  View, 
  Text
} from "react-native";

export default class HomeScreen extends Component {

  render() {
    return (
      <View>
        <Text style={{color: "rgba(213,85,141,1)", fontSize: 24,marginTop: 204, alignSelf: "center"}}>
          Welcome to your home screen
        </Text>
      </View>
    );
  }
}
