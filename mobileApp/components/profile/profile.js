import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  AsyncStorage,
  FlatList,
  SafeAreaView
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoaded: false,
      userInfo: { username: "cathrbak", email: "cathrineakreaaas@gmail.com" },
      reviews: [
        {
          reviewID: "2",
          menu: "Lunch menu",
          restaurant: "AUUM",
          status: "approved"
        },
        {
          reviewID: "3",
          menu: "Dinner menu",
          restaurant: "AUUM",
          status: "pending"
        },
        {
          reviewID: "9",
          menu: "Lunch menu",
          restaurant: "Da Zero",
          status: "declined"
        }
      ]
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(token => {
        this.setState({ loggedIn: token !== null, isLoaded: true });
        this.getUserInfo();
        this.getUserReviews();
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

  async getUserInfo() {
    try {
      const backendStubLink = `http://192.168.1.110:8080/api/user/customer/`;
      const backendServerLink = `https://thespoon.herokuapp.com/api/user/customer/`;
      const response = await fetch(backendStubLink, {
        method: "GET",
        accept: "application/json"
      });
      const responseJson = await response.json();
      const userInfo = {
        username: responseJson.username,
        email: responseJson.email
      };
      this.setState({ userInfo });
    } catch (error) {
      console.log("Error fetching user info: ", error);
    }
  }

  async getUserReviews() {
    try {
      const backendStubLink = `http://192.168.1.110:8080/api/user/customer/review`;
      const backendServerLink = `https://thespoon.herokuapp.com/api/user/customer/review`;
      const response = await fetch(backendStubLink, {
        method: "GET",
        accept: "application/json"
      });
      const responseJson = await response.json();
      const reviews = responseJson["reviewID"].map(index => ({
        reviewID: index,
        menu: index.menu,
        restaurant: index.restaurant,
        status: index.status
      }));
      this.setState({ reviews });
    } catch (error) {
      console.log("Error fetching reviews: ", error);
    }
  }
  render() {
    const YourReviewItem = ({ menu, restaurant, status }) => {
      return (
        <View style={styles.reviewItem}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    Typography.FONT_H4_BLACK,
                    { marginTop: 12, marginLeft: 21, marginBottom: 0 }
                  ]}
                >
                  {menu}
                </Text>
              </View>
              <Text style={[Typography.FONT_SMALL_BLACK, { marginLeft: 21 }]}>
                {restaurant}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 12,
                marginTop: 12
              }}
            >
              {status === "approved" ? (
                <Icon name={"done"} size={35} color={Colors.GREEN} />
              ) : null}
              {status === "declined" ? (
                <Icon name={"clear"} size={35} color={Colors.PINK} />
              ) : null}
              {status === "pending" ? (
                <Text style={[Typography.FONT_MED_GRAY, { marginTop: 12 }]}>
                  Pending...
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      );
    };
    const RenderLogin = props => {
      return props.navigation.navigate("Login", { parent: "Profile" });
    };
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    }
    if (this.state.isLoaded) {
      if (this.state.loggedIn) {
        return (
          <View style={styles.container}>
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 10,
                marginTop: 85
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={Typography.FONT_H2_BLACK}>Your </Text>
                <Text style={Typography.FONT_H2_PINK}>Profile</Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
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
            </View>
            <View style={{ flex: 3 }}>
              <Text style={Typography.FONT_H4_BLACK}>Username</Text>
              <Text style={[Typography.FONT_REGULAR_THIN, styles.userInfoText]}>
                {this.state.userInfo.username}
              </Text>
              <View style={styles.line}></View>
              <Text style={Typography.FONT_H4_BLACK}>Email</Text>
              <Text style={[Typography.FONT_REGULAR_THIN, styles.userInfoText]}>
                {this.state.userInfo.email}
              </Text>
              <View style={styles.line}></View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={Typography.FONT_H3_BLACK}>Your </Text>
              <Text style={Typography.FONT_H3_PINK}>Reviews</Text>
            </View>
            <View style={{ flex: 7 }}>
              <SafeAreaView style={styles.reviewsList}>
                <FlatList
                  data={this.state.reviews}
                  contentContainerStyle={{ flex: 1 }}
                  renderItem={({ item }) => (
                    <YourReviewItem
                      reviewID={item.reviewID}
                      menu={item.menu}
                      restaurant={item.restaurant}
                      status={item.status}
                    />
                  )}
                  keyExtractor={item => item.reviewID}
                />
              </SafeAreaView>
            </View>
          </View>
        );
      }
      if (!this.state.loggedIn) {
        return <RenderLogin {...this.props} />;
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 39,
    marginRight: 39
  },
  logout_icon: {
    marginTop: 60
  },
  userInfoText: {
    marginTop: 10
  },
  line: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT
  },

  reviewsList: {
    alignItems: "center",
    justifyContent: "center"
  },
  reviewItem: {
    backgroundColor: Colors.GRAY_LIGHT,
    width: 297,
    height: 65,
    marginVertical: 8,
    borderRadius: 5
  }
});
