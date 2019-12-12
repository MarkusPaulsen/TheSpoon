//<editor-fold desc="React">
import React from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setModalVisibilityFilterAction} from "../actionCreators/modalVisibilityFilterActionCreators";
import {
    setCurrentMenu,
    setCurrentMenuItem,
    setCurrentRestaurantPage
} from "../actionCreators/CurrentMenuActionCreators";
//</editor-fold>

//<editor-fold desc="Business Logic">
const FilterModalLink = ({children, onClick}) => {
    return <span onClick={onClick}>{children}</span>;
};
//</editor-fold>

//<editor-fold desc="Redux">
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.modalVisibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setModalVisibilityFilterAction(ownProps.filter));
            ownProps.currentMenu &&
            dispatch(setCurrentMenu(ownProps.currentMenu));
            ownProps.currentMenuItem &&
            dispatch(setCurrentMenuItem(ownProps.currentMenuItem));
            ownProps.currentRestaurantPage &&
            dispatch(setCurrentRestaurantPage(ownProps.currentRestaurantPage));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModalLink);
//</editor-fold>
