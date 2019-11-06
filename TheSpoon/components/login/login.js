import React, { Component } from "react";
import styles from "./loginstyle";
import {
  StyleSheet,
  View,
  StatusBar,
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
        <StatusBar animated={false} hidden={false} />
        <Text style={styles.text2}>Log in</Text>
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <Button 
            title="Login"
            style={styles.loginButton}
            onPress={() => Alert.alert("Login Button pressed")}
            onPress={() => this.onLoginPress()}
            onPress={() => this.props.navigation.navigate('Home')}
        />
         <TouchableOpacity>
            <Text style = {styles.loginButton}>
              
            </Text>
         </TouchableOpacity>
      </View>
    );
  }

  onLoginPress() {}
}
