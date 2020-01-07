import React from "react";
import { mount } from "enzyme";
import ReviewAddMenu from "./ReviewAddMenu";
import { AsyncStorage as storage } from "react-native";

const setUp = (props = {}) => {
  return mount(<ReviewAddMenu {...props} />);
};

const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

describe("Review Add Menu Component", () => {
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
      .spyOn(ReviewAddMenu.prototype, "getMenus")
      .mockImplementationOnce(() => Promise.resolve());

    component = setUp({ navigation });
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  it("ComponentDidMount fetch successful", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          menuID: 1,
          name: "name1"
        },
        {
          menuID: 2,
          name: "name2"
        },
        {
          menuID: 3,
          name: "name3"
        }
      ]),
      { status: 200 }
    );

    const instance = component.instance();
    await instance.componentDidMount();
    await component.update();

    expect(component.state().token).toBe(userToken);
    expect(component.state().restaurant).toBe("no-restaurant");
    expect(component.state().imageID).toBe("0");

    expect(component.state().menus).toEqual([
      { menuID: "1", menuName: "name1" },
      { menuID: "2", menuName: "name2" },
      { menuID: "3", menuName: "name3" }
    ]);
  });

  it("ComponentDidMount fetch fails", async () => {
    fetch.mockResponseOnce(JSON.stringify([]), { status: 404 });

    const instance = component.instance();
    await instance.componentDidMount();
    await component.update();

    expect(component.state().token).toBe(userToken);
    expect(component.state().restaurant).toBe("no-restaurant");
    expect(component.state().imageID).toBe("0");

    expect(component.state().menus).toBe("");
  });

  it("Should set selected menu", () => {
    const id = "1";
    const menuName = "menu";
    component.instance().setSelected(id, menuName);
    component.update();

    expect(component.state().selected).toBe(id);
    expect(component.state().menuName).toBe(menuName);
    expect(component.state().disableButton).toBeFalsy();
  });
});
