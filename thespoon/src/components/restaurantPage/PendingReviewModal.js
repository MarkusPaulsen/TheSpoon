//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {take, exhaustMap, map} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Textarea from "react-validation/build/textarea";
import Form from "react-validation/build/form";
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Icons">
import {IconExit} from "../Icons";
//</editor-fold>

//<editor-fold desc="Components">
import ReviewItem from "./ReviewItem";
//</editor-fold>

class PendingReviewModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);
    }



    //<editor-fold desc="Render">
    render() {
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="modal-wrapper add-menu">
                    <Form ref={(c) => {this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2>Pending Reviews</h2>
                        <ReviewItem/>
                        <ReviewItem/>
                        <ReviewItem/>
                    </Form>
                </div>
            </Modal.Body>
        )
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        token: state.logInReducer.token
    };
};

export default connect(mapStateToProps, null)(PendingReviewModal);
//</editor-fold>