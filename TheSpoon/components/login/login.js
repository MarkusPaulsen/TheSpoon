import React, { Component } from "react";
import styles from "./loginstyle";
import {
  View,
  Text,
  TextInput,
  Button,
  Linking,
  TouchableOpacity,
  Image
} from "react-native";

interface State {
  username: string;
  password: string;
}

export default class LoginScreen extends Component<{}, State> {
  readonly state:State = {
    username: "", 
    password: "",
  }
  
  handleUsernameChange = (username: string) => {
    this.setState({username:username});
  };

  handlePasswordChange = (password:string) => {
    this.setState ({password:password});
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Log in</Text>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('/Users/janinestang/git/TheSpoon/TheSpoon/assets/login-email.png')} style={{alignSelf: "center"}}/>
          <TextInput
            placeholder="Username"
            value = {this.state.username}
            onChangeText = {this.handleUsernameChange}
            placeholderTextColor="#959595"
            numberOfLines={1}
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('/Users/janinestang/git/TheSpoon/TheSpoon/assets/login-password.png')} style={{alignSelf: "center"}}/>
          <TextInput
            placeholder="Password"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholderTextColor="#959595"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            returnKeyType="done"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.onLoginPress()}
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableOpacity>
        <View style={styles.registration}>
          <Text>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => this.onLoginPress()}
            onPress={() => Linking.openURL("https://google.com")}
          >
            <Text style={styles.registrationButton}>
              Register now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onLoginPress() {}
}
