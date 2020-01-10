//<editor-fold desc="Initial State">
import {_initialStateModalReducer} from "../initialStates/InitialStateModalReducer";
//</editor-fold>
//<editor-fold desc="Actions">
import {_SET_MODAL} from "../actions/ModalActions";
//</editor-fold>

const _modalReducer = (state = _initialStateModalReducer, action) => {
    switch (action.type) {
        case _SET_MODAL:
            return Object.assign({}, state, {
                _modal: action._modal
            });
        default:
            return Object.assign({}, state, {});
    }
};

export default _modalReducer;
