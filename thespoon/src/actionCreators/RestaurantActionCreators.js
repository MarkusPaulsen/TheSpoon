//<editor-fold desc="Actions">
import {_SET_RESTAURANT_ID, _SET_RESTAURANT_INFO} from "../actions/RestaurantActions";
//</editor-fold>

//<editor-fold desc="Creators">
export const _setRestaurantID = (_restaurantID) => {
    return {
        type: _SET_RESTAURANT_ID,
        _restaurantID: _restaurantID,
    };
};

export const _setRestaurantInfo = (_restaurantInfo) => {
    return {
        type: _SET_RESTAURANT_INFO,
        _restaurantInfo: _restaurantInfo,
    };
};
//</editor-fold>