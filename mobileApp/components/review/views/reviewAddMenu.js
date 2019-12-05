import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import * as Typography from "../../../styles/typography";
import ContinueButton from "../components/continueButton";
import BackButton from "../components/backButton";

export default class ReviewAddMenu extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      disableButton: false,
      selected: null,
      backgroundColor: "#FFFFFF",
      dataSource: ["Lunch Menu", "Evening Menu", "Weekend Specials"]
    };
  }

  onClick() {
    this.setState({ backgroundColor: "#A5DED0" });
    console.log(this.state.backgroundColor);
  }

  render() {
    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={Typography.FONT_H3_BLACK}>Choose Menu</Text>
        </View>
        <View style={styles.resultList}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={this.onClick}
                underlayColor={"#A5DED0"}
              >
                <Text
                  style={[
                    Typography.FONT_H4_BLACK,
                    {
                      marginVertical: 10,
                      marginLeft: 50
                    }
                  ]}
                >
                  {item}
                </Text>
              </TouchableHighlight>
            )}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <ContinueButton
            disableButton={this.state.disableButton}
            navigation={this.props}
            view={"ReviewAddItems"}
            text={"CONTINUE"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1
  },
  resultList: {
    height: 200,
    flex: 6
  }
});
