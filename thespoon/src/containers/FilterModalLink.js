//<editor-fold desc="React">
import React from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import { connect } from "react-redux";
import { setModalVisibilityFilterAction } from "../actionCreators/modalVisibilityFilterActionCreators";
import { setCurrentMenuId } from "../actionCreators/CurrentMenuIdActionCreators";
//</editor-fold>

//<editor-fold desc="Business Logic">
const FilterModalLink = ({ children, onClick }) => {
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
      ownProps.currentMenuId &&
        dispatch(setCurrentMenuId(ownProps.currentMenuId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModalLink);
//</editor-fold>
