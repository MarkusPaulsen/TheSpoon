import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import BackButton from "../components/backButton";
import ContinueButton from "../components/continueButton";
import { AirbnbRating } from "react-native-ratings";

export default class ReviewOverall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
          <Text style={[Typography.FONT_H3_BLACK, { textAlign: "center" }]}>
            What's you overall{"\n"}impression?
          </Text>
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
          />
          <Text
            style={[
              Typography.FONT_H4_BLACK,
              { marginTop: 40, marginBottom: 10 }
            ]}
          >
            Quality/Price
          </Text>
          <AirbnbRating
            showRating={false}
            defaultRating={0}
            size={30}
            selectedColor={Colors.PINK}
          />
          <View style={{ marginTop: 60 }}>
            <ContinueButton
              disableButton={this.state.disableButton}
              navigation={this.props}
              view={"ReviewOverall"}
              text={"POST REVIEW"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  }
});
