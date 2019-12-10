import React from "react";
import { mount } from "enzyme";
import Search from "./Search";

const setUp = () => {
  const component = mount(<Search />);
  return component;
};

describe("Search Component", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = component.find("TouchableWithoutFeedback");
    expect(wrapper.length).toBe(1);
  });

  it("Should render heading text", () => {
    const wrapper = component.findWhere(
      node => node.prop("testID") === "heading" && node.type() === "View"
    );
    expect(wrapper.text()).toBe("What do you want to eat today?");
  });

  it("Should render a search icon", () => {
    const icon = component.findWhere(
      node => node.prop("testID") === "searchIcon" && node.type() === "Image"
    );
    expect(icon.length).toBe(1);
  });

  it("Should render a search field", () => {
    const field = component.findWhere(
      node =>
        node.prop("testID") === "searchField" && node.type() === "TextInput"
    );
    expect(field.length).toBe(1);
  });

  it("Should render search results when resultsData is not empty", () => {
    component.setState({ searchWord: "pizza" });

    const mockData = [
      {
        id: 1,
        menuName: "Menu",
        restaurantName: "Restaurant",
        tags: [{ name: "italian", color: "#00000" }],
        score: 5
      },
      {
        id: 2,
        menuName: "Menu2",
        restaurantName: "Restaurant2",
        tags: [{ name: "italian", color: "#00000" }],
        score: 4
      }
    ];
    component.instance().getResults = jest.fn(() => {
      component.setState({ searchResults: mockData, searched: true });
    });
    component.update();
    component.instance().validateSearch();

    const list = component.find("ResultItem");

    expect(list.length).toBe(2);
  });

  it("Should not render searchResults list when no searchResults after searching", () => {
    component.setState({ searchWord: "pizza" });
    const mockData = [];
    component.instance().getResults = jest.fn(() => {
      component.setState({ searchResults: mockData, searched: true });
    });
    component.update();
    component.instance().validateSearch();

    const list = component.find("ResultItem");

    expect(list.length).toBe(0);
  });

  it("Should render noResults-image when no search results after searching", () => {
    component.setState({ searchWord: "pizza" });
    const mockData = [];
    component.instance().getResults = jest.fn(() => {
      component.setState({ searchResults: mockData, searched: true });
    });
    component.update();
    component.instance().validateSearch();

    const view = component.findWhere(
      node => node.props("testID") === "noResultsView" && node.type() === "View"
    );

    expect(view).toBeTruthy();
  });

  it("Should fail when invalid searchword", () => {
    component.setState({ searchWord: ".." });

    component.instance().validateSearch();

    expect(component.state().searched).toBeTruthy();
    expect(component.state().searchResults).toBeNull();
    expect(component.state().searchError).toBeTruthy();
  });
});
