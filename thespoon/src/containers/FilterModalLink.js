//<editor-fold desc="React">
import React from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from 'react-redux'
import {setModalVisibilityFilterAction} from '../actionCreators/modalVisibilityFilterActionCreators'
//</editor-fold>

//<editor-fold desc="Business Logic">
const FilterModalLink = ({children, onClick}) => {
    return (
        <span onClick={onClick} >
            {children}
        </span>
    );
};
//</editor-fold>

//<editor-fold desc="Redux">
const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.modalVisibilityFilter
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => dispatch(setModalVisibilityFilterAction(ownProps.filter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModalLink)
//</editor-fold>