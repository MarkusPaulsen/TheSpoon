import React, {Component} from "react";
import {authentificationModalVisibilityFilters} from "../constants/authentificationModalVisibiltyFilters";
import {connect} from "react-redux";
import ChooseRoleModal from "../components/authentification/ChooseRoleModal";
import {Modal} from "react-bootstrap";
import {setAuthentificatonModalVisibilityFilterAction} from "../actions/authentificationModalAction";
import LogIn from "../components/authentification/LogIn";
import Register from "../components/authentification/Register";


const mapStateToProps = (state) => {
    return {
        authentificationModalVisibilityFilter: state.authentificationModalVisibilityFilter
    }
}

const mapDispatchToProps = dispatch => ({
    handleClose: () => dispatch(setAuthentificatonModalVisibilityFilterAction(authentificationModalVisibilityFilters.HIDE_ALL))
})


class AuthentficationModal extends Component {

    getVisibleModal = filter => {
        switch (filter) {
            case authentificationModalVisibilityFilters.SHOW_LOGIN:
                return (
                    <Modal show={true} onHide={() => this.props.handleClose()} centered>
                        <LogIn
                            onHide={() => this.props.handleClose()}
                        />
                    </Modal>
                )
            case authentificationModalVisibilityFilters.SHOW_CHOOSE_ROLE:
                return (
                    <Modal show={true} onHide={() => this.props.handleClose()} centered>
                        <ChooseRoleModal
                            onHide={() => this.props.handleClose()}
                            />
                    </Modal>
                )
            case authentificationModalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER:
                return (
                    <Modal show={true} onHide={() => this.props.handleClose()} centered>
                        <Register
                            role="restaurant owner"
                            onHide={() => this.props.handleClose()}/>
                    </Modal>
                )
            case authentificationModalVisibilityFilters.SHOW_REGISTER_CUSTOMER:
                return (
                    <Modal show={true} onHide={() => this.props.handleClose()} centered>
                        <Register
                            role="customer"
                            onHide={() => this.props.handleClose()}
                        />
                    </Modal>
                )
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                {this.getVisibleModal(this.props.authentificationModalVisibilityFilter)}
            </>

        );
    }
}

//wrap App in connect and pass in mapStateToProps
//export default connect(mapStateToProps)(AuthentficationModal)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthentficationModal)