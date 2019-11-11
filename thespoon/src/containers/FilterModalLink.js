import { connect } from 'react-redux'
import { setAuthentificatonModalVisibilityFilterAction } from '../actions/authentificationModalAction'
import React from "react";


const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.authentificationModalVisibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setAuthentificatonModalVisibilityFilterAction(ownProps.filter))
})

const FilterModalLink = ({ active, children, onClick }) => (
    <span
        onClick={onClick}
    >
        {children}
    </span>
)


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterModalLink)