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
  ListView,
  TextInput
} from "react-native";

function Dishes() {
  return (
    <View>
      <Text style={styles.thinText}> DISHES </Text>
      <View style={styles.underline} />
      <MenuItem />
      <View style={styles.underline} />
      <MenuItem />
      <View style={styles.underline} />
    </View>
  );
}

function Drinks() {
  return (
    <View>
      <Text style={styles.thinText}> DRINKS </Text>
      <View style={styles.underline} />
      <MenuItem />
      <View style={styles.underline} />
      <MenuItem />
      <View style={styles.underline} />
    </View>
  );
}

function MenuItem() {
  return (
    <View>
      <View style={{ flexDirection: "row" /*top: 20*/ }}>
        <View style={{ flexDirection: "column", left: 10 }}>
          <Image
            source={require("../../assets/no_image.png")}
            style={styles.imageCircle}
          />
          <View style={{ flexDirection: "row", left: 8 }}>
            <Image source={require("../../assets/icon-star.png")} />
            <Text style={styles.smallTextBlack}> Score </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            left: 20,
            justifyContent: "space-between"
          }}
        >
          <Text style={styles.smallTextBlack}> Blue Cheese Burger </Text>
          <Text style={styles.smallThinText2}> Description </Text>
          <Text style={styles.smallTextBlack}> Tags </Text>
        </View>

        <View style={{ flexDirection: "column", left: 100 }}>
          <Text style={styles.smallTextBlack}> 8¢ </Text>
        </View>
      </View>
    </View>
  );
}

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
      <SafeAreaView style={styles.container}>
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
          <View style={{ bottom: 50 }}>
            <Dishes />
            <Drinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //top: 25,
    backgroundColor: "#FFFFFF"
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
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
    width: 300,
    //height: 15,
    color: "#000000",
    fontFamily: "roboto",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center"
  },
  underline: {
    borderBottomColor: "#E7E5E5",
    borderBottomWidth: 1,
    //textAlign: "center",
    width: 300,
    margin: 10
  },
  smallThinText: {
    fontSize: 10,
    textAlign: "center"
  },
  smallThinText2: {
    fontSize: 10,
    textAlign: "left"
  },
  imageCircle: {
    width: 67,
    height: 67,
    borderRadius: 67 / 2
  },
  menuItem: {
    //top: 10,
    justifyContent: "center",
    flexDirection: "row"
  },
  menuInfo: {
    marginLeft: 10,
    marginRight: 10
  }
});
