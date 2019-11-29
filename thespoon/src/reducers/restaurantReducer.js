import * as RestaurantActions from "../actions/restaurantActions";
import {initialStateRestaurantReducer} from "./initialStateRestaurantReducer"

const restaurantReducer = (state = initialStateRestaurantReducer, action) => {
    if (action.type === RestaurantActions.SETTING_UP_RESTAURANT) {
        return Object.assign({}, state, {
            restaurantID: action.restaurantID,
        });
    } else {
        return Object.assign({}, state, {});
    }
};

export default restaurantReducer;