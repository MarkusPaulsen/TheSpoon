import * as menuActions from "../actions/CurrentMenuIdActions";
import initialState from "./initialState";

const currentMenuIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case menuActions.SET_CURRENT_MENU_ID:
      return action.currentMenuId;
    default:
      return null;
  }
};

export default currentMenuIdReducer;
