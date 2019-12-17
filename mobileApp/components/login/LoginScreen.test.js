import React from "react";
import { mount } from "enzyme";
import LoginScreen from "./LoginScreen";

const setUp = () => {
  return mount(<LoginScreen />);
};

describe("LoginScreen Component", () => {
  let component;

  beforeEach(() => {
    component = setUp();

    jest.useFakeTimers();
  });

  it("Should render without errors", () => {
    const wrapper = component.find("View");
    expect(wrapper.first().length).toBe(1);
  });
});
