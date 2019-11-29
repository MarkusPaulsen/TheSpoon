import * as logInRegisterActions from "../actions/logInRegisterActions";

//<editor-fold desc="Register Action Creators">
export const register = (username, email, name, surname, password) => {
    console.log(username)
    console.log(email)
    console.log(name)
    console.log(surname)
    console.log(password)
    return {
        type: logInRegisterActions.REGISTERING_ATTEMPTING,
        username: username,
        email: email,
        name: name,
        surname: surname,
        password: password
    }
};

export const failRegister = () => {
    return {
        type: logInRegisterActions.LOGGING_IN_SUCCESSING
    }
};

export const successRegister = (username) => {
    return {
        type: logInRegisterActions.REGISTERING_SUCCESSING,
        username: username
    }
};
//</editor-fold>

//<editor-fold desc="Login Action Creators">
export const logIn = (username, role) => {
    return {
        type: logInRegisterActions.LOGGING_IN_ATTEMPTING,
        username: username,
        role: role
    }
};
export const failLogIn = () => {
    return {
        type: logInRegisterActions.LOGGING_IN_FAILING
    }
};

export const successLogIn = (token) => {
    return {
        type: logInRegisterActions.LOGGING_IN_SUCCESSING,
        token: token
    }
};

export const logOut = () => {
    return {
        type: logInRegisterActions.LOGGING_OUT
    }
};
//</editor-fold>