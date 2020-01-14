//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/Paths";
import {timeouts} from "../../../constants/Timeouts"
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit, IconPassword} from "../../Icons";

//</editor-fold>


class ChangePasswordModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([{
            field: "oldPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Old password is required."
        }, {
            field: "oldPassword",
            method: (oldPassword) => {
                return oldPassword.length >= 5
            },
            validWhen: true,
            message: "Old password is required to be longer or equal 5 characters."
        }, {
            field: "newPassword",
            method: "isEmpty",
            validWhen: false,
            message: "New password is required."
        }, {
            field: "newPassword",
            method: (newPassword) => {
                return newPassword.length >= 5
            },
            validWhen: true,
            message: "New password is required to be longer or equal 5 characters."
        }, {
            field: "confirmNewPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Confirm new password is required."
        }, {
            field: "confirmNewPassword",
            method: (confirmNewPassword) => {
                return confirmNewPassword.length >= 5
            },
            validWhen: true,
            message: "Confirm new password is required to be longer or equal 5 characters."
        }, {
            field: "confirmNewPassword",
            method: (confirmPassword, state) => {
                return confirmPassword === state.confirmNewPassword
            },
            validWhen: true,
            message: "Password confirmation has to be identical to the password."
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
            //<editor-fold desc="Login States">
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""

            //</editor-fold>
        };
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleSubmit = (event) => {
        event.preventDefault();

        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                    confirmNewPassword: values.confirmNewPassword
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: ""
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.setState({serverMessage: "Change password is processing"});
                    return ajax({
                        url: paths["restApi"]["password"],
                        method: "PUT",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.state.token},
                        body: {
                            oldPassword: thisTemp.state.oldPassword,
                            newPassword: thisTemp.state.newPassword
                        },
                        timeout: timeouts,
                        responseType: "text"
                    })
                } else {
                    return throwError({
                        name: "InternalError",
                        status: 0,
                        response: null
                    });
                }
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    thisTemp.props._backgroundPage.update();
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
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if (this.props._backgroundPage == null) {
            // noinspection JSLint
            return (<p>Something went wrong.</p>);
        } else if (this.state.token == null || this.state.token === "null") {
            return (<p>Something went wrong.</p>);
        } else {
            //<editor-fold desc="Render No Token">
            return (
                <Modal.Body>
                    <button
                        className="exit"
                        onClick={this.props.onHide}
                    >
                        <IconExit/>
                    </button>
                    <div className="modal-wrapper ">
                        <Form
                            ref={(c) => {
                                this.form = c;
                            }}
                            onSubmit={this.handleSubmit}
                        >
                            <h2 className="title">
                                Change Password
                            </h2>

                            <div className="input-field old-password">
                                <IconPassword/>
                                <Input
                                    type="password"
                                    pattern=".{5,}"
                                    title="Old Password must contain at least 5 letters."
                                    name="oldPassword"
                                    placeholder="Old Password"
                                    id="oldPassword"
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.oldPassword.message}
                                </small>
                            </div>
                            <div className="input-field">
                                <IconPassword/>
                                <Input
                                    type="password"
                                    pattern=".{5,}"
                                    title="New Password must contain at least 5 letters."
                                    name="newPassword"
                                    placeholder="New Password"
                                    id="newPassword"
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.newPassword.message}
                                </small>
                            </div>
                            <div className="input-field">
                                <IconPassword/>
                                <Input
                                    type="password"
                                    pattern=".{5,}"
                                    title="Confirm New Password must contain at least 5 letters."
                                    name="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                    id="confirmNewPassword"
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.confirmNewPassword.message}
                                </small>
                            </div>
                            <Button
                                type="submit"
                                className="normal"
                            >
                                Update
                            </Button>
                            <div className="error-block">
                                <small>
                                    {this.state.serverMessage}
                                </small>
                            </div>
                        </Form>
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
        _backgroundPage: state._backgroundPageReducer._backgroundPage
    };
};

export default connect(mapStateToProps, null)(ChangePasswordModal);
//</editor-fold>