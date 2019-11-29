import { modalVisibilityFilters } from "../constants/modalVisibiltyFilters";

const initialState = {
    modalVisibilityFilter: modalVisibilityFilters.HIDE_ALL,
    users: [],
    username: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    token: '',
    loginStatus: 'not logged in'
};

export default initialState;
