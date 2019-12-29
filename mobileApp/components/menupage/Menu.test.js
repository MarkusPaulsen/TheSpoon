import React from "react";
import { mount } from "enzyme";
import Menu from "./Menu";

const setUp = (props = {}) => {
  const component = mount(<Menu {...props} />);
  return component;
};

const menuInfo = {
  id: "000",
  restaurantName: "default value",
  menuName: "menuName",
  menuDescription: "description",
  tags: [{ name: "italian", color: "#00000" }],
  score: 5
};

const respMenuInfo = {
  menuName: "menuName",
  description: "description",
  tags: [{ name: "italian", color: "#00000" }],
  menuRating: 5
};

const respMenuItems = [
  {
    menuItemID: 2,
    name: "menuItemName2",
    description: "description",
    priceEuros: "14",
    imageLink: "imageLink",
    tags: [{ name: "italian", color: "#00000" }],
    rating: "4.6",
    type: "dish"
  },
  {
    menuItemID: 3,
    name: "menuItemName3",
    description: "description",
    priceEuros: "14",
    imageLink: "imageLink",
    tags: [{ name: "italian", color: "#00000" }],
    rating: "4.6",
    type: "drink"
  }
];

const respRestInfo = {
  latitude: "45.4688346",
  longitude: "9.2234114",
  address: "Address",
  city: "Milan",
  country: "Italy"
};

const restaurantInfo = {
  latitude: 45.4688346,
  longitude: 9.2234114,
  address: "Address",
  city: "Milan",
  country: "Italy"
};

const response = {
  ...respMenuInfo,
  menuItems: respMenuItems,
  restaurant: respRestInfo
};

const dishItems = [
  {
    id: "2",
    menuItemName: "menuItemName2",
    menuItemDescription: "description",
    priceEuros: "14",
    menuItemImage: "imageLink",
    tags: [{ name: "italian", color: "#00000" }],
    score: "4.6",
    type: "dish"
  }
];

const drinkItems = [
  {
    id: "3",
    menuItemName: "menuItemName3",
    menuItemDescription: "description",
    priceEuros: "14",
    menuItemImage: "imageLink",
    tags: [{ name: "italian", color: "#00000" }],
    score: "4.6",
    type: "drink"
  }
];

// Mock Maps
jest.mock("react-native-maps", () => {
  const React = require.requireActual("react");
  const MapView = require.requireActual("react-native-maps");

  class MockCallout extends React.Component {
    render() {
      return React.createElement("Callout", this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement("Marker", this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement("MapView", this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
});

describe("Menu Component", () => {
  let component;

  beforeEach(() => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => {
        return defaultValue;
      }
    };

    // Mock the functions called in componentDidMount
    jest
      .spyOn(Menu.prototype, "getMenuItem")
      .mockImplementationOnce(() => Promise.resolve());

    component = setUp({ navigation: navigation });
    jest.useFakeTimers();
  });

  it("Should render without errors", () => {
    const wrapper = component.find("SafeAreaView");
    expect(wrapper.first().length).toBe(1);
  });

  it("ComponentDidMount", async () => {
    fetch.mockResponseOnce(JSON.stringify(response));

    await component.instance().componentDidMount();
    component.update();

    expect(component.state().menuInfo).toEqual(menuInfo);
    expect(component.state().dishItems).toEqual(dishItems);
    expect(component.state().drinkItems).toEqual(drinkItems);
    expect(component.state().restaurantInfo).toEqual(restaurantInfo);
    expect(component.state().isLoading).toBeFalsy();
  });

  it("Should render dish items when they exists", () => {
    component.setState({
      dishItems
    });

    const dishesHeading = component.findWhere(
      node => node.prop("testID") === "dishesHeading" && node.type() === "Text"
    );

    expect(dishesHeading.text()).toBe("DISHES");

    const dishes = component.find("MenuItem");

    expect(dishes.length).toBe(1);
  });

  it("Should render drink items when they exists", () => {
    component.setState({
      drinkItems
    });

    const drinksHeading = component.findWhere(
      node => node.prop("testID") === "drinksHeading" && node.type() === "Text"
    );
    expect(drinksHeading.text()).toBe("DRINKS");

    const drinks = component.find("MenuItem");

    expect(drinks.length).toBe(1);
  });

  it("Should not render map while loading", () => {
    expect(component.state().isLoading).toBeTruthy();

    const map = component.find("MapView");

    expect(map.length).toBe(0);
  });

  it("Should render map when not loading", () => {
    component.setState({
      restaurantInfo,
      isLoading: false
    });

    const map = component.find("MapView");

    expect(map.length).toBe(1);
  });

  it("Should render correct info about menu", () => {
    component.setState({
      menuInfo
    });

    const menuName = component.findWhere(
      node => node.prop("testID") === "menuName" && node.type() === "Text"
    );

    expect(menuName.text()).toBe(menuInfo.menuName);

    const restaurantName = component.findWhere(
      node => node.prop("testID") === "restaurantName" && node.type() === "Text"
    );

    expect(restaurantName.text()).toBe(menuInfo.restaurantName);

    const description = component.findWhere(
      node =>
        node.prop("testID") === "menuDescription" && node.type() === "Text"
    );

    expect(description.text()).toBe(menuInfo.menuDescription);
  });
});
