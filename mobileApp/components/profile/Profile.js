import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
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
      token: null,
      userInfo: "",
      reviews: []
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(async token => {
        const parsedToken = JSON.parse(token);
        const loggedIn = parsedToken !== null;
        this.setState({ loggedIn });
        if (loggedIn) {
          await this.getUserInfo(parsedToken);
          await this.getUserReviews(parsedToken);
          this.setState({ token: parsedToken });
        }
        this.setState({ isLoaded: true });
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
        headers: {
          "X-Auth-Token": token
        }
      });
      if (response.ok) {
        const responseJson = await response.json();
        const userInfo = {
          username: responseJson.username,
          email: responseJson.email
        };
        this.setState({ userInfo });
        console.log("Success fetching profileData");
      }
      if (!response.ok) {
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
        headers: {
          "x-auth-token": token
        }
      });
      const responseJson = await response.json();
      const reviews = responseJson.map(index => ({
        menuReviewID: index.menuReviewID.toString(),
        menuID: index.menuID,
        menuName: index.menuName,
        restaurantName: index.restaurantName,
        serviceRating: index.serviceRating,
        qualityOverPriceRating: index.qualityOverPriceRating,
        date: index.date,
        receiptImageID: index.receiptImageID,
        status: index.status,
        menuItemsReviews: index.menuItemsReviews
      }));
      if (response.ok) {
        this.setState({ reviews });
        console.log("Success fetching reviews");
      }
      if (!response.ok) {
        console.log("Fetching reviews failed");
      }
    } catch (error) {
      console.log("Error fetching reviews: ", error);
    }
  }

  async deleteReview(reviewID, token) {
    console.log(reviewID);
    console.log(token);
    try {
      const response = await fetch(Api.SERVER_DELETE_REVIEW(reviewID), {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "x-auth-token": token
        }
      });
      console.log(response);
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.ok) {
        console.log("Deletion success");
        Alert.alert("Review deleted");
      }
      if (!response.ok) {
        console.log("Deletion failed");
        Alert.alert("Deletion failed");
      }
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
                      Typography.FONT_MED_BLACK,
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
                {status === "Approved" ? (
                  <Icon name={"done"} size={25} color={Colors.GREEN} />
                ) : null}
                {status === "Disapproved" ? (
                  <Icon name={"clear"} size={35} color={Colors.PINK} />
                ) : null}
                {status === "Pending" ? (
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
      console.log(review);
      return (
        <Modal animationType="slide" transparent={false} visible={visible}>
          <ScrollView>
            <SafeAreaView
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
                <Image
                  style={{ width: 120, height: 120 }}
                  source={{
                    uri:
                      "https://the-spoon.s3.eu-central-1.amazonaws.com/" +
                      review.receiptImageID
                  }}
                />
              </Text>
              <View style={[styles.field, { marginVertical: 30 }]}>
                <Text style={Typography.FONT_H4_BLACK}>Restaurant </Text>
                <Text style={Typography.FONT_H4_PINK}>
                  {review.restaurantName}
                </Text>
              </View>
              <View style={[styles.field, { marginBottom: 10 }]}>
                <Text style={Typography.FONT_H4_BLACK}>Menu </Text>
                <Text style={Typography.FONT_H4_PINK}>{review.menuName}</Text>
              </View>
              <View style={styles.line} />
              <Text style={[Typography.FONT_H4_BLACK, { marginTop: 10 }]}>
                What did you eat/drink?
              </Text>
              {review.menuItemsReviews.map(item => {
                console.log(item, item.score);
                //TODO: add menuItemName when it is in EP
                return (
                  <View key={item.menuItemID}>
                    <View style={[styles.field, { marginVertical: 15 }]}>
                      <Text style={Typography.FONT_MED_BLACK}>Item</Text>
                      <Text style={Typography.FONT_MED_PINK}>
                        {item.menuItemName}
                      </Text>
                    </View>
                    {this.getRating(item.rating)}
                    <View
                      style={[styles.textBox, { width: screenWidth * 0.85 }]}
                    >
                      <Text style={styles.text}>{item.content}</Text>
                    </View>
                    <View style={styles.line} />
                  </View>
                );
              })}
              <Text style={[Typography.FONT_H4_BLACK, { marginTop: 15 }]}>
                What's you overall impression?
              </Text>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    Typography.FONT_H4_BLACK,
                    { marginTop: 20, marginBottom: 10 }
                  ]}
                >
                  Service
                </Text>
                {this.getRating(review.serviceRating)}
                <Text
                  style={[
                    Typography.FONT_H4_BLACK,
                    { marginTop: 20, marginBottom: 10 }
                  ]}
                >
                  Quality/price
                </Text>
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
                          onPress: () => {
                            console.log("Yes Pressed");
                            this.deleteReview(
                              review.menuReviewID,
                              this.state.token
                            );
                            this.setState({ modalItem: null });
                            this.getUserReviews(this.state.token);
                          }
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
            </SafeAreaView>
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
                  extraData={this.state}
                  contentContainerStyle={{ flex: 1 }}
                  renderItem={({ item }) => (
                    <YourReviews
                      menu={item.menuName}
                      restaurant={item.restaurantName}
                      status={item.status}
                      item={item}
                    />
                  )}
                  keyExtractor={item => item.menuReviewID}
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
    backgroundColor: Colors.PINK,
    marginBottom: 30,
    marginTop: 40,
    justifyContent: "center"
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
