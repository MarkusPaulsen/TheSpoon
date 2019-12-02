import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import ContinueButton from "../components/continueButton";
import SearchField from "../components/searchField";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true
    };
  }

  checkImageState() {
    if (this.state.disableButton === false) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ReviewAddMenu")}
        >
          <ContinueButton color={Colors.PINK} />
        </TouchableOpacity>
      );
    }
    return <ContinueButton color={Colors.GRAY_MEDIUM} />;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={Typography.FONT_H3_BLACK}>Choose Restaurant</Text>
        <SearchField style={styles.searchField} />
        {this.checkImageState()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flexGrow: 1,
    alignItems: "center",
    marginTop: 60
  },
  searchField: {
    //justifyContent: "center",
    marginVertical: 20,
  }
});
