import React, { Component } from "react";
import styles from "./loginstyle";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Linking,
  TouchableOpacity
} from "react-native";

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text2}>Log in</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#959595"
          multiline
          numberOfLines={1}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#959595"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          returnKeyType="go"
          secureTextEntry={true}
        />
        <Button
          type="solid"
          title="Login"
          color="#F3A3A3"
          onPress={() => this.onLoginPress()}
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.loginButton}
        />
        <Button
          color="#A5DED0"
          type="solid"
          title="Not registered yet?"
          onPress={() => this.onLoginPress()}
          onPress={() => Linking.openURL("https://google.com")}
          style={styles.loginButton}
        />
        <TouchableOpacity>
          <Text style={styles.loginButton}></Text>
        </TouchableOpacity>
      </View>
    );
  }

  onLoginPress() {}
}
