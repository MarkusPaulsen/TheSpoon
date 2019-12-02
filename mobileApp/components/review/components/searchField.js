import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import Validate from "../../search/searchvalidation";

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: ""
    };
  }

  updateSearchText = searchWord => {
    this.setState({ searchWord });
  };

  render() {
    return (
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
          returnKeyType="search"
          autoFocus={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 60
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
  }
});
