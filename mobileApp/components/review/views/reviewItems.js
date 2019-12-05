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
        menuItems:"",
      colorIndex: 4,
    };
  }
  componentDidMount = async () => {
      const { navigation } = this.props;
      const menuItems = navigation.getParam("menuItems", "no-values");
      this.setState({menuItems});
  };
    render() {
    return (
      <View style={styles.container}>
        <View>
          <BackButton navigation={this.props.navigation} />
          <View style={styles.header}>
            <Text style={Typography.FONT_H3_BLACK}>
              Write review
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.menuItems}
          renderItem={({ item }) => <ReviewItem item={item.menuItemName} />}
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
  }
});
