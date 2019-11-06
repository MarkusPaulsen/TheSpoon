import React, { Component } from "react";
import styles from "./landingpagestyle";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  Button,
  Alert, 
  Linking, 
  TouchableOpacity, 
  Image
} from "react-native";


export default class LandingPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated={false} hidden={false} />
        <Image source={require('/Users/janinestang/git/TheSpoon/TheSpoon/assets/thespoon_logo_black.png')} style={{alignSelf: 'center'}}/>
        <View style = {styles.buttons}> 
            <TouchableOpacity
                style = {styles.loginButton}
                onPress={() => Alert.alert("Login Button pressed")}
                onPress={() => this.onLoginPress()}
                onPress={() => this.props.navigation.navigate('Login')} >
                <Text style = {styles.smallText}>
                    Log in
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style = {styles.signupButton}
                onPress={() => Alert.alert("Sign Up Button pressed")}
                onPress={() => this.onLoginPress()}
                onPress={() => Linking.openURL('https://google.com')} >
                <Text style = {styles.smallText}>
                    Sign up
                </Text>
            </TouchableOpacity>
         </View>
      </View>
    );
  }

  onLoginPress() {}
}
