import authentificationModalVisibiltyFilterReducer from "./authentificationModalVisibilityFilterReducer"
import { combineReducers } from 'redux'
import {authentificationModalVisibilityFilters} from "../constants/authentificationModalVisibiltyFilters";

const rootReducer = combineReducers({
    authentificationModalVisibilityFilter: authentificationModalVisibiltyFilterReducer
});

export default rootReducer;

