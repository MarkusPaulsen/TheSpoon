import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import TheSpoonLogo from '../../assets/thespoon-logo.png';
import SpoonBackground from '../../assets/spoon-background.png';


export default class LandingPage extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={SpoonBackground}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <Image
              source={TheSpoonLogo}
              style={styles.logo}
            />
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.9}
                onPress={() => Alert.alert("Login Button pressed")}
                onPress={() => this.onLoginPress()}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={styles.smallText}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupButton}
                activeOpacity={0.9}
                onPress={() => Alert.alert("Sign Up Button pressed")}
                onPress={() => this.onLoginPress()}
                onPress={() => Linking.openURL("https://google.com")}
              >
                <Text style={styles.smallText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  onLoginPress() {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  loginButton: {
    width: 203,
    height: 38,
    backgroundColor: '#F3A3A3',
    marginTop: 6,
    alignSelf: 'center',
    borderRadius: 20,
  },
  signupButton: {
    width: 203,
    height: 38,
    backgroundColor: '#A5DED0',
    marginTop: 6,
    alignSelf: 'center',
    borderRadius: 20,
  },
  smallText: {
    color: '#000000',
    alignSelf: 'center',
    marginTop: 9
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
});
