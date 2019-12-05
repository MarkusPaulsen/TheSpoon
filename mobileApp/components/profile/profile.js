import React, { Component } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import LoginScreen from "../login/login";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoaded: false
    };
  }

  componentDidMount = async () => {
    AsyncStorage.getItem("userToken").then(token => {
      this.setState({ loggedIn: token !== null, isLoaded: true });
    });
  };

  _signOutAsync = async () => {
    await AsyncStorage.removeItem("userToken");
    this.props.navigation.navigate('Login');
  };

  render() {
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.loggedIn ? (
              <View>
                <TouchableOpacity onPress={() => {
                  this._signOutAsync();
                }}>
                <Icon name="power_settings_new" size={32} color={Colors.GRAY_DARK} />
                </TouchableOpacity>
                <Text>Welcome to your profile {this.state.username}</Text></View>
          ) : (
            this.props.navigation.navigate("Login")
          )}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logout_icon :{
    marginTop:60
  }
});
