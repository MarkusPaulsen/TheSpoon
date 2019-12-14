import * as currentRestaurantInformationAction from "../actions/restaurantActions";
import {initialStateRestaurantReducer} from "./initialStateRestaurantReducer"

const restaurantReducer = (state = initialStateRestaurantReducer, action) => {
    switch (action.type) {
        case currentRestaurantInformationAction.SETTING_UP_RESTAURANT_ID:
            return Object.assign({}, state, {
            restaurantID: action.restaurantID,
        });
        case currentRestaurantInformationAction.SETTING_UP_RESTAURANT:
            return Object.assign({}, state, {
                currentRestaurantInformation: action.currentRestaurantInformation,
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default restaurantReducer;