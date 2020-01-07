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
  Dimensions,
  TextInput,
  StatusBar
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import * as Api from "../../services/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AirbnbRating } from "react-native-ratings";
import PickerSelect from "react-native-picker-select";
import CountryPicker from "react-native-country-picker-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isLoaded: false,
      token: null,
      userInfo: "",
      updatedUserInfo: "",
      reviews: [],
      saveButton: false,
      oldPassword: "",
      newPassword: "",
      newPasswordConfirmed: "",
      showPasswordModal: false,
      cca2: "FR",
      errorMessage: ""
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(async token => {
        const loggedIn = token !== null;
        this.setState({ loggedIn });
        if (loggedIn) {
          await this.getUserInfo(token);
          await this.getUserReviews(token);
          this.setState({ token: token });
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

  async updateUserInfo(token) {
    try {
      const userData = JSON.stringify({
        email: this.state.updatedUserInfo.email,
        gender: this.state.updatedUserInfo.gender,
        ageRange: this.state.updatedUserInfo.ageRange,
        nationality: this.state.updatedUserInfo.nationality
      });
      const response = await fetch(Api.SERVER_PROFILE_UPDATEUSERINFO, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "x-auth-token": token,
          "Content-Type": "application/json"
        },
        body: userData
      });
      if (response.ok) {
        Alert.alert("Profile information updated");
        this.setState({ saveButton: false });
      }
      if (!response.ok) {
        Alert.alert("Could not update profile information");
      }
    } catch (error) {
      console.log("Error fetching user info: ", error);
    }
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
          email: responseJson.email,
          ageRange: responseJson.ageRange,
          nationality: responseJson.nationality,
          gender: responseJson.gender
        };
        this.setState({ userInfo });
        this.setState({ updatedUserInfo: userInfo });
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
      if (response.ok) {
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
        this.setState({ reviews });
        console.log("Success fetching reviews");
      }
      if (!response.ok) {
        console.log("Failed fetching reviews");
      }
    } catch (error) {
      console.log("Error fetching reviews: ", error);
    }
  }

  async deleteReview(reviewID, token) {
    try {
      const response = await fetch(Api.SERVER_DELETE_REVIEW(reviewID), {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "x-auth-token": token
        }
      });
      if (response.ok) {
        console.log("Deletion success, ");
        Alert.alert("Review deleted");
      }
      if (!response.ok) {
        console.log("Deletion failed, ");
        Alert.alert("Deletion failed");
      }
    } catch (error) {
      console.log("Error deleting review: ", error);
    }
  }

  goBack() {
    this.setState({ oldPassword: "" });
    this.setState({ newPassword: "" });
    this.setState({ newPasswordConfirmed: "" });
    this.setState({ errorMessage: "" });
    this.setState({ showPasswordModal: false });
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

  updateEmail = email => {
    this.setState({
      updatedUserInfo: { ...this.state.updatedUserInfo, email: email }
    });
    if (!this.state.saveButton) {
      this.setState({ saveButton: true });
    }
  };

  updateAgeRange = ageRange => {
    this.setState({
      updatedUserInfo: { ...this.state.updatedUserInfo, ageRange: ageRange }
    });
    if (!this.state.saveButton) {
      this.setState({ saveButton: true });
    }
  };

  async passwordValidation() {
    if (
      this.state.oldPassword === "" ||
      this.state.newPassword === "" ||
      this.state.newPasswordConfirmed === ""
    ) {
      this.setState({ errorMessage: "All fields must be filled out" });
    } else if (this.state.oldPassword === this.state.newPassword) {
      this.setState({
        errorMessage: "New password cannot be the same as old password"
      });
    } else if (this.state.newPassword.length < 5) {
      this.setState({
        errorMessage: "New password must be at least 5 characters"
      });
    } else if (this.state.newPassword !== this.state.newPasswordConfirmed) {
      this.setState({
        errorMessage: "The fields for new password must be identical"
      });
    } else {
      this.setState({ errorMessage: "" });
      await this.changePassword(this.state.token);
    }
  }

  async changePassword(token) {
    try {
      const passwords = JSON.stringify({
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      });
      const response = await fetch(Api.SERVER_PROFILE_CHANGEPASSWORD, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "x-auth-token": token,
          "Content-Type": "application/json"
        },
        body: passwords
      });
      if (response.ok) {
        this.setState({ showPasswordModal: false });
        Alert.alert("Password changed");
      }
      if (!response.ok) {
        Alert.alert("Password could not be changed");
      }
    } catch (error) {
      console.log("Error changing password: ", error);
    }
    this.setState({ oldPassword: "" });
    this.setState({ newPassword: "" });
    this.setState({ newPasswordConfirmed: "" });
  }

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
      return (
        <Modal animationType="slide" transparent={false} visible={visible}>
          <ScrollView>
            <SafeAreaView
              style={[
                styles.modalContainer,
                {
                  width: screenWidth * 0.85,
                  marginLeft: (screenWidth * 0.15) / 2,
                  marginTop: 20
                }
              ]}
            >
              <TouchableOpacity onPress={() => this.setState({ modalItem: null })}>
                <Icon name={"chevron-left"} size={40} />
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text style={Typography.FONT_H2_BLACK}>Your </Text>
                <Text style={Typography.FONT_H2_PINK}>Review</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={Typography.FONT_MED_GRAY}>Status: </Text>
                <Text style={Typography.FONT_MED_GRAY}>{review.status}</Text>
              </View>
              <View
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
              </View>
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
      return (
        <ActivityIndicator style={{ alignSelf: "center", marginTop: 150 }} />
      );
    }
    if (this.state.isLoaded) {
      if (this.state.loggedIn) {
        return (
          <SafeAreaView style={styles.paddingStatusBar}>
            <ScrollView>
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
                        name="exit-to-app"
                        size={32}
                        color={Colors.GRAY_DARK}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <KeyboardAwareScrollView>
                  <View>
                    <Text style={Typography.FONT_H4_BLACK}>Username</Text>
                    <Text
                      style={[
                        Typography.FONT_REGULAR_THIN,
                        styles.userInfoText
                      ]}
                    >
                      {this.state.updatedUserInfo.username}
                    </Text>
                    <View style={[styles.line, { marginTop: 10 }]} />
                    <Text style={Typography.FONT_H4_BLACK}>Email</Text>
                    <TextInput
                      style={[
                        Typography.FONT_REGULAR_THIN,
                        styles.userInfoText
                      ]}
                      value={this.state.updatedUserInfo.email}
                      onChangeText={this.updateEmail}
                    />
                    <View style={[styles.line, { marginTop: 10 }]} />
                    <Text style={Typography.FONT_H4_BLACK}>Age</Text>
                    <PickerSelect
                      value={this.state.updatedUserInfo.ageRange}
                      onValueChange={value => this.updateAgeRange(value)}
                      items={[
                        { label: "< 18", value: "< 18" },
                        { label: "18-24", value: "18-24" },
                        { label: "25-34", value: "24-34" },
                        { label: "35-49", value: "35-49" },
                        { label: "50-64", value: "50-64" },
                        { label: "65+", value: "65+" }
                      ]}
                    />
                    <View style={[styles.line, { marginTop: 5 }]} />
                    <Text style={Typography.FONT_H4_BLACK}>Nationality</Text>
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <View style={{ marginTop: 10 }}>
                        <CountryPicker
                          withFilter={true}
                          withAlphaFilter={true}
                          onSelect={value => {
                            this.setState({
                              updatedUserInfo: {
                                ...this.state.updatedUserInfo,
                                nationality: value.name
                              }
                            });
                            this.setState({ cca2: value.cca2 });
                            if (!this.state.saveButton) {
                              this.setState({ saveButton: true });
                            }
                          }}
                          countryCode={this.state.cca2}
                          withCountryNameButton={true}
                        />
                      </View>
                    </View>
                    <View style={[styles.line, { marginTop: 10 }]} />
                    <Text style={Typography.FONT_H4_BLACK}>Gender</Text>
                    <PickerSelect
                      value={this.state.updatedUserInfo.gender}
                      onValueChange={value => {
                        this.setState({
                          updatedUserInfo: {
                            ...this.state.updatedUserInfo,
                            gender: value
                          }
                        });
                        if (!this.state.saveButton) {
                          this.setState({ saveButton: true });
                        }
                      }}
                      items={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                        { label: "Other", value: "Other" }
                      ]}
                    />
                    <View style={[styles.line, { marginTop: 5 }]} />
                  </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    {
                      backgroundColor: this.state.saveButton
                        ? Colors.PINK
                        : Colors.GRAY_MEDIUM
                    }
                  ]}
                  onPress={() => this.updateUserInfo(this.state.token)}
                >
                  <Text
                    style={[Typography.FONT_H4_WHITE, { textAlign: "center" }]}
                  >
                    SAVE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ showPasswordModal: true })}
                  style={{ alignSelf: "center" }}
                >
                  <Text
                    style={[
                      Typography.FONT_REGULAR_THIN,
                      { textDecorationLine: "underline" }
                    ]}
                  >
                    Change password
                  </Text>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.showPasswordModal}
                >
                  <SafeAreaView
                    style={{
                      width: screenWidth * 0.85,
                      marginLeft: (screenWidth * 0.15) / 2,
                      marginTop: 20
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.goBack()
                      }
                    >
                      <Icon name={"chevron-left"} size={40} />
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={[
                          Typography.FONT_H3_BLACK,
                          { alignSelf: "center" }
                        ]}
                      >
                        Change password
                      </Text>
                      <TextInput
                        placeholder={"Current password"}
                        secureTextEntry={true}
                        style={styles.passwordField}
                        value={this.state.oldPassword}
                        onChangeText={value =>
                          this.setState({ oldPassword: value })
                        }
                      />
                      <TextInput
                        placeholder={"New password"}
                        secureTextEntry={true}
                        style={styles.passwordField}
                        value={this.state.newPassword}
                        onChangeText={value =>
                          this.setState({ newPassword: value })
                        }
                      />
                      <TextInput
                        placeholder={"Repeat new password"}
                        secureTextEntry={true}
                        style={styles.passwordField}
                        value={this.state.newPasswordConfirmed}
                        onChangeText={value =>
                          this.setState({ newPasswordConfirmed: value })
                        }
                      />
                      <Text
                        style={[
                          Typography.FONT_REGULAR_THIN,
                          { color: Colors.PINK }
                        ]}
                      >
                        {this.state.errorMessage}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.saveButton,
                          {
                            backgroundColor: Colors.PINK
                          }
                        ]}
                        onPress={() => this.passwordValidation()}
                      >
                        <Text
                          style={[
                            Typography.FONT_H4_WHITE,
                            { textAlign: "center" }
                          ]}
                        >
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </Modal>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    marginTop: 30
                  }}
                >
                  <Text style={Typography.FONT_H3_BLACK}>Your </Text>
                  <Text style={Typography.FONT_H3_PINK}>Reviews</Text>
                </View>
                <View style={{ flex: 6 }}>
                  <SafeAreaView style={styles.reviewsList}>
                    <FlatList
                      style={{ marginBottom: 20 }}
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
            </ScrollView>
          </SafeAreaView>
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
    flexGrow: 1,
    marginTop: 40
  },
  logout_icon: {
    marginTop: 60
  },
  userInfoText: {
    marginTop: 10
  },
  line: {
    marginBottom: 5,
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
  },
  saveButton: {
    width: 155,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 20,
    alignSelf: "center"
  },
  passwordField: {
    borderBottomColor: Colors.GRAY_LIGHT,
    borderBottomWidth: 1.5,
    marginVertical: 15
  },
  paddingStatusBar: {
    paddingTop: StatusBar.currentHeight
  }
});
