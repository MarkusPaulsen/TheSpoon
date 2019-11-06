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
          Logged in
        </Text>
      </View>
    );
  }
}
