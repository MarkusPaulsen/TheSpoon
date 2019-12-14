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
import {modalVisibilityFilters} from "../../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
import {timeout} from "../../../constants/timeout";

//</editor-fold>


class AddMenuItemModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

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
                return name.length >= 1
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
                return description.length >= 1
            },
            validWhen: true,
            message: "Description is required to be longer or equal 1 characters."
        }, {
            field: "priceEuros",
            method: "isEmpty",
            validWhen: false,
            message: "PriceEuros is required."
        }, {
            field: "priceEuros",
            method: (priceEuros) => {
                return !isNaN(priceEuros)
            },
            validWhen: true,
            message: "PriceEuros needs to be a number."
        }, {
            field: "priceEuros",
            method: (priceEuros) => {
                return priceEuros >= 0
            },
            validWhen: true,
            message: "PriceEuros needs to be positive."
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
                        return tag.trim()
                    })
                    .map((tag) => {
                        return tag.length >= 1
                    })
                    .reduce((total, minLength) => {
                        return total && minLength
                    }, true)
            },
            validWhen: true,
            message: "Each tag is required to be longer or equal 1 characters."
        }]);

        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            description: "",
            priceEuros: 0,
            type: "",
            imageID: 0,
            imageMessage: "",
            tags: "",
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false
        };
    }

    //</editor-fold>

    //<editor-fold desc="Bussiness Logic">
    fileSelectedHandler = (event) => {
        const thisTemp = this;
        thisTemp.setState({imageMessage: "", selectedFile: null});
        let file = event.target.files[0];
        if (["image/png", "image/jpeg"].includes(file.type)) {
            let formData = new FormData();
            formData.append("image", file);
            let reader = new FileReader();
            thisTemp.setState({serverMessage: "Image upload is processing"});
            reader.onload = () => {
                ajax({
                    url: paths["restApi"]["image"],
                    method: "POST",
                    headers: {"X-Auth-Token": thisTemp.props.token},
                    body: formData,
                    timeout: timeout,
                    responseType: "text"
                })
                    .pipe(take(1))
                    .subscribe(
                        (next) => {
                            let response = JSON.parse(next.response);
                            thisTemp.setState({imageID: response.imageID, selectedFile: file});
                        }, (error) => {
                            thisTemp.props.failLogIn();
                            switch (error.name) {
                                case "AjaxTimeoutError":
                                    thisTemp.setState({
                                        imageMessage: file.name + " could not be uploaded, as the request timed out.",
                                        serverMessage: ""
                                    });
                                    break;
                                case "InternalError":
                                case "AjaxError":
                                    if (error.status === 0 && error.response === "") {
                                        thisTemp.setState({
                                            imageMessage: file.name + " could not be uploaded, as there is no connection to the server.",
                                            serverMessage: ""
                                        });
                                    } else {
                                        thisTemp.setState({
                                            imageMessage: file.name + " could not be uploaded, as " + error.response,
                                            serverMessage: ""
                                        });
                                    }
                                    break;
                                default:
                                    console.log(error);
                                    thisTemp.setState({
                                        imageMessage: "Something is not like it is supposed to be.",
                                        serverMessage: ""
                                    });
                                    break;
                            }
                        }
                    );
            };
            reader.onerror = () => {
                thisTemp.setState({
                    imageMessage: file.name + " could not be read.",
                    serverMessage: ""
                });
            };
            thisTemp.setState({serverMessage: "Image upload is processing"});
            reader.readAsText(file);
        } else {
            thisTemp.setState({
                imageMessage: file.name + " has the wrong filetype (" + file.type + "). Please only use .jpeg or .png format",
                serverMessage: ""
            });
        }
    };

    handleSubmit = event => {
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
                    priceEuros: parseInt(values.priceEuros),
                    type: thisTemp.props.modalVisibilityFilter === modalVisibilityFilters.SHOW_ADD_DISH ? "dish" : "drink",
                    imageID: thisTemp.state.imageID,
                    tags: values.tags.split(",").map(tag => tag.trim()),
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
                    thisTemp.setState({serverMessage: "New dish is added"});
                    return ajax({
                        url: paths["restApi"]["menu"] + "/" + thisTemp.props.currentMenu.menuID + "/" + "menuItem",
                        method: "POST",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": thisTemp.props.token},
                        body: {
                            name: thisTemp.state.name,
                            description: thisTemp.state.description,
                            priceEuros: thisTemp.state.priceEuros,
                            type: thisTemp.state.type,
                            imageID: thisTemp.state.imageID,
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
                    thisTemp.props.currentMenu.currentRestaurantPage.setState({toUpdate: true});
                    thisTemp.props.currentMenu.currentRestaurantPage.forceUpdate();
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
        let validation = !this.submitted ? this.state.validation : this.validator.validate(this.state);
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                <div className="modal-wrapper restaurant-info">
                    <Form ref={(c) => {
                        this.form = c;
                    }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2>Add</h2>
                        <div className="account-type">
                            <h4><span
                                className="role">{this.props.modalVisibilityFilter === modalVisibilityFilters.SHOW_ADD_DISH ? "dish" : "drink"}</span>
                            </h4>
                        </div>

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
                            <label>Price in Euro (€)</label>
                            <Input name="priceEuros" placeholder="Price"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.priceEuros.message}</small>
                        </div>

                        <div className="input-field image">
                            <label>Image</label>
                            <input type="file" name="file" id="file" className="inputfile"
                                   onChange={this.fileSelectedHandler}/>
                            <label htmlFor="file">+ Upload image</label>
                            {this.state.selectedFile &&
                            <label className="selected-file">
                            <span onClick={this.removeFile}
                                  role="button"
                                  className="remove-button">
                                X
                            </span>
                                {this.state.selectedFile.name}
                            </label>
                            }
                        </div>
                        <div className="error-block">
                            <small>{this.state.imageMessage}</small>
                        </div>

                        <div className="input-field">
                            <label>Tags</label>
                            <Input type="tags" name="tags" placeholder="Tags"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.tags.message}</small>
                        </div>

                        <Button type="submit" className="normal">Add</Button>
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
        modalVisibilityFilter: state.modalVisibiltyFilterReducer.modalVisibilityFilter,
        currentMenu: state.currentMenuReducer.currentMenu,
        currentRestaurantPage: state.currentMenuReducer.currentRestaurantPage
    };
};

export default connect(mapStateToProps, null)(AddMenuItemModal);
//</editor-fold>
