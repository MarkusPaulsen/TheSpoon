import React, { Component } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
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

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.setState({ loggedIn: token !== null, isLoaded: true });
    });
  }

  logout() {
    AsyncStorage.removeItem("userToken").then(() => {
      Alert.alert("Logout Success!");
      this.setState({ loggedIn: false });
      this.props.navigation.navigate("Login");
    });
  }

  render() {
    console.log("Usertoken in profilepage: ", this.state.loggedIn);
    const RenderLogin = props => {
      return props.navigation.navigate("Login", { parent: "Profile" });
    };
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.loggedIn ? (
            <View>
              <View
                style={{
                  flex: 1,
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
          ) : (
            <RenderLogin {...this.props} />
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
  logout_icon: {
    marginTop: 60
  }
});
