import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import * as Typography from "../../../styles/typography";
import BackButton from "../components/backButton";
import ContinueButton from "../components/continueButton";
import { AirbnbRating } from "react-native-ratings";
import * as Colors from "../../../styles/colors";

export default class ReviewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      menuItems: "",
      colorIndex: 4,
      reviewedScores: []
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const menuItems = navigation.getParam("menuItems", "no-values");
    this.setState({ menuItems });
  };

  setRatingCount(rating, item, itemID) {
    item.score = rating;

    this.setState(state => {
      const menuItems = state.menuItems.filter(e => e.menuItemID !== itemID);
      return menuItems.concat(item);
    });
    this.state.reviewedScores.push(item);
    if (this.state.reviewedScores.length === this.state.menuItems.length) {
      this.setState({ disableButton: false });
    }
  }

  onChangeText(text, item, itemID) {
    item.text = text;
    this.setState(state => {
      const menuItems = state.menuItems.filter(e => e.menuItemID !== itemID);
      return menuItems.concat(item);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <BackButton navigation={this.props.navigation} />
          <View style={styles.header}>
            <Text style={Typography.FONT_H3_BLACK}>Write review</Text>
          </View>
        </View>
        <FlatList
          data={this.state.menuItems}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text
                  style={[Typography.FONT_MED_BLACK, { textAlign: "left" }]}
                >
                  Item:{" "}
                </Text>
                <Text
                  style={[Typography.FONT_MED_PINK, { textAlign: "right" }]}
                >
                  {item.menuItemName}
                </Text>
              </View>
              <AirbnbRating
                showRating={false}
                defaultRating={0}
                size={30}
                selectedColor={Colors.PINK}
                onFinishRating={rating =>
                  this.setRatingCount(rating, item, item.menuItemID)
                }
              />
              <View style={styles.textBox}>
                <TextInput
                  style={styles.textInput}
                  multiline={true}
                  placeholder={"Review"}
                  textAlignVertical={"top"}
                  onChangeText={text =>
                    this.onChangeText(text, item, item.menuItemID)
                  }
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.menuItemID}
        />
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          view={"ReviewOverall"}
          text={"CONTINUE"}
          colorIndex={this.state.colorIndex}
        />
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
  reviewContainer: {
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
