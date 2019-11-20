import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ListView
} from "react-native";

export default class Menu extends Component {
  async getResults() {
    //TODO: Handle promise
    try {
      let searchString = this.state.search;
      //change to port 80 if not using the stub
      let response = await fetch(
          "http://192.168.1.110:8080/api/user/customer/menu/searchByMenuItem?menuItemName={searchString}",
          {
            method: "GET",
            accept: "application/json"
          }
      );
      let responseJson = await response.json();
      console.log("The search string is: ", searchString);
      console.log("The response is: ", responseJson);

      if (response.ok) {
        this.setState({ searchResults: responseJson });
        this.createResultsData(responseJson);
        //this.setState({ searchResultsFound: true });
      }
      if (!response.ok) {
        // this.setState({ searchResultsFound: false });
      }
    } catch (e) {
      console.error(e);
    }
  }
  createResultsData(responseJson) {
    responseJson.map(index => {
      resultsData.push({
        id: index.menu.menuID.toString(),
        menuName: index.menu.name,
        restaurantName: index.restaurantData.restaurantName,
        //TODO: Handle more than two tags
        tag1: index.menu.tags[0],
        tag2: index.menu.tags[1],
        //TODO: Add the right score
        score: "4.6"
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center"
          }}
        >
          <View>
            <Image source={require("../../assets/auum.png")} />
          </View>
          <SafeAreaView style={styles.infoBox}>
            <Text style={styles.h3}>Lunch menu</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.smallTextBlack}> by </Text>
              <Text style={styles.smallTextPink}> Pizzeria AUUM</Text>
            </View>
            <Text> Stars </Text>
            <Text style={styles.smallThinText}>
              This is the description of the menu. Here you can {"\n"} write
              things about the menu.
            </Text>
          </SafeAreaView>
          <Text styles={styles.thinText}> DISHES </Text>
          <Text> {resultsData.menuItems.name} </Text>
          <SafeAreaView>

            <View> {renderData} </View>
          </SafeAreaView>
          <Text styles={styles.thinText}> DRINKS </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 25,
    backgroundColor: "#FFFFFF"
  },
  infoBox: {
    backgroundColor: "#FFFFFF", // padding: 20,
    //marginVertical: 8,
    //marginHorizontal: 0,
    borderRadius: 20,
    width: 322,
    height: 203,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
    //position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 70
  },
  containerResults: {
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  h3: {
    //fontFamily: "roboto",
    //fontWeight: 500,
    fontSize: 24
  },
  h2: {
    fontFamily: "roboto",
    fontSize: 40,
    color: "#F3A3A3"
  },
  h4Black: {
    fontFamily: "roboto",
    fontSize: 18,
    color: "#000000"
  },
  h4Pink: {
    fontFamily: "roboto",
    fontSize: 18,
    color: "#F3A3A3"
  },
  smallTextBlack: {
    fontFamily: "roboto",
    fontSize: 12,
    color: "#000000"
  },
  smallTextPink: {
    fontFamily: "roboto",
    fontSize: 12,
    color: "#F3A3A3"
  },
  thinText: {
    bottom: "50",
    fontSize: 15,
    fontFamily: "roboto"
  },
  smallThinText: {
    fontSize: 10,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10
  }
});
