import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import ContinueButton from "../components/continueButton";
import SearchField from "../components/searchField";
import BackButton from "../components/backButton";

export default class ReviewAddRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      selected: null,
      colorIndex: 1,
      backgroundColor: null,
      restaurants: "",
      test: "123"
    };
  }
  componentDidMount = async () => {
    await this.getAllMenus();
  };

  async getAllMenus() {
    try {
      const backendStubURL = `http://192.168.1.103:8080/api/user/customer/review/restaurant`;
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

  setSelected(id){
    this.setState({selected: id});
    this.setState({disableButton: false});
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
          <SafeAreaView>
            <FlatList
              data={this.state.restaurants}
              extraData={this.state}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.setSelected(item.restaurantID)}
                  style={{

                    backgroundColor: this.state.selected === item.restaurantID ? Colors.TURQUOISE : Colors.WHITE
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
  }
});
