import * as ModalVisibiltyFilterActions from "../actions/modalVisibilityFilterActions";
import {initialStateModalVisabilityFilterReducer} from "./initialStateModalVisabilityFilterReducer";

const modalVisibiltyFilterReducer = (state = initialStateModalVisabilityFilterReducer, action) => {
    if (action.type === ModalVisibiltyFilterActions.SET_MODAL_VISIBILITY_FILTER) {
        return Object.assign({}, state, {
            modalVisibilityFilter: action.filter
        });
    } else {
        return Object.assign({}, state, {});
    }
};

export default modalVisibiltyFilterReducer;