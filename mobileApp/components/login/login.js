import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Linking,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import UsernameIcon from "../../assets/login-email.png";
import PasswordIcon from "../../assets/login-password.png";
import Validate from "./validation.js";
import validate from "./validation";
import Profile from "../profile/profile";
import * as Api from "../../services/api";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: "",
      password: "",
      passwordError: "",
      token: "",
      invalidError: false,
      parent: ""
    };
    this.register = this.register.bind(this);
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getToken();
      const parent = this.props.navigation.getParam("parent", "Profile");
      this.setState({ parent });
    });
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  async handleLogin() {
    try {
      const data = JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        isRestaurantOwner: false
      });

      const res = await fetch(Api.STUB_LOGIN, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: data
      });
      const responseText = await res.text();
      if (res.ok) {
        const jsonResponse = JSON.parse(responseText);
        this.setState({ token: jsonResponse.token });
        this.storeToken(JSON.stringify(jsonResponse.token));
        console.log("Token is set to: ", this.state.token);
        this.props.navigation.navigate(this.state.parent);
      }
      if (!res.ok) {
        this.setState({ invalidError: true });
      }
    } catch (e) {
      console.error("Error logging in: ", e);
    }
  }

  async register() {
    const usernameError = Validate("username", this.state.username);
    const passwordError = Validate("password", this.state.password);

    this.setState({
      usernameError: usernameError,
      passwordError: passwordError
    });
    if (!usernameError && !passwordError) {
      await this.handleLogin();
    }
  }

  handleUsernameChange = username => {
    this.setState({ username: username.trim() });
  };

  handlePasswordChange = password => {
    this.setState({ password: password.trim() });
  };

  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userToken",user);
    } catch (e) {
      console.log("Error storing token: ", e);
    }
  }

  async getToken(user) {
    try {
      const userData = await AsyncStorage.getItem("userToken");
      const data = JSON.parse(userData);
    } catch (e) {
      console.log("Error getting token: ", e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Log in</Text>
        <View style={{ flex: 2, justifyContent: "space-around" }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={UsernameIcon} style={{ alignSelf: "center" }} />
            <TextInput
              placeholder={"Username"}
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
              placeholder={"Password"}
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
          <Text style={{ color: "#F3A3A3", alignSelf: "center" }}>
            {this.state.usernameError || this.state.passwordError
              ? "All fields must be filled out"
              : null}
          </Text>
          <Text style={{ color: "#F3A3A3", alignSelf: "center" }}>
            {this.state.invalidError ? "Invalid username or password" : null}
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
            onPress={() => Linking.openURL("https://thespoon.herokuapp.com")}
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
    alignSelf: "center",
    marginLeft: 7,
    fontSize: 15
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
    color: "#A5DED0",
    //marginTop: 45,
    //alignSelf: "center"
    marginLeft: 5
  },
  registration: {
    //textAlign: 'center',
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1
    //marginTop: 50
  },
  buttonText: {
    color: "#000000",
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "roboto",
    fontSize: 14
  }
});
