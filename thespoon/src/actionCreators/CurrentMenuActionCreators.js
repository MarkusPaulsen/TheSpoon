import * as currentMenuActions from "../actions/CurrentMenuActions";

export const setCurrentMenu = (currentMenu) => {
  return {
    type: currentMenuActions.SET_CURRENT_MENU,
    currentMenu: currentMenu
  };
};
