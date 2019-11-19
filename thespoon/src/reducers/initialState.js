import {modalVisibilityFilters} from "../constants/modalVisibiltyFilters";

const initialState = {
    modalVisibilityFilter: modalVisibilityFilters.HIDE_ALL,
    users: [],
    username: '',
    role: '',
    token: '',
    loginStatus: 'not logged in'
};

export default initialState;
