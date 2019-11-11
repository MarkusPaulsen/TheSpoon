import { combineReducers } from 'redux';
import authentificationModalVisibiltyFilterReducer from "./authentificationModalVisibilityFilterReducer";
import logInRegisterReducer from "./loginRegisterReducer";

const rootReducer = combineReducers({
    authentificationModalVisibilityFilter: authentificationModalVisibiltyFilterReducer,
    logInRegisterReducer: logInRegisterReducer
});

export default rootReducer;

