import React, { Component } from 'react';
import { IconExit } from '../Icons';
import { Modal } from 'react-bootstrap';
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import FilterLink from "../../containers/FilterModalLink";



class ChooseRoleModal extends Component {
    render() {
        return(
                <Modal.Body>
                    <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                    <div className="sign-up choose-role">
                        <form>
                            <h2 className="title">Sign up</h2>
                            <button className="wide">
                                <FilterLink filter={authentificationModalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}>Restaurant owner</FilterLink>
                            </button>
                            <button className="wide">
                                <FilterLink filter={authentificationModalVisibilityFilters.SHOW_REGISTER_CUSTOMER}>Customer</FilterLink></button>
                        </form>
                        <label className="link-wrapper">
                            <small>Already have an account? <FilterLink filter={authentificationModalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                        </label>
                    </div>
                </Modal.Body>
        )
    }
}

export default ChooseRoleModal;
