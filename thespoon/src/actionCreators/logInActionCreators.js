import {LOGGING_IN_ATTEMPTING, LOGGING_IN_FAILING, LOGGING_IN_SUCCESSING, LOGGING_OUT} from "../actions/logInActions";

export const logIn = (username) => {
    return {
        type: LOGGING_IN_ATTEMPTING,
        username: username
    };
};
export const failLogIn = () => {
    return {
        type: LOGGING_IN_FAILING
    };
};

export const successLogIn = (token) => {
    return {
        type: LOGGING_IN_SUCCESSING,
        token: token
    };
};

export const logOut = () => {
    return {
        type: LOGGING_OUT
    };
};