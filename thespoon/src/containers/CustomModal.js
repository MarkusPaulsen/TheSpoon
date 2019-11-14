import React, {Component} from "react";
import {modalVisibilityFilters} from "../constants/modalVisibiltyFilters";
import {roles} from "../constants/roles";
import {connect} from "react-redux";
import ChooseRoleModal from "../components/authentification/ChooseRoleModal";
import {Modal} from "react-bootstrap";
import {setModalVisibilityFilterAction} from "../actions/modalAction";
import LogIn from "../components/authentification/LogIn";
import RegisterRestaurantowner from "../components/authentification/RegisterRestaurantowner";
import FillRestaurantInfo from "../components/authentification/FillRestaurantInfo"
import RegisterCustomer from "../components/authentification/RegisterCustomer";


const mapStateToProps = (state) => {
    return {
        modalVisibilityFilter: state.modalVisibilityFilter
    }
}

const mapDispatchToProps = dispatch => ({
    handleClose: () => dispatch(setModalVisibilityFilterAction(modalVisibilityFilters.HIDE_ALL))
})


class AuthentificationModal extends Component {

    getVisibleModal = filter => {
        switch (filter) {
            case modalVisibilityFilters.SHOW_LOGIN:
                return (
                    <LogIn onHide={() => this.props.handleClose()} />
                )
            case modalVisibilityFilters.SHOW_CHOOSE_ROLE:
                return (
                    <ChooseRoleModal onHide={() => this.props.handleClose()} />
                )
            case modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER:
                return (
                    <RegisterRestaurantowner
                        role={roles.RESTAURANT_OWNER}
                        onHide={() => this.props.handleClose()}/>
                )
            case modalVisibilityFilters.SHOW_RESTAURANT_INFORMATION:
                return (
                    <FillRestaurantInfo
                        role={roles.RESTAURANT_OWNER}
                        onHide={() => this.props.handleClose()}
                        />
                )
            case modalVisibilityFilters.SHOW_REGISTER_CUSTOMER:
                return (
                    <RegisterCustomer
                        role={roles.CUSTOMER}
                        onHide={() => this.props.handleClose()}/>
                )
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                {this.props.modalVisibilityFilter !== modalVisibilityFilters.HIDE_ALL &&
                    <Modal show={true} onHide={() => this.props.handleClose()} centered>
                        {this.getVisibleModal(this.props.modalVisibilityFilter)}
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