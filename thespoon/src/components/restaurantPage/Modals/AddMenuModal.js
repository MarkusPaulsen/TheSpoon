//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/paths";
import {timeout} from "../../../constants/timeout";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";

//</editor-fold>


class AddMenuModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([{
            field: "name",
            method: "isEmpty",
            validWhen: false,
            message: "Name is required."
        }, /*{
            field: "name",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Name is required to be alphanumeric."
        },*/ {
            field: "name",
            method: (name) => {
                return name.length >= 1;
            },
            validWhen: true,
            message: "Name is required to be longer or equal 1 characters."
        }, {
            field: "description",
            method: "isEmpty",
            validWhen: false,
            message: "Description name is required."
        }, /*{
            field: "description",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Description is required to be alphanumeric."
        },*/ {
            field: "description",
            method: (description) => {
                return description.length >= 1;
            },
            validWhen: true,
            message: "Description is required to be longer or equal 1 characters."
        }, {
            field: "tags",
            method: "isEmpty",
            validWhen: false,
            message: "Tags are required."
        }, /*{
            field: "tags",
            method: "isAlphanumeric (plus comma)",
            validWhen: true,
            message: "Tags are required to be alphanumeric."
        },*/ {
            field: "tags",
            method: (tags) => {
                return tags.split(",")
                    .map((tag) => {
                        return tag.trim();
                    })
                    .map((tag) => {
                        return tag.length >= 1;
                    })
                    .reduce((total, minLength) => {
                        return total && minLength;
                    }, true)
            },
            validWhen: true,
            message: "Each tag is required to be longer or equal 1 characters."
        }]);
        //</editor-fold>

        //<editor-fold desc="Handler Function Registration">
        this.handleSubmit = this.handleSubmit.bind(this);
        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false,
            name: "",
            description: "",
            tags: ""
        };
    }

    //</editor-fold>

    //<editor-fold desc="Bussiness Logic">
    handleSubmit = (event) => {
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }), catchError(error => {
                return error;
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    name: values.name,
                    description: values.description,
                    tags: values.tags.split(",").map(tag => tag.trim())
                });
            }), catchError(error => {
                return error;
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: ""
                });
            }), catchError(error => {
                return error;
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.setState({serverMessage: "Menu is created"});
                    return ajax({
                        url: paths["restApi"]["menu"],
                        method: "POST",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.state.token},
                        body: {
                            name: thisTemp.state.name,
                            description: thisTemp.state.description,
                            tags: thisTemp.state.tags
                        },
                        timeout: timeout,
                        responseType: "text"
                    })
                } else {
                    return throwError({
                        name: "InternalError",
                        status: 0,
                        response: null
                    });
                }
            }), catchError(error => {
                return error;
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    thisTemp.props.backgroundPage.update();
                    thisTemp.props.onHide();
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessage: "The request timed out."});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessage: "There is no connection to the server."});
                            } else {
                                thisTemp.setState({serverMessage: error.response});
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({serverMessage: "Something is not like it is supposed to be."});
                            break;
                    }
                }
            );
    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        if((this.state.token == null || this.state.token === "null") || this.props.backgroundPage == null) {
            return(<p>Something went wrong.</p>);
        }
        else {
            let validation = this.state.submitted ? this.validator.validate(this.state) : this.state.validation;
            return (
                <Modal.Body>
                    <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                    <div className="modal-wrapper add-menu">
                        <Form ref={(c) => {
                            this.form = c;
                        }} onSubmit={(e) => this.handleSubmit(e)}>
                            <h2 className="title">Create menu</h2>
                            <div className="input-field">
                                <label>Name</label>
                                <Input type="text" name="name" placeholder="Name"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.name.message}</small>
                            </div>
                            <div className="input-field">
                                <label>Description</label>
                                <Textarea name="description"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.description.message}</small>
                            </div>
                            <div className="input-field">
                                <label>Tags</label>
                                <Input type="text" name="tags" placeholder="Search"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.tags.message}</small>
                            </div>
                            <Button type="submit" className="normal">Create</Button>
                            <div className="error-block">
                                <small>{this.state.serverMessage}</small>
                            </div>
                        </Form>
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
        backgroundPage: state.backgroundPageReducer.backgroundPage
    };
};

export default connect(mapStateToProps, null)(AddMenuModal);
//</editor-fold>
