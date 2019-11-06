import React, { Component } from "react";
import styles from "./style";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  Button,
  Alert, 
  Linking
} from "react-native";

export default class LoginScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated={false} hidden={false} />
        <Text style={styles.text2}>Log in</Text>
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput2} />
        <Button
          title="Login"
          onPress={() => Alert.alert("Login Button pressed")}
          onPress={() => this.onLoginPress()}
          onPress={() => this.props.navigation.navigate('Home')}
          style={styles.loginButton}
        />
        <Button 
          title="Not registered yet?"
          onPress={() => Alert.alert("Login Button pressed")}
          onPress={() => this.onLoginPress()}
          onPress={() => Linking.openURL('https://google.com')}
          style={styles.loginButton}
        />
      </View>
    );
  }

  onLoginPress() {}
}
