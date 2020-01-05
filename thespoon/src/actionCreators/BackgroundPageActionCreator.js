import * as backgroundPageActions from "../actions/BackgroundPageAction";

export const setBackgroundPage = (backgroundPage) => {
    return {
        type: backgroundPageActions.SET_BACKGROUND_PAGE,
        backgroundPage: backgroundPage,
    };
};