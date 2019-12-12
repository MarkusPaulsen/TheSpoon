import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AirbnbRating } from "react-native-ratings";

export default class ItemReview extends Component {
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

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    console.log(item);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={"chevron-left"} size={40} style={styles.button} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text
            style={[
              Typography.FONT_H3_BLACK,
              { alignSelf: "center", marginBottom: 30 }
            ]}
          >
            {item.menuItemName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={Typography.FONT_MED_BLACK}>Total Score: </Text>
            <Icon name={"star"} size={20} color={Colors.PINK} />
            <Text style={Typography.FONT_MED_BLACK}>{item.score}</Text>
          </View>
          <View style={styles.review}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={Typography.FONT_MED_BLACK}>Janine</Text>
              <Text style={Typography.FONT_MED_BLACK}>25.10.2019</Text>
            </View>
            <View style={{alignItems: "flex-start"}}>{this.getRating("4.8")}</View>
            <Text style={[styles.underline, Typography.FONT_REGULAR_THIN]}>
              Best food I have ever tasted!!!!
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  button: {
    width: 30,
    height: 40
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
