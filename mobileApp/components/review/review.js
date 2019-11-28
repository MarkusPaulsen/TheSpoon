import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";

export default class Review extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
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
        <Text style={Typography.FONT_H4_BLACK}>What did you eat/drink?</Text>
        <TouchableOpacity>
          <Text>Restaurant</Text>
          <Text>None</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={Typography.FONT_H4_WHITE}>POST REVIEW</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageBox: {
    height: 63,
    width: 63,
    backgroundColor: Colors.GRAY_MID_LIGHT,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewButton: {
    backgroundColor: Colors.PINK,
    borderRadius: 50
  }
});
