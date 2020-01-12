import React from "react";
import { mount } from "enzyme";
import ReviewItems from "./ReviewItems";
import { AsyncStorage as storage } from "react-native";

const setUp = (props = {}) => {
  return mount(<ReviewItems {...props} />);
};

const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

describe("Review Items Component", () => {
  let component;

  beforeEach(async() => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => {
        return defaultValue;
      },
      addListener: (param, func) => func()
    };
    await storage.setItem("userToken", userToken);
    component = setUp({ navigation });
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  it("ComponentDidMount", async () => {
    const instance = component.instance();
    await instance.componentDidMount();
    await component.update();

    expect(component.state().token).toBe(userToken);
    expect(component.state().menuItems).toBe("no-values");
    expect(component.state().imageID).toBe("0");
    expect(component.state().menuID).toBe("00");
    expect(component.state().menuName).toBe("no-menu");
    expect(component.state().restaurant).toBe("no-restaurant");
  });

  it("Should update menuitem text", () => {
    const text = "This is a text";
    const item = {
      menuItemID: "1",
      menuItemName: "item1",
      rating: null,
      content: ""
    };

    component.setState({
      menuItems: [
        item,
        {
          menuItemID: "2",
          menuItemName: "item2",
          rating: null,
          content: ""
        }
      ]
    });
    component.update();

    component.instance().onChangeText(text, item);
    component.update();

    expect(component.state().menuItems).toEqual([
      { menuItemID: "1", menuItemName: "item1", rating: null, content: text },
      { menuItemID: "2", menuItemName: "item2", rating: null, content: "" }
    ]);
  });

  it("Should update menuitem rating", () => {
    const rating = 4;
    const item = {
      menuItemID: "1",
      menuItemName: "item1",
      rating: null,
      content: ""
    };

    component.setState({
      menuItems: [
        item,
        {
          menuItemID: "2",
          menuItemName: "item2",
          rating: null,
          content: ""
        }
      ]
    });

    component.update();

    component.instance().setRatingCount(rating, item);
    component.update();

    expect(component.state().menuItems).toEqual([
      { menuItemID: "1", menuItemName: "item1", rating: rating, content: "" },
      { menuItemID: "2", menuItemName: "item2", rating: null, content: "" }
    ]);
  });

  it("Should enable continue-button", () => {
    const rating = 4;
    const item = {
      menuItemID: "1",
      menuItemName: "item1",
      rating: null,
      content: ""
    };
    const item2 = {
      menuItemID: "2",
      menuItemName: "item2",
      rating: null,
      content: ""
    };

    component.setState({
      menuItems: [item, item2]
    });

    component.update();

    component.instance().setRatingCount(rating, item);
    component.update();
    expect(component.state().disableButton).toBeTruthy();

    component.instance().setRatingCount(rating, item2);
    component.update();
    expect(component.state().disableButton).toBeFalsy();
  });
});
