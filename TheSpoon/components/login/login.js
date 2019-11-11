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
import UsernameIcon from '../../assets/login-email.png';
import PasswordIcon from '../../assets/login-password.png';
import CustomizedButton from '../button.js';



export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: ""
    };
  }
  async handleLogin() {
      //TODO: Add token
      // TODO: test navigation
      try {
          let data = JSON.stringify({email: this.state.username,
              password: this.state.password,
              isRestaurantOwner: false})
          ;
          let res = await fetch('http://192.168.1.110:5000/api/user/login/', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: data,
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


  handleUsernameChange = (username) => {
    this.setState({ username: username });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Log in</Text>
        <View style={{ flex: 2, justifyContent: 'space-around' }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={UsernameIcon} style={{ alignSelf: "center" }} />
            <TextInput
              placeholder="Username"
              value={this.state.username}
              onChangeText={this.handleUsernameChange}
              placeholderTextColor="#959595"
              numberOfLines={1}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 90 }}>
            <Image source={PasswordIcon} style={{ alignSelf: "center" }} />
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
        </View>
        <View style={{ flex: 1 }}>
          <CustomizedButton label="Log in"
          onPress={() => this.handleLogin()} style={styles.loginButton}
          />
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
    fontFamily: 'roboto',
    marginTop: 150,
    flex: 1,
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
    alignSelf: "center",
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
    flex: 1,
    //marginTop: 50

  }
}
);
