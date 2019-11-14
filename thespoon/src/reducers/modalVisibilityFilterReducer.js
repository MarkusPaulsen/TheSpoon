import {modalVisibilityFilters} from "../constants/modalVisibiltyFilters";

const mdalVisibiltyFilterReducer = (state = modalVisibilityFilters.HIDE_ALL, action) => {
    switch (action.type) {
        case 'SET_MODAL_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export default mdalVisibiltyFilterReducer