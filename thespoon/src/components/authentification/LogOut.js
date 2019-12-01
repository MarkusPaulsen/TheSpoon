import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {Modal} from "react-bootstrap";
import {IconExit, IconName, IconPassword} from "../Icons";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";

class LogOut extends Component {

    handleLogOut = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="modal-wrapper logout">
                    <form>
                        <h2 className="title">Log out</h2>
                        <label>Are you sure you want to logout?</label>
                        <button className="wide" onClick={this.handleLogOut}>
                          Yes
                        </button>
                        <button className="wide" onClick={this.props.onHide}>
                           No
                        </button>
                    </form>
                </div>
            </Modal.Body>
        )
    }
}

export default LogOut;