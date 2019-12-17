import React from "react";
import { mount } from "enzyme";
import Loading from "./Loading";

describe("Loading", () => {
  it("should show text", () => {
    jest.useFakeTimers();
    const wrapper = mount(<Loading />);
    const text = wrapper.find("View Text");
    expect(text.first().text()).toBe("The app is loading");
  });
});
