import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import { AirbnbRating } from "react-native-ratings";

export default class ReviewItem extends Component {
  render() {
    const item = this.props.item;

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <Text style={[Typography.FONT_MED_BLACK, { textAlign: "left" }]}>
            Item:{" "}
          </Text>
          <Text style={[Typography.FONT_MED_PINK, { textAlign: "right" }]}>
            {item}
          </Text>
        </View>
        <AirbnbRating
          showRating={false}
          defaultRating={0}
          size={30}
          selectedColor={Colors.PINK}
        />
        <View style={styles.textBox}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder={"Review"}
            textAlignVertical={"top"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 170,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 70
  },
  textBox: {
    width: 280,
    height: 150,
    borderRadius: 5,
    backgroundColor: Colors.GRAY_TEXTBOX,
    marginTop: 15
  },
  textInput: {
    width: 270,
    height: 130,
    marginTop: 10,
    alignSelf: "center"
  }
});
