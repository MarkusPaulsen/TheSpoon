//TO REMOVE
import React, {Component} from "react";
import {IconExit} from "../../Icons";
import {Modal} from "react-bootstrap";
import {modalVisibilityFilters} from "../../../constants/modalVisibiltyFilters";
import FilterLink from "../../../containers/FilterModalLink";
import {connect} from "react-redux";
import FormValidator from "../../../validation/FormValidator";



class ChooseRoleModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([]);

        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false
        };
    }

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if(this.props.backgroundPage == null) {
            return(<p>Something went wrong.</p>);
        } else if(this.state.token == null || this.state.token === "null" ) {
            return(<p>Something went wrong.</p>);
        } else {
            //<editor-fold desc="Render Token">
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
            );
            //</editor-fold>
        }
    }

    //</editor-fold>

}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        backgroundPage: state.backgroundPageReducer.backgroundPage
    };
};

export default connect(mapStateToProps, null)(ChooseRoleModal);

//</editor-fold>
