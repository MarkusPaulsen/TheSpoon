import * as types from "../actions/CurrentMenuIdActions";

export const setCurrentMenuId = id => {
  return {
    type: types.SET_CURRENT_MENU_ID,
    currentMenuId: id
  };
};
