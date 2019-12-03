import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet, AsyncStorage
} from "react-native";
import * as Typography from "../../styles/typography";
import * as Colors from "../../styles/colors";
import LoginScreen from "../login/login";

export default class Review extends Component {
  constructor(props){
    super(props);
    this.state = {
    loggedIn: false,
  }
  }

  componentDidMount = async () =>{
    AsyncStorage.getItem('userToken').then((token) => {
      this.setState({ loggedIn: token !== null })
    });
    const {navigation} = this.props;
    //this.setState({loggedIn:navigation.getParam("username", "false")});
  };
//        {this.state.loggedIn ?  <Text>Welcome to your profile {this.state.username}</Text> : this.props.navigation.navigate("Login", {"previousPage":"Profile"})}
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.loggedIn ?  <Text>Welcome to your profile {this.state.username}</Text> : <LoginScreen/>}

      </ScrollView>
    );
  }
}

      const styles = StyleSheet.create({
      container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center"
    }
    });
