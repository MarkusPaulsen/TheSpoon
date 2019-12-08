import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  AsyncStorage
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoaded: false
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(token => {
        this.setState({ loggedIn: token !== null, isLoaded: true });
      });
    });
  };
  componentWillUnmount() {
    this.focusListener.remove();
  }

  logout() {
    AsyncStorage.removeItem("userToken")
      .then(() => {
        this.setState({ loggedIn: false });
        Alert.alert("Logout Success!");
      })
      .catch(error => console.log("Error logging out: ", error));
  }

  render() {
    const RenderLogin = props => {
      return props.navigation.navigate("Login", { parent: "Profile" });
    };
    if (!this.state.isLoaded) {
      console.log("PROFILE IS LOADING");
      return <ActivityIndicator />;
    }
    if (this.state.isLoaded) {
      console.log("Usertoken in profilepage: ", this.state.loggedIn);
      if (this.state.loggedIn) {
        return (
          <View style={styles.container}>
            <View
              style={{
                flex: 2,
                marginTop: 60,
                flexDirection: "row",
                marginRight: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.logout();
                }}
              >
                <Icon
                  name="power-settings-new"
                  size={32}
                  color={Colors.GRAY_DARK}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={Typography.FONT_H4_PINK}>
                Welcome to your profile
              </Text>
            </View>
          </View>
        );
      } if(!this.state.loggedIn) {
        console.log("Showing loginPage");
        return <RenderLogin {...this.props} />;
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  logout_icon: {
    marginTop: 60
  }
});
