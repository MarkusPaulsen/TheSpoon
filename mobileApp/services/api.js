//This file consist of the urls to the API which do not require a variable

//Login
export const STUB_LOGIN = `http://192.168.1.110:8080/api/user/login/`;
export const SERVER_LOGIN = `https://thespoon.herokuapp.com/api/user/login`;

//Search
export const STUB_SEARCH =
  "http://192.168.1.110:8080/api/user/customer/menu/searchByMenuItem?menuItemName={searchString}";
export const SERVER_SEARCH =
  "https://thespoon.herokuapp.com/api/user/customer/menu/searchByMenuItem?menuItemName={searchString}";

//Profile
export const STUB_PROFILE_USERINFO = `http://192.168.1.110:8080/api/user/customer/`;
export const SERVER_PROFILE_USERINFO = `https://thespoon.herokuapp.com/api/user/customer/`;
export const STUB_PROFILE_USERREVIEWS = `http://192.168.1.110:8080/api/user/customer/review`;
export const SERVER_PROFILE_USERREVIEWS = `https://thespoon.herokuapp.com/api/user/customer/review`;

//ReviewAddRestaurant
export const STUB_GET_RESTAURANTS = `http://192.168.1.110:8080/api/user/customer/review/restaurant`;
export const SERVER_GET_RESTAURANTS = `https://thespoon.herokuapp.com/api/user/customer/review/restaurant`;
