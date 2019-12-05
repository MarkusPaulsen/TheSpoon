import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import ContinueButton from "../components/continueButton";
import SearchField from "../components/searchField";
import BackButton from "../components/backButton";

export default class ReviewAddRestaurant extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      disableButton: false,
      selected: null,
      colorIndex: 1,
      backgroundColor: "#FFFFFF",
      restaurants: ""
    };
  }
  componentDidMount = async () => {
    await this.getAllMenus();
  };

  async getAllMenus() {
    try {
      const backendStubURL = `http://192.168.1.110:8080/api/user/customer/review/restaurant`;
      const response = await fetch(backendStubURL, {
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

  onClick(restaurantID){
    this.setState({ backgroundColor: "#A5DED0" });
    this.setState({selected: restaurantID});
    console.log(this.state.backgroundColor);
  };

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
          <SearchField style={{ marginBottom: 20 }} />
        </View>
        <View style={styles.resultList}>
          <FlatList
            data={this.state.restaurants}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => this.onClick(item.restaurantID)}
                underlayColor={"#A5DED0"}
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
              </TouchableHighlight>
            )}
            keyExtractor={item => item.restaurantID}
          />
        </View>
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          view={"ReviewAddMenu"}
          id={this.state.selected}
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
    flex: 5
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});
