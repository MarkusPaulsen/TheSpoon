//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setModalVisibilityFilterAction} from "../actionCreators/modalVisibilityFilterActionCreators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../constants/modalVisibiltyFilters";
import {roles} from "../constants/roles";
//</editor-fold>
//<editor-fold desc="Modals">
import LogIn from "../components/authentification/LogIn";
import LogOut from "../components/authentification/LogOut";
import RegisterRestaurantowner from "../components/authentification/RegisterRestaurantowner";
import FillRestaurantInfo from "../components/authentification/FillRestaurantInfo"
import EditRestaurantInfoModal from "../components/restaurantPage/EditRestaurantInfoModal";
import AddMenuModal from "../components/restaurantPage/AddMenuModal";
import EditMenuModal from "../components/restaurantPage/EditMenuModal";
import AddDishModal from "../components/restaurantPage/AddDishModal";
import AddDrinkModal from "../components/restaurantPage/AddDrinkModal";
import {setCurrentMenu} from "../actionCreators/CurrentMenuActionCreators";
//</editor-fold>

class CustomModal extends Component {

    //<editor-fold desc="Business Logic">
    getVisibleModal = (filter, item) => {
        switch (filter) {
            case modalVisibilityFilters.SHOW_LOGIN:
                return (
                    <LogIn onHide={() => this.props.handleClose()} />
                );

            case modalVisibilityFilters.SHOW_LOGOUT:
                return (
                    <LogOut onHide={() => this.props.handleClose()} />
                );

                /*TO REMOVE
            case modalVisibilityFilters.SHOW_CHOOSE_ROLE:
                return (
                    <ChooseRoleModal onHide={() => this.props.handleClose()} />
                );*/

            case modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER:
                return (
                    <RegisterRestaurantowner
                        role={roles.RESTAURANT_OWNER}
                        onHide={() => this.props.handleClose()}/>
                );
            case modalVisibilityFilters.SHOW_RESTAURANT_INFORMATION:
                return (
                    <FillRestaurantInfo
                        role={roles.RESTAURANT_OWNER}
                        onHide={() => this.props.handleClose()}
                        />
                );
            case modalVisibilityFilters.SHOW_EDIT_RESTAURANT_INFORMATION:
                return (
                    <EditRestaurantInfoModal
                        onHide={() => this.props.handleClose()}/>
                );
            case modalVisibilityFilters.SHOW_ADD_MENU:
                return (
                    <AddMenuModal
                        onHide={() => this.props.handleClose()}/>
                );
            case modalVisibilityFilters.SHOW_EDIT_MENU:
                return (
                    <EditMenuModal
                        onHide={() => this.props.handleClose()}
                        menu={ item }/>
                );

            case modalVisibilityFilters.SHOW_ADD_DISH:
                return (
                    <AddDishModal
                        onHide={() => this.props.handleClose()}/>
                );

            case modalVisibilityFilters.SHOW_ADD_DRINK:
                return (
                    <AddDrinkModal
                        onHide={() => this.props.handleClose()}/>
                )
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
            dispatch(setModalVisibilityFilterAction(modalVisibilityFilters.HIDE_ALL))
            dispatch(setCurrentMenu(null))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal)
//</editor-fold>