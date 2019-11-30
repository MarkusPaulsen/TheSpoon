
import {SET_MODAL_VISIBILITY_FILTER} from "../actions/modalVisibilityFilterActions";

export const setModalVisibilityFilterAction = (modalVisibilityFilter) => {
  return {
    type: SET_MODAL_VISIBILITY_FILTER,
    modalVisibilityFilter: modalVisibilityFilter
  };
};
