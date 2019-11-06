import * as LogInRegisterActions from "../actions/LogInRegisterActions";

export default function logInRegisterReducer(state, action) {
    switch(action.type) {
        case LogInRegisterActions.REGISTERING_ATTEMPTING:
            return Object.assign({}, state, {
                role: action.role, firstName: action.firstName,
                lastName: action.lastName, nationality: action.nationality,
                birthday: action.birthday, eMail: action.eMail,
                password: action.password, activePageState: 'registering'
            });
        case LogInRegisterActions.REGISTERING_FAILING:
            return Object.assign({}, state, {
                activePageState: 'registrationFailed'
            });
        case LogInRegisterActions.REGISTERING_SUCCESSING:
            return Object.assign({}, state, {
                activePageState: 'userProfile'
            });
        case LogInRegisterActions.LOGGING_IN_ATTEMPTING:
            return Object.assign({}, state, {
                eMail: action.eMail, password: action.password,
                activePageState: 'loggingIn'
            });
        case LogInRegisterActions.LOGGING_IN_FAILING:
            return Object.assign({}, state, {
                activePageState: 'logInFailed'
            });
        case LogInRegisterActions.LOGGING_IN_SUCCESSING:
            return Object.assign({}, state, {
                activePageState: 'userProfile'
            });
        case LogInRegisterActions.LOGGING_OUT:
            return Object.assign({}, state, {
                activePageState: 'homePage'
            });
        default:
            return Object.assign({}, state, {
                activePageState: 'homePage'
            });
    }
}