import * as logInActions from "../actions/logInActions";

export const logIn = (username) => {
    return {
        type: logInActions.LOGGING_IN_ATTEMPTING,
        username: username
    };
};
export const failLogIn = () => {
    return {
        type: logInActions.LOGGING_IN_FAILING
    };
};

export const successLogIn = (token) => {
    return {
        type: logInActions.LOGGING_IN_SUCCESSING,
        token: token
    };
};

export const logOut = () => {
    return {
        type: logInActions.LOGGING_OUT
    };
};