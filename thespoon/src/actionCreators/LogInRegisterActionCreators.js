import * as LogInRegisterActions from "../actions/LogInRegisterActions";

function register(role, firstName, lastName, nationality, birthday, eMail, password) {
    return {
        type: LogInRegisterActions.REGISTERING_ATTEMPTING,
        role: role,
        firstName: firstName,
        lastName: lastName,
        nationality: nationality,
        birthday: birthday,
        eMail: eMail,
        password: password
    }
}

function failRegister() {
    return {
        type: LogInRegisterActions.LOGGING_IN_SUCCESSING
    }
}

function successRegister() {
    return {
        type: LogInRegisterActions.REGISTERING_SUCCESSING
    }
}

function logIn(eMail, password) {
    return {
        type: LogInRegisterActions.LOGGING_IN_ATTEMPTING,
        eMail: eMail,
        password: password
    }
}

function failLogIn() {
    return {
        type: LogInRegisterActions.LOGGING_IN_FAILING
    }
}

function successLogIN() {
    return {
        type: LogInRegisterActions.LOGGING_IN_SUCCESSING
    }
}