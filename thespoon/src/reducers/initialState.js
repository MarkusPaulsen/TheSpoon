import {modalVisibilityFilters} from "../constants/modalVisibiltyFilters";

const initialState = {
    modalVisibilityFilter: modalVisibilityFilters.HIDE_ALL,
    users: [],
    role: '',
    username: '',
    firstName: '',
    surname: '',
    email: '',
    password:'',
    activePageState: 'registering'
};

export default initialState;
