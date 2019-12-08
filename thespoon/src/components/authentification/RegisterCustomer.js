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
import {logIn, failLogIn, successLogIn} from "../../actionCreators/logInActionCreators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../constants/paths";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconName, IconEmail, IconPassword, IconExit, IconBack} from "../Icons";

//</editor-fold>


class RegisterCustomer extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.validator = new FormValidator([{
                field: "email",
                method: "isEmpty",
                validWhen: false,
                message: "E-mail is required."
            },
            {
                field: "email",
                method: "isEmail",
                validWhen: true,
                message: "That is not a valid email."
            },
            {
                field: "username",
                method: "isEmpty",
                validWhen: false,
                message: "Username is required."
            },
            {
                field: "password",
                method: "isEmpty",
                validWhen: false,
                message: "Password is required."
            },
            {
                field: "confirmPassword",
                method: "isEmpty",
                validWhen: false,
                message: "Password confirmation is required."
            },
            {
                field: "confirmPassword",
                method: this.passwordMatch,
                validWhen: true,
                message: "Confirm password has to be identical to the password."
            }]);

        this.passwordMatch = this.passwordMatch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false
        };
    }
    //</editor-fold>

    //<editor-fold desc="Business Logic">
    passwordMatch = (confirmation, state) => (state.password === confirmation);

    handleSubmit = event => {
        event.preventDefault();

        //get the this for RxJs
        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues()
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    email: values.email,
                    username: values.username,
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
                        url: paths["restApi"]["registrationCustomer"],
                        method: "POST",
                        header: {"Content-Type": "application/json"},
                        body: {
                            username: thisTemp.state.username,
                            email: thisTemp.state.email,
                            password: thisTemp.state.password
                        }
                    });
                } else {
                    return throwError({status: 0});
                }
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    thisTemp.props.successLogIn(next.response.token);
                    thisTemp.setState({serverMessage: "Username is already taken"});
                    thisTemp.props.onHide();
                }, (error) => {
                    thisTemp.props.failLogIn();
                    switch (error.status) {
                        case 400:
                            thisTemp.setState({serverMessage: "Username is already taken"});
                            break;
                        case 404:
                            thisTemp.setState({serverMessage: "No connection to the server"});
                            break;
                        case 0:
                            thisTemp.setState({serverMessage: ""});
                            break;
                        default:
                            thisTemp.setState({serverMessage: "General error"});
                            break;
                    }
                }
            );

    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        let validation = this.submitted ?                         // if the form has been submitted at least once
            this.validator.validate(this.state) :               // then check validity every time we render
            this.state.validation;
        return (
            <Modal.Body>
                <span className="back"> <FilterLink filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}><IconBack/></FilterLink></span>
                <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                <div className="modal-wrapper ">
                    <Form ref={(c) => {
                        this.form = c;
                    }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2>Sign up</h2>
                        <div className="account-type">
                            <h4>as a <span className="role">{this.props.role}</span></h4>
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
                        <small>Already have an account? <FilterLink filter={modalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                    </div>
                </div>
            </Modal.Body>
        );
    }
    //</editor-fold>

}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => ({
    logIn: (username) => dispatch(logIn(username)),
    failLogIn: () => dispatch(failLogIn()),
    successLogIn: (token) => dispatch(successLogIn(token, false))
})

export default connect(null, mapDispatchToProps)(RegisterCustomer);
//</editor-fold>
