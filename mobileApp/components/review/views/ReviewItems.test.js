import React from "react";
import { mount } from "enzyme";
import ReviewItems from "./ReviewItems";

const setUp = (props = {}) => {
  return mount(<ReviewItems {...props} />);
};

describe("Review Items Component", () => {
  let component;

  beforeEach(() => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => {
        return defaultValue;
      },
      addListener: (param, func) => func()
    };
    component = setUp({ navigation });
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  it("ComponentDidMount", async () => {
    const instance = component.instance();
    await instance.componentDidMount();
    component.update();

    expect(component.state().token).toBe("0");
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
