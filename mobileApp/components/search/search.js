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
          <Text style={styles.h4Black}>{menuName}</Text>
          <Text style={styles.smallTextBlack}>{" by "}</Text>
          <Text style={styles.smallTextPink}>{restaurantName}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.bgLabel}>
              <Text style={styles.label}>{tag1}</Text>
            </View>
            <View style={styles.bgLabel}>
              <Text style={styles.label}>{tag2}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Image source={require("../../assets/icon-star.png")} />
            <Text style={styles.smallTextBlack}>{score}</Text>
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
      this.getResults();
    } else {
      this.setState({ searchError, searchResults: null });
    }
  }
  async getResults() {
    try {
      const searchString = this.state.searchWord;
      //change to port 80 if not using the stub
      const response = await fetch(
        "http://192.168.1.110:8080/api/user/customer/menu/searchByMenuItem?menuItemName={searchString}",
        {
          method: "GET",
          accept: "application/json"
        }
      );
      const responseJson = await response.json();
      //console.log(responseJson);
      if (response.ok) {
        const searchResults = responseJson.map(index => ({
          menuId: index.menu.menuID.toString(),
          menuName: index.menu.name,
          restaurantName: index.restaurantData.restaurantName,
          // TODO: Handle number of tags
          tag1: index.menu.tags[0],
          tag2: index.menu.tags[1],
          // TODO: Add right rating-score
          score: "4.6"
        }));
        console.log("RESULTS",searchResults[0]["id"]);
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
            <Text style={styles.h2}>What</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.h4Black}>do you want to </Text>
              <Text style={styles.h4Pink}>eat </Text>
              <Text style={styles.h4Black}>today </Text>
            </View>
          </View>
          <View style={styles.searchBar}>
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
              style={styles.textInput}
              placeholder="Search..."
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
                              this.props.navigation.navigate('Menu', {
                                  menuId: item.menuId,
                                  restaurantName: item.restaurantName,
                              });}}>
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
                  style={{
                    color: "#686B6F",
                    textAlign: "center",
                    fontFamily: "roboto",
                    marginTop: 70
                  }}
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
    backgroundColor: "#FFFFFF"
  },
  containerResults: {
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  text: {
    flex: 1,
    marginTop: 60,
    marginLeft: 40
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
  textInput: {
    height: 42,
    color: "#000000",
    fontFamily: "roboto",
    width: 240,
    borderBottomColor: "#F3A3A3",
    borderBottomWidth: 1.5,
    marginLeft: 7,
    fontSize: 15
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
    backgroundColor: "#FFFFFF", // padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 20,
    width: 322,
    height: 203,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1
  },
  menuInfo: {
    marginLeft: 20,
    marginRight: 20
  },
  label: {
    fontFamily: "roboto",
    fontSize: 10,
    textAlign: "center",
    color: "#FFFFFF"
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
