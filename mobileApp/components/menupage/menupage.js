import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from "react-native";
import MapView from "react-native-maps";
import stylesheet from "../../modules/fontstyles";

function Map() {
  return (
    <View>
      <MapView
        style={{
          width: 360,
          height: 270,
          alignSelf: "center",
          marginBottom: 200
        }}
        initialRegion={{
          latitude: 45.4688346,
          longitude: 9.2212227,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009
        }}
      >
        <MapView.Marker
          coordinate={{ latitude: 45.4688346, longitude: 9.2212227 }}
          title={"AUUM"}
          description={"Address"}
        />
      </MapView>
    </View>
  );
}

function MenuItem({
  menuItemName,
  menuItemDescription,
  priceEuros,
  menuItemImage,
  tag1,
  tag2,
  score
}) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginHorizontal: 15,
          height: 80
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: 80,
            alignItems: "center"
          }}
        >
          <Image
            source={require("../../assets/no_image.png")}
            style={[styles.imageCircle, { alignSelf: "center" }]}
          />
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../../assets/icon-star.png")} />
            <Text style={styles.smallTextBlack}> {score} </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            width: 190
          }}
        >
          <Text style={[styles.smallTextBlack, { marginVertical: 5 }]}>
            {menuItemName}
          </Text>
          <Text style={styles.smallThinText2}>
            {menuItemDescription}
          </Text>
          <Text style={[styles.smallTextBlack, {marginTop: 5}]}>
            {tag1} {tag2}
          </Text>
        </View>

        <View style={{ width: 30}}>
          <Text style={[styles.smallTextBlack, { alignSelf: "flex-end" }]}>
            {" "}
            {priceEuros}
          </Text>
        </View>
      </View>
      <View style={styles.underline} />
    </View>
  );
}

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuInfo: "",
      menuItems: "",
      searchResults: null
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const menuId = navigation.getParam("menuId", "000");
    const restaurantName = navigation.getParam(
      "restaurantName",
      "default value"
    );
    await this.getMenuItem(menuId, restaurantName);
  };

  async getMenuItem(menuId, restaurantName) {
    try {
      //change to port 80 if not using the stub
      const response = await fetch(
        `http://192.168.1.110:8080/api/user/customer/menu/${menuId}`,
        {
          method: "GET",
          accept: "application/json"
        }
      );
      const responseJson = await response.json();
      const menuInfo = {
        id: menuId,
        restaurantName,
        menuName: responseJson["name"],
        menuDescription: responseJson["description"],
        tag1: responseJson["tags"][0],
        tag2: responseJson["tags"][1],
        score: "4.6"
      };
      const menuItems = responseJson["menuItems"].map(index => ({
        menuItemName: index["name"],
        menuItemDescription: index["description"],
        priceEuros: index["priceEuros"],
        menuItemImage: index["imageLink"],
        // TODO: Handle number of tags
        tag1: index["tags"][0],
        tag2: index["tags"][1],
        // TODO: Add right rating-score
        score: "4.6"
      }));
      this.setState({ menuInfo, menuItems });
    } catch (e) {
      console.error(e);
    }
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
            <View>
              <Image source={require("../../assets/auum.png")} />
            </View>
            <SafeAreaView style={styles.infoBox}>
              <Text style={styles.h3}>{this.state.menuInfo.menuName}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.smallTextBlack}> by </Text>
                <Text style={styles.smallTextPink}>
                  {this.state.menuInfo.restaurantName}
                </Text>
              </View>
              <Text> Stars </Text>
              <Text style={styles.smallThinText}>
                {this.state.menuInfo.menuDescription}
              </Text>
            </SafeAreaView>
          </View>
          <SafeAreaView style={{ marginTop: 160, alignItems: "center" }}>
            <Text style={styles.thinText}> DISHES </Text>
            <View style={styles.underline} />
            <FlatList
              data={this.state.menuItems}
              contentContainerStyle={{
                flexGrow: 1
              }}
              renderItem={({ item }) => (
                <MenuItem
                  menuId={item.menuItemName}
                  menuItemName={item.menuItemName}
                  menuItemDescription={item.menuItemDescription}
                  priceEuros={item.priceEuros}
                  menuItemImage={item.menuItemImage}
                  tag1={item.tag1}
                  tag2={item.tag2}
                  score={item.score}
                />
              )}
              keyExtractor={item => item.menuId}
            />
            <Text style={styles.thinText}> DRINKS </Text>
            <View style={styles.underline} />
            <FlatList
              contentContainerStyle={{
                flexGrow: 1
              }}
              data={this.state.menuItems}
              renderItem={({ item }) => (
                <MenuItem
                  menuId={"9mmn" + item.menuItemName}
                  menuItemName={item.menuItemName}
                  menuItemDescription={item.menuItemDescription}
                  priceEuros={item.priceEuros}
                  menuItemImage={item.menuItemImage}
                  tag1={item.tag1}
                  tag2={item.tag2}
                  score={item.score}
                />
              )}
              keyExtractor={item => item.menuId}
            />
            <Map />
          </SafeAreaView>
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
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
    alignSelf: "center"
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
    color: "#000000",
    fontWeight: "500"
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
    width: 320,
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
