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

let resultsData = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    menuName: "Lunch Menu",
    restaurantName: "Pizzeria AUUM",
    tag1: "Italian",
    tag2: "Pizza",
    score: "4.6"
  }
];

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
      search: "",
      searchError: "",
      searchResults: "",
      noSearch: true,
      searchResultsFound: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.validateSearch = this.validateSearch.bind(this);
  }

  updateSearchText = search => {
    this.setState({ search: search });
    this.setState({ noSearch: false });
  };

  handleSearch() {
    console.log("Searching for: ", this.state.search);
    this.setState({ searchResultsFound: true });
    this.getResults();
  }

  validateSearch() {
    //console.log(this.state.search.toLowerCase());

    const searchError = Validate("search", this.state.search);

    this.setState({
      searchError: searchError
    });
    this.setState({ searchResultsFound: false });

    if (!searchError) {
      this.handleSearch();
    }
  }
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
            value={this.state.search}
            onPress={this.validateSearch && Keyboard.dismiss}
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
            value={this.state.search}
            returnKeyType="search"
            autoFocus={true}
            onSubmitEditing={this.validateSearch}
            onBlur={() => {
              this.setState({
                searchError: Validate("search", this.state.search)
              });
            }}
            error={this.state.searchError}
          />
        </View>
        <View style={{ flex: 5 }}>
          <View style={styles.noResult}>
            <View>
              {this.state.searchError ? (
                <Image source={require("../../assets/noresults.png")} />
              ) : null}
            </View>
            <Text
              style={{
                color: "#686B6F",
                textAlign: "center",
                fontFamily: "roboto",
                marginTop: 70
              }}
            >
              {this.state.searchError ? (
                <Text> We can't find what you are {"\n"} looking for...</Text>
              ) : null}
            </Text>
          </View>
          <View style={{ justifyContent: "flex-start" }}>
            <SafeAreaView style={styles.containerResults}>
              {this.state.searchResultsFound ? (
                <FlatList
                  data={resultsData}
                  renderItem={({ item }) => (
                    <ResultItem
                      menuName={item.menuName}
                      restaurantName={item.restaurantName}
                      tag1={item.tag1}
                      tag2={item.tag2}
                      score={item.score}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              ) : null}
            </SafeAreaView>
          </View>
        </View>
      </View>
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
    marginTop: 100,
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
    alignItems: "flex-start",
    marginLeft: 40,
    marginTop: 20
  },
  noResult: {
    marginTop: 30,
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
