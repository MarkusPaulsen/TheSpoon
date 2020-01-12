//<editor-fold desc="Actions">
import {_SET_MODAL} from "../actions/ModalActions";
//</editor-fold>

//<editor-fold desc="Creators">
export const _setModal = (_modal) => {
    return {
        type: _SET_MODAL,
        _modal: _modal
    };
};
//</editor-fold>