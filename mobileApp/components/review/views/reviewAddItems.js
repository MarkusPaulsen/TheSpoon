import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import * as Typography from "../../../styles/typography";
import BackButton from "../components/backButton";
import ContinueButton from "../components/continueButton";

export default class ReviewAddItems extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      disableButton: false,
      selected: null,
      menuItemName: null,
      backgroundColor: "#FFFFFF",
      menuItems: "",
      selectedMenuItems: []
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const menuID = navigation.getParam("id", "000");
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
        menuItemID: index.menuID.toString(),
        menuItemName: index.name
      }));
      this.setState({ menuItems });
    } catch (e) {
      console.log("ERROR fetching menuItems", e);
    }
  }

  onClick(menuItemID, menuItemName) {
    this.setState({
      backgroundColor: "#A5DED0",
      selected: menuItemID,
      menuItemName
    });
    this.state.selectedMenuItems.push({menuItemID:menuItemID, menuItemName: menuItemName});
    console.log(this.state.backgroundColor, menuItemID);
  }

  render() {
    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
          <Text style={Typography.FONT_H3_BLACK}>What did you eat/drink?</Text>
        </View>
        <View style={styles.resultList}>
          <FlatList
            data={this.state.menuItems}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => this.onClick(item.menuItemID, item.menuItemName)}
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
                  {item.menuItemName}
                </Text>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.menuItemID}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <ContinueButton
            disableButton={this.state.disableButton}
            navigation={this.props}
            menuItems={this.state.selectedMenuItems}
            id={this.state.selected}
            view={"ReviewItems"}
            text={"CONTINUE"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1
  },
  resultList: {
    height: 200,
    flex: 4
  }
});
