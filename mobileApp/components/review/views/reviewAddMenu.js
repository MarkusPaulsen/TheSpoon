import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import * as Typography from "../../../styles/typography";
import ContinueButton from "../components/continueButton";
import BackButton from "../components/backButton";
import * as Colors from "../../../styles/colors";

export default class ReviewAddMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      selected: null,
      menuName: null,
      restaurant: null,
      imageID: null,
      backgroundColor: "#FFFFFF",
      colorIndex: 2,
      menus: "",
      token: null
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const token = navigation.getParam("token", "0");
    const restaurantID = navigation.getParam("id", "000");
    const restaurant = navigation.getParam("restaurant", "no-restaurant");
    const imageID = navigation.getParam("imageID", "0");
    this.setState({ restaurant, imageID, token });
    await this.getMenus(restaurantID, token);
  };

  async getMenus(restaurantID, token) {
    try {
      const STUB_GET_MENUS = `http://192.168.1.110:8080/api/user/customer/review/restaurant/${restaurantID}/menu`;
      const SERVER_GET_MENUS = `https://thespoon.herokuapp.com/api/user/customer/review/restaurant/${restaurantID}/menu`;

      const response = await fetch(SERVER_GET_MENUS, {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-auth-token": JSON.parse(token)
        }
      });
      const responseJson = await response.json();
      const menus = responseJson.map(index => ({
        menuID: index.menuID.toString(),
        menuName: index.name
      }));
      if (response.ok) {
        this.setState({ menus });
      }
      if (!response.ok) {
        console.log("Fetching menus failed");
      }
    } catch (e) {
      console.log("ERROR fetching menus", e);
    }
  }

  setSelected(id, menuName) {
    this.setState({ selected: id, menuName: menuName });
    this.setState({ disableButton: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <BackButton navigation={this.props.navigation} />
          <View style={styles.header}>
            <Text style={Typography.FONT_H3_BLACK}>Choose Menu</Text>
          </View>
        </View>
        <View style={styles.resultList}>
          <FlatList
            data={this.state.menus}
            extraData={this.state}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    this.state.selected === item.menuID
                      ? Colors.TURQUOISE
                      : Colors.WHITE
                }}
                onPress={() => this.setSelected(item.menuID, item.menuName)}
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
                  {item.menuName}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.menuID}
          />
        </View>
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          menuID={this.state.selected}
          menuName={this.state.menuName}
          token={this.state.token}
          imageID={this.state.imageID}
          restaurant={this.state.restaurant}
          view={"ReviewAddItems"}
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
