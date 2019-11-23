import * as LogInActions from "../actions/logInActions";
import {initialStateLoginReducer} from "./initialStateLoginReducer"

const loginReducer = (state = initialStateLoginReducer, action) => {
    switch(action.type) {
        case LogInActions.LOGGING_IN_ATTEMPTING:
            return Object.assign({}, state, {
                username: action.username,
                loginStatus: 'logging in'
            });
        case LogInActions.LOGGING_IN_FAILING:
            return Object.assign({}, state, {
                loginStatus: 'not logged in'
            });
        case LogInActions.LOGGING_IN_SUCCESSING:
            return Object.assign({}, state, {
                token: action.token,
                loginStatus: 'logged in'
            });
        case LogInActions.LOGGING_OUT:
            return Object.assign({}, state, {
                loginStatus: 'not logged in'
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default loginReducer;