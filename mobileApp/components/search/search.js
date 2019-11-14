import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import Validate from "./searchvalidation.js";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchError: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.validateSearch = this.validateSearch.bind(this);
  }

  updateSearchText = search => {
    this.setState({ search: search });
  };

  handleSearch() {
    console.log("Searching for: ", this.state.search);
  }

  validateSearch() {
    //console.log(this.state.search.toLowerCase());

    const searchError = Validate("search", this.state.search);

    this.setState({
      searchError: searchError
    });

    if (!searchError) {
      this.handleSearch();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.bigText}>What</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.smallTextBlack}>do you want to </Text>
            <Text style={styles.smallTextPink}>eat </Text>
            <Text style={styles.smallTextBlack}>today </Text>
          </View>
        </View>
        <View style={styles.searchBar}>
          <TouchableOpacity
            value={this.state.search}
            onPress={this.validateSearch}
          >
            <Image source={require("../../assets/search.png")} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search..."
            onChangeText={this.updateSearchText}
            value={this.state.search}
            returnKeyType="search"
            autoFocus={true}
            onSubmitEditing={this.validateSearch}
            clearButtonMode="while-editing"
            onBlur={() => {
              this.setState({
                searchError: Validate("search", this.state.search)
              });
            }}
            error={this.state.searchError}
          />
        </View>
        <Text style={{ color: "#F3A3A3", justifyContent: "center" }}>
          {this.state.searchError ? "Too short/long search text" : null}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginLeft: 70
  },
  bigText: {
    fontFamily: "Roboto",
    fontSize: 40,
    color: "#F3A3A3"
  },
  smallTextBlack: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#000000"
  },
  smallTextPink: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#F3A3A3"
  },
  text: {
    flexDirection: "column",
    flex: 1,
    marginTop: 100
  },
  searchBar: {
    flex: 1,
    //marginTop: 0,
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
