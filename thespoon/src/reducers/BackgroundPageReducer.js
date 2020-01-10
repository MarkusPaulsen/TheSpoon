//<editor-fold desc="Initial State">
import {_initialStateBackgroundPageReducer} from "../initialStates/InitialStateBackgroundPageReducer";
//</editor-fold>
//<editor-fold desc="Actions">
import {_SET_BACKGROUND_PAGE} from "../actions/BackgroundPageAction";
//</editor-fold>

const _backgroundPageReducer = (state = _initialStateBackgroundPageReducer, action) => {
    switch (action.type) {
        case _SET_BACKGROUND_PAGE:
            return Object.assign({}, state, {
                _backgroundPage: action._backgroundPage
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default _backgroundPageReducer;