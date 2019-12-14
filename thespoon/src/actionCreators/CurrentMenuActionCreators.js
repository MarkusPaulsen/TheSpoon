import * as currentMenuActions from "../actions/CurrentMenuActions";

export const setCurrentMenu = (currentMenu) => {
  return {
    type: currentMenuActions.SET_CURRENT_MENU,
    currentMenu: currentMenu,
  };
};

export const setCurrentMenuItem = (currentMenuItem) => {
  return {
    type: currentMenuActions.SET_CURRENT_MENU_ITEM,
    currentMenuItem: currentMenuItem,
  };
};

export const setCurrentRestaurantPage = (currentRestaurantPage) => {
  return {
    type: currentMenuActions.SET_CURRENT_RESTAURANT_PAGE,
    currentRestaurantPage: currentRestaurantPage,
  };
};
