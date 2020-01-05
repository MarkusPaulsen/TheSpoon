import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Modal,
  Alert
} from "react-native";
import Validate from "./searchvalidation.js";
import { TouchableWithoutFeedback } from "react-native-web";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Api from "../../services/api";

function ResultItem({
  menuName,
  restaurantName,
  tags,
  score,
  avgPrice,
  image,
  distance,
  permission
}) {
  return (
    <View style={styles.resultsItem}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: image }}
          style={{ width: 322, height: 137, justifyContent: "center" }}
        />
      </View>
      <View style={styles.menuInfo}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={Typography.FONT_H4_BLACK}>{menuName}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={Typography.FONT_SMALL_BLACK}>{" by "}</Text>
          <Text style={Typography.FONT_SMALL_PINK}>{restaurantName}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
                <Text style={[Typography.FONT_TAG, { marginHorizontal: 10 }]}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {permission === true && distance !== null ? (
              <Text style={[Typography.FONT_SMALL_BLACK, { marginRight: 5 }]}>
                {distance.toFixed(2) + "km"}
              </Text>
            ) : (
              <View />
            )}
            <Text style={[Typography.FONT_SMALL_BLACK, { marginRight: 5 }]}>
              {getPriceCategory(avgPrice)}
            </Text>
            {score === null || score === "NaN" ? (
              <Text />
            ) : (
              <View style={{ flexDirection: "row" }}>
                <Icon name={"star"} color={Colors.PINK} size={15} />
                <Text style={Typography.FONT_SMALL_BLACK}>{score}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export function getPriceCategory(avgPrice) {
  avgPrice = parseInt(avgPrice);
  if (!avgPrice) {
    return "";
  } else if (avgPrice > 30) {
    return "$$$$";
  } else if (avgPrice > 20) {
    return "$$$";
  } else if (avgPrice > 10) {
    return "$$";
  } else {
    return "$";
  }
}

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      searchError: "",
      searchResults: null,
      searched: false,
      modalVisible: false,
      sorting: ["Price (high-low)", "Price (low-high)", "Review", "Distance"],
      selectedSorting: "",
      latitude: "",
      longitude: "",
      locationPermission: false
    };
    this.validateSearch = this.validateSearch.bind(this);
  }

  componentDidMount = async () => {
    this.findCoordinates();
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ locationPermission: true });
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        this.setState({ latitude: latitude });
        this.setState({ longitude: longitude });
      },
      error => {
        Alert.alert(error.message);
        this.setState({ locationPermission: false });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  updateSearchText = searchWord => {
    this.setState({ searchWord, searched: false });
  };

  async validateSearch() {
    Keyboard.dismiss();
    const searchError = Validate("search", this.state.searchWord);

    if (!searchError) {
      await this.getResults();
    } else {
      this.setState({ searchError, searchResults: null });
    }
    this.setState({ searched: true });
  }

  async getResults() {
    try {
      const searchString = this.state.searchWord;
      const lat = this.state.latitude;
      const long = this.state.longitude;
      const response = await fetch(Api.SERVER_SEARCH(searchString, lat, long), {
        method: "GET",
        accept: "application/json"
      });
      if (response.ok) {
        const responseJson = await response.json();
        const searchResults = responseJson.map(index => ({
          id: index.menu.menuID.toString(),
          menuName: index.menu.name,
          restaurantName: index.restaurantData.restaurantName,
          tags: index.menu.tags,
          score: index.menu.rating,
          price: index.menu.averagePrice,
          image: index.restaurantData.restaurantImageLink,
          distance: index.restaurantData.distance
        }));
        this.setState({ searchResults });
      }
      if (!response.ok) {
        this.setState({ searchResults: null });
      }
    } catch (e) {
      console.error(e);
    }
  }

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  setFilter(item) {
    if (this.state.selectedFilter === item) {
      this.setState({ selectedFilter: "" });
    } else {
      //this.setState({ selectedSorting: item });
      if (item === "Distance" && this.state.locationPermission === false) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({ locationPermission: true });
            const latitude = JSON.stringify(position.coords.latitude);
            const longitude = JSON.stringify(position.coords.longitude);
            this.setState({ latitude: latitude });
            this.setState({ longitude: longitude });
            this.setState({ selectedSorting: "Distance" });
            this.getResults();
          },
          error => {
            Alert.alert(error.message);
            this.setState({ locationPermission: false });
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        this.setState({ selectedSorting: item });
      }
    }
  }

  applySorting() {
    this.setModalVisible();
    const sorted = this.state.searchResults;
    if (this.state.selectedSorting === "Price (low-high)") {
      sorted.sort((a, b) => a.price - b.price);
      this.setState({ searchResults: sorted });
    } else if (this.state.selectedSorting === "Price (high-low)") {
      sorted.sort((a, b) => b.price - a.price);
      this.setState({ searchResults: sorted });
    } else if (this.state.selectedSorting === "Review") {
      sorted.sort((a, b) =>
        a.score > b.score
          ? -1
          : a.score === b.score
          ? a.menuName > b.menuName
            ? 1
            : -1
          : 1
      );
      this.setState({ searchResults: sorted });
    } else if (this.state.selectedSorting === "Distance") {
      if (this.state.locationPermission === true) {
        const sorted = this.state.searchResults;
        sorted.sort((a, b) =>
          a.distance > b.distance
            ? 1
            : a.distance === b.distance
            ? a.menuName > b.menuName
              ? 1
              : -1
            : -1
        );
        this.setState({ searchResults: sorted });
      }
    }
  }

  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            { width: screenWidth * 0.9, marginLeft: (screenWidth * 0.1) / 2 }
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "space-between" }}>
            <View style={styles.text} testID="heading">
              <Text style={Typography.FONT_H2_PINK}>What </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={Typography.FONT_H4_BLACK}>do you want to </Text>
                <Text style={Typography.FONT_H4_PINK}>eat </Text>
                <Text style={Typography.FONT_H4_BLACK}>today?</Text>
              </View>
            </View>
            {this.state.searchResults !== null && this.state.searched ? (
              <TouchableOpacity
                testID="sortButton"
                style={styles.sortingButton}
                onPress={() => this.setModalVisible()}
              >
                <Icon name={"filter-list"} size={30} color={Colors.WHITE} />
              </TouchableOpacity>
            ) : null}
            <Modal
              testID="sortModal"
              visible={this.state.modalVisible}
              animationType="slide"
              transparent={false}
            >
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  onPress={() => this.setModalVisible()}
                  style={{ marginLeft: (screenWidth * 0.1) / 2 }}
                >
                  <Icon name={"chevron-left"} size={40} />
                </TouchableOpacity>
                <Text
                  style={[Typography.FONT_H3_BLACK, { alignSelf: "center" }]}
                >
                  Sort By
                </Text>
                <FlatList
                  data={this.state.sorting}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => this.setSorting(item)}
                      style={{
                        justifyContent: "center",
                        height: 40,
                        backgroundColor:
                          this.state.selectedSorting === item
                            ? Colors.TURQUOISE
                            : Colors.WHITE
                      }}
                    >
                      <Text
                        style={[
                          Typography.FONT_H4_BLACK,
                          {
                            width: screenWidth * 0.85,
                            marginLeft: (screenWidth * 0.15) / 2
                          }
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item}
                  style={{ marginVertical: 30 }}
                />
                {this.state.selectedSorting ? (
                  <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => this.applySorting()}
                  >
                    <Text
                      style={[
                        Typography.FONT_H4_WHITE,
                        { textAlign: "center" }
                      ]}
                    >
                      Apply
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[
                      styles.applyButton,
                      { backgroundColor: Colors.GRAY_MEDIUM }
                    ]}
                  >
                    <Text
                      style={[
                        Typography.FONT_H4_WHITE,
                        { textAlign: "center" }
                      ]}
                    >
                      Apply
                    </Text>
                  </View>
                )}
              </View>
            </Modal>
          </View>
          <View style={[styles.searchBar, { marginTop: 20 }]}>
            <TouchableOpacity
              testID="searchIconButton"
              value={this.state.searchWord}
              onPress={this.validateSearch}
            >
              <Icon
                testID="searchIcon"
                name={"search"}
                size={28}
                color={Colors.PINK}
              />
            </TouchableOpacity>
            <TextInput
              testID="searchField"
              style={[Typography.FONT_INPUT, styles.textInput]}
              placeholder="Search..."
              placeholderTextColor={Colors.GRAY_MEDIUM}
              onChangeText={this.updateSearchText}
              value={this.state.searchWord}
              returnKeyType="search"
              autoFocus={false}
              onSubmitEditing={this.validateSearch}
              onBlur={() => {
                this.setState({
                  searchError: Validate("search", this.state.searchWord)
                });
              }}
              error={this.state.searchError}
            />
          </View>
          <View style={{ flex: 10 }}>
            {this.state.searchResults && this.state.searched ? (
              <SafeAreaView style={styles.containerResults}>
                <FlatList
                  data={this.state.searchResults}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("Menu", {
                          menuId: item.id,
                          restaurantName: item.restaurantName,
                          restaurantImage: item.image
                        });
                      }}
                    >
                      <ResultItem
                        id={item.id}
                        menuName={item.menuName}
                        restaurantName={item.restaurantName}
                        tags={item.tags}
                        score={item.score}
                        avgPrice={item.price}
                        image={item.image}
                        distance={item.distance}
                        permission={this.state.locationPermission}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => {
                    return item.id;
                  }}
                />
              </SafeAreaView>
            ) : null}
            {this.state.searched && !this.state.searchResults ? (
              <View style={styles.noResult} testID="noResultsView">
                <View>
                  <Image source={require("../../assets/noresults.png")} />
                </View>
                <Text
                  style={[
                    Typography.FONT_H4_GRAY_DARK,
                    {
                      textAlign: "center",
                      marginTop: 70
                    }
                  ]}
                >
                  <Text> We can't find what you are {"\n"} looking for...</Text>
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  containerResults: {
    backgroundColor: Colors.WHITE,
    alignItems: "center"
  },
  text: {
    flex: 1,
    marginTop: 60,
    marginLeft: 25
  },
  textInput: {
    height: 42,
    width: 240,
    borderBottomColor: Colors.PINK,
    borderBottomWidth: 1.5,
    marginLeft: 7
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  noResult: {
    marginTop: 120,
    alignItems: "center"
  },
  resultsItem: {
    backgroundColor: Colors.WHITE, // padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 20,
    width: 322,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1
  },
  menuInfo: {
    marginLeft: 20,
    marginRight: 20
  },
  bgLabel: {
    height: 15,
    backgroundColor: "#7DC0FE",
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 6
  },
  imageBox: {
    width: 322,
    height: 137,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  },
  sortingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.PINK,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    backgroundColor: Colors.WHITE,
    marginTop: 30
  },
  applyButton: {
    backgroundColor: Colors.PINK,
    width: 120,
    borderRadius: 50,
    alignSelf: "center",
    height: 35,
    justifyContent: "center"
  }
});
