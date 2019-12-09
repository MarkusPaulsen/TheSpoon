import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import * as Typography from "../../../styles/typography";
import * as Colors from "../../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import ContinueButton from "../components/continueButton";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { connectActionSheet } from "@expo/react-native-action-sheet";

class ReviewAddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      imageUrl: null,
      colorIndex: 0,
      loggedIn: false,
      isLoaded: false
    };
  }
  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      AsyncStorage.getItem("userToken").then(token => {
        this.setState({ loggedIn: token !== null, isLoaded: true });
      });
    });
  };
  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    if (!this.state.isLoaded) {
      return <ActivityIndicator />;
    }
    if (this.state.isLoaded) {
      if (this.state.loggedIn) {
        let { imageUrl } = this.state;

        return (
          <View style={styles.container}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={Typography.FONT_H2_BLACK}>Write </Text>
              <Text style={Typography.FONT_H2_PINK}>Review</Text>
            </View>
            <View style={{ flex: 3 }}>
              {imageUrl ? (
                <TouchableOpacity
                  onPress={() => this._onOpenActionSheet()}
                  activeOpacity={0.3}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      width: 250,
                      height: 350,
                      alignSelf: "center",
                      marginTop: 30
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => this._onOpenActionSheet()}
                    activeOpacity={0.3}
                    style={{ alignItems: "center" }}
                  >
                    <View style={styles.imageBox}>
                      <Icon name="add-a-photo" size={52} color={Colors.WHITE} />
                    </View>
                  </TouchableOpacity>
                  <View style={{ alignItems: "center" }}>
                    <Text style={Typography.FONT_H4_BLACK}>
                      Upload a picture of the receipt
                    </Text>
                    <Text style={Typography.FONT_MED_GRAY}>
                      We use this to confirm the review
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <ContinueButton
              disableButton={this.state.disableButton}
              navigation={this.props}
              view={"ReviewAddRestaurant"}
              text={"CONTINUE"}
              colorIndex={this.state.colorIndex}
            />
          </View>
        );
      }
      if (!this.state.loggedIn) {
        return (
          <View style={styles.container}>
            <Text style={Typography.FONT_H4_BLACK}>
              You need to log in to write a review
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <Text style={Typography.FONT_H4_PINK}>Click here to log in</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }

  _onOpenActionSheet = () => {
    const options = ["Take a picture", "Choose from Library", "Cancel"];
    const cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      async buttonIndex => {
        if (buttonIndex === 0) {
          await this.onTakePicturePress();
          console.log("take photo");
        } else if (buttonIndex === 1) {
          await this.onChooseLibraryPress();
          console.log("choose photo");
        }
      }
    );
  };

  onTakePicturePress = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== "granted") {
      alert(
        "Sorry, we need camera and camera roll permission to make this work!"
      );
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ imageUrl: result.uri });
      this.postImage();
      this.setState({ disableButton: false });
    }
  };
  createFormData = imageUrl => {
    let uriParts = imageUrl.split('.');
    let fileType = uriParts[uriParts.length -1];
    const data = new FormData();
    data.append("photo", { name: `imageUrl.${fileType}`, type: `image/${fileType}`, uri: imageUrl});
    return data;
  };

  async postImage() {
    try {
      const url = `http://192.168.1.110:8080/api/image`;
      const data = this.createFormData(this.state.imageUrl);
      console.log(data);
      const response = await fetch(url, {
        method: "POST",
        body: this.createFormData(this.state.imageUrl),
        headers:{
          Accept:"application/json",
          'Content-Type':'multipart/form-data',
        },
      });
      console.log("RESPONSE: ", response);
      const responseText = await response.text();
      console.log("ResponseText: ", responseText);
      if (response.ok) {
        console.log("Image was posted successfully!");
        this.setState({ imageUrl: null });
        alert("Upload success!");
      }
      if (!response.ok) {
        console.log("Image posting failed");
        alert("Upload failed");
      }
    } catch (error) {
      console.log("Error posting image: ", error);
    }
  }

  onChooseLibraryPress = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permission to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1
    });

    console.log(result);
    if (!result.cancelled) {
      this.setState({ imageUrl: result.uri });
      this.postImage();
      this.setState({ disableButton: false });
    }
  };
}

const ConnectedReviewAddImage = connectActionSheet(ReviewAddImage);
export default ConnectedReviewAddImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 60
  },
  imageBox: {
    height: 100,
    width: 100,
    backgroundColor: Colors.TURQUOISE,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  }
});
