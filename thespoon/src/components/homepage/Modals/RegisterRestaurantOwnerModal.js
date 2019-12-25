//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {exhaustMap, map, take} from "rxjs/operators";
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
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconName, IconEmail, IconPassword, IconExit, IconBack} from "../../Icons";
import {timeout} from "../../../constants/timeout";

//</editor-fold>


class RegisterRestaurantOwnerModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([{
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "E-mail is required."
        }, {
            field: "email",
            method: (email) => {return email.length >= 6},
            validWhen: true,
            message: "Email is required to be longer or equal 6 characters."
        }, {
            field: "email",
            method: "isEmail",
            validWhen: true,
            message: "Email is required to be valid."
        }, {
            field: "username",
            method: "isEmpty",
            validWhen: false,
            message: "Username is required."
        },/*{
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
            field: "name",
            method: "isEmpty",
            validWhen: false,
            message: "Name is required."
        },/*{
            field: "name",
            method: "isAlpha",
            validWhen: true,
            message: "Name is required to be alphabetic."
        },*/ {
            field: "name",
            method: (name) => {return name.length >= 1},
            validWhen: true,
            message: "Name is required to be longer or equal 1 characters."
        },  {
            field: "surname",
            method: "isEmpty",
            validWhen: false,
            message: "Surname is required."
        },/*{
            field: "surname",
            method: "isAlpha",
            validWhen: true,
            message: "Surname is required to be alphabetic."
        },*/ {
            field: "surname",
            method: (surname) => {return surname.length >= 1},
            validWhen: true,
            message: "Surname is required to be longer or equal 1 characters."
        },  {
            field: "password",
            method: "isEmpty",
            validWhen: false,
            message: "Password is required."
        },/*{
            field: "password",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Password is required to be alphanumeric."
        },*/ {
            field: "password",
            method: (password) => {return password.length >= 5},
            validWhen: true,
            message: "Password is required to be longer or equal 5 characters."
        }, {
            field: "confirmPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Password confirmation is required."
        },/*{
            field: "confirmPassword",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Password confirmation is required to be alphanumeric."
        },*/ {
            field: "confirmPassword",
            method: (confirmPassword) => {return confirmPassword.length >= 5},
            validWhen: true,
            message: "Password confirmation is required to be longer or equal 5 characters."
        }, {
            field: "confirmPassword",
            method: (confirmPassword, state) => (confirmPassword === state.password),
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
            email: "",
            username: "",
            name: "",
            surname: "",
            password: "",
            confirmPassword: ""
        };
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleSubmit = event => {
        event.preventDefault();

        //thisTemp is the this of RxJS
        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    email: values.email,
                    username: values.username,
                    name: values.name,
                    surname: values.surname,
                    password: values.password,
                    confirmPassword: values.confirmPassword
                });
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: ""
                });
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.props.logIn(thisTemp.state.username);
                    thisTemp.setState({serverMessage: "Registration is processing"});
                    return ajax({
                        url: paths["restApi"]["registrationRestaurantOwner"],
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: {
                            username: thisTemp.state.username,
                            name: thisTemp.state.name,
                            surname: thisTemp.state.surname,
                            email: thisTemp.state.email,
                            password: thisTemp.state.password
                        },
                        timeout: timeout,
                        responseType: "text"
                    });
                } else {
                    return throwError({
                        name: "InternalError",
                        status: 0,
                        response: null
                    });
                }
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    let response = JSON.parse(next.response);
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("restaurantOwner", "true");
                    thisTemp.props.backgroundPage.update();
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
        if((this.state.token != null && this.state.token !== "null") || this.props.backgroundPage == null) {
            return(<p>Something went wrong.</p>);
        }
        else {
            let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
            return (
                <Modal.Body>
                <span className="back"><FilterLink
                    filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}><IconBack/></FilterLink></span>
                    <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                    <div className="modal-wrapper ">
                        <Form ref={(c) => {
                            this.form = c;
                        }} onSubmit={this.handleSubmit}>
                            <h2>Sign up</h2>
                            <div className="account-type">
                                <h4>as a <span className="role">Restaurant Owner</span></h4>
                            </div>

                            <div className="input-field">
                                <IconEmail/>
                                <Input type="email" name="email" placeholder="E-mail"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.email.message}</small>
                            </div>

                            <div className="input-field">
                                <IconName/>
                                <Input type="text" name="username" placeholder="Username"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.username.message}</small>
                            </div>

                            <div className="input-field name">
                                <IconName/>
                                <Input type="text" name="name" placeholder="First name"/>
                                <Input type="text" name="surname" placeholder="Surname"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.name.message}</small>
                                <small>{validation.surname.message}</small>
                            </div>

                            <div className="input-field">
                                <IconPassword/>
                                <Input type="password" name="password" placeholder="Password"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.password.message}</small>
                            </div>

                            <div className="input-field">
                                <IconPassword/>
                                <Input type="password" id="confirm-password" name="confirmPassword"
                                       placeholder="Confirm password"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.confirmPassword.message}</small>
                            </div>

                            <Button type="submit" className="normal">Sign up</Button>
                            <div className="error-block">
                                <small>{this.state.serverMessage}</small>
                            </div>

                        </Form>
                        <div className="link-wrapper">
                            <small>Already have an account? <FilterLink filter={modalVisibilityFilters.SHOW_LOGIN}>Log
                                in</FilterLink></small>
                        </div>
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

export default connect(mapStateToProps, null)(RegisterRestaurantOwnerModal);
//</editor-fold>
