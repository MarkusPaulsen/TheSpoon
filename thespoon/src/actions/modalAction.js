import * as types from "./actionTypes";

export const setModalVisibilityFilterAction = filter => ({
    type: types.SET_MODAL_VISIBILITY_FILTER,
    filter: filter
});
