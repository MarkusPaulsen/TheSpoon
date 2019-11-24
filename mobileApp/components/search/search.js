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
  Keyboard
} from "react-native";
import Validate from "./searchvalidation.js";
import { TouchableWithoutFeedback } from "react-native-web";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";

function ResultItem({ menuName, restaurantName, tag1, tag2, score }) {
  return (
    <View style={styles.resultsItem}>
      <View style={styles.imageBox}>
        <Image
          source={require("../../assets/no_image.png")}
          style={{ width: 322, height: 137, justifyContent: "center" }}
        />
      </View>
      <View style={styles.menuInfo}>
        <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
          <Text style={Typography.FONT_H4_BLACK}>{menuName}</Text>
          <Text style={Typography.FONT_SMALL_BLACK}>{" by "}</Text>
          <Text style={Typography.FONT_SMALL_PINK}>{restaurantName}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.bgLabel}>
              <Text style={[Typography.FONT_TAG, { marginHorizontal: 10 }]}>{tag1}</Text>
            </View>
            <View style={styles.bgLabel}>
              <Text style={[Typography.FONT_TAG, { marginHorizontal: 10 }]}>{tag2}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Image source={require("../../assets/icon-star.png")} />
            <Text style={Typography.FONT_SMALL_BLACK}>{score}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      searchError: "",
      searchResults: null,
      searched: false
    };
    this.validateSearch = this.validateSearch.bind(this);
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord, searched: false });
  };

  async validateSearch() {
    Keyboard.dismiss();
    const searchError = Validate("search", this.state.searchWord);
    this.setState({ searched: true });

    if (!searchError) {
      await this.getResults();
    } else {
      this.setState({ searchError, searchResults: null });
    }
  }
  async getResults() {
    try {
      const searchString = this.state.searchWord;
      //change to port 80 if not using the stub
      const response = await fetch(
        "http://192.168.1.101:8080/api/user/customer/menu/searchByMenuItem?menuItemName={searchString}",
        {
          method: "GET",
          accept: "application/json"
        }
      );
      const responseJson = await response.json();
      if (response.ok) {
        const searchResults = responseJson.map(index => ({
          menuId: index.menu.menuID.toString(),
          menuName: index.menu.name,
          restaurantName: index.restaurantData.restaurantName,
          // TODO: Handle number of tags
          tag1: index.menu.tags[0]["name"],
          tag2: index.menu.tags[1]["name"],
          // TODO: Add right rating-score
          score: index.menu.rating
        }));
        this.setState({ searchResults });
      }
      if (!response.ok) {
        this.setState({ searchResults: null });
        // TODO: Add error message
      }
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={Typography.FONT_H2_PINK}>What</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={Typography.FONT_H4_BLACK}>do you want to </Text>
              <Text style={Typography.FONT_H4_PINK}>eat </Text>
              <Text style={Typography.FONT_H4_BLACK}>today </Text>
            </View>
          </View>
          <View style={[styles.searchBar, { marginTop: 20 }]}>
            <TouchableOpacity
              value={this.state.searchWord}
              onPress={this.validateSearch}
            >
              <Image
                source={require("../../assets/search.png")}
                style={{ alignSelf: "center", marginTop: 10 }}
              />
            </TouchableOpacity>
            <TextInput
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
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item);
                        this.props.navigation.navigate("Menu", {
                          menuId: item.menuId,
                          restaurantName: item.restaurantName
                        });
                      }}
                    >
                      <ResultItem
                        menuId={item.menuId}
                        menuName={item.menuName}
                        restaurantName={item.restaurantName}
                        tag1={item.tag1}
                        tag2={item.tag2}
                        score={item.score}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.menuId}
                />
              </SafeAreaView>
            ) : null}
            {this.state.searched && !this.state.searchResults ? (
              <View style={styles.noResult}>
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
    marginLeft: 40
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
    marginLeft: 40
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
    height: 203,
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
    width: 60,
    height: 15,
    backgroundColor: "#7DC0FE",
    borderRadius: 5,
    marginRight: 4
  },
  imageBox: {
    width: 322,
    height: 137
  }
});
