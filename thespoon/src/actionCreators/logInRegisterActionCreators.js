import * as logInRegisterActions from "../actions/logInRegisterActions";

//<editor-fold desc="Register Action Creators">
export const register = (username, role) => {
    return {
        type: logInRegisterActions.REGISTERING_ATTEMPTING,
        username: username,
        role: role
    };
};

export const failRegister = () => {
    return {
        type: logInRegisterActions.LOGGING_IN_SUCCESSING
    };
};

export const successRegister = (username) => {
    return {
        type: logInRegisterActions.REGISTERING_SUCCESSING,
        username: username
    };
};
//</editor-fold>

//<editor-fold desc="Login Action Creators">
export const logIn = (username, role) => {
    return {
        type: logInRegisterActions.LOGGING_IN_ATTEMPTING,
        username: username,
        role: role
    };
};
export const failLogIn = () => {
    return {
        type: logInRegisterActions.LOGGING_IN_FAILING
    };
};

export const successLogIn = (token) => {
    return {
        type: logInRegisterActions.LOGGING_IN_SUCCESSING,
        token: token
    };
};

export const logOut = () => {
    return {
        type: logInRegisterActions.LOGGING_OUT
    };
};
//</editor-fold>