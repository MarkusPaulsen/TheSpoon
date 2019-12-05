import {SETTING_UP_RESTAURANT} from "../actions/restaurantActions";

export const setRestaurantID = (restaurantID) => {
    return {
        type: SETTING_UP_RESTAURANT,
        restaurantID: restaurantID
    };
};