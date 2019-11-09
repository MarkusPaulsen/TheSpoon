import React, {Component} from "react";
import {authentificationModalVisibilityFilters} from "../constants/authentificationModalVisibiltyFilters";
import {roles} from "../constants/roles";
import {connect} from "react-redux";
import ChooseRoleModal from "../components/authentification/ChooseRoleModal";
import {Modal} from "react-bootstrap";
import {setAuthentificatonModalVisibilityFilterAction} from "../actions/authentificationModalAction";
import LogIn from "../components/authentification/LogIn";
import RegisterRestaurantowner from "../components/authentification/RegisterRestaurantowner";
import RegisterCustomer from "../components/authentification/RegisterCustomer";


const mapStateToProps = (state) => {
    return {
        authentificationModalVisibilityFilter: state.authentificationModalVisibilityFilter
    }
}

const mapDispatchToProps = dispatch => ({
    handleClose: () => dispatch(setAuthentificatonModalVisibilityFilterAction(authentificationModalVisibilityFilters.HIDE_ALL))
})


class AuthentificationModal extends Component {

    getVisibleModal = filter => {
        switch (filter) {
            case authentificationModalVisibilityFilters.SHOW_LOGIN:
                return (
                    <LogIn onHide={() => this.props.handleClose()} />
                )
            case authentificationModalVisibilityFilters.SHOW_CHOOSE_ROLE:
                return (
                    <ChooseRoleModal onHide={() => this.props.handleClose()} />
                )
            case authentificationModalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER:
                return (
                    <RegisterRestaurantowner
                        role={roles.RESTAURANT_OWNER}
                        onHide={() => this.props.handleClose()}/>
                )
            case authentificationModalVisibilityFilters.SHOW_REGISTER_CUSTOMER:
                return (
                    <RegisterCustomer
                        role={roles.CUSTOMER}
                        onHide={() => this.props.handleClose()}
                    />
                )
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                {this.props.authentificationModalVisibilityFilter !== authentificationModalVisibilityFilters.HIDE_ALL &&
                    <Modal show={true} onHide={() => this.props.handleClose()} centered>
                        {this.getVisibleModal(this.props.authentificationModalVisibilityFilter)}
                    </Modal>
                }
            </>

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthentificationModal)