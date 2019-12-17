import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Alert,
  TouchableOpacity
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import * as Api from "../../../services/api";
import BackButton from "../components/backButton";
import { AirbnbRating } from "react-native-ratings";
import Circles from "../components/circles";
import { NavigationActions, StackActions } from "react-navigation";

export default class ReviewOverall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      colorIndex: 5,
      serviceRating: null,
      imageID: null,
      qualityOverPriceRating: null,
      reviewedScores: [],
      menuID: null,
      menuName: null,
      restaurant: null
    };
  }
  componentDidMount = async () => {
    AsyncStorage.getItem("userToken").then(token => {
      this.setState({ token });
      const { navigation } = this.props;
      const menuID = navigation.getParam("menuID", "00");
      const imageID = navigation.getParam("imageID", "0");
      const menuName = navigation.getParam("menuName", "no-menu");
      const restaurant = navigation.getParam("restaurant", "no-restaurant");
      this.setState({ imageID, menuID, menuName, restaurant });
    });
  };

  async postReview(menuID) {
    const date = new Date().toISOString().slice(0, 10);
    const menuItemReviewsWithMenuName = this.props.navigation.getParam(
      "menuItemReviews",
      "no-reviews"
    );
    const menuItemsReview = menuItemReviewsWithMenuName.map(index => ({
      menuItemID: parseInt(index.menuItemID),
      rating: index.rating,
      content: index.content
    }));
    try {
      const data = JSON.stringify({
        serviceRating: this.state.serviceRating,
        qualityOverPriceRating: this.state.qualityOverPriceRating,
        date: date,
        receiptImageID: parseInt(this.state.imageID),
        menuItemsReviews: menuItemsReview
      });
      const response = await fetch(Api.SERVER_POST_REVIEW(menuID), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-auth-token": this.state.token,
          "Content-Type": "application/json"
        },
        body: data
      });
      const responseText = await response.text();
      if (response.ok) {
        console.log("Review was posted successfully!");
        Alert.alert("Review success!");
      }
      if (!response.ok) {
        console.log("Review failed", responseText);
        Alert.alert("Submitting review failed!");
      }
    } catch (e) {
      console.log("ERROR posting review:", e);
    }
  }

  setServiceScore(rating) {
    this.setState({ serviceRating: rating });
    this.state.reviewedScores.push(rating);
    this.checkReview();
  }

  setQualityScore(rating) {
    this.setState({ qualityOverPriceRating: rating });
    this.state.reviewedScores.push(rating);
    this.checkReview();
  }

  checkReview() {
    if (this.state.reviewedScores.length === 2) {
      this.setState({ disableButton: false });
    }
  }

  render() {
    const resetStack = () => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "ReviewAddImage"
            })
          ]
        })
      );
    };
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={[Typography.FONT_H3_BLACK, { textAlign: "center" }]}>
              What's your overall{"\n"}impression?
            </Text>
          </View>
          <BackButton navigation={this.props.navigation} />
        </View>
        <View style={{ alignItems: "center", flex: 5 }}>
          <Text
            style={[
              Typography.FONT_H4_BLACK,
              { marginTop: 80, marginBottom: 10 }
            ]}
          >
            Service
          </Text>
          <AirbnbRating
            showRating={false}
            defaultRating={0}
            size={30}
            selectedColor={Colors.PINK}
            onFinishRating={rating => this.setServiceScore(rating)}
          />
          <Text
            style={[
              Typography.FONT_H4_BLACK,
              { marginTop: 40, marginBottom: 10 }
            ]}
          >
            Quality
          </Text>
          <AirbnbRating
            showRating={false}
            defaultRating={0}
            size={30}
            selectedColor={Colors.PINK}
            onFinishRating={rating => this.setQualityScore(rating)}
          />
        </View>
        {this.state.disableButton ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <View
              style={[styles.button, { backgroundColor: Colors.GRAY_MEDIUM }]}
            >
              <Text style={[Typography.FONT_H4_WHITE, { textAlign: "center" }]}>
                SUBMIT REVIEW
              </Text>
            </View>
            <Circles colorIndex={this.state.colorIndex} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.postReview(this.state.menuID);
                resetStack();
              }}
              style={[styles.button, { backgroundColor: Colors.PINK }]}
            >
              <Text style={[Typography.FONT_H4_WHITE, { textAlign: "center" }]}>
                SUBMIT REVIEW
              </Text>
            </TouchableOpacity>
            <Circles colorIndex={this.state.colorIndex} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 155,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center"
  }
});
