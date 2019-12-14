import * as currentRestaurantInformationAction from "../actions/restaurantActions";
import restaurantReducer from "../reducers/restaurantReducer";

export const setRestaurantID = (restaurantID) => {
    return {
        type: currentRestaurantInformationAction.SETTING_UP_RESTAURANT_ID,
        restaurantID: restaurantID,
    };
};

export const setRestaurantInformation = (currentRestaurantInformation) => {
    return {
        type: currentRestaurantInformationAction.SETTING_UP_RESTAURANT,
        currentRestaurantInformation: currentRestaurantInformation,
    };
};