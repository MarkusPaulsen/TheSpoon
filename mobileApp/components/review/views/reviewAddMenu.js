import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import * as Typography from "../../../styles/typography";
import ContinueButton from "../components/continueButton";
import BackButton from "../components/backButton";

export default class ReviewAddMenu extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      disableButton: false,
      selected: null,
      backgroundColor: "#FFFFFF",
      colorIndex: 2,
      menus: "",
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const restaurantID = navigation.getParam("id", "000");
    await this.getMenus(restaurantID);
  };

  async getMenus(restaurantID) {
    try {
      const backendStubURL = `http://192.168.1.110:8080/api/user/customer/review/restaurant/${restaurantID}/menu`;
      const response = await fetch(backendStubURL, {
        method: "GET",
        accept: "application/json"
      });
      const responseJson = await response.json();
      const menus = responseJson.map(index => ({
        menuID: index.menuID.toString(),
        menuName: index.name
      }));
      this.setState({ menus });
    } catch (e) {
      console.log("ERROR fetching menus", e);
    }
  }

  onClick(menuID) {
    this.setState({ backgroundColor: "#A5DED0", selected:menuID });
    console.log(this.state.backgroundColor, menuID);
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
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => this.onClick(item.menuID)}
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
                  {item.menuName}
                </Text>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.menuID}
          />
        </View>
        <ContinueButton
          disableButton={this.state.disableButton}
          navigation={this.props}
          menuID={this.state.selected}
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
