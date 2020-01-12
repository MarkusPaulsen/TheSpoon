import {createStore} from "redux";
import _rootReducer from "../reducers/RootReducer";

const configureStore = () => {
    return {
        ...createStore(_rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
    }
};

export default configureStore;