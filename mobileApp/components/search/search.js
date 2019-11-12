import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  updateSearchText = search => {
    this.setState({ search: search });
  };

  onPress = () => {
    console.log("Hurra");
    console.log(this.state.search)
  };

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
          <TouchableOpacity onPress={this.onPress}>
            <Image source={require("../../assets/search.png")} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search..."
            value={this.state.search}
            onChangeText={this.updateSearchText}

            returnKeyType='search'
            autoFocus={true}

            onSubmitEditing={this.onPress}
            clearButtonMode="while-editing"
          />
        </View>
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
    flex: 5,
    //marginTop: 0,
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
