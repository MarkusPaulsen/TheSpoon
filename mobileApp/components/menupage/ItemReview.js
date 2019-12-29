import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AirbnbRating } from "react-native-ratings";
import * as Api from "../../services/api";

export default class ItemReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      item: "",
      isLoading: true
    };
  }

  getRating = score => {
    return (
      <AirbnbRating
        isDisabled={true}
        defaultRating={score}
        showRating={false}
        size={17}
        selectedColor={Colors.PINK}
      />
    );
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const menuID = navigation.getParam("menuID", "000");
    const item = navigation.getParam("item");
    this.setState({ item: item });
    const menuItemID = item.id;
    await this.getItemReviews(menuID, menuItemID);
  };

  async getItemReviews(menuID, menuItemID) {
    try {
      const response = await fetch(
        Api.SERVER_GET_ITEMREVIEWS(menuID, menuItemID),
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      const responseJson = await response.json();
      this.setState({ reviews: responseJson });
      if (response.ok) {
        console.log("Success");
        this.setState({ isLoading: false });
      }
      if (!response.ok) {
        console.log("Failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name={"chevron-left"} size={40} style={styles.button} />
          </TouchableOpacity>
          {!this.state.isLoading ? (
            this.state.reviews.length !== 0 ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    Typography.FONT_H3_BLACK,
                    { alignSelf: "center", marginBottom: 30 }
                  ]}
                >
                  {this.state.item.menuItemName}
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <Text style={Typography.FONT_MED_BLACK}>Total Score: </Text>
                  <Icon name={"star"} size={20} color={Colors.PINK} />
                  <Text style={Typography.FONT_MED_BLACK}>
                    {this.state.item.score}
                  </Text>
                </View>
                <FlatList
                  data={this.state.reviews}
                  renderItem={({ item }) => (
                    <View style={styles.review}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text style={Typography.FONT_MED_BLACK}>
                          {item.username}
                        </Text>
                        <Text style={Typography.FONT_MED_BLACK}>
                          {item.Date}
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-start" }}>
                        {this.getRating(item.rating)}
                      </View>
                      <Text
                        style={[styles.underline, Typography.FONT_REGULAR_THIN]}
                      >
                        {item.content}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => "key" + index}
                />
              </View>
            ) : (
              <View style={{ marginTop: 75 }}>
                <Text
                  style={[
                    Typography.FONT_H3_BLACK,
                    { textAlign: "center", alignSelf: "center" }
                  ]}
                >
                  This menu doesn't have any reviews yet
                </Text>
              </View>
            )
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 40
  },
  button: {
    width: 30,
    height: 40,
    marginLeft: 5
  },
  review: {
    width: 300
  },
  underline: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT
  }
});
