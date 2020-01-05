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
      }
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
    const itemID = "1";

    component.setState({
      menuItems: [
        {
          menuItemID: "1",
          menuItemName: "item1",
          rating: null,
          content: ""
        },
        {
          menuItemID: "2",
          menuItemName: "item2",
          rating: null,
          content: ""
        }
      ]
    });
    component.update();

    component.instance().onChangeText(text, item, itemID);
    component.update();

    expect(component.state().menuItems).toEqual([
      { menuItemID: "2", menuItemName: "item2", rating: null, content: "" },
      { menuItemID: "1", menuItemName: "item1", rating: null, content: text }
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
    const itemID = "1";

    component.setState({
      menuItems: [
        {
          menuItemID: "1",
          menuItemName: "item1",
          rating: null,
          content: ""
        },
        {
          menuItemID: "2",
          menuItemName: "item2",
          rating: null,
          content: ""
        }
      ]
    });

    component.update();

    component.instance().setRatingCount(rating, item, itemID);
    component.update();

    expect(component.state().menuItems).toEqual([
      { menuItemID: "2", menuItemName: "item2", rating: null, content: "" },
      { menuItemID: "1", menuItemName: "item1", rating: rating, content: "" }
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
    const itemID = "1";

    component.setState({
      menuItems: [
        {
          menuItemID: "1",
          menuItemName: "item1",
          rating: null,
          content: ""
        },
        {
          menuItemID: "2",
          menuItemName: "item2",
          rating: null,
          content: ""
        }
      ],
      reviewedScores: [
        {
          menuItemID: "2",
          menuItemName: "item2",
          rating: null,
          content: ""
        }
      ]
    });

    component.update();

    component.instance().setRatingCount(rating, item, itemID);
    component.update();
    expect(component.state().disableButton).toBeFalsy();
  });
});
