import {LOGGING_IN_ATTEMPTING, LOGGING_IN_FAILING, LOGGING_IN_SUCCESSING, LOGGING_OUT} from "../actions/logInActions";
import {initialStateLoginReducer} from "./initialStateLoginReducer";

const loginReducer = (state = initialStateLoginReducer, action) => {
    switch (action.type) {
        case LOGGING_IN_ATTEMPTING:
            return Object.assign({}, state, {
                username: action.username,
                loginStatus: "logging in"
            });
        case LOGGING_IN_FAILING:
            return Object.assign({}, state, {
                loginStatus: "not logged in"
            });
        case LOGGING_IN_SUCCESSING:
            return Object.assign({}, state, {
                token: action.token,
                loginStatus: "logged in"
            });
        case LOGGING_OUT:
            return Object.assign({}, state, {
                loginStatus: "not logged in"
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default loginReducer;