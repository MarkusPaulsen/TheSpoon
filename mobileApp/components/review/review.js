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

export default class Review extends Component {
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

  render() {
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    }
    if (this.state.isLoaded) {
      if (this.state.loggedIn) {
        return (
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <Text style={Typography.FONT_H2_PINK}>Write </Text>
              <Text style={Typography.FONT_H2_BLACK}>Review</Text>
            </View>
            <View style={styles.imageBox}>
              <Image source={require("../../assets/addImage.png")} />
            </View>
            <Text style={Typography.FONT_H4_BLACK}>
              Upload a picture of the receipt
            </Text>
            <Text style={Typography.FONT_MED_GRAY}>
              We use this to confirm the review
            </Text>
            <Text style={Typography.FONT_H4_BLACK}>
              What did you eat/drink?
            </Text>
            <TouchableOpacity>
              <Text>Restaurant</Text>
              <Text>None</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={Typography.FONT_H4_WHITE}>POST REVIEW</Text>
            </TouchableOpacity>
          </View>
        );
      }
      if (!this.state.loggedIn) {
        return (
          <View style={styles.container}>
            <Text style={Typography.FONT_H4_BLACK}>
              You need to log in to write a review
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <Text style={Typography.FONT_H4_PINK}>Click here to log in</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageBox: {
    height: 63,
    width: 63,
    backgroundColor: Colors.GRAY_MID_LIGHT,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  reviewButton: {
    backgroundColor: Colors.PINK,
    borderRadius: 50
  }
});
