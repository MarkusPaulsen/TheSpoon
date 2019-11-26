import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: 322,
    height: 190,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    bottom: 70
  },
  h3: {
    fontFamily: "roboto",
    //fontWeight: 500,
    fontSize: 24
  },
  h2: {
    fontFamily: "roboto",
    fontSize: 40,
    color: "#F3A3A3"
  },
  h4Black: {
    fontFamily: "roboto",
    fontSize: 18,
    color: "#000000"
  },
  h4Pink: {
    fontFamily: "roboto",
    fontSize: 18,
    color: "#F3A3A3"
  },
  smallTextBlack: {
    fontFamily: "roboto",
    fontSize: 12,
    color: "#000000"
  },
  smallTextPink: {
    fontFamily: "roboto",
    fontSize: 12,
    color: "#F3A3A3"
  },
  thinText: {
    bottom: "50",
    fontSize: 15,
    fontFamily: "roboto"
  },
  smallThinTextCenter: {
    fontSize: 10,
    textAlign: "center"
  },
  smallThinTextLeft: {
    fontSize: 10,
    textAlign: "left"
  },
  imageCircle: {
    width: 67,
    height: 67,
    borderRadius: 67 / 2
  }
});
