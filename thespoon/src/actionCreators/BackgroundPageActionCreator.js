//<editor-fold desc="Actions">
import {_SET_BACKGROUND_PAGE} from "../actions/BackgroundPageAction";
//</editor-fold>

//<editor-fold desc="Creators">
// noinspection JSLint
export const _setBackgroundPage = (_backgroundPage) => {
    return {
        type: _SET_BACKGROUND_PAGE,
        _backgroundPage: _backgroundPage,
    };
};
//</editor-fold>