import React, { Component } from "react";
import {
  View, 
  Text
} from "react-native";
import styles from './homescreenstyle';

export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginTextBig}>
          You are now logged in
        </Text>
      </View>
    );
  }
}
