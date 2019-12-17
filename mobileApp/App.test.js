import React from "react";
import { mount } from "enzyme";
import App from "./App";
import * as Font from "expo-font";

const setUp = () => {
  return mount(<App />);
};

describe("App", () => {
  let component;
  beforeEach(() => {
    Font.loadAsync = jest.fn().mockImplementationOnce(() => Promise.resolve());

    component = setUp();

    jest.useFakeTimers();
  });
  it("should be true", () => {
    expect(true).toBeTruthy();
  });

  it("Should render without errors", () => {
    const app = component.find("App");

    expect(app.length).toBe(1);
  });

  it("ComponentDidMount", async () => {
    Font.loadAsync = jest.fn().mockImplementationOnce(
      async () =>
        await Font.loadAsync({
          roboto: require("./assets/fonts/roboto-regular.ttf"),
          robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
          robotoMedium: require("./assets/fonts/Roboto-Medium.ttf")
        })
    );
    const instance = component.instance();
    await instance.componentDidMount();
    component.update();

    expect(instance.state.fontLoaded).toBeTruthy();
  });

  it("Should render Loading when font not loaded", () => {
    component.setState({ fontLoaded: false });
    component.update();

    const app = component.find("Loading");

    expect(app.length).toBe(1);
  });
});
