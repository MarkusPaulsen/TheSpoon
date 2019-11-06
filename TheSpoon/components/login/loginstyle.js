const React = require("react-native");
const { Stylesheet } = React;
export default {
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  text: {
    fontSize: 48,
    marginTop: 204
    //alignSelf: "center"
  },
  textInput: {
    width: 224,
    height: 42,
    color: "#000000",
    fontFamily: "roboto",
    borderBottomColor: "#F3A3A3",
    borderBottomWidth: 1.5,
    //marginTop: 99,
    alignSelf: "center"
  },
  loginButton: {
    width: 203,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#F3A3A3",
    marginTop: 6,
    alignSelf: "center"
  },
  registrationButton: {
    //width: 100,
    //height: 36,
    color: "#A5DED0"
    //marginTop: 45,
    //alignSelf: "center"
  },
  registration: {
    //textAlign: 'center',
    //justifyContent: 'space-around',
    flexDirection: "row"
  },
  buttonText: {
    color: "#000000",
    alignSelf: "center",
    marginTop: 9
  }
};
