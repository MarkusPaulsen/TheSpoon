import * as modalActions from "../actions/modalVisibilityFilterActions";
import {initialStateModalVisibilityFilterReducer} from "./initialStateModalVisibilityFilterReducer.js"

const modalVisibiltyFilterReducer = (state = initialStateModalVisibilityFilterReducer, action) => {
  switch (action.type) {
    case modalActions.SET_MODAL_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        modalVisibilityFilter: action.modalVisibilityFilter
      });
    default:
      return Object.assign({}, state, {});
  }
};

export default modalVisibiltyFilterReducer;

