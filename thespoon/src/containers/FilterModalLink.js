import { connect } from 'react-redux'
import { setModalVisibilityFilterAction } from '../actions/modalAction'
import React from "react";


const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.modalVisibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setModalVisibilityFilterAction(ownProps.filter))
})

const FilterModalLink = ({ active, children, onClick }) => (
    <span onClick={onClick} >
        {children}
    </span>
)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterModalLink)