import * as RestaurantActions from "../actions/restaurantActions";

export const setRestaurantID = (restaurantID) => {
    return {
        type: RestaurantActions.SETTING_UP_RESTAURANT,
        restaurantID: restaurantID
    };
};