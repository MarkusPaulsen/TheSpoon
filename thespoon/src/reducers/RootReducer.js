import logInRegisterReducer from "../reducers/LoginRegisterReducer"

const initialState = {
    role: '',
    firstName: '',
    lastName: '',
    nationality: '',
    birthday: '',
    eMail: '',
    password: '',
    activePageState: ''
};

export default function rootReducer(state = initialState, action) {
    return {
        logInRegister: logInRegisterReducer(state, action)
    }
}