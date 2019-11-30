import {SET_MODAL_VISIBILITY_FILTER} from "../actions/modalVisibilityFilterActions";

export const setModalVisibilityFilterAction = (filter) => {
    return {
        type: SET_MODAL_VISIBILITY_FILTER,
        filter: filter
    };
};