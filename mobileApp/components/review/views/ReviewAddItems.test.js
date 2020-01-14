import React from "react";
import { mount } from "enzyme";
import ReviewAddItems from "./ReviewAddItems";
import { AsyncStorage as storage } from "react-native";

const setUp = (props = {}) => {
  return mount(<ReviewAddItems {...props} />);
};

const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

describe("Logged in - ReviewAddItems component", () => {
  let component;

  beforeEach(async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => {
        return defaultValue;
      },
      addListener: (param, func) => func()
    };

    await storage.setItem("userToken", userToken);

    // Mock the functions called in componentDidMount
    jest
      .spyOn(ReviewAddItems.prototype, "getMenuItems")
      .mockImplementationOnce(() => Promise.resolve());

    component = setUp({ navigation });
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  it("ComponentDidMount", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          menuItemID: 1,
          name: "name1"
        },
        {
          menuItemID: 2,
          name: "name2"
        },
        {
          menuItemID: 3,
          name: "name3"
        }
      ]),
      { status: 200, ok: true }
    );
    const instance = component.instance();
    await instance.componentDidMount();
    await component.update();

    expect(component.state().token).toBe(userToken);
    expect(component.state().menuID).toBe("000");
    expect(component.state().menuName).toBe("no-menu");
    expect(component.state().imageID).toBe("0");
    expect(component.state().restaurant).toBe("no-restaurant");

    expect(component.state().menuItems).toEqual([
      {
        menuItemID: "1",
        menuItemName: "name1"
      },
      {
        menuItemID: "2",
        menuItemName: "name2"
      },
      {
        menuItemID: "3",
        menuItemName: "name3"
      }
    ]);
  });

  it("Should select correct item", () => {
    component.setState({ selectedMenuItems: [] });
    const id = "2";
    const itemName = "item2";
    component.instance().setSelected(id, itemName);
    component.update();

    expect(component.state().selectedMenuItems).toContainEqual({
      menuItemID: id,
      menuItemName: itemName,
      rating: null,
      content: ""
    });
  });

  it("Should deselect correct item", () => {
    const id = "2";
    const itemName = "item2";
    component.setState({
      selectedMenuItems: [
        { menuItemID: id, menuItemName: itemName, rating: null, content: "" },
        { menuItemID: "3", menuItemName: "item3", rating: null, content: "" }
      ]
    });
    component.instance().setSelected(id, itemName);
    component.update();

    expect(component.state().selectedMenuItems).toEqual([
      {
        menuItemID: "3",
        menuItemName: "item3",
        rating: null,
        content: ""
      }
    ]);
  });

  it("Should disable continue-button", () => {
    const id = "2";
    const itemName = "item2";
    component.setState({
      selectedMenuItems: [
        { menuItemID: id, menuItemName: itemName, rating: null, content: "" }
      ]
    });
    component.instance().setSelected(id, itemName);
    component.update();

    expect(component.state().disableButton).toBeTruthy();
  });
});
