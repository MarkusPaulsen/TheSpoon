import React from "react";
import { mount } from "enzyme";
import ItemReview from "./ItemReview";

const setUp = (props = {}) => {
  const component = mount(<ItemReview {...props} />);
  return component;
};

const item = {
  id: "2",
  menuItemName: "menuItemName2",
  menuItemDescription: "description",
  priceEuros: "14",
  menuItemImage: "imageLink",
  tags: [{ name: "italian", color: "#00000" }],
  score: "4.6",
  type: "dish"
};

const itemReviews = [
  {
    username: "johnndoe",
    rating: 4.3,
    content: "very good",
    Date: "2019-10-10"
  },
  {
    username: "testuser",
    rating: 4.1,
    content: "good pizza",
    Date: "2019-10-11"
  }
];

describe("Item Review component", () => {
  let component;

  beforeEach(() => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) => {
        if (param === "item") {
          return item;
        }
        return defaultValue;
      }
    };

    // Mock the functions called in componentDidMount
    jest
      .spyOn(ItemReview.prototype, "getItemReviews")
      .mockImplementationOnce(() => Promise.resolve());

    component = setUp({ navigation: navigation });
    jest.useFakeTimers();
  });

  it("ComponentDidMount", async () => {
    fetch.mockResponseOnce(JSON.stringify(itemReviews));

    await component.instance().componentDidMount();
    component.update();

    expect(component.state().item).toEqual(item);
    expect(component.state().reviews).toEqual(itemReviews);
    expect(component.state().isLoading).toBeFalsy();
  });
});
