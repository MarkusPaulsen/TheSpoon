//TO REMOVE
import React, {Component} from 'react';
import {IconExit} from '../Icons';
import {Modal} from 'react-bootstrap';
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import FilterLink from "../../containers/FilterModalLink";



class ChooseRoleModal extends Component {
    render() {
        return(
                <Modal.Body>
                    <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                    <div className="modal-wrapper choose-role">
                        <form>
                            <h2 className="title">Sign up</h2>
                            <button className="wide">
                                <FilterLink filter={modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}>Restaurant owner</FilterLink>
                            </button>
                            <button className="wide">
                                <FilterLink filter={modalVisibilityFilters.SHOW_REGISTER_CUSTOMER}>Customer</FilterLink></button>
                        </form>
                        <div className="link-wrapper">
                            <small>Already have an account? <FilterLink filter={modalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                        </div>
                    </div>
                </Modal.Body>
        )
    }
}

export default ChooseRoleModal;
