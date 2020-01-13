//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setModal} from "../actionCreators/ModalActionCreators";
import {_setMenu} from "../actionCreators/MenuActionCreators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>

//<editor-fold desc="Constants">
import {modals} from "../constants/Modals";
//</editor-fold>
//<editor-fold desc="Modals">
import LogInModal from "../components/HomePage/Modals/LogInModal";
import ConsultantLoginModal from "../components/ConsultantPage/ConsultantLoginModal";
import LogOutModal from "../components/HomePage/Modals/LogOutModal";
import RegisterRestaurantowner from "../components/HomePage/Modals/RegisterRestaurantOwnerModal";
import ConsultantRegisterModal from "../components/ConsultantPage/ConsultantRegisterModal";
import AddRestaurantModal from "../components/RestaurantPage/Modals/AddRestaurantModal"
import EditRestaurantModal from "../components/RestaurantPage/Modals/EditRestaurantModal";
import AddMenuModal from "../components/RestaurantPage/Modals/AddMenuModal";
import EditMenuModal from "../components/RestaurantPage/Modals/EditMenuModal";
import AddMenuItemModal from "../components/RestaurantPage/Modals/AddMenuItemModal";
import EditMenuItemModal from "../components/RestaurantPage/Modals/EditMenuItemModal";
import ChooseRoleModal from "../components/HomePage/Modals/ChooseRoleModal";
import RegisterCustomer from "../components/HomePage/Modals/RegisterCustomerModal";
import PendingReviewModal from "../components/RestaurantPage/Modals/PendingReviewModal";
import ChangePasswordModal from "../components/ProfilePage/Modals/ChangePasswordModal";
//</editor-fold>

class CustomModal extends Component {

    //<editor-fold desc="Business Logic">
    getVisibleModal = (filter) => {
        switch (filter) {
            case modals.SHOW_LOGIN:
                // noinspection JSLint
                return (
                    <LogInModal onHide={() => {this.props._handleClose()}} />
                );

            case modals.SHOW_LOGIN_CONSULTANT:
                // noinspection JSLint
                return (
                    <ConsultantLoginModal onHide={() => {this.props._handleClose()}} />
                );

            case modals.SHOW_LOGOUT:
                return (
                    <LogOutModal onHide={() => {this.props._handleClose()}} />
                );

            case modals.SHOW_CHOOSE_ROLE:
                return (
                    <ChooseRoleModal onHide={() => {this.props._handleClose()}} />
                );

            case modals.SHOW_REGISTER_RESTAURANT_OWNER:
                return (
                    <RegisterRestaurantowner onHide={() => {this.props._handleClose()}}/>
                );

            case modals.SHOW_REGISTER_CUSTOMER:
                return (
                    <RegisterCustomer onHide={() => {this.props._handleClose()}}/>
                );

            case modals.SHOW_REGISTER_CONSULTANT:
                return (
                    <ConsultantRegisterModal onHide={() => {this.props._handleClose()}}/>
                );

            case modals.SHOW_ADD_RESTAURANT:
                return (
                    <AddRestaurantModal onHide={() => {this.props._handleClose()}}/>
                );
            case modals.SHOW_EDIT_RESTAURANT:
                return (
                    <EditRestaurantModal onHide={() => {this.props._handleClose()}}/>
                );
            case modals.SHOW_ADD_MENU:
                return (
                    <AddMenuModal onHide={() => {this.props._handleClose()}}/>
                );
            case modals.SHOW_EDIT_MENU:
                return (
                    <EditMenuModal onHide={() => {this.props._handleClose()}}/>
                );

            case modals.SHOW_PENDING_REVIEW:
                return (
                    <PendingReviewModal
                        onHide={() => {this.props._handleClose()}}/>
                );

            case modals.SHOW_ADD_DISH:
            case modals.SHOW_ADD_DRINK:
                return (
                    <AddMenuItemModal onHide={() => {this.props._handleClose()}}/>
                );

            case modals.SHOW_EDIT_DISH:
            case modals.SHOW_EDIT_DRINK:
                return (
                    <EditMenuItemModal onHide={() => {this.props._handleClose()}}/>
                );

            case modals.SHOW_CHANGE_PASSWORD:
                return (
                    <ChangePasswordModal onHide={() => this.props._handleClose()}/>
                );
            default:
                return null;
        }
    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        if(this.props._modal !== modals.HIDE_ALL) {
            return(
                <Modal show={true} onHide={() => {this.props._handleClose()}} backdrop="static" centered>
                    {this.getVisibleModal(this.props._modal)}
                </Modal>
            );
        }
        else {
            return null;
        }
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">x
const mapStateToProps = (state) => {
    return {
        _modal: state._modalReducer._modal,
        _menu: state._menuReducer._menu,
        _restaurantInfo: state._restaurantReducer._restaurantInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        _handleClose: () => {
            dispatch(_setModal(modals.HIDE_ALL));
            dispatch(_setMenu(null));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal)
//</editor-fold>
