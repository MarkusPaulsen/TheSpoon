import React, {Component} from "react";
import {
  View,
  Text,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import TheSpoonLogo from "../../assets/thespoon-logo.png";
import SpoonBackground from "../../assets/spoon-background.png";
import CustomizedButton from "../button.js";

export default class LandingPage extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={SpoonBackground}
          style={{width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image source={TheSpoonLogo} />
            </View>
            <View style={styles.buttons}>
              <CustomizedButton
                label="Log in"
                style={styles.loginButton}
                onPress={() => this.props.navigation.navigate("Login")}
              />
              <CustomizedButton
                label="Sign up"
                style={styles.signupButton}
                onPress={() => Linking.openURL("https://google.com")}
              />
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
    alignItems: "center",
    flexDirection: "column"
    //justifyContent: 'space-around'
  },
  loginButton: {
    width: 203,
    height: 38,
    backgroundColor: "#F3A3A3",
    marginTop: 10,
    //alignSelf: 'center',
    borderRadius: 20
  },
  signupButton: {
    width: 203,
    height: 38,
    backgroundColor: "#A5DED0",
    marginTop: 10,
    //alignSelf: 'center',
    borderRadius: 20
  },
  smallText: {
    color: "#000000",
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "roboto"
  },
  buttons: {
    flex: 1,
    //marginTop: 50,
    flexDirection: "column"
    //justifyContent: 'space-around'
  },
  logo: {
    flex: 3,
    flexDirection: "row",
    //alignItems: 'center',
    //flexWrap: 'wrap'
    justifyContent: "space-around",
    marginTop: 140
  }
});
