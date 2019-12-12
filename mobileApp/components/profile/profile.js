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
  SafeAreaView,
  ScrollView,
  Modal,
  Dimensions
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import * as Api from "../../services/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AirbnbRating } from "react-native-ratings";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoaded: false,
      token:null,
      userInfo: "",
      reviews: [
        {
          reviewID: "2",
          menu: "Lunch menu",
          restaurant: "AUUM",
          status: "approved",
          serviceRating: 4,
          qualityOverPriceRating: 5,
          menuItemsReviews: [
            {
              itemName: "Pizza Margherita",
              score: 4,
              text: "This is the review text"
            },
            {
              itemName: "Blue Cheese Burger",
              score: 3,
              text: "This is the other review text"
            }
          ]
        },
        {
          reviewID: "3",
          menu: "Dinner menu",
          restaurant: "AUUM",
          status: "pending",
          serviceRating: 4,
          qualityOverPriceRating: 5,
          menuItemsReviews: [
            {
              itemName: "Pizza Margherita",
              score: 4,
              text: "This is the review text"
            },
            {
              itemName: "Blue Cheese Burger",
              score: 3,
              text: "This is the other review text"
            }
          ]
        },
        {
          reviewID: "9",
          menu: "Lunch menu",
          restaurant: "Da Zero",
          status: "declined",
          serviceRating: 4,
          qualityOverPriceRating: 5,
          menuItemsReviews: [
            {
              itemName: "Pizza Margherita",
              score: 4,
              text: "This is the review text"
            },
            {
              itemName: "Blue Cheese Burger",
              score: 3,
              text: "This is the other review text"
            }
          ]
        }
      ]
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(token => {
        this.setState({ loggedIn: token !== null, isLoaded: true, token:token });
        this.getUserInfo(token);
        this.getUserReviews(token);
      });
    });
  };
  componentWillUnmount() {
    this.focusListener.remove();
  }

  logout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel logout"),
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            console.log("Logout Pressed");
            AsyncStorage.removeItem("userToken")
              .then(() => {
                this.setState({ loggedIn: false });
                Alert.alert("Logout Success!");
              })
              .catch(error => console.log("Error logging out: ", error));
          }
        }
      ],
      { cancelable: false }
    );
  }

  async getUserInfo(token) {
    try {
      const response = await fetch(Api.SERVER_PROFILE_USERINFO, {
        method: "GET",
        accept: "application/json",
        headers:{
           "X-Auth-Token": JSON.parse(token)
        }
      });
      const responseJson = await response.json();
      const userInfo = {
        username: responseJson.username,
        email: responseJson.email
      };
      this.setState({ userInfo });
      if(response.ok){
        console.log("Success fetching profileData")
      }
      if(!response.ok){
        console.log("Fetching profileData failed");
      }
    } catch (error) {
      console.log("Error fetching user info: ", error);
    }
  }

  async getUserReviews(token) {
    try {
      const response = await fetch(Api.SERVER_PROFILE_USERREVIEWS, {
        method: "GET",
        accept: "application/json",
        headers:{
          "x-auth-token": JSON.parse(token)
        }
      });
      const responseJson = await response.json();
      const reviews = responseJson.map(index => ({
        reviewID: index.menuID.toString(),
        menu: index.menuID,
        restaurant: index.menuID,
        status: index.status
      }));
      this.setState({ reviews });
      if(response.ok){
        console.log("Success fetching reviews")
      }
      if(!response.ok){
        console.log("Fetching reviews failed");
      }
    } catch (error) {
      console.log("Error fetching reviews: ", error);
    }
  }

  async deleteReview(reviewID) {
    try {
      const backendStubLink = `http://192.168.1.103:8080/api/user/customer/review/${reviewID}`;
      // FILL IN CORRECT LINK
      const backendServerLink = `https://thespoon.herokuapp.com/api/user/customer/review`;
      const response = await fetch(backendStubLink, {
        method: "DELETE",
        accept: "application/json"
      });
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.log("Error deleting review: ", error);
    }
  }

  getRating = score => {
    return (
      <AirbnbRating
        isDisabled={true}
        defaultRating={score}
        showRating={false}
        size={25}
        selectedColor={Colors.PINK}
      />
    );
  };

  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);

    const YourReviews = ({ menu, restaurant, status, item }) => {
      return (
        <View style={styles.reviewItem}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalItem: item });
            }}
          >
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
                {status === "accepted" ? (
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
          </TouchableOpacity>
        </View>
      );
    };

    const FullReviewModal = ({ review, visible }) => {
      if (review == null) {
        return null;
      }
      return (
        <Modal animationType="slide" transparent={false} visible={visible}>
          <ScrollView>
            <View
              style={[
                styles.modalContainer,
                {
                  width: screenWidth * 0.85,
                  marginLeft: (screenWidth * 0.15) / 2
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => this.setState({ modalItem: null })}
              >
                <Icon name={"chevron-left"} size={40} style={styles.button} />
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text style={Typography.FONT_H2_BLACK}>Your </Text>
                <Text style={Typography.FONT_H2_PINK}>Review</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={Typography.FONT_MED_GRAY}>Status: </Text>
                <Text style={Typography.FONT_MED_GRAY}>{review.status}</Text>
              </View>
              <Text
                style={{
                  width: 120,
                  height: 120,
                  textAlign: "center",
                  alignSelf: "center",
                  backgroundColor: Colors.GRAY_LIGHT,
                  marginTop: 20
                }}
              >
                DISPLAY IMAGE HERE
              </Text>
              <View style={[styles.field, { marginVertical: 30 }]}>
                <Text style={Typography.FONT_H4_BLACK}>Restaurant </Text>
                <Text style={Typography.FONT_H4_PINK}>{review.restaurant}</Text>
              </View>
              <View style={[styles.field, { marginBottom: 10 }]}>
                <Text style={Typography.FONT_H4_BLACK}>Menu </Text>
                <Text style={Typography.FONT_H4_PINK}>{review.menu}</Text>
              </View>
              <View style={styles.line} />
              <Text style={[Typography.FONT_H4_BLACK, { marginTop: 10 }]}>
                What did you eat/drink?
              </Text>
              {review.menuItemsReviews.map(item => {
                return (
                  <View>
                    <View style={[styles.field, { marginVertical: 15 }]}>
                      <Text style={Typography.FONT_MED_BLACK}>Item</Text>
                      <Text style={Typography.FONT_MED_PINK}>
                        {item.itemName}
                      </Text>
                    </View>
                    {this.getRating(item.score)}
                    <View
                      style={[styles.textBox, { width: screenWidth * 0.85 }]}
                    >
                      <Text style={styles.text}>{item.text}</Text>
                    </View>
                    <View style={styles.line} />
                  </View>
                );
              })}
              <Text style={[Typography.FONT_H4_BLACK, {marginTop: 15}]}>What's you overall impression?</Text>
              <View style={{alignItems: "center"}}>
                <Text style={[Typography.FONT_H4_BLACK, {marginTop: 20, marginBottom: 10}]}>Service</Text>
                {this.getRating(review.serviceRating)}
                <Text style={[Typography.FONT_H4_BLACK, {marginTop: 20, marginBottom: 10}]}>Quality/price</Text>
                {this.getRating(review.qualityOverPriceRating)}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    Alert.alert(
                      "Alert",
                      "Are you sure you want to delete this review?",
                      [
                        {
                          text: "No",
                          onPress: () => console.log("No pressed"),
                          style: "cancel"
                        },
                        {
                          text: "Yes",
                          onPress: () => console.log("Yes Pressed")
                        }
                      ],
                      { cancelable: false }
                    )
                  }
                >
                  <Text
                    style={[Typography.FONT_H4_WHITE, { textAlign: "center" }]}
                  >
                    DELETE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
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
          <View
            style={[
              styles.container,
              {
                width: screenWidth * 0.85,
                marginLeft: (screenWidth * 0.15) / 2
              }
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <Text style={Typography.FONT_H2_BLACK}>Your </Text>
                <Text style={Typography.FONT_H2_PINK}>Profile</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
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
              <View style={styles.line} />
              <Text style={Typography.FONT_H4_BLACK}>Email</Text>
              <Text style={[Typography.FONT_REGULAR_THIN, styles.userInfoText]}>
                {this.state.userInfo.email}
              </Text>
              <View style={styles.line} />
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={Typography.FONT_H3_BLACK}>Your </Text>
              <Text style={Typography.FONT_H3_PINK}>Reviews</Text>
            </View>
            <View style={{ flex: 6 }}>
              <SafeAreaView style={styles.reviewsList}>
                <FlatList
                  data={this.state.reviews}
                  contentContainerStyle={{ flex: 1 }}
                  renderItem={({ item }) => (
                    <YourReviews
                      menu={item.menu}
                      restaurant={item.restaurant}
                      status={item.status}
                      item={item}
                    />
                  )}
                  keyExtractor={item => item.reviewID}
                />
              </SafeAreaView>
              <FullReviewModal
                review={this.state.modalItem}
                visible={this.state.modalItem != null}
              />
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
    marginTop: 60
  },
  logout_icon: {
    marginTop: 60
  },
  userInfoText: {
    marginTop: 10
  },
  line: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT
  },

  reviewsList: {
    alignItems: "center"
  },
  reviewItem: {
    backgroundColor: Colors.GRAY_LIGHT,
    width: 297,
    height: 65,
    marginVertical: 8,
    borderRadius: 5
  },
  modalContainer: {
    backgroundColor: Colors.WHITE,
    marginBottom: 20
  },
  textBox: {
    height: 150,
    borderRadius: 5,
    backgroundColor: Colors.GRAY_TEXTBOX,
    marginVertical: 15,
    alignSelf: "center"
  },
  text: {
    width: 270,
    height: 130,
    marginTop: 10,
    alignSelf: "center"
  },
  deleteButton: {
    width: 150,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.GRAY_MEDIUM,
    marginBottom: 30,
    marginTop: 40,
    justifyContent: "center"
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
