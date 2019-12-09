import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import * as Api from "../../../services/api";
import ContinueButton from "../components/continueButton";
import BackButton from "../components/backButton";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class ReviewAddRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      selected: null,
      colorIndex: 1,
      backgroundColor: null,
      restaurants: "",
      searchWord: "",
      searchResult: null
    };
  }
  componentDidMount = async () => {
    await this.getAllMenus();
  };

  async getAllMenus() {
    try {
      const response = await fetch(Api.STUB_GET_RESTAURANTS, {
        method: "GET",
        accept: "application/json"
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.ok) {
        const restaurants = responseJson.map(index => ({
          restaurantID: index.restaurantID.toString(),
          name: index.name
        }));
        this.setState({ restaurants });
      }
    } catch (e) {
      console.log("ERROR fetching restaurants", e);
    }
  }

  setSelected(id) {
    this.setState({ selected: id });
    this.setState({ disableButton: false });
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord });
  };

  searchBySearchWord(restaurants, searchWordOriginal) {
    if (!restaurants) {
      return null;
    }
    const searchWord = searchWordOriginal.toLowerCase();
    const result = [];
    restaurants.map(restaurant => {
      if (restaurant.name.toLowerCase().includes(searchWord)) {
        result.push(restaurant);
      }
    });
    if (result.length < 1) {
      return null;
    }
    return result;
  }

  getSearchResult() {
    const searchWord = this.state.searchWord;
    if (searchWord === "") {
      this.setState({ searchResult: this.state.restaurants });
    } else {
      const searchResult = this.searchBySearchWord(
        this.state.restaurants,
        searchWord
      );
      this.setState({ searchResult });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <BackButton navigation={this.props.navigation} />
          <View style={styles.header}>
            <Text style={Typography.FONT_H3_BLACK}>Choose Restaurant</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={[styles.searchBar, { marginTop: 20 }]}>
            <TouchableOpacity value={this.state.searchWord}>
              <Icon name={"search"} size={22} color={Colors.PINK} />
            </TouchableOpacity>
            <TextInput
              style={[Typography.FONT_INPUT, styles.textInput]}
              placeholder="Search..."
              placeholderTextColor={Colors.GRAY_MEDIUM}
              onChangeText={this.updateSearchText}
              value={this.state.searchWord}
              onSubmitEditing={() => this.getSearchResult()}
            />
          </View>
        </View>
        <View style={styles.resultList}>
          <SafeAreaView>
            <FlatList
              data={
                this.state.searchResult
                  ? this.state.searchResult
                  : this.state.restaurants
              }
              extraData={this.state}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.setSelected(item.restaurantID)}
                  style={{
                    backgroundColor:
                      this.state.selected === item.restaurantID
                        ? Colors.TURQUOISE
                        : Colors.WHITE
                  }}
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
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.restaurantID}
            />
          </SafeAreaView>
        </View>
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          id={this.state.selected}
          view={"ReviewAddMenu"}
          text={"CONTINUE"}
          colorIndex={this.state.colorIndex}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1
  },
  resultList: {
    flex: 6
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 42,
    width: 240,
    borderBottomColor: Colors.PINK,
    borderBottomWidth: 1.5,
    marginLeft: 7
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  }
});
