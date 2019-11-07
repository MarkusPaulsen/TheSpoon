import authentificationModalVisibiltyFilterReducer from "./authentificationModalVisibilityFilterReducer"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    authentificationModalVisibilityFilter: authentificationModalVisibiltyFilterReducer
});

export default rootReducer;

