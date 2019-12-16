import React from "react";
import { mount } from "enzyme";
import Search from "./Search";
import * as SearchFile from './Search';

const setUp = () => {
  const component = mount(<Search />);
  return component;
};

const obj1 = {
  id: 1,
  menuName: "testing",
  restaurantName: "restaurant",
  tags: [],
  score: 4,
  price: 25,
  image: "amazon.com",
  distance: 0.1
};

const obj2 = {
  id: 2,
  menuName: "testing",
  restaurantName: "restaurant",
  tags: [],
  score: 5,
  price: 20,
  image: "amazon.com",
  distance: 0.25
};
const obj3 = {
  id: 3,
  menuName: "testing",
  restaurantName: "restaurant",
  tags: [],
  score: 3,
  price: 30,
  image: "amazon.com",
  distance: 0.2
};

const searchResults = [obj1, obj2, obj3];

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
      node => node.prop("testID") === "searchIcon"
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

  it("Should show sortBy-modal", () => {
    component.setState({ modalVisible: true });
    component.update();
    const modal = component.find("Modal");

    expect(modal.length).toBe(1);
  });

  it("Should set modal visible correctly", () => {
    const oldVisible = component.state().modalVisible;
    component.instance().setModalVisible();
    expect(component.state().modalVisible).toBe(!oldVisible);
  });

  it("Should update searchtext correctly", () => {
    const searchWord = "pizza";
    component.instance().updateSearchText(searchWord);
    expect(component.state().searchWord).toBe(searchWord);
    expect(component.state().searched).toBeFalsy();
  });

  it("Should remove sort criteria", () => {
    const sortBy = "Price (low-high)";
    component.setState({ selectedFilter: sortBy });
    component.instance().setFilter(sortBy);
    expect(component.state().selectedFilter).toBe("");
  });

  it("Should set sort criteria", () => {
    const sortBy = "Price (low-high)";
    component.setState({ selectedFilter: "" });
    component.instance().setFilter(sortBy);
    expect(component.state().selectedFilter).toBe(sortBy);
  });

  it("Should sort results by price low-high", () => {
    const sortBy = "Price (low-high)";
    component.setState({ searchResults, selectedFilter: sortBy });

    component.instance().applyFilter();
    component.update();

    expect(component.state().searchResults).toEqual([obj2, obj1, obj3])
  });

  it("Should sort results by price high-low", () => {
    const sortBy = "Price (high-low)";
    component.setState({ searchResults, selectedFilter: sortBy });

    component.instance().applyFilter();
    component.update();

    expect(component.state().searchResults).toEqual([obj3, obj1, obj2])
  });

  it("Should sort results by review", () => {
    const sortBy = "Review";
    component.setState({ searchResults, selectedFilter: sortBy });

    component.instance().applyFilter();
    component.update();

    expect(component.state().searchResults).toEqual([obj2, obj1, obj3])
  });

  it("Should sort results by distance", () => {
    const sortBy = "Distance";
    component.setState({ searchResults, selectedFilter: sortBy });

    const locationPermission = true;
    const latitude = "24,539045";
    const longitude = "23,932052";

    component.instance().findCoordinates = jest.fn().mockImplementationOnce(() => {
      component.setState({locationPermission, latitude, longitude})
    });

    component.instance().applyFilter();
    component.update();

    expect(component.state().searchResults).toEqual([obj1, obj3, obj2])
  });

  it("Should return right price category", () => {
    expect(SearchFile.getPriceCategory(31)).toBe("$$$$");
    expect(SearchFile.getPriceCategory(25)).toBe("$$$");
    expect(SearchFile.getPriceCategory(15)).toBe("$$");
    expect(SearchFile.getPriceCategory(8)).toBe("$");
    expect(SearchFile.getPriceCategory()).toBe("");
  });
});
