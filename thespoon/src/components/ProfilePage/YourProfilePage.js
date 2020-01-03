//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../constants/paths";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconName, IconEmail} from "../Icons";
import {timeout} from "../../constants/timeout";
//</editor-fold>
//<editor-fold desc="Layout">
import MainLayout from "../Layout/MainLayout.js";
//</editor-fold>


class YourProfilePage extends Component {

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
        }]);
        //</editor-fold>

        //<editor-fold desc="Handler Function Registration">
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.update = this.update.bind(this);
        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false,
            //<editor-fold desc="Restaurant Owner States">
            email: "",
            username: "",
            name: "",
            surname: "",
            finishedLoading: false
            //</editor-fold>
        }
    }
    //</editor-fold>

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        this.props.setBackgroundPageHere(this);
        this.setState({
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user"),
            finishedLoading: false
        }, () => {
            //<editor-fold desc="Mount Temporary This">
            const thisTemp = this;
            //</editor-fold>
            //<editor-fold desc="Mount Restaurant Owner Data Observable">
            this.$restaurantOwnerData = ajax({
                url: paths["restApi"]["restaurantOwner"],
                method: "GET",
                headers: {"X-Auth-Token": thisTemp.state.token},
                timeout: timeout,
                responseType: "text"
            })
                .subscribe(
                    (next) => {
                        let response = JSON.parse(next.response);
                        thisTemp.setState({
                            serverMessage: "",
                            email: response.email,
                            username: response.username,
                            name: response.name,
                            surname: response.surname,
                            finishedLoading: true
                        });
                    },
                    (error) => {
                        switch (error.name) {
                            case "AjaxTimeoutError":
                                thisTemp.setState({
                                    serverMessage: "" + "The request timed out.",
                                    email: "",
                                    username: "",
                                    name: "",
                                    surname: "",
                                    finishedLoading: true
                                });
                                break;
                            case "InternalError":
                            case "AjaxError":
                                if (error.status === 0 && error.response === "") {
                                    thisTemp.setState({
                                        serverMessage: "There is no connection to the server.",
                                        email: "",
                                        username: "",
                                        name: "",
                                        surname: "",
                                        finishedLoading: true
                                    });
                                } else if (error.status === 400) {
                                    thisTemp.setState({
                                        serverMessage: "",
                                        email: "",
                                        username: "",
                                        name: "",
                                        surname: "",
                                        finishedLoading: true
                                    });
                                } else {
                                    thisTemp.setState({
                                        serverMessage: error.response,
                                        email: "",
                                        username: "",
                                        name: "",
                                        surname: "",
                                        finishedLoading: true
                                    });
                                }
                                break;
                            default:
                                console.log(error);
                                thisTemp.setState({
                                    restaurantMessage: "Something is not like it is supposed to be.",
                                    email: "",
                                    username: "",
                                    name: "",
                                    surname: "",
                                    finishedLoading: true
                                });
                                break;
                        }
                    }
                );
            //</editor-fold>
        });

    };

    componentWillUnmount() {
        //<editor-fold desc="Unmount Restaurant Owner Data Observable">
        this.$restaurantOwnerData.unsubscribe();
        //</editor-fold>
    }

    //</editor-fold>

    //<editor-fold desc="Bussiness Logic">
    handleSubmit = (event) => {
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }), catchError((error) => {
                return error;
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    email: values.email,
                    username: values.username,
                    name: values.name,
                    surname: values.surname
                });
            }), catchError((error) => {
                return error;
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: ""
                });
            }), catchError((error) => {
                return error;
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.setState({serverMessage: "Menu is edited"});
                    return ajax({
                        url: paths["restApi"]["restaurantOwner"],
                        method: "PUT",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.state.token},
                        body: {
                            email: thisTemp.state.email,
                            username: thisTemp.state.username,
                            name: thisTemp.state.name,
                            surname: thisTemp.state.surname
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
            }), catchError((error) => {
                return error;
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    thisTemp.update()
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

    handleDelete = (event) => {
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return ajax({
                    url: paths["restApi"]["restaurantOwner"],
                    method: "DELETE",
                    headers: {"Content-Type": "application/json", "X-Auth-Token": this.state.token},
                })
            }), catchError((error) => {
                return error;
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    window.localStorage.setItem("token", null);
                    window.localStorage.setItem("user", null);
                    thisTemp.update()
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessage: "The request timed out."});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessage: "No connection to the server."});
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

    update() {
        window.location.reload();
    }

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if (this.state.token == null
            || this.state.token === "null"
            || this.state.user == null
            || this.state.user === "null") {
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else if (this.state.user === "Restaurant Owner") {
            //<editor-fold desc="Render Restaurant Owner">
            if (!this.state.finishedLoading) {
                return (
                    <MainLayout>
                        <div className="mainpage-banner restaurant">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h1>Loading...</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainLayout>
                );
            } else {
                return (
                    <MainLayout>
                        <div className="mainpage-banner">
                            <div className="mainpage-text">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h3 className="title">Your Profile</h3>
                                            <div className="no-menus">
                                                <Form ref={(c) => {
                                                    this.form = c;
                                                }} onSubmit={this.handleSubmit}>
                                                    <div className="input-field">
                                                        <IconEmail/>
                                                        <Input type="email" name="email" placeholder="E-mail" value={this.state.email}/>
                                                    </div>
                                                    <div className="error-block">
                                                        <small>{validation.email.message}</small>
                                                    </div>

                                                    <div className="input-field">
                                                        <IconName/>
                                                        <Input type="text" name="username" placeholder="Username" value={this.state.username}/>
                                                    </div>
                                                    <div className="error-block">
                                                        <small>{validation.username.message}</small>
                                                    </div>

                                                    <div className="input-field name">
                                                        <IconName/>
                                                        <Input type="text" name="name" placeholder="First name" value={this.state.name}/>
                                                        <Input type="text" name="surname" placeholder="Surname" value={this.state.surname}/>
                                                    </div>
                                                    <div className="error-block">
                                                        <small>{validation.name.message}</small>
                                                        <small>{validation.surname.message}</small>
                                                    </div>

                                                    <Button type="submit" className="normal">Update</Button>
                                                    <Button type="button" className="delete-button" onClick={this.handleDelete}>Change Password</Button>
                                                    <div className="error-block">
                                                        <small>{this.state.serverMessage}</small>
                                                    </div>

                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainLayout>
                );
            }

            //</editor-fold>
        } else if (this.state.user === "Customer") {
            return (
                <Redirect to={{pathname: "/CustomerMain"}}/>
            );
        } else if (this.state.user === "Consultant") {
            return (
                <Redirect to={{pathname: "/Consultant"}}/>
            );
        } else {
            return (
                <Redirect to={{pathname: "/ThisShouldNotHaveHappened"}}/>
            );
        }
    }

    //</editor-fold>
    
}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => {
    return {
        setBackgroundPageHere: (backgroundPage) => {
            dispatch(setBackgroundPage(backgroundPage));
        }
    };
};

export default connect(null, mapDispatchToProps)(YourProfilePage);

//</editor-fold>