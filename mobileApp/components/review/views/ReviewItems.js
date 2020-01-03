import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import * as Typography from "../../../styles/typography";
import BackButton from "../components/backButton";
import ContinueButton from "../components/continueButton";
import { AirbnbRating } from "react-native-ratings";
import * as Colors from "../../../styles/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class ReviewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      imageID: null,
      menuItems: "",
      menuName: null,
      restaurant: null,
      colorIndex: 4,
      reviewedScores: [],
      token: null
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const token = navigation.getParam("token", "0");
    const menuItems = navigation.getParam("menuItems", "no-values");
    const imageID = navigation.getParam("imageID", "0");
    const menuID = navigation.getParam("menuID", "00");
    const menuName = navigation.getParam("menuName", "no-menu");
    const restaurant = navigation.getParam("restaurant", "no-restaurant");
    this.setState({ imageID, menuItems, menuID, menuName, restaurant, token });
  };

  setRatingCount(rating, item) {
    item.rating = rating;

    if (this.state.menuItems.every(e => e.rating !== null)) {
      this.setState({ disableButton: false });
    }
  }

  onChangeText(text, item) {
    item.content = text;
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={Typography.FONT_H3_BLACK}>Write review</Text>
            </View>
            <BackButton navigation={this.props.navigation} />
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
                    this.setRatingCount(rating, item)
                  }
                />
                <View style={styles.textBox}>
                  <TextInput
                    style={styles.textInput}
                    maxLength={200}
                    multiline={true}
                    placeholder={"Review"}
                    textAlignVertical={"top"}
                    onChangeText={text =>
                      this.onChangeText(text, item)
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
            menuItemReviews={this.state.menuItems}
            imageID={this.state.imageID}
            menuID={this.state.menuID}
            menuName={this.state.menuName}
            restaurant={this.state.restaurant}
            token={this.state.token}
            view={"ReviewOverall"}
            text={"CONTINUE"}
            colorIndex={this.state.colorIndex}
          />
        </View>
      </KeyboardAwareScrollView>
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
