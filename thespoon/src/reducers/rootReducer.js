import { combineReducers } from 'redux';
import modalVisibiltyFilterReducer from "./modalVisibilityFilterReducer";
import logInRegisterReducer from "./loginRegisterReducer";

const rootReducer = combineReducers({
    modalVisibilityFilter: modalVisibiltyFilterReducer,
    logInRegisterReducer: logInRegisterReducer
});

export default rootReducer;

