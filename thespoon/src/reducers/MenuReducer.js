//<editor-fold desc="Initial State">
import {_initialStateMenuReducer} from "../initialStates/InitialStateMenuReducer";
//</editor-fold>
//<editor-fold desc="Actions">
import {_SET_MENU, _SET_MENU_ITEM} from "../actions/MenuActions";
//</editor-fold>

const _menuReducer = (state = _initialStateMenuReducer, action) => {
    switch (action.type) {
        case _SET_MENU:
            return Object.assign({}, state, {
                _menu: action._menu
            });
        case _SET_MENU_ITEM:
            return Object.assign({}, state, {
                _menuItem: action._menuItem
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default _menuReducer;
