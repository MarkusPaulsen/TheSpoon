import {combineReducers} from "redux";
import modalVisibiltyFilterReducer from "./modalVisibilityFilterReducer";
import logInReducer from "./loginReducer";
import restaurantReducer from "./restaurantReducer";
import currentMenuReducer from "./currentMenuReducer";
import backgroundPageReducer from "./BackgroundPageReducer";

const rootReducer = combineReducers({
    modalVisibiltyFilterReducer: modalVisibiltyFilterReducer,
    logInReducer: logInReducer,
    restaurantReducer: restaurantReducer,
    currentMenuReducer: currentMenuReducer,
    backgroundPageReducer: backgroundPageReducer
});

export default rootReducer;
