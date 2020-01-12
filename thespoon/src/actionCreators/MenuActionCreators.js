//<editor-fold desc="Actions">
import {_SET_MENU, _SET_MENU_ITEM} from "../actions/MenuActions";
//</editor-fold>

//<editor-fold desc="Creators">
export const _setMenu = (_menu) => {
    return {
        type: _SET_MENU,
        _menu: _menu,
    };
};

export const _setMenuItem = (_menuItem) => {
    return {
        type: _SET_MENU_ITEM,
        _menuItem: _menuItem,
    };
};
//</editor-fold>