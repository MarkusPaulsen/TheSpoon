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

// interface State {
//   username: string;
//   password: string;
//   token:string;
// }

export default class LoginScreen extends Component {
  //   handleLogin() {
  //   let collection={}
  //   collection.username=this.state.username,
  //   collection.email=this.state.password

  //   fetch('exp://192.168.1.110:19000', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: this.state.username,
  //       password: this.state.password,
  //       isRestaurantOwner:false

  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((json) => {
  //     console.log(json);
  //     this.setState({token:json});
  //     return json;
  //   }).catch((error) => {
  //       console.error(error);
  //     });
  // }

  //   readonly state:State = {
  //     username: "",
  //     password: "",
  //   }

  handleUsernameChange = (username: string) => {
    this.setState({ username: username });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Log in</Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("/Users/cathrineakreaas/theSpoon/TheSpoon/TheSpoon/assets/login-email.png")}
            style={{ alignSelf: "center" }}
          />
          <TextInput
            placeholder="Username"
            //value={this.state.username}
            //onChangeText={this.handleUsernameChange}
            placeholderTextColor="#959595"
            numberOfLines={1}
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("/Users/cathrineakreaas/theSpoon/TheSpoon/TheSpoon/assets/login-password.png")}
            style={{ alignSelf: "center" }}
          />
          <TextInput
            placeholder="Password"
            //value={this.state.password}
            //onChangeText={this.handlePasswordChange}
            placeholderTextColor="#959595"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            returnKeyType="done"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          //actually needs to only be called if validation goes through
          //onPress={() => this.handleLogin()}
          // need to fix proper navigation if token is set
          onPress={() => this.props.navigation.navigate("Home")}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.registration}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => this.onLoginPress()}
            onPress={() => Linking.openURL("https://google.com")}
          >
            <Text style={styles.registrationButton}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onLoginPress() {}
}
