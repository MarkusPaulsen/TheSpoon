
const React = require("react-native");

const { Stylesheet } = React;

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  loginButton: {
    width: 203,
    height: 38,
    backgroundColor: "#F3A3A3",
    marginTop: 6,
    alignSelf: "center",
    borderRadius: 20, 
  }, 
  signupButton: {
    width: 203,
    height: 38,
    backgroundColor: "#A5DED0",
    marginTop: 6,
    alignSelf: "center",
    borderRadius: 20, 
  }, 
  smallText: {
    color: "#000000",
    alignSelf: "center", 
    marginTop: 9
  }, 
  buttons: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};
