import * as menuActions from "../actions/CurrentMenuIdActions";
import {initialStateCurrentMenuIdReducer} from "./initialStateCurrentMenuIdReducer";

const currentMenuIdReducer = (state = initialStateCurrentMenuIdReducer, action) => {
  switch (action.type) {
    case menuActions.SET_CURRENT_MENU_ID:
      return Object.assign({}, state, {
        currentMenuId: action.currentMenuId
      });
    default:
      return Object.assign({}, state, {});
  }
};

export default currentMenuIdReducer;
