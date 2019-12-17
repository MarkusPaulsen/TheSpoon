import React from "react";
import { mount } from "enzyme";
import ReviewAddRestaurant from "./ReviewAddRestaurant";

const setUp = (props = {}) => {
  return mount(<ReviewAddRestaurant {...props} />);
};

const restaurants = [
  { restaurantID: "1", name: "Pizzeria Auum" },
  { restaurantID: "2", name: "Pizzeria Da Zero" },
  { restaurantID: "3", name: "Restaurant" }
];

describe("Review Add Restaurant Component", () => {
  let component;

  beforeEach(() => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => {
        return defaultValue;
      }
    };

    // Mock the functions called in componentDidMount
    jest
      .spyOn(ReviewAddRestaurant.prototype, "getAllMenus")
      .mockImplementationOnce(() => Promise.resolve());

    component = setUp({ navigation });
    fetch.resetMocks();
    jest.useFakeTimers();
  });

  it("ComponentDidMount fetch successful", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          restaurantID: 1,
          name: "name1"
        },
        {
          restaurantID: 2,
          name: "name2"
        },
        {
          restaurantID: 3,
          name: "name3"
        }
      ]),
      { status: 200 }
    );

    const instance = component.instance();
    await instance.componentDidMount();
    component.update();

    expect(component.state().imageID).toBe("0");
    expect(component.state().token).toBe("0");

    expect(component.state().restaurants).toEqual([
      { restaurantID: "1", name: "name1" },
      { restaurantID: "2", name: "name2" },
      { restaurantID: "3", name: "name3" }
    ]);
  });

  it("ComponentDidMount fetch fails", async () => {
    fetch.mockResponseOnce(JSON.stringify([]), { status: 404 });

    const instance = component.instance();
    await instance.componentDidMount();
    component.update();

    expect(component.state().imageID).toBe("0");
    expect(component.state().token).toBe("0");

    expect(component.state().restaurants).toBe("");
  });

  it("Should set selected restaurant", () => {
    const id = "1";
    const restaurant = "restaurant";
    component.instance().setSelected(id, restaurant);
    component.update();

    expect(component.state().selected).toEqual(id);
    expect(component.state().restaurant).toEqual(restaurant);
    expect(component.state().disableButton).toBeFalsy();
  });

  it("Should update searchtext", () => {
    const searchWord = "pizza";
    component.instance().updateSearchText(searchWord);

    expect(component.state().searchWord).toEqual(searchWord);
  });

  it("Should search by searchword", () => {
    const searchWord = "pizzeria";

    component.setState({ searchWord, restaurants });

    component.instance().getSearchResult();
    component.update();

    expect(component.state().searchResult).toEqual([
      { restaurantID: "1", name: "Pizzeria Auum" },
      { restaurantID: "2", name: "Pizzeria Da Zero" }
    ]);
  });

  it("Should return all restaurants", () => {
    const searchWord = "";
    component.setState({ searchWord, restaurants });

    component.instance().getSearchResult();
    component.update();

    expect(component.state().searchResult).toEqual(restaurants);
  });

  it("Should return empty search result", () => {
    const searchWord = "test";
    component.setState({ searchWord, restaurants });

    component.instance().getSearchResult();
    component.update();

    expect(component.state().searchResult).toBeNull();
  });

  it("Should return empty search result when no restaurants", () => {
    const searchWord = "test";
    const rest = "";

    component.setState({ searchWord, restaurants: rest });

    component.instance().getSearchResult();
    component.update();

    expect(component.state().searchResult).toBeNull();
  });
});
