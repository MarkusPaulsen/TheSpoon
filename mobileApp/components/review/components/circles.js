import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import * as Colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class CircleBar extends Component {
  circles(colorIndex) {
    let circlesList = [];

    for (let i = 0; i < 6; i++) {
      if (i === colorIndex) {
        circlesList.push(
          <Icon name={"brightness-1"} size={15} style={styles.pink} key={i.toString()}/>
        );
      } else {
        circlesList.push(
          <Icon name={"brightness-1"} size={15} style={styles.grey} key={i.toString()}/>
        );
      }
    }
    return circlesList;
  }

  render() {
    const colorIndex = this.props.colorIndex;

    return <View style={{flexDirection: "row"}}>{this.circles(colorIndex)}</View>;
  }
}

const styles = StyleSheet.create({
  pink: {
    color: Colors.PINK
  },
  grey: {
    color: Colors.GRAY_LIGHT
  }
});
