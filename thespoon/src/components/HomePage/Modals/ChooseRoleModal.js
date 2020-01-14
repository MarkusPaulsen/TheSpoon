//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {modals} from "../../../constants/Modals";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";

//</editor-fold>


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
        if (this.props._backgroundPage == null) {
            // noinspection JSLint
            return (<p>Something went wrong.</p>);
        } else if (this.state.token == null || this.state.token === "null") {
            //<editor-fold desc="Render No Token">
            return (
                <Modal.Body>
                    <button
                        className="exit"
                        onClick={this.props.onHide}
                    >
                        <IconExit/>
                    </button>
                    <div className="modal-wrapper choose-role">
                        <form>
                            <h2 className="title">
                                Sign up
                            </h2>
                            <button className="wide">
                                <FilterLink
                                    modal={modals.SHOW_REGISTER_RESTAURANT_OWNER}
                                >
                                    Restaurant owner
                                </FilterLink>
                            </button>
                            <button className="wide">
                                <FilterLink
                                    modal={modals.SHOW_REGISTER_CUSTOMER}
                                >
                                    Customer
                                </FilterLink>
                            </button>
                        </form>
                        <div className="link-wrapper">
                            <small>
                                Already have an account?
                                <FilterLink
                                    modal={modals.SHOW_LOGIN}
                                >
                                    Log in
                                </FilterLink>
                            </small>
                        </div>
                    </div>
                </Modal.Body>
            );
            //</editor-fold>
        } else {
            return (<p>Something went wrong.</p>);
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

export default connect(mapStateToProps, null)(ChooseRoleModal);

//</editor-fold>
