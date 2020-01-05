//<editor-fold desc="Initial State">
import {_initialStateRestaurantReducer} from "../initialStates/InitialStateRestaurantReducer";
//</editor-fold>
//<editor-fold desc="Actions">
import {_SET_RESTAURANT_ID, _SET_RESTAURANT_INFO} from "../actions/RestaurantActions";
//</editor-fold>

const _restaurantReducer = (state = _initialStateRestaurantReducer, action) => {
    switch (action.type) {
        case _SET_RESTAURANT_ID:
            return Object.assign({}, state, {
                _restaurantID: action._restaurantID,
            });
        case _SET_RESTAURANT_INFO:
            return Object.assign({}, state, {
                _restaurantInfo: action._restaurantInfo,
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default _restaurantReducer;