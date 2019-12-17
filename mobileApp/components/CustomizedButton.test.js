import React from "react";
import { mount } from "enzyme";
import CustomizedButton from "./CustomizedButton";

describe("CustomizedButton Component", () => {
  it("Should show correct text", () => {
    jest.useFakeTimers();
    const props = { label: "Testing" };
    const component = mount(<CustomizedButton {...props} />);

    const text = component.find("Text");

    expect(text.first().text()).toBe(props.label);
  });
});
