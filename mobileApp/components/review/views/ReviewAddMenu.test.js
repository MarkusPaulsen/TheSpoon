import React from "react";
import { mount } from "enzyme";
import ReviewAddMenu from "./ReviewAddMenu";

const setUp = (props = {}) => {
  return mount(<ReviewAddMenu {...props} />);
};

describe("Review Add Menu Component", () => {
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
    component.update();

    expect(component.state().token).toBe("0");
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
    component.update();

    expect(component.state().token).toBe("0");
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
  })
});
