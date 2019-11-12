import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Linking,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import UsernameIcon from "../../assets/login-email.png";
import PasswordIcon from "../../assets/login-password.png";
import Validate from "./validation.js";
import validate from "./validation";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: "",
      password: "",
      passwordError: "",
      token: ""
    };
    this.register = this.register.bind(this);
  }
  async handleLogin() {
    //TODO: Add token
    // TODO: test navigation
    try {
      let data = JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        isRestaurantOwner: false
      });
      let res = await fetch("http://192.168.1.112:5000/api/user/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: data
      });
      res = await res.text();
      console.log(res);
      //have not tested this yet, do not have any valid username to test
      //if(res.ok){
      //  this.props.navigation.navigate('Home');
      // }
    } catch (e) {
      console.error(e);
    }
  }

  register() {
    const usernameError = Validate("username", this.state.username);
    const passwordError = Validate("password", this.state.password);

    this.setState({
      usernameError: usernameError,
      passwordError: passwordError
    });
    if (!usernameError && !passwordError) {
      this.props.navigation.navigate("Home");
    }
  }

  handleUsernameChange = username => {
    this.setState({ username: username.trim() });
  };

  handlePasswordChange = password => {
    this.setState({ password: password.trim() });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Log in</Text>
        <View style={{ flex: 2, justifyContent: "space-around" }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={UsernameIcon} style={{ alignSelf: "center" }} />
            <TextInput
              value={this.state.username}
              onChangeText={this.handleUsernameChange}
              onBlur={() => {
                this.setState({
                  usernameError: validate("username", this.state.username)
                });
              }}
              error={this.state.usernameError}
              style={styles.textInput}
            />
            <Text style={{ color: "#F3A3A3" }}>
              {this.state.usernameError ? "*" : null}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 90 }}>
            <Image source={PasswordIcon} style={{ alignSelf: "center" }} />
            <TextInput
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              onBlur={() => {
                this.setState({
                  passwordError: Validate("password", this.state.password)
                });
              }}
              error={this.state.passwordError}
              secureTextEntry={true}
              style={styles.textInput}
            />
            <Text style={{ color: "#F3A3A3" }}>
              {this.state.passwordError ? "*" : null}
            </Text>
          </View>
          <Text style={{ color: "#F3A3A3" }}>
            {this.state.usernameError || this.state.passwordError
              ? "All fields must be filled out"
              : null}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.register}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}> Log in </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registration}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://google.com")}
          >
            <Text style={styles.registrationButton}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  text: {
    fontSize: 48,
    fontFamily: "roboto",
    marginTop: 150,
    flex: 1
    //justifyContent: 'center'
  },
  textInput: {
    width: 224,
    height: 42,
    color: "#000000",
    fontFamily: "roboto",
    borderBottomColor: "#F3A3A3",
    borderBottomWidth: 1.5,
    //marginTop: 99,
    alignSelf: "center"
  },
  loginButton: {
    width: 203,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#F3A3A3",
    marginTop: 6,
    alignSelf: "center"
    //marginBottom: 50
  },
  registrationButton: {
    //width: 100,
    //height: 36,
    color: "#A5DED0"
    //marginTop: 45,
    //alignSelf: "center"
  },
  registration: {
    //textAlign: 'center',
    //justifyContent: 'space-between',
    flexDirection: "row",
    flex: 1
    //marginTop: 50
  },
  buttonText: {
    color: "#000000",
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "roboto"
  }
});
