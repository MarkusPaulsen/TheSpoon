//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {logOut} from "../../../actionCreators/logInActionCreators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>

//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
//</editor-fold>

class LogOutModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleLogOut = (event) => {
        event.preventDefault();
        this.props.logOut();
        this.props.onHide();
    };
    //</editor-fold>

    //<editor-fold desc="Render">
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
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    };
};

export default connect(null, mapDispatchToProps)(LogOutModal)
//</editor-fold>