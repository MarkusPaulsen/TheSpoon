import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContinueButton from "../components/continueButton";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={Typography.FONT_H2_BLACK}>Write </Text>
          <Text style={Typography.FONT_H2_PINK}>Review</Text>
        </View>
        <View style={{ marginBottom: 100 }}>
          <TouchableOpacity
            activeOpacity={0.3}
            style={{ alignItems: "center" }}
          >
            <View style={styles.imageBox}>
              <Icon name="add-a-photo" size={52} color={Colors.WHITE} />
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={Typography.FONT_H4_BLACK}>
              Upload a picture of the receipt
            </Text>
            <Text style={Typography.FONT_MED_GRAY}>
              We use this to confirm the review
            </Text>
          </View>
        </View>
        {console.log(this.state.disableButton)}
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          view={"ReviewAddRestaurant"}
          text={"CONTINUE"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 60
  },
  imageBox: {
    height: 100,
    width: 100,
    backgroundColor: Colors.TURQUOISE,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 130,
    marginBottom: 30
  }
});
