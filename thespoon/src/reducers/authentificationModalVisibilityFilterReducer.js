import {authentificationModalVisibilityFilters} from "../constants/authentificationModalVisibiltyFilters";

const authentificationModalVisibiltyFilterReducer = (state = authentificationModalVisibilityFilters.HIDE_ALL, action) => {
    switch (action.type) {
        case 'SET_AUTHENTIFICATION_MODAL_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export default authentificationModalVisibiltyFilterReducer