//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>

//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

class LogOutModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([]);

        //</editor-fold>

        //<editor-fold desc="Handler Function Registration">
        this.handleLogOut = this.handleLogOut.bind(this);

        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false
        };
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleLogOut = (event) => {
        event.preventDefault();
        window.localStorage.setItem("token", null);
        window.localStorage.setItem("user", null);
        this.props._backgroundPage.update();
        this.props.onHide();
    };

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if(this.props._backgroundPage == null) {
            return(<p>Something went wrong.</p>);
        } else if(this.state.token == null || this.state.token === "null" ) {
            return(<p>Something went wrong.</p>);
        } else {
            return (
                <Modal.Body>
                    <button
                        className="exit"
                        onClick={this.props.onHide}
                    >
                        <IconExit />
                    </button>
                    <div className="modal-wrapper logout">
                        <form>
                            <h2 className="title">
                                Log out
                            </h2>
                            <label>
                                Are you sure you want to logout?
                            </label>
                            <button
                                className="wide"
                                onClick={this.handleLogOut}
                            >
                                Yes
                            </button>
                            <button
                                className="wide"
                                onClick={this.props.onHide}
                            >
                                No
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            );
        }
    }

    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        _backgroundPage: state._backgroundPageReducer._backgroundPage
    };
};

export default connect(mapStateToProps, null)(LogOutModal);

//</editor-fold>