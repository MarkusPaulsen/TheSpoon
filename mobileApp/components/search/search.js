import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import SearchIcon from "../../assets/search.png";

export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginLeft: 50,
            marginTop: 100
          }}
        >
          <Text style={styles.bigText}>What</Text>
          <View style={styles.smallText}>
            <Text style={{color: "#000000" }}>do you want to </Text>
            <Text style={{color: "#F3A3A3" }}>eat </Text>
            <Text style={{color: "#000000" }}>today </Text>
          </View>
          <Image source={SearchIcon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
    //alignContent: "center",
    //justifyContent: 'center'
  },
  bigText: {
    //position: 'absolute',
    /*width: 310,
    height: 56,
    left: 20,
    top: 165,*/
    fontFamily: "Roboto",
    //fontStyle: "bold",
    //fontWeight: 500,
    fontSize: 30,
    //lineHeight: 56,
    //display: "flex",
    //alignItems: "center",
    //textAlign: "center",
    color: "#F3A3A3"
  },
  smallText: {
    flexDirection: "row"
  }
});
