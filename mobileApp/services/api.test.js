import React from 'react';
import * as Api from './api';

describe("Api constants", () => {
    it("Stub search", () => {
        const searchString = "pizza";
        const lat = 24.03;
        const long = 24.03;
        const stubSearch = Api.STUB_SEARCH(searchString, lat, long);
        expect(stubSearch).toBe("http://192.168.1.110:8080/api/user/customer/menu/searchByMenuItem?menuItemName="+searchString+"&{"+lat+"}&{"+long+"}");
    });

    it("Server search", () => {
        const searchString = "pizza";
        const lat = 24.03;
        const long = 24.03;
        const serverSearch = Api.SERVER_SEARCH(searchString, lat, long);
        expect(serverSearch).toBe("https://thespoon.herokuapp.com/api/user/customer/menu/searchByMenuItem?menuItemName="+searchString+"&Latitude="+lat+"&Longitude="+long);
    });

    it("Stub get menuitem", () => {
        const menuId = 1;
        const stubMenuItem = Api.STUB_GET_MENUITEM(menuId);
        expect(stubMenuItem).toBe(`http://192.168.1.110:8080/api/user/customer/menu/${menuId}`);
    });

    it("Server get menuitem", () => {
        const menuId = 1;
        const serverMenuItem = Api.SERVER_GET_MENUITEM(menuId);
        expect(serverMenuItem).toBe(`https://thespoon.herokuapp.com/api/user/customer/menu/${menuId}`);
    });

    it("Server get itemreviews", () => {
        const menuId = 1;
        const menuItemId = 2;
        const serverItemReviews = Api.SERVER_GET_ITEMREVIEWS(menuId, menuItemId);
        expect(serverItemReviews).toBe(`https://thespoon.herokuapp.com/api/user/customer/menu/${menuId}/menuItem/${menuItemId}/review`);
    });

    it("Stub delete review string", () => {
        const reviewId = 1;
        const deleteReview = Api.STUB_DELETE_REVIEW(reviewId);
        expect(deleteReview).toBe(`http://192.168.1.110:8080/api/user/customer/review/${reviewId}`);
    });

    it("Server delete review string", () => {
        const reviewId = 1;
        const deleteReview = Api.SERVER_DELETE_REVIEW(reviewId);
        expect(deleteReview).toBe(`https://thespoon.herokuapp.com/api/user/customer/review/${reviewId}`);
    });

    it("Stub get menus", () => {
        const restaurantId = 1;
        const getMenus = Api.STUB_GET_MENUS(restaurantId);
        expect(getMenus).toBe(`http://192.168.1.110:8080/api/user/customer/review/restaurant/${restaurantId}/menu`);
    });

    it("Server get menus", () => {
        const restaurantId = 1;
        const getMenus = Api.SERVER_GET_MENUS(restaurantId);
        expect(getMenus).toBe(`https://thespoon.herokuapp.com/api/user/customer/review/restaurant/${restaurantId}/menu`);
    });

    it("Stub get menuitems", () => {
        const menuId = 1;
        const getMenuItems = Api.STUB_GET_MENUITEMS(menuId);
        expect(getMenuItems).toBe(`http://192.168.1.110:8080/api/user/customer/review/restaurant/menu/${menuId}/menuItem`);
    });

    it("Server get menuitems", () => {
        const menuId = 1;
        const getMenuItems = Api.SERVER_GET_MENUITEMS(menuId);
        expect(getMenuItems).toBe(`https://thespoon.herokuapp.com/api/user/customer/review/restaurant/menu/${menuId}/menuItem`);
    });

    it("Stub post review", () => {
        const menuId = 1;
        const postReview = Api.STUB_POST_REVIEW(menuId);
        expect(postReview).toBe(`http://192.168.1.110:8080/api/user/customer/review/restaurant/menu/${menuId}`);
    });

    it("Server post review", () => {
        const menuId = 1;
        const postReview = Api.SERVER_POST_REVIEW(menuId);
        expect(postReview).toBe(`https://thespoon.herokuapp.com/api/user/customer/review/restaurant/menu/${menuId}`);
    });

});