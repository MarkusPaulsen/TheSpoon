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
import * as Api from "../../services/api";
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
import OpeningHours from "./OpeningHours";

function MenuItem({
  menuItemName,
  menuItemDescription,
  priceEuros,
  menuItemImage,
  tags,
  score
}) {
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
            source={{ uri: menuItemImage }}
            style={[
              styles.imageCircle,
              { alignSelf: "center", marginBottom: 5 }
            ]}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {score === null ? (
              <Text />
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Icon name={"star"} color={Colors.PINK} size={15} />
                <Text style={Typography.FONT_SMALL_BLACK}>{score}</Text>
              </View>
            )}
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
            {tags !== null ? (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start"
                }}
              >
                {tags.map((item, index) => (
                  <View
                    style={[styles.bgLabel, { backgroundColor: item.color }]}
                    key={"key" + index}
                  >
                    <Text
                      style={[Typography.FONT_TAG, { marginHorizontal: 10 }]}
                    >
                      {item.name}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View />
            )}
          </View>
          <View style={{ width: 40 }}>
            <Text style={[Typography.FONT_BOLD, { alignSelf: "flex-end" }]}>
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
      drinkItems: "",
      menuID: null,
      restaurantImage: null,
      showOpeningHours: false
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const menuId = navigation.getParam("menuId", "000");
    this.setState({ menuID: menuId });
    const restaurantName = navigation.getParam(
      "restaurantName",
      "default value"
    );
    const restaurantImage = navigation.getParam(
      "restaurantImage",
      "default value"
    );
    this.setState({ restaurantImage: restaurantImage });
    await this.getMenuItem(menuId, restaurantName);
  };

  async getMenuItem(menuId, restaurantName) {
    try {
      const response = await fetch(Api.SERVER_GET_MENUITEM(menuId), {
        method: "GET",
        accept: "application/json"
      });
      const responseJson = await response.json();
      const menuInfo = {
        id: menuId,
        restaurantName,
        menuName: responseJson["menuName"],
        menuDescription: responseJson["description"],
        tags: responseJson["tags"],
        score: responseJson["menuRating"]
      };
      const menuItems = responseJson["menuItems"].map(index => ({
        id: index["menuItemID"].toString(),
        menuItemName: index["name"],
        menuItemDescription: index["description"],
        priceEuros: index["priceEuros"],
        menuItemImage: index["imageLink"],
        tags: index["tags"],
        score: index["rating"],
        type: index["type"]
      }));
      const restaurantInfo = {
        latitude: parseFloat(responseJson["restaurant"]["latitude"]),
        longitude: parseFloat(responseJson["restaurant"]["longitude"]),
        address: responseJson["restaurant"]["address"],
        city: responseJson["restaurant"]["city"],
        country: responseJson["restaurant"]["country"],
        openingHours: responseJson["restaurant"]["openingHours"]
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
      console.log(e);
    }
  }

  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);
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
              <Image
                source={{ uri: this.state.restaurantImage }}
                style={{ width: 370, height: 180, justifyContent: "center" }}
              />
              <View style={{ marginTop: 40, position: "absolute" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                  style={styles.button}
                >
                  <Icon name={"chevron-left"} size={40} />
                </TouchableOpacity>
              </View>
            </View>
            <SafeAreaView style={styles.infoBox}>
              <Text
                testID="menuName"
                style={[Typography.FONT_H3_BLACK, { marginBottom: 5 }]}
              >
                {this.state.menuInfo.menuName}
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text style={Typography.FONT_SMALL_BLACK}> by </Text>
                <Text
                  testID="restaurantName"
                  style={Typography.FONT_SMALL_PINK}
                >
                  {this.state.menuInfo.restaurantName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <AirbnbRating
                  isDisabled={true}
                  defaultRating={this.state.menuInfo.score}
                  showRating={false}
                  size={17}
                  selectedColor={Colors.PINK}
                />
              </View>
              <Text
                testID="menuDescription"
                style={[
                  Typography.FONT_SMALL_THIN,
                  { marginBottom: 15, textAlign: "center" }
                ]}
              >
                {this.state.menuInfo.menuDescription}
              </Text>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", marginBottom: 3 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "flex-start"
                    }}
                  >
                    {this.state.menuInfo.tags ? (
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignItems: "flex-start"
                        }}
                      >
                        {this.state.menuInfo.tags.map((item, index) => (
                          <View
                            style={[
                              styles.bgLabel,
                              { backgroundColor: item.color }
                            ]}
                            key={"key" + index}
                          >
                            <Text
                              style={[
                                Typography.FONT_TAG,
                                { marginHorizontal: 10 }
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
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
                  testID="dishesHeading"
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
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("ItemReview", {
                          item: item,
                          menuID: this.state.menuID
                        });
                      }}
                    >
                      <MenuItem
                        id={item.id}
                        menuItemName={item.menuItemName}
                        menuItemDescription={item.menuItemDescription}
                        priceEuros={item.priceEuros + " €"}
                        menuItemImage={item.menuItemImage}
                        tags={item.tags}
                        score={item.score}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : null}
            {this.state.drinkItems.length > 0 ? (
              <View style={{ flex: 1 }}>
                <Text
                  testID="drinksHeading"
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
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("ItemReview", {
                          item: item,
                          menuID: this.state.menuID
                        });
                      }}
                    >
                      <MenuItem
                        id={item.id}
                        menuItemName={item.menuItemName}
                        menuItemDescription={item.menuItemDescription}
                        priceEuros={item.priceEuros + " €"}
                        menuItemImage={item.menuItemImage}
                        tags={item.tags}
                        score={item.score}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : null}
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                height: 50,
                width: screenWidth * 0.9,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5
              }}
              onPress={() => this.setState({ showOpeningHours: true })}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={"access-time"} size={30} color={Colors.GRAY_DARK} />
                <Text style={{ color: Colors.GRAY_DARK, marginLeft: 5 }}>
                  Opening Hours
                </Text>
              </View>
              <Icon
                name={"keyboard-arrow-right"}
                size={30}
                color={Colors.GRAY_DARK}
              />
            </TouchableOpacity>
            <OpeningHours
              data={this.state.restaurantInfo.openingHours}
              visible={this.state.showOpeningHours}
              backButton={() => this.setState({ showOpeningHours: false })}
            />
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
                    marginTop: 15
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
    width: 320,
    margin: 10
  },
  imageCircle: {
    width: 67,
    height: 67,
    borderRadius: 67 / 2
  },
  menuItem: {
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
  },
  button: {
    backgroundColor: Colors.WHITE,
    width: 60,
    height: 40,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
