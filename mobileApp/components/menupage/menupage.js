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
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";

// TODO: connect to score from DB
function Rating(score) {
  let stars = [];
  for (let i = 0; i < 4; i++) {
    stars.push(
      <Image
          key={i.toString()}
        source={require("../../assets/icon-star.png")}
        style={{ height: 13, width: 13 }}
      />
    );
  }
  if (stars.length < 5) {
    for (let i = 0; i < 5 - stars.length; i++) {
      stars.push(
        <Image
            key={(i+5).toString()}
          source={require("../../assets/icon-star-empty.png")}
          style={{ height: 13, width: 13 }}
        />
      );
    }
  }
  return <View style={{ flexDirection: "row" }}>{stars}</View>;
}

function MenuItem({
  menuItemName,
  menuItemDescription,
  priceEuros,
  menuItemImage,
  tags,
  score
}) {
  const tags1Row = [];
  const tags2Row = [];

  for (let i = 0; i < tags.length; i++) {
    const color = tags[i]["color"];
    const tag = [
      <View key={i.toString()} style={[styles.bgLabel, { backgroundColor: color }]}>
        <Text style={[Typography.FONT_TAG, { marginHorizontal: 10 }]}>
          {tags[i]["name"]}
        </Text>
      </View>
    ];
    {
      i < 2 ? tags1Row.push(tag) : tags2Row.push(tag);
    }
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginHorizontal: 15,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: 90,
            alignItems: "center"
          }}
        >
          <Image
            // USE THIS WHEN DB HAS REAL LINKS
            //source={{uri:menuItemImage}}
            source={require("../../assets/burgerPhoto.png")}
            style={[
              styles.imageCircle,
              { alignSelf: "center", marginBottom: 5 }
            ]}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../assets/icon-star.png")} />
            <Text style={Typography.FONT_SMALL_BLACK}> {score} </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <View
            style={{
              flexDirection: "column",
              width: 190
            }}
          >
            <Text style={[Typography.FONT_BOLD, { marginBottom: 5 }]}>
              {menuItemName}
            </Text>
            <Text style={[Typography.FONT_SMALL_THIN, { textAlign: "left" }]}>
              {menuItemDescription}
            </Text>
            <View style={{ flexDirection: "row" }}>{tags1Row}</View>
            <View style={{ flexDirection: "row" }}>{tags2Row}</View>
          </View>
          <View style={{ width: 40 }}>
            <Text style={[Typography.FONT_BOLD, { alignSelf: "flex-end" }]}>
              {" "}
              {priceEuros}
            </Text>
          </View>
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
      restaurantInfo: "",
      searchResults: null,
      isLoading: true,
      dishItems: "",
      drinkItems: ""
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
        `http://192.168.1.101:8080/api/user/customer/menu/${menuId}`,
        {
          method: "GET",
          accept: "application/json"
        }
      );
      const responseJson = await response.json();
      const tags = this.getMenuTagsInfo(responseJson);
      this.setMenuInfoTags(tags);
      const menuInfo = {
        id: menuId,
        restaurantName,
        menuName: responseJson["menuName"],
        menuDescription: responseJson["description"],
        tags: tags,
        score: responseJson["menuRating"]
      };
      const menuItems = responseJson["menuItems"].map(index => ({
        id: index["menuItemID"].toString(),
        menuItemName: index["name"],
        menuItemDescription: index["description"],
        priceEuros: index["priceEuros"],
        menuItemImage: index["imageLink"],
        tags: this.getMenuItemTagsInfo(index),
        // TODO: Add right rating-score
        score: "4.6",
        type: index["type"]
      }));
      const restaurantInfo = {
        latitude: responseJson["restaurant"]["latitude"],
        longitude: responseJson["restaurant"]["longitude"],
        address: responseJson["restaurant"]["address"],
        city: responseJson["restaurant"]["city"],
        country: responseJson["restaurant"]["country"]
      };

      const dishItems = [];
      const drinkItems = [];

      menuItems.map(item => {
        if (item.type == "dish") {
          dishItems.push(item);
        } else if (item.type == "drink") {
          drinkItems.push(item);
        }
      });

      this.setState({
        menuInfo,
        menuItems,
        dishItems,
        drinkItems,
        restaurantInfo,
        isLoading: false
      });
    } catch (e) {
      console.error(e);
    }
  }
  getMenuTagsInfo(responseJson) {
    const tagsObject = [];
    for (let i = 0; i < responseJson.tags.length; i++) {
      tagsObject.push({
        name: responseJson.tags[i]["name"],
        color: responseJson.tags[i]["color"]
      });
    }
    return tagsObject;
  }

  getMenuItemTagsInfo(index) {
    const tagsObject = [];
    const numberOfTags = index.tags.length;
    for (let i = 0; i < numberOfTags; i++) {
      tagsObject.push({
        name: index.tags[i]["name"],
        color: index.tags[i]["color"]
      });
    }
    return tagsObject;
  }

  tags1Row = [];
  tags2Row = [];

  setMenuInfoTags(tags) {
    for (let i = 0; i < tags.length; i++) {
      const color = tags[i]["color"];
      const tag = [
        <View key={i.toString()} style={[styles.bgLabel, { backgroundColor: color }]}>
          <Text style={[Typography.FONT_TAG, { marginHorizontal: 10 }]}>
            {tags[i]["name"]}
          </Text>
        </View>
      ];
      {
        i < 2 ? this.tags1Row.push(tag) : this.tags2Row.push(tag);
      }
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
              <View
                style={{ marginTop: 40, marginLeft: 30, position: "absolute" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Image source={require("../../assets/go-back.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <SafeAreaView style={styles.infoBox}>
              <Text style={[Typography.FONT_H3_BLACK, { marginBottom: 5 }]}>
                {this.state.menuInfo.menuName}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={Typography.FONT_SMALL_BLACK}> by </Text>
                <Text style={Typography.FONT_SMALL_PINK}>
                  {this.state.menuInfo.restaurantName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Rating />
              </View>
              <Text
                style={[
                  Typography.FONT_SMALL_THIN,
                  { marginBottom: 15, textAlign: "center" }
                ]}
              >
                {this.state.menuInfo.menuDescription}
              </Text>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", marginBottom: 3 }}>
                  {this.tags1Row}
                </View>
                <View style={{ flexDirection: "row", marginBottom: 3 }}>
                  {this.tags2Row}
                </View>
              </View>
            </SafeAreaView>
          </View>
          <SafeAreaView
            style={{ marginTop: 140, alignItems: "center", flex: 1 }}
          >
            {this.state.dishItems.length > 0 ? (
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    Typography.FONT_REGULAR_THIN,
                    { marginTop: 10, textAlign: "center" }
                  ]}
                >
                  DISHES
                </Text>
                <View style={styles.underline} />
                <FlatList
                  data={this.state.dishItems}
                  renderItem={({ item }) => (
                    <MenuItem
                      id={item.id}
                      menuItemName={item.menuItemName}
                      menuItemDescription={item.menuItemDescription}
                      priceEuros={item.priceEuros + " €"}
                      menuItemImage={item.menuItemImage}
                      tags={item.tags}
                      score={item.score}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : null}
            {this.state.drinkItems.length > 0 ? (
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    Typography.FONT_REGULAR_THIN,
                    { marginTop: 15, textAlign: "center" }
                  ]}
                >
                  DRINKS
                </Text>
                <View style={styles.underline} />
                <FlatList
                  data={this.state.drinkItems}
                  renderItem={({ item }) => (
                    <MenuItem
                      id={item.id}
                      menuItemName={item.menuItemName}
                      menuItemDescription={item.menuItemDescription}
                      priceEuros={item.priceEuros + " €"}
                      menuItemImage={item.menuItemImage}
                      tags={item.tags}
                      score={item.score}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : null}
            <View style={{ flex: 1 }}>
              {this.state.isLoading ? (
                <Text> No map to display </Text>
              ) : (
                <MapView
                  initialRegion={{
                    longitude: this.state.restaurantInfo.longitude,
                    latitude: this.state.restaurantInfo.latitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009
                  }}
                  style={{
                    width: 360,
                    height: 270,
                    alignSelf: "center",
                    marginTop: 30
                  }}
                >
                  <MapView.Marker
                    coordinate={{
                      longitude: this.state.restaurantInfo.longitude,
                      latitude: this.state.restaurantInfo.latitude
                    }}
                    title={this.state.menuInfo.restaurantName + ""}
                    description={
                      this.state.restaurantInfo.address +
                      ", " +
                      this.state.restaurantInfo.city +
                      ", " +
                      this.state.restaurantInfo.country
                    }
                  />
                </MapView>
              )}
            </View>
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
    backgroundColor: Colors.WHITE
  },
  infoBox: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    width: 322,
    height: 190,
    shadowColor: Colors.BLACK,
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
    backgroundColor: Colors.WHITE,
    alignItems: "center"
  },
  underline: {
    borderBottomColor: Colors.GRAY_LIGHT,
    borderBottomWidth: 1,
    //textAlign: "center",
    width: 320,
    margin: 10
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
  },
  bgLabel: {
    borderRadius: 5,
    marginRight: 5,
    marginTop: 6,
    justifyContent: "center"
  }
});
