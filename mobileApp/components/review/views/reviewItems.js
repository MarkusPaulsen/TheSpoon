import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import * as Typography from "../../../styles/typography";
import BackButton from "../components/backButton";
import ContinueButton from "../components/continueButton";
import ReviewItem from "../components/reviewItem";

export default class ReviewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: false,
      itemsList: [
        "Pizza Margherita",
        "Blue Cheese Burger",
        "Pizza 4 Formaggio",
        "Avocado Toast"
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        <View style={{ alignItems: "center" }}>
          <Text style={Typography.FONT_H3_BLACK}>Write review</Text>
        </View>
        <FlatList
          data={this.state.itemsList}
          renderItem={({ item }) => <ReviewItem item={item} />}
        />
        <View>
          <ContinueButton
            disableButton={this.state.disableButton}
            navigation={this.props}
            view={"ReviewOverall"}
            text={"CONTINUE"}
          />
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
