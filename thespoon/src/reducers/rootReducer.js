import { combineReducers } from "redux";
import modalVisibiltyFilterReducer from "./modalVisibilityFilterReducer";
import logInRegisterReducer from "./loginRegisterReducer";
import currentMenuIdReducer from "./currentMenuIdReducer";

const rootReducer = combineReducers({
  modalVisibilityFilter: modalVisibiltyFilterReducer,
  logInRegisterReducer: logInRegisterReducer,
  currentMenuId: currentMenuIdReducer
});

export default rootReducer;
