import {authentificationModalVisibilityFilters} from "../constants/authentificationModalVisibiltyFilters";

const initialState = {
    authentificationModalVisibilityFilter: authentificationModalVisibilityFilters.HIDE_ALL,
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
