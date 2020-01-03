//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, fromEvent, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catchError, exhaustMap, map, take, bufferTime, filter, distinctUntilChanged} from "rxjs/operators";
import {readFileURL} from "../Tools/FileReader"
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import validator from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/paths";
import {modalVisibilityFilters} from "../../../constants/modalVisibiltyFilters";
import {timeout} from "../../../constants/timeout";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
//</editor-fold>
//<editor-fold desc="Items">
import TagItem from "../Items/TagItem";

//</editor-fold>


class AddMenuItemModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([{
            field: "name",
            method: "isEmpty",
            validWhen: false,
            message: "Name is required."
        }, {
            field: "name",
            method: (name) => {
                return validator.isAlphanumeric(name);
            },
            validWhen: true,
            message: "Name is required to be alphanumeric."
        }, {
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
        }, {
            field: "description",
            method: (description) => {
                return validator.isAlphanumeric(description);
            },
            validWhen: true,
            message: "Description is required to be alphanumeric."
        }, {
            field: "description",
            method: (description) => {
                return description.length >= 1;
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
                return !isNaN(priceEuros);
            },
            validWhen: true,
            message: "PriceEuros needs to be a number."
        }, {
            field: "priceEuros",
            method: (priceEuros) => {
                return priceEuros >= 0;
            },
            validWhen: true,
            message: "PriceEuros needs to be positive."
        }]);

        //</editor-fold>

        //<editor-fold desc="Handler Function Registration">
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.handleFileDelete = this.handleFileDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);

        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false,
            //<editor-fold desc="Menu Item States">
            name: "",
            description: "",
            priceEuros: 0,
            type: this.props.modalVisibilityFilter === modalVisibilityFilters.SHOW_ADD_DISH ? "dish" : "drink",
            selectedFile: null,
            selectedFileData: null,
            imageID: 0,
            imageMessage: "",
            availableTags: [],
            serverMessageFinishedLoadingAvailableTags: "",
            finishedLoadingAvailableTags: false,
            autocompleteTags: [],
            chosenTags: [],
            tagsMessage: ""

            //</editor-fold>
        };
    }

    //</editor-fold>

    //<editor-fold desc="Component Lifecycle Model">
    componentDidMount() {
        const thisTemp = this;

        //<editor-fold desc="Mount Available Tags Observable">
        this.$availableTags = ajax({
            url: paths["restApi"]["tag"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.state.token},
            timeout: timeout,
            responseType: "text"
        })
            .pipe(
                exhaustMap((next) => {
                    let response = JSON.parse(next.response);
                    return bindCallback(thisTemp.setState).call(thisTemp, {
                        availableTags: response
                    });
                }),
                catchError((error) => {
                    throw error
                }))
            .subscribe(
                () => {
                    thisTemp.setState({
                        serverMessageFinishedLoadingAvailableTags: "",
                        finishedLoadingAvailableTags: true
                    });
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({
                                serverMessageFinishedLoadingAvailableTags: "" + "The request timed out.",
                                finishedLoadingAvailableTags: true
                            });
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({
                                    serverMessageFinishedLoadingAvailableTags: "There is no connection to the server.",
                                    finishedLoadingAvailableTags: true
                                });
                            } else if (error.status === 400) {
                                thisTemp.setState({
                                    serverMessageFinishedLoadingAvailableTags: "",
                                    finishedLoadingAvailableTags: true
                                });
                            } else {
                                thisTemp.setState({
                                    serverMessageFinishedLoadingAvailableTags: error.response,
                                    finishedLoadingAvailableTags: true
                                });
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({
                                serverMessageFinishedLoadingAvailableTags: "Something is not like it is supposed to be.",
                                finishedLoadingAvailableTags: true
                            });
                            break;
                    }
                }
            );
        //</editor-fold>

        //<editor-fold desc="Mount Tags Observable">
        this.$tags = fromEvent(document.getElementById("tagInput"), "input")
            .pipe(map((event) => {
                return event.target.value
            }))
            .pipe(bufferTime(1000))
            .pipe(map((valueArray) => {
                if (valueArray.length >= 1) {
                    return valueArray[valueArray.length - 1]
                } else {
                    return null
                }
            }))
            .pipe(filter((value) => {
                return value != null
            }))
            .pipe(distinctUntilChanged())
            .pipe(map((value) => {
                if (value.length >= 1) {
                    let searchValue = value[0].toUpperCase() + value.slice(1);
                    return thisTemp.state.availableTags.filter((availableTag) => {
                        return availableTag.startsWith(searchValue)
                    })
                } else {
                    return []
                }
            }))
            .subscribe(
                (next) => {
                    thisTemp.setState({
                        autocompleteTags: next,
                        tagsMessage: ""
                    });
                },
                (error) => {
                    console.log(error);
                    thisTemp.setState({
                        autocompleteTags: [],
                        tagsMessage: "Something is not like it is supposed to be."
                    });
                }
            );
        //</editor-fold>
    }

    componentWillUnmount() {
        //<editor-fold desc="Unmount Tags Observable">
        this.$tags.unsubscribe();
        //</editor-fold>
        //<editor-fold desc="Unmount Available Tags Observable">
        this.$availableTags.unsubscribe();
        //</editor-fold>
    }

    //</editor-fold>

    //<editor-fold desc="Bussiness Logic">
    update = () => {
        window.location.reload();
    };

    handleFileSubmit = (event) => {
        const fileTemp = event.target.files[0];
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    imageMessage: "",
                    selectedFile: fileTemp
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap(() => {
                if (["image/png", "image/jpeg"].includes(fileTemp.type)) {
                    return readFileURL(fileTemp);
                } else {
                    return throwError({
                        name: "InternalError",
                        status: 0,
                        response: "Incorrect file type (" + fileTemp.type + "). Please only use image/png or image/jpeg."
                    });
                }
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap((fileData) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    selectedFileData: fileData
                });
            }), catchError((error) => {
                return error;
            }))
            .pipe(map(() => {
                let formData = new FormData();
                formData.append("image", fileTemp);
                return formData;
            }), catchError((error) => {
                return error;
            }))
            .pipe(exhaustMap((formData) => {
                return ajax({
                    url: paths["restApi"]["image"],
                    method: "POST",
                    headers: {"X-Auth-Token": thisTemp.state.token},
                    body: formData,
                    timeout: timeout,
                    responseType: "text"
                })
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    let response = JSON.parse(next.response);
                    thisTemp.setState({imageID: response.imageID});
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({
                                imageMessage: "Image could not be uploaded, as the request timed out.",
                                serverMessage: "",
                                selectedFile: null,
                                selectedFileData: null
                            });
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({
                                    imageMessage: "Image could not be uploaded, as there is no connection to the server.",
                                    serverMessage: "",
                                    selectedFile: null,
                                    selectedFileData: null
                                });
                            } else {
                                thisTemp.setState({
                                    imageMessage: "Image could not be uploaded, as " + error.response,
                                    serverMessage: "",
                                    selectedFile: null,
                                    selectedFileData: null
                                });
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({
                                imageMessage: "Something is not like it is supposed to be.",
                                serverMessage: "",
                                selectedFile: null,
                                selectedFileData: null
                            });
                            break;
                    }
                }
            );
    };

    handleFileDelete = (event) => {
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    imageMessage: "",
                    selectedFile: null,
                    selectedFileData: null
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                },
                (error) => {
                    console.log(error);
                    thisTemp.setState({
                        imageMessage: "Something is not like it is supposed to be.",
                        serverMessage: "",
                        selectedFile: null,
                        selectedFileData: null
                    });
                }
            );
    };

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
                    name: values.name,
                    description: values.description,
                    priceEuros: parseInt(values.priceEuros)
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
                    thisTemp.setState({serverMessage: "New dish is added"});
                    return ajax({
                        url: paths["restApi"]["menu"] + "/"
                            + thisTemp.props.currentMenu.menuID + "/"
                            + "menuItem",
                        method: "POST",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": thisTemp.state.token},
                        body: {
                            name: thisTemp.state.name,
                            description: thisTemp.state.description,
                            priceEuros: thisTemp.state.priceEuros,
                            type: thisTemp.state.type,
                            imageID: thisTemp.state.imageID,
                            tags: thisTemp.state.chosenTags
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
                return throwError(error);
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
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if (this.props.backgroundPage == null) {
            return (<p>Something went wrong.</p>);
        } else if (this.state.token == null || this.state.token === "null") {
            return (<p>Something went wrong.</p>);
        } else {
            //<editor-fold desc="Render Token">
            return (
                <Modal.Body>
                    <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                    <div className="modal-wrapper add-menu-item">
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
                                <Textarea name="description" placeholder="Description"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.description.message}</small>
                            </div>
                            <div className="input-field">
                                <label>Price in Euro (€)</label>
                                <Input type="number" name="priceEuros" placeholder="Price"/>
                            </div>
                            <div className="error-block">
                                <small>{validation.priceEuros.message}</small>
                            </div>
                            <div className="input-field image">
                                <label>Image</label>
                                <input type="file" name="file" id="file" className="inputfile"
                                       onChange={this.handleFileSubmit}/>
                                <label htmlFor="file">+ Upload image</label>
                                {this.state.selectedFile &&
                                <label className="selected-file">
                                    <span
                                        onClick={this.handleFileDelete}
                                        role="button"
                                        className="remove-button"
                                    >
                                        X
                                    </span>
                                    {this.state.selectedFile.name}
                                </label>
                                }
                                {this.state.selectedFileData &&
                                <div className="image-wrapper">
                                    <div className="image" style={{backgroundImage: `url(${this.state.selectedFileData})`}}/>
                                </div>
                                }
                            </div>
                            <div className="error-block">
                                <small>{this.state.imageMessage}</small>
                            </div>
                            <div className="input-field">
                                <label>Available Tags</label>
                                <input id="tagInput" type="text" name="tags" placeholder="Search"/>
                                <ul>
                                    {this.state.autocompleteTags.map((tag) => {
                                        return (<TagItem tag={tag} modal={this} added={false}/>);
                                    })}
                                </ul>
                            </div>
                            <div className="input-field">
                                <label>Chosen Tags</label>
                                <ul>
                                    {this.state.chosenTags.map((tag) => {
                                        return (<TagItem tag={tag} modal={this} added={true}/>);
                                    })}
                                </ul>
                            </div>

                            <div className="error-block">
                                <small>{this.state.tagsMessage}</small>
                            </div>
                            <Button type="submit" className="normal">Add</Button>
                            <div className="error-block">
                                <small>{this.state.serverMessage}</small>
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
        backgroundPage: state.backgroundPageReducer.backgroundPage,
        modalVisibilityFilter: state.modalVisibiltyFilterReducer.modalVisibilityFilter,
        currentMenu: state.currentMenuReducer.currentMenu
    };
};

export default connect(mapStateToProps, null)(AddMenuItemModal);
//</editor-fold>
