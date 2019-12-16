import React from "react";
import { mount } from "enzyme";
import ReviewOverall from "./ReviewOverall";
import { AsyncStorage as storage } from "react-native";

const setUp = (props = {}) => {
  return mount(<ReviewOverall {...props} />);
};

const userToken = "igobeoh488039h09ancklansc";

const menuItems = [
  {
    menuItemID: "2",
    menuItemName: "item2",
    rating: 3,
    content: "Very very good"
  },
  { menuItemID: "1", menuItemName: "item1", rating: 4, content: "Loved it" }
];

describe("Review Overall Component", () => {
  let component;

  beforeEach(async () => {
    const navigation = {
      navigate: jest.fn(),
      getParam: (param, defaultValue) =>
        param === "menuItemReviews" ? menuItems : defaultValue
    };
    component = setUp({ navigation });
    await storage.setItem("userToken", userToken);
    fetch.resetMocks();
  });

  it("ComponentDidMount", async () => {
    await component.instance().componentDidMount();
    component.update();

    expect(component.state().token).toEqual(userToken);
    expect(component.state().menuID).toBe("00");
    expect(component.state().imageID).toBe("0");
    expect(component.state().menuName).toBe("no-menu");
    expect(component.state().restaurant).toBe("no-restaurant");
  });

  it("Should set service score", () => {
    const rating = 4;
    component.instance().setServiceScore(rating);

    expect(component.state().serviceRating).toEqual(rating);
  });

  it("Should set quality score", () => {
    const rating = 4;
    component.instance().setQualityScore(rating);

    expect(component.state().qualityOverPriceRating).toEqual(rating);
  });

  it("Should enable post review-button", () => {
    const rating = 4;
    component.instance().setServiceScore(rating);
    component.instance().setQualityScore(rating);

    expect(component.state().disableButton).toBeFalsy();
  });
 /*
  it("Should post review succesfully", async () => {
    component.setState({
      serviceRating: 4,
      qualityOverPriceRating: 3,
      imageID: "1234"
    });

    const menuItemsReview = menuItems.map(index => ({
      menuItemID: parseInt(index.menuItemID),
      rating: index.rating,
      content: index.content
    }));

    const data = JSON.stringify({
      serviceRating: 4,
      qualityOverPriceRating: 3,
      date: new Date().toISOString().slice(0, 10),
      receiptImageID: parseInt("1234"),
      menuItemsReviews: menuItemsReview
    });

    fetch.mockResponseOnce(data, { status: 201, ok: true });
    console.log(component.state().uploadSuccess);

    await component.instance().postReview();

    console.log(component.state().uploadSuccess);

    //expect(component.state().uploadSuccess).toBeTruthy();

    expect(global.console.log).toHaveBeenCalledWith(
      "Review was posted successfully!"
    );
  });*/
});
