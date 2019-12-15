import React from "react";
import { mount } from "enzyme";
import App from "./App";

const setUp = () => {
  return mount(<App />);
};

describe("App", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const app = component.find("App");

    expect(app.length).toBe(1);
  });

  it("ComponentDidMount", async () => {
    const instance = component.instance();
    await instance.componentDidMount();

    expect(instance.state.fontLoaded).toBeTruthy();
  });

  it("Should render Loading when font not loaded", () => {
    component.setState({ fontLoaded: false });

    const app = component.find("Loading");

    expect(app.length).toBe(1);
  });
});
