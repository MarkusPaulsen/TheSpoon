import React, { Component } from "react";
import styles from "./landingpagestyle";
import {
  View,
  StatusBar,
  Text,
  Alert, 
  Linking, 
  TouchableOpacity, 
  Image, 
  ImageBackground
} from "react-native";


export default class LandingPage extends Component {

  render() {
    return (
      <View>
        <ImageBackground source={require('/Users/janinestang/git/TheSpoon/TheSpoon/assets/backgroundspoon.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Image source={require('/Users/janinestang/git/TheSpoon/TheSpoon/assets/thespoon_logo_black.png')} style={styles.logo}/>
                <View style = {styles.buttons}> 
                    <TouchableOpacity
                        style = {styles.loginButton}
                        activeOpacity={.9}
                        onPress={() => Alert.alert("Login Button pressed")}
                        onPress={() => this.onLoginPress()}
                        onPress={() => this.props.navigation.navigate('Login')} >
                        <Text style = {styles.smallText}>
                            Log in
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.signupButton}
                        activeOpacity={.9}
                        onPress={() => Alert.alert("Sign Up Button pressed")}
                        onPress={() => this.onLoginPress()}
                        onPress={() => Linking.openURL('https://google.com')} >
                        <Text style = {styles.smallText}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
         </ImageBackground>
      </View>
    );
  }

  onLoginPress() {}
}
