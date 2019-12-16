import React from "react";
import { mount } from "enzyme";
import Profile from "./Profile";
import { AsyncStorage as storage } from "react-native";
import Alert from 'Alert';

const setUp = (props = {}) => {
  return mount(<Profile {...props} />);
};

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

jest.mock('Alert', () => {
  return {
    alert: jest.fn()
  }
});

describe("Profile Component", () => {
  describe("Logged in", () => {
    let component;

    beforeEach(async (done) => {
      const navigation = {
        navigate: jest.fn(),
        getParam: (param, defaultValue) =>
          param === "menuItemReviews" ? menuItems : defaultValue,
        addListener: (param, func) => func()
      };
      component = setUp({ navigation });
      await storage.setItem("userToken", userToken);
      fetch.resetMocks();
      done();
    });

    it("Should return rating", () => {
      const rating = component.instance().getRating(4);
      expect(rating.props.defaultRating).toBe(4);
    });

    it("Should get correct userInfo", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ username: "johndoe", email: "johndoe@gmail.com" })
      );
      const instance = component.instance();
      await instance.getUserInfo();
      component.update();

      expect(component.state().userInfo).toEqual({
        username: "johndoe",
        email: "johndoe@gmail.com"
      });
    });

    it("Should not update userInfo on fail", async () => {
      fetch.mockResponseOnce(
          JSON.stringify({ username: "johndoe", email: "johndoe@gmail.com" }), {status: 400}
      );

      const instance = component.instance();
      await instance.getUserInfo();
      component.update();

      expect(component.state().userInfo).toEqual("");
    });

    it("Should get correct user reviews", async () => {
      const selectedMenuItems = [
        { menuItemID: 1, menuItemName: "item1", rating: 3, content: "Good" },
        { menuItemID: 2, menuItemName: "item2", rating: 1, content: "Not good.." }
      ];
      const reviews = [
        {menuReviewID: 1, menuID: 2, menuName: "name", restaurantName: "restaurant", serviceRating: 4, qualityOverPriceRating: 4, date: "2019-10-10", receiptImageID: "9hf030", status: "pending", menuItemsReviews: selectedMenuItems },
        {menuReviewID: 4, menuID: 7, menuName: "name7", restaurantName: "restaurant", serviceRating: 3, qualityOverPriceRating: 5, date: "2019-10-11", receiptImageID: "9gnwoe", status: "pending", menuItemsReviews: selectedMenuItems }
      ];

      fetch.mockResponseOnce(JSON.stringify(reviews));

      const instance = component.instance();
      await instance.getUserReviews();
      component.update();

      const finalReviews = [
        {menuReviewID: "1", menuID: 2, menuName: "name", restaurantName: "restaurant", serviceRating: 4, qualityOverPriceRating: 4, date: "2019-10-10", receiptImageID: "9hf030", status: "pending", menuItemsReviews: selectedMenuItems },
        {menuReviewID: "4", menuID: 7, menuName: "name7", restaurantName: "restaurant", serviceRating: 3, qualityOverPriceRating: 5, date: "2019-10-11", receiptImageID: "9gnwoe", status: "pending", menuItemsReviews: selectedMenuItems }
      ];

      expect(component.state().reviews).toEqual(finalReviews);
    });

    it("Should delete review successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify({}), {status: 200});

      await component.instance().deleteReview();
      component.update();

      expect(Alert.alert).toHaveBeenCalledWith("Review deleted");
    })
  });
});
