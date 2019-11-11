import * as logInRegisterActions from "../actions/logInRegisterActions";

function register(role, username, firstName, surname, email, password) {
    return {
        type: logInRegisterActions.REGISTERING_ATTEMPTING,
        role: role,
        username: username,
        firstName: firstName,
        surname: surname,
        email: email,
        password: password
    }
}

function failRegister() {
    return {
        type: logInRegisterActions.LOGGING_IN_SUCCESSING
    }
}

function successRegister() {
    return {
        type: logInRegisterActions.REGISTERING_SUCCESSING
    }
}

function logIn(email, password) {
    return {
        type: logInRegisterActions.LOGGING_IN_ATTEMPTING,
        email: email,
        password: password
    }
}

function failLogIn() {
    return {
        type: logInRegisterActions.LOGGING_IN_FAILING
    }
}

function successLogIN() {
    return {
        type: logInRegisterActions.LOGGING_IN_SUCCESSING
    }
}