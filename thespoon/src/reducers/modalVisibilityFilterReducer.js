import {SET_MODAL_VISIBILITY_FILTER} from "../actions/modalVisibilityFilterActions";
import {initialStateModalVisibilityFilterReducer} from "./initialStateModalVisibilityFilterReducer";

const modalVisibiltyFilterReducer = (state = initialStateModalVisibilityFilterReducer, action) => {
  if (action.type === SET_MODAL_VISIBILITY_FILTER) {
    return Object.assign({}, state, {
      modalVisibilityFilter: action.filter
    });
  } else {
    return Object.assign({}, state, {});
  }
};

export default modalVisibiltyFilterReducer;
