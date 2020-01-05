import {combineReducers} from "redux";
import _modalReducer from "./ModalReducer";
import _restaurantReducer from "./RestaurantReducer";
import _menuReducer from "./MenuReducer";
import _backgroundPageReducer from "./BackgroundPageReducer";

const _rootReducer = combineReducers({
    _modalReducer: _modalReducer,
    _restaurantReducer: _restaurantReducer,
    _menuReducer: _menuReducer,
    _backgroundPageReducer: _backgroundPageReducer
});

export default _rootReducer;