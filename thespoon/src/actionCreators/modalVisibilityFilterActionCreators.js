import * as types from "../actions/modalVisibilityFilterActions";

export const setModalVisibilityFilterAction = (filter) => {
    return {
        type: types.SET_MODAL_VISIBILITY_FILTER,
        filter: filter
    };
};