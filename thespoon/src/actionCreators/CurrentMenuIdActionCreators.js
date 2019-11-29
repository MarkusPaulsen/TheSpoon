import * as currentMenuIdActions from "../actions/CurrentMenuIdActions";

export const setCurrentMenuId = (currentMenuId) => {
  return {
    type: currentMenuIdActions.SET_CURRENT_MENU_ID,
    currentMenuId: currentMenuId
  };
};
