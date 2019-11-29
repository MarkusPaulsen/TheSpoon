import { combineReducers } from "redux";
import modalVisibiltyFilterReducer from "./modalVisibilityFilterReducer";
import logInReducer from "./loginReducer";
import restaurantReducer from "./restaurantReducer";

const rootReducer = combineReducers({
    modalVisibilityFilter: modalVisibiltyFilterReducer,
    logInReducer: logInReducer,
    restaurantReducer: restaurantReducer
});

export default rootReducer;
