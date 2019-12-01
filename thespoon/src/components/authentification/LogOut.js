import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {Modal} from "react-bootstrap";
import {IconExit} from "../Icons";
import {logOut} from "../../actionCreators/logInActionCreators";
import {connect} from "react-redux";
import {bindCallback, of, throwError} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {paths} from "../../constants/paths";

class LogOut extends Component {

    handleLogOut = (event) => {
        event.preventDefault();
        this.props.logOut();
        this.props.onHide();
        return <Redirect to={{pathname: "/"}}/>

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

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    };
};

export default connect(null, mapDispatchToProps)(LogOut)