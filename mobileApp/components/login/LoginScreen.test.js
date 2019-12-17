import React from "react";
import { mount } from "enzyme";
import LoginScreen from "./LoginScreen";

const setUp = (props = {}) => {
  return mount(<LoginScreen {...props} />);
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

describe("LoginScreen Component", () => {
  let component;

  beforeEach(() => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => defaultValue,
      addListener: (param, func) => func()
    };

    component = setUp({ navigation: navigation });

    jest.useFakeTimers();
  });

  it("ComponentDidMount", async () => {
    await component.instance().componentDidMount();
    component.update();

    expect(component.state().parent).toBe("Profile");
  });

  it("Should render without errors", () => {
    const wrapper = component.find("View");
    expect(wrapper.first().length).toBe(1);
  });

  it("Should log user in", async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: token }));

    await component.instance().handleLogin();
    component.update();

    expect(component.state().token).toEqual(token);
  });

  it("Should not log user in", async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: "" }), { status: 400 });

    await component.instance().handleLogin();
    component.update();

    expect(component.state().invalidError).toBeTruthy();
  });

  it("Should update username", () => {
    const username = "johndoe";
    component.instance().handleUsernameChange(username);

    expect(component.state().username).toEqual(username);
  });

  it("Should update password", () => {
    const password = "johndoe";
    component.instance().handlePasswordChange(password);

    expect(component.state().password).toEqual(password);
  });

  it("Should register user login", async () => {
    const username = "johndoe";
    const password = "password";

    component.setState({ username, password });

    component.instance().handleLogin = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    await component.instance().register();
    component.update();

    expect(component.state().usernameError).toBeUndefined();
    expect(component.state().passwordError).toBeUndefined();
    expect(component.instance().handleLogin).toBeCalledTimes(1);
  });
});
