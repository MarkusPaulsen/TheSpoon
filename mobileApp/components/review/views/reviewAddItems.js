import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import * as Typography from "../../../styles/typography";
import BackButton from "../components/backButton";
import ContinueButton from "../components/continueButton";
import * as Colors from "../../../styles/colors";

export default class ReviewAddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      menuItemName: null,
      backgroundColor: "#FFFFFF",
      colorIndex: 3,
      menuItems: "",
      imageID: null,
      menuID: null,
      menuName: null,
      restaurant: null,
      selectedMenuItems: []
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const menuID = navigation.getParam("menuID", "000");
    const menuName = navigation.getParam("menuName", "no-menu");
    const imageID = navigation.getParam("imageID", "0");
    const restaurant = navigation.getParam("restaurant", "no-restaurant");
    this.setState({ imageID, menuID, menuName, restaurant });
    await this.getMenuItems(menuID);
  };

  async getMenuItems(menuID) {
    try {
      const backendStubURL = `http://192.168.1.110:8080/api/user/customer/review/restaurant/menu/${menuID}/menuItem`;
      const response = await fetch(backendStubURL, {
        method: "GET",
        accept: "application/json"
      });
      const responseJson = await response.json();
      const menuItems = responseJson.map(index => ({
        menuItemID: index.menuItemID.toString(),
        menuItemName: index.name
      }));
      this.setState({ menuItems });
    } catch (e) {
      console.log("ERROR fetching menuItems", e);
    }
  }

  setSelected(id, name) {
    if (this.state.selectedMenuItems.some(e => e.menuItemID === id)) {
      this.setState(state => {
        const selectedMenuItems = state.selectedMenuItems.filter(
          e => e.menuItemID !== id
        );
        return {
          selectedMenuItems
        };
      });
      if (this.state.selectedMenuItems.length === 0) {
        this.setState({ disableButton: true });
      }
    } else {
      this.setState(state => {
        const selectedMenuItems = state.selectedMenuItems.concat({
          menuItemID: id,
          menuItemName:name,
          rating: null,
          content: ""
        });
        return {
          selectedMenuItems
        };
      });
      this.setState({ disableButton: false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <BackButton navigation={this.props.navigation} />
          <View style={styles.header}>
            <Text style={Typography.FONT_H3_BLACK}>
              What did you eat/drink?
            </Text>
          </View>
        </View>
        <View style={styles.resultList}>
          <FlatList
            data={this.state.menuItems}
            extraData={this.state}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: this.state.selectedMenuItems.some(
                    e => e.menuItemID === item.menuItemID
                  )
                    ? Colors.TURQUOISE
                    : Colors.WHITE
                }}
                onPress={() =>
                  this.setSelected(item.menuItemID, item.menuItemName)
                }
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
                  {item.menuItemName}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.menuItemID}
          />
        </View>
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          menuItems={this.state.selectedMenuItems}
          imageID={this.state.imageID}
          menuID={this.state.menuID}
          menuName={this.state.menuName}
          restaurant={this.state.restaurant}
          view={"ReviewItems"}
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
