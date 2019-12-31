import * as backgroundPageActions from "../actions/BackgroundPageAction";
import {initialStateBackgroundPageReducer} from "./InitialStateBackgroundPageReducer";

const backgroundPageReducer = (state = initialStateBackgroundPageReducer, action) => {
    switch (action.type) {
        case backgroundPageActions.SET_BACKGROUND_PAGE:
            return Object.assign({}, state, {
                backgroundPage: action.backgroundPage
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default backgroundPageReducer;