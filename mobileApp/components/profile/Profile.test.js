import React from "react";
import { mount } from "enzyme";
import Profile from "./Profile";
import { AsyncStorage as storage } from "react-native";
import Alert from "Alert";

const setUp = (props = {}) => {
  return mount(<Profile {...props} />);
};

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

jest.mock("Alert", () => {
  return {
    alert: jest.fn()
  };
});

describe("Profile Component", () => {
  describe("Logged in", () => {
    let component;

    beforeEach(async done => {
      const navigation = {
        navigate: jest.fn(),
        getParam: (param, defaultValue) =>
          param === "menuItemReviews" ? menuItems : defaultValue,
        addListener: (param, func) => func()
      };

      await storage.setItem("userToken", userToken);

      // Mock the functions called in componentDidMount
      jest
        .spyOn(Profile.prototype, "getUserInfo")
        .mockImplementationOnce(() => Promise.resolve());
      jest
        .spyOn(Profile.prototype, "getUserReviews")
        .mockImplementationOnce(() => Promise.resolve());

      component = setUp({ navigation });

      fetch.resetMocks();
      jest.useFakeTimers();
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
        JSON.stringify({ username: "johndoe", email: "johndoe@gmail.com" }),
        { status: 400 }
      );

      const instance = component.instance();
      await instance.getUserInfo();
      component.update();

      expect(component.state().userInfo).toEqual("");
    });

    it("Should get correct user reviews", async () => {
      const selectedMenuItems = [
        { menuItemID: 1, menuItemName: "item1", rating: 3, content: "Good" },
        {
          menuItemID: 2,
          menuItemName: "item2",
          rating: 1,
          content: "Not good.."
        }
      ];
      const reviews = [
        {
          menuReviewID: 1,
          menuID: 2,
          menuName: "name",
          restaurantName: "restaurant",
          serviceRating: 4,
          qualityOverPriceRating: 4,
          date: "2019-10-10",
          receiptImageID: "9hf030",
          status: "pending",
          menuItemsReviews: selectedMenuItems
        },
        {
          menuReviewID: 4,
          menuID: 7,
          menuName: "name7",
          restaurantName: "restaurant",
          serviceRating: 3,
          qualityOverPriceRating: 5,
          date: "2019-10-11",
          receiptImageID: "9gnwoe",
          status: "pending",
          menuItemsReviews: selectedMenuItems
        }
      ];

      fetch.mockResponseOnce(JSON.stringify(reviews));

      const instance = component.instance();
      await instance.getUserReviews();
      component.update();

      const finalReviews = [
        {
          menuReviewID: "1",
          menuID: 2,
          menuName: "name",
          restaurantName: "restaurant",
          serviceRating: 4,
          qualityOverPriceRating: 4,
          date: "2019-10-10",
          receiptImageID: "9hf030",
          status: "pending",
          menuItemsReviews: selectedMenuItems
        },
        {
          menuReviewID: "4",
          menuID: 7,
          menuName: "name7",
          restaurantName: "restaurant",
          serviceRating: 3,
          qualityOverPriceRating: 5,
          date: "2019-10-11",
          receiptImageID: "9gnwoe",
          status: "pending",
          menuItemsReviews: selectedMenuItems
        }
      ];

      expect(component.state().reviews).toEqual(finalReviews);
    });

    it("Should delete review successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });

      await component.instance().deleteReview();
      component.update();

      expect(Alert.alert).toHaveBeenCalledWith("Review deleted");
    });

    it("Should fail to delete review", async () => {
      fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

      await component.instance().deleteReview();
      component.update();

      expect(Alert.alert).toHaveBeenCalledWith("Deletion failed");
    });

    it("Should update email", () => {
      const instance = component.instance();
      const email = "test@test.com";
      instance.updateEmail(email);
      expect(component.state().updatedUserInfo.email).toEqual(email);
      expect(component.state().saveButton).toBeTruthy();
    });

    it("Should update ageRange", () => {
      const instance = component.instance();
      const ageRange = "18-24";
      instance.updateAgeRange(ageRange);
      expect(component.state().updatedUserInfo.ageRange).toEqual(ageRange);
      expect(component.state().saveButton).toBeTruthy();
    });

    it("Should update new password", async () => {
      const oldPassword = "password";
      const newPassword = "newpassword";
      component.setState({oldPassword, newPassword, newPasswordConfirmed: newPassword});
      await component.update();

      fetch.mockResponseOnce(JSON.stringify({}), { status: 201, ok: true });

      await component.instance().passwordValidation();

      expect(component.state().errorMessage).toEqual("");
      expect(component.state().showPasswordModal).toBeFalsy();
    });

    it("Should give error - password not filled out", async () => {
      const oldPassword = "password";
      const newPassword = "newpassword";

      component.setState({oldPassword, newPassword, newPasswordConfirmed: ""});
      await component.update();
      await component.instance().passwordValidation();

      expect(component.state().errorMessage).toEqual("All fields must be filled out");
    });
    it("Should give error - too short password", async () => {
      const oldPassword = "password";
      const newPassword = "new";

      component.setState({oldPassword, newPassword, newPasswordConfirmed: newPassword});
      await component.update();
      await component.instance().passwordValidation();

      expect(component.state().errorMessage).toEqual("New password must be at least 5 characters");
    });

    it("Should give error - not equal passwords", async () => {
      const oldPassword = "password";
      const newPassword = "newpassword";

      component.setState({oldPassword, newPassword, newPasswordConfirmed: "thisisapassword"});
      await component.update();
      await component.instance().passwordValidation();

      expect(component.state().errorMessage).toEqual("The fields for new password must be identical");
    });

    it("Should give error - old new equal passwords", async () => {
      const oldPassword = "password";
      const newPassword = "password";

      component.setState({oldPassword, newPassword, newPasswordConfirmed: newPassword});
      await component.update();
      await component.instance().passwordValidation();

      expect(component.state().errorMessage).toEqual("New password cannot be the same as old password");
    });

    it("Should reset state", async() => {
      await component.instance().goBack();
      expect(component.state().oldPassword).toEqual("");
      expect(component.state().newPassword).toEqual("");
      expect(component.state().newPasswordConfirmed).toEqual("");
      expect(component.state().errorMessage).toEqual("");
      expect(component.state().showPasswordModal).toBeFalsy();
    });

    it("Should successfully update userInfo", async () => {

      fetch.mockResponseOnce(JSON.stringify({}), { status: 201, ok: true });

      await component.instance().updateUserInfo(userToken);
      await component.update();

      expect(component.state().saveButton).toBeFalsy();
    });

    it("Should call logout successfully", async() => {
      await component.instance().logout();
      await component.update();

      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});
