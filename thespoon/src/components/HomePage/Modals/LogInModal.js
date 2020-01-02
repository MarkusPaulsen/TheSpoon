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
import {paths} from "../../../constants/paths";
import {modalVisibilityFilters} from "../../../constants/modalVisibiltyFilters";
import {timeout} from "../../../constants/timeout"
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit, IconName, IconPassword} from "../../Icons";

//</editor-fold>


class LogInModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([{
            field: "username",
            method: "isEmpty",
            validWhen: false,
            message: "Username is required."
        }, /*{
            field: "username",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Username is required to be alphanumeric."
        },*/ {
            field: "username",
            method: (username) => {return username.length >= 5},
            validWhen: true,
            message: "Username is required to be longer or equal 5 characters."
        }, {
            field: "password",
            method: "isEmpty",
            validWhen: false,
            message: "Password is required."
        }, /*{
            field: "password",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Password is required to be alphanumeric."
        },*/ {
            field: "password",
            method: (password) => {return password.length >= 5},
            validWhen: true,
            message: "Password is required to be longer or equal 5 characters."
        } ]);

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
            username: "",
            password: ""

            //</editor-fold>
        };
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleSubmit = (event) => {
        console.log("Step 1")
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
                    username: values.username,
                    password: values.password
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
                    thisTemp.setState({serverMessage: "Login is processing"});
                    return ajax({
                        url: paths["restApi"]["login"],
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: {
                            username: thisTemp.state.username,
                            password: thisTemp.state.password,
                            isRestaurantOwner: true,
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
                (next) => {
                    let response = JSON.parse(next.response);
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("user", "Restaurant Owner");
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
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if(this.props.backgroundPage == null) {
            return(<p>Something went wrong.</p>);
        } else if(this.state.token == null || this.state.token === "null" ) {
            //<editor-fold desc="Render No Token">
            return (
                <Modal.Body>
                    <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                    <div className="modal-wrapper ">
                        <Form ref={(c) => {
                            this.form = c;
                        }} onSubmit={this.handleSubmit}>
                            <h2 className="title">Log in</h2>

                            <div className="input-field">
                                <IconName/>
                                <Input type="text" name="username" placeholder="Username" id="loginFormUsername"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.username.message}</small>
                            </div>

                            <div className="input-field">
                                <IconPassword/>
                                <Input type="password" name="password" placeholder="Password" id="loginFormPassword"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.password.message}</small>
                            </div>

                            <Button type="submit" className="normal">Log in</Button>
                            <div className="error-block">
                                <small>{this.state.serverMessage}</small>
                            </div>
                        </Form>

                        <div className="link-wrapper">
                            <small>Don't have an account? <FilterLink
                                filter={modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}>Register
                                now</FilterLink></small>
                        </div>
                    </div>
                </Modal.Body>
            );

            //</editor-fold>
        } else {
            return(<p>Something went wrong.</p>);
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

export default connect(mapStateToProps, null)(LogInModal);

//</editor-fold>
