//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setModalVisibilityFilterAction} from "../actionCreators/modalVisibilityFilterActionCreators";
import {setCurrentMenu} from "../actionCreators/CurrentMenuActionCreators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Modals">
import LogInModal from "../components/homepage/Modals/LogInModal";
import LogOutModal from "../components/homepage/Modals/LogOutModal";
import RegisterRestaurantowner from "../components/homepage/Modals/RegisterRestaurantOwnerModal";
import AddRestaurantModal from "../components/homepage/Modals/AddRestaurantModal"
import EditRestaurantModal from "../components/restaurantPage/Modals/EditRestaurantModal";
import AddMenuModal from "../components/restaurantPage/Modals/AddMenuModal";
import EditMenuModal from "../components/restaurantPage/Modals/EditMenuModal";
import AddMenuItemModal from "../components/restaurantPage/Modals/AddMenuItemModal";
import EditMenuItemModal from "../components/restaurantPage/Modals/EditMenuItemModal";
import ChooseRoleModal from "../components/homepage/Modals/ChooseRoleModal";
import RegisterCustomer from "../components/homepage/Modals/RegisterCustomerModal";
import PendingReviewModal from "../components/restaurantPage/Modals/PendingReviewModal";
//</editor-fold>

class CustomModal extends Component {

    //<editor-fold desc="Business Logic">
    getVisibleModal = (filter, item) => {
        switch (filter) {
            case modalVisibilityFilters.SHOW_LOGIN:
                return (
                    <LogInModal onHide={() => this.props.handleClose()} />
                );

            case modalVisibilityFilters.SHOW_LOGOUT:
                return (
                    <LogOutModal onHide={() => this.props.handleClose()} />
                );

            case modalVisibilityFilters.SHOW_CHOOSE_ROLE:
                return (
                    <ChooseRoleModal onHide={() => this.props.handleClose()} />
                );

            case modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER:
                return (
                    <RegisterRestaurantowner onHide={() => this.props.handleClose()}/>
                );

            case modalVisibilityFilters.SHOW_REGISTER_CUSTOMER:
                return (
                    <RegisterCustomer onHide={() => this.props.handleClose()}/>
                );

            case modalVisibilityFilters.SHOW_ADD_RESTAURANT:
                return (
                    <AddRestaurantModal onHide={() => this.props.handleClose()}/>
                );
            case modalVisibilityFilters.SHOW_EDIT_RESTAURANT:
                return (
                    <EditRestaurantModal onHide={() => this.props.handleClose()}/>
                );
            case modalVisibilityFilters.SHOW_ADD_MENU:
                return (
                    <AddMenuModal onHide={() => this.props.handleClose()}/>
                );
            case modalVisibilityFilters.SHOW_EDIT_MENU:
                return (
                    <EditMenuModal onHide={() => this.props.handleClose()} menu={ item }/>
                );

            case modalVisibilityFilters.SHOW_PENDING_REVIEW:
                return (
                    <PendingReviewModal
                        onHide={() => this.props.handleClose()}/>
                );

            case modalVisibilityFilters.SHOW_ADD_DISH:
            case modalVisibilityFilters.SHOW_ADD_DRINK:
                return (
                    <AddMenuItemModal onHide={() => this.props.handleClose()}/>
                );

            case modalVisibilityFilters.SHOW_EDIT_DISH:
            case modalVisibilityFilters.SHOW_EDIT_DRINK:
                return (
                    <EditMenuItemModal onHide={() => this.props.handleClose()} menuItem={ item }/>
                );
            default:
                return null;
        }
    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        if(this.props.modalVisibilityFilter !== modalVisibilityFilters.HIDE_ALL) {
            return(
                <Modal show={true} onHide={() => this.props.handleClose()} centered>
                    {this.getVisibleModal(this.props.modalVisibilityFilter, this.props.currentMenu)}
                </Modal>
            );
        }
        else {
            return null;
        }
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        modalVisibilityFilter: state.modalVisibiltyFilterReducer.modalVisibilityFilter,
        currentMenu: state.currentMenuReducer.currentMenu
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => {
            dispatch(setModalVisibilityFilterAction(modalVisibilityFilters.HIDE_ALL));
            dispatch(setCurrentMenu(null));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal)
//</editor-fold>
