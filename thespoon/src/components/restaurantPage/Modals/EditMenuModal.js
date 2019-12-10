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
import Textarea from "react-validation/build/textarea";
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/paths";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
import {timeout} from "../../../constants/timeout";
//</editor-fold>


class EditMenuModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.validator = new FormValidator([{
            field: "name",
            method: "isEmpty",
            validWhen: false,
            message: "Menu name is required"
        },
            {
                field: "description",
                method: "isEmpty",
                validWhen: false,
                message: "Description name is required"
            },
            {
                field: "tags",
                method: "isEmpty",
                validWhen: false,
                message: "Tags are required"
            }]);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            name: "",
            description: "",
            tags: "",
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false
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
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    name: values.name,
                    description: values.description,
                    tags: values.tags.split(","),
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
                    thisTemp.setState({serverMessage: "Menu is edited"});
                    return ajax({
                        url: paths["restApi"]["menu"] + "/" + this.props.menu.menuID,
                        method: "PUT",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.props.token},
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
            }))
            .pipe(take(1))
            .subscribe(
                () => {
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

    handleDelete = (event) => {
        event.preventDefault();

        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return ajax({
                    url: paths["restApi"]["menu"] + "/" + this.props.currentMenu.menuID,
                    method: "DELETE",
                    headers: {"Content-Type": "application/json", "X-Auth-Token": this.props.token},
                })
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    thisTemp.props.onHide();
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessage: "Error 408: The request timed out."});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessage: "Error " + error.status + ": " + "No connection to the server."});
                            } else {
                                thisTemp.setState({serverMessage: "Error " + error.status + ": " + error.response});
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({serverMessage: "Code error"});
                            break;
                    }
                }
            );
    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        let validation = this.state.submitted ?                         // if the form has been submitted at least once
            this.validator.validate(this.state) :               // then check validity every time we render
            this.state.validation;

        let tagsString = "";
        this.props.menu.tags.map(tag => {
            tagsString += tag.name + ", ";
        });
        tagsString = tagsString.slice(0, -2);
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="modal-wrapper add-menu">
                    <Form ref={(c) => {this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2 className="title">Edit menu</h2>

                        <div className="input-field">
                            <label>Name</label>
                            <Input type="text" name="name" value={this.props.menu.name}/>
                        </div>
                        <div className="error-block">
                            <small>{validation.name.message}</small>
                        </div>

                        <div className="input-field">
                            <label>Description</label>
                            <Textarea name="description" value={this.props.menu.description}/>
                        </div>
                        <div className="error-block">
                            <small>{validation.description.message}</small>
                        </div>

                        <div className="input-field">
                            <label>Tags</label>
                            <Input type="tags" name="tags" value={tagsString}/>
                        </div>
                        <div className="error-block">
                            <small>{validation.tags.message}</small>
                        </div>

                        <Button type="submit" className="normal">Save</Button>
                        <Button type="button" className="delete-button" onClick={this.handleDelete}>Delete Menu</Button>
                        <div className="error-block">
                            <small>{this.state.serverMessage}</small>
                        </div>
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
        token: state.logInReducer.token,
        currentMenu: state.currentMenuReducer.currentMenu
    };
};

export default connect(mapStateToProps, null)(EditMenuModal);
//</editor-fold>
