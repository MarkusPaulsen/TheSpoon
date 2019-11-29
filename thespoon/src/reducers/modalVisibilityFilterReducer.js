import * as modalActions from "../actions/modalVisibilityFilterActions";
import initialState from "./initialState";
import {initialStateModalVisibilityFilterReducer} from "./initialStateModalVisibilityFilterReducer.js"

const modalVisibiltyFilterReducer = (
  state = initialStateModalVisibilityFilterReducer,
  action
) => {
  switch (action.type) {
    case modalActions.SET_MODAL_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default modalVisibiltyFilterReducer;

