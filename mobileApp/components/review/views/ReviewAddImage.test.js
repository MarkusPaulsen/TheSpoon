import React from "react";
import { mount } from "enzyme";
import ReviewAddImage from "./ReviewAddImage";
import { AsyncStorage as storage } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const setUp = (props = {}) => {
  return mount(<ReviewAddImage {...props} />);
};

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0";

describe("Review Add Image Component", () => {
  describe("Logged in", () => {
    let component;

    beforeEach(async () => {
      const navigation = {
        navigate: jest.fn(),
        getParam: (param, defaultValue) =>
          param === "menuItemReviews" ? menuItems : defaultValue,
        addListener: (param, func) => func()
      };
      component = setUp({ navigation });
      await storage.setItem("userToken", userToken);
      fetch.resetMocks();
    });

    it("Should render activity indicator", () => {
      const comp = component.find("ReviewAddImage");
      comp.setState({ isLoaded: false });

      const act = comp.find("ActivityIndicator");

      expect(act).toBeDefined();
    });

    it("ComponentDidMount", async () => {
      const comp = component.find("ReviewAddImage");
      await comp.instance().componentDidMount();
      comp.update();

      expect(comp.state().loggedIn).toBeTruthy();
      expect(comp.state().isLoaded).toBeTruthy();
      expect(comp.state().token).toEqual(userToken);
    });

    it("Should create form data", () => {
      const imageUrl = "image.png";
      const comp = component.find("ReviewAddImage");

      const formData = comp.instance().createFormData(imageUrl);

      const form = new FormData();
      form.append("image", {
        name: `image.png`,
        type: `image/png`,
        uri: imageUrl
      });

      expect(formData).toEqual(form);
    });

    it("Should post image successfully", async () => {
      const comp = component.find("ReviewAddImage");
      await comp.instance().componentDidMount();
      comp.update();

      const imgResult = {
        cancelled: false,
        height: 4032,
        type: "image",
        uri:
          "file:///var/mobile/Containers/Data/Application/41A5BD61-40F6-4E7F-9BF8-580B1B88C14A/Library/Caches/ExponentExperienceData/%2540idamerete%252FTheSpoon/ImagePicker/BCDA7B2D-38ED-4CD4-A52E-336D6BFD7FB7.jpg",
        width: 3024
      };

      ImagePicker.launchImageLibraryAsync = jest
        .fn()
        .mockImplementationOnce(() => {
          return imgResult;
        });

      Permissions.askAsync = jest.fn().mockImplementationOnce(() => {
        return {
          expires: "never",
          permissions: {
            cameraRoll: {
              expires: "never",
              granted: true,
              status: "granted"
            }
          },
          status: "granted"
        };
      });

      const blob = new Blob(["F43B8BA6-0200-4470-9AF0-7ACE13B006FE"], {
        type: "application/json"
      });
      blob.name = "image";

      fetch.mockResponseOnce(JSON.stringify({ imageID: "t4iogsne" }), {
        status: 201,
        ok: true,
        url: "https://thespoon.herokuapp.com/api/image/"
      });

      /*
      fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({
            ok: true,
            json: () => {imageID: "gioebsov"}
          })
        })
      });*/

      JSON.parse = jest.fn().mockImplementationOnce(() => {
        return JSON.parse(userToken);
      });

      await comp.instance().onChooseLibraryPress();

      comp.update();

      expect(comp.state().imageUrl).toEqual(imgResult.uri);

      // TODO: test postImage correctly, something is wrong with response in the test
    });
  });
});
