import * as menuActions from "../actions/CurrentMenuActions";
import {initialStateCurrentMenuReducer} from "./initialStateCurrentMenuReducer";

const currentMenuReducer = (state = initialStateCurrentMenuReducer, action) => {
  switch (action.type) {
    case menuActions.SET_CURRENT_MENU:
      return Object.assign({}, state, {
        currentMenu: action.currentMenu
      });
    default:
      return Object.assign({}, state, {});
  }
};

export default currentMenuReducer;
