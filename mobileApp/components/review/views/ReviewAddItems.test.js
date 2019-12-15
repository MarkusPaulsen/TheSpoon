import React from "react";
import { mount } from "enzyme";
import ReviewAddItems from "./ReviewAddItems";

const setUp = (props = {}) => {
  return mount(<ReviewAddItems {...props} />);
};

describe("Logged in - ReviewAddItems component", () => {
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
      ])
    );
    const instance = component.instance();
    await instance.componentDidMount();
    component.update();

    expect(component.state().token).toBe("0");
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
