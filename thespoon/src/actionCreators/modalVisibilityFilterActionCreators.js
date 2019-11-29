import * as modalVisibilityFilterActions from "../actions/modalVisibilityFilterActions";

export const setModalVisibilityFilterAction = (modalVisibilityFilter) => {
  return {
    type: modalVisibilityFilterActions.SET_MODAL_VISIBILITY_FILTER,
    modalVisibilityFilter: modalVisibilityFilter
  };
};
