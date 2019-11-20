import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.loginTextBig}>Logged in</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignContent: "center"
    //justifyContent: 'row'
  },
  loginTextBig: {
    //position: 'absolute',
    width: 310,
    height: 56,
    left: 20,
    top: 165,
    //fontFamily: ‘Roboto’,
    fontStyle: "normal",
    //fontWeight: 500,
    fontSize: 30,
    lineHeight: 56,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000"
  },
  button: {
    width: 203,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#F3A3A3",
    marginTop: 6,
    alignSelf: "center"
    //marginBottom: 50
  }
});
