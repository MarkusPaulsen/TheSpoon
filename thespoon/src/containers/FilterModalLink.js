//<editor-fold desc="React">
import React from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setModal} from "../actionCreators/ModalActionCreators";
import {_setMenu, _setMenuItem} from "../actionCreators/MenuActionCreators";
import {_setRestaurantInfo} from "../actionCreators/RestaurantActionCreators";
//</editor-fold>

//<editor-fold desc="Business Logic">
const FilterModalLink = ({children, onClick}) => {
    return <span onClick={onClick}>{children}</span>;
};
//</editor-fold>

//<editor-fold desc="Redux">
const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state._modal
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(_setModal(ownProps.modal));
            ownProps.menu &&
            dispatch(_setMenu(ownProps.menu));
            ownProps.menuItem &&
            dispatch(_setMenuItem(ownProps.menuItem));
            ownProps.restaurantInfo &&
            dispatch(_setRestaurantInfo(ownProps.restaurantInfo));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModalLink);
//</editor-fold>
