//<editor-fold desc="React">
import React, {Component} from "react";
import Select from "react-select";
//</editor-fold>
//<editor-fold desc="RxJs">
import {of, bindCallback, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {map, exhaustMap, take, catchError} from "rxjs/operators";
import {readFileURL} from "../Tools/FileReader"
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setRestaurantID} from "../../../actionCreators/RestaurantActionCreators";
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
import {days} from "../../../constants/Days";
import {hours} from "../../../constants/Hours";
import {timeouts} from "../../../constants/Timeouts";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
//</editor-fold>


const selectStyles = {
    menu: () => {
        return {
            fontSize: 15,
            fontWeight: 500,
            textAlign: "left",
            backgroundColor: "#ffffff"
        }
    }
};

class EditRestaurantModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([{
            field: "name",
            method: "isEmpty",
            validWhen: false,
            message: "Restaurant name required"
        }, /*{
            field: "imageID",
            method: > 0,
            validWhen: true,
            message: "Only alphabetic countries are allowed."
        }, */{
            field: "address",
            method: "isEmpty",
            validWhen: false,
            message: "Address is required"
        }, {
            field: "city",
            method: "isEmpty",
            validWhen: false,
            message: "City name required"
        }, {
            field: "country",
            method: "isEmpty",
            validWhen: false,
            message: "Country name required"
        }, /*{
            field: "country",
            method: "isAlpha",
            validWhen: true,
            message: "Only alphabetic countries are allowed."
        }*/]);

        //</editor-fold>

        //<editor-fold desc="Handler Function Registration">
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleOpenTimeChange = this.handleOpenTimeChange.bind(this);
        this.handleCloseTimeChange = this.handleCloseTimeChange.bind(this);
        this.handleHoursAdd = this.handleHoursAdd.bind(this);
        this.handleHoursRemove = this.handleHoursRemove.bind(this);
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.handleFileDelete = this.handleFileDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false,
            //<editor-fold desc="Restaurant States">
            name: this.props._restaurantInfo.name,
            address: this.props._restaurantInfo.address,
            city: this.props._restaurantInfo.city,
            country: this.props._restaurantInfo.country,
            selectedOpeningHours: this.props._restaurantInfo.openingHours.map((openingHour) => {
                return {
                    day: {
                        value: openingHour.day,
                        label: openingHour.day
                    },
                    openTime: {
                        value: openingHour.openTime.split(".")[0],
                        label: openingHour.openTime.split(".")[0]
                    },
                    closeTime: {
                        value: openingHour.closeTime.split(".")[0],
                        label: openingHour.closeTime.split(".")[0]
                    }
                }
            }),
            selectedOpeningHoursMessage: "",
            selectedDay: null,
            selectedOpenTime: null,
            selectedCloseTime: null,
            selectedFile: null,
            selectedFileData: null,
            imageID: (this.props._restaurantInfo.imageLink).split("/")[3],
            imageMessage: ""

            //</editor-fold>
        }
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleDayChange = (selectedDay) => {
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    selectedDay: selectedDay,
                    selectedOpeningHoursMessage: ""
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
                        selectedDay: null,
                        selectedOpeningHoursMessage: "Something is not like it is supposed to be."
                    });
                }
            );
    };

    handleOpenTimeChange = (selectedOpenTime) => {
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    selectedOpenTime: selectedOpenTime,
                    selectedOpeningHoursMessage: ""
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
                        selectedOpenTime: null,
                        selectedOpeningHoursMessage: "Something is not like it is supposed to be."
                    });
                }
            );
    };

    handleCloseTimeChange = (selectedCloseTime) => {
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    selectedCloseTime: selectedCloseTime,
                    selectedOpeningHoursMessage: ""
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
                        selectedCloseTime: null,
                        selectedOpeningHoursMessage: "Something is not like it is supposed to be."
                    });
                }
            );
    };

    handleHoursAdd = (event) => {
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return {
                    day: thisTemp.state.selectedDay,
                    openTime: thisTemp.state.selectedOpenTime,
                    closeTime: thisTemp.state.selectedCloseTime
                };
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap((newOpeningHours) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    selectedOpeningHours: [...thisTemp.state.selectedOpeningHours, newOpeningHours],
                    selectedOpeningHoursMessage: ""
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
                        selectedOpeningHours: [],
                        selectedOpeningHoursMessage: "Something is not like it is supposed to be."
                    });
                }
            );
    };

    handleHoursRemove = (openingHour) => {
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    selectedOpeningHours: this.state.selectedOpeningHours.filter((oH) => {
                        return oH !== openingHour
                    }),
                    selectedOpeningHoursMessage: ""
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
                        selectedOpeningHours: [],
                        selectedOpeningHoursMessage: "Something is not like it is supposed to be."
                    });
                }
            );
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
                return throwError(error);
            }))
            .pipe(map(() => {
                let formData = new FormData();
                formData.append("image", fileTemp);
                return formData;
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap((formData) => {
                return ajax({
                    url: paths["restApi"]["image"],
                    method: "POST",
                    headers: {"X-Auth-Token": thisTemp.state.token},
                    body: formData,
                    timeout: timeouts,
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
                                selectedFile: null
                            });
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({
                                    imageMessage: "Image could not be uploaded, as there is no connection to the server.",
                                    serverMessage: "",
                                    selectedFile: null
                                });
                            } else {
                                thisTemp.setState({
                                    imageMessage: "Image could not be uploaded, as " + error.response,
                                    serverMessage: "",
                                    selectedFile: null
                                });
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({
                                imageMessage: "Something is not like it is supposed to be.",
                                serverMessage: "",
                                selectedFile: null
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
                    address: values.address,
                    city: values.city,
                    country: values.country
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: "",
                    selectedOpeningHoursMessage: "",
                    imageMessage: "",
                });
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid && thisTemp.state.selectedOpeningHours.length > 0 && thisTemp.state.imageID !== "") {
                    thisTemp.setState({serverMessage: "Latitude and longitude are calculated"});
                    return ajax({
                        url: paths["openStreetMap"]["search"]
                            + "?q=" + thisTemp.state.address
                            + "+" + thisTemp.state.city
                            + "+" + thisTemp.state.country
                            + "&format=json",
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                    });
                } else {
                    if (thisTemp.state.selectedOpeningHours.length === 0) {
                        thisTemp.setState({selectedOpeningHoursMessage: "No opening hours selected!"});

                    }
                    if (thisTemp.state.imageID === "") {
                        thisTemp.setState({imageMessage: "No image uploaded!"});

                    }
                    thisTemp.setState({serverMessage: ""});
                    return throwError({status: 0});
                }

            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(exhaustMap((osmData) => {
                if (Array.isArray(osmData.response) && osmData.response.length > 0) {
                    thisTemp.setState({serverMessage: "Restaurant information publication is processed"});
                    // noinspection JSUnresolvedVariable
                    return ajax({
                        url: paths["restApi"]["restaurant"],
                        method: "PUT",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": thisTemp.state.token},
                        body: {
                            name: thisTemp.state.name,
                            address: thisTemp.state.address,
                            city: thisTemp.state.city,
                            country: thisTemp.state.country,
                            latitude: parseFloat(osmData.response[0].lat),
                            longitude: parseFloat(osmData.response[0].lon),
                            imageID: thisTemp.state.imageID,
                            openingHours: thisTemp.state.selectedOpeningHours.map((selectedOpeningHour) => {
                                return {
                                    day: selectedOpeningHour.day.value,
                                    openTime: selectedOpeningHour.openTime.value,
                                    closeTime: selectedOpeningHour.closeTime.value
                                }
                            })
                        },
                        timeout: timeouts,
                        responseType: "text"
                    })
                } else {
                    return throwError({
                        name: "InternalError",
                        status: 0,
                        response: "Location data cannot be calculated. Probably the location does not exist."
                    });
                }
            }), catchError((error) => {
                return throwError(error);
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    let response = JSON.parse(next.response);
                    thisTemp.props._setRestaurantID(response.restaurantID);
                    thisTemp.props._backgroundPage.update();
                    thisTemp.props.onHide();
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({
                                serverMessage: "The request timed out."
                            });
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({
                                    serverMessage: "There is no connection to the server."
                                });
                            } else if (error.status === 400) {
                                thisTemp.setState({
                                    serverMessage: ""
                                });
                            } else {
                                thisTemp.setState({
                                    serverMessage: error.response
                                });
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({
                                serverMessageFinishedLoadingAvailableTags: "Something is not like it is supposed to be."
                            });
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
            //<editor-fold desc="Render Token">
            return (
                <Modal.Body>
                    <button
                        className="exit"
                        onClick={this.props.onHide}
                    >
                        <IconExit/>
                    </button>
                    <div className="modal-wrapper edit-restaurant">
                        <Form
                            ref={(c) => {
                                this.form = c;
                            }}
                            onSubmit={this.handleSubmit}
                            autocomplete="on"
                        >
                            <h2>
                                Configure restaurant data
                            </h2>
                            <div className="input-field">
                                <label>
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Restaurant name"
                                    value={this.state.name}
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.name.message}
                                </small>
                            </div>
                            <div className="input-field image">
                                <label>
                                    Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="file"
                                    id="file"
                                    className="inputfile"
                                    onChange={this.handleFileSubmit}
                                />
                                <label htmlFor="file">
                                    + Upload image
                                </label>
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
                                    <img
                                        src={this.state.selectedFileData}
                                        alt={this.state.selectedFile.name}
                                    />
                                </div>
                                }
                            </div>
                            <div className="error-block">
                                <small>
                                    {this.state.imageMessage}
                                </small>
                            </div>
                            <div className="input-field">
                                <label>
                                    Address
                                </label>
                                <Input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={this.state.address}
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.address.message}
                                </small>
                            </div>
                            <div className="input-field">
                                <label>
                                    City
                                </label>
                                <Input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={this.state.city}
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.city.message}
                                </small>
                            </div>
                            <div className="input-field">
                                <label>
                                    Country
                                </label>
                                <Input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={this.state.country}
                                    required
                                />
                            </div>
                            <div className="error-block">
                                <small>
                                    {validation.country.message}
                                </small>
                            </div>
                            <div className="input-field opening-hours">
                                <label>
                                    Opening hours
                                </label>
                                <div className="hours-selector">
                                    <Select options={days}
                                            onChange={this.handleDayChange}
                                            placeholder="Day"
                                            styles={selectStyles}
                                            className="days"
                                    />
                                    <Select options={hours}
                                            onChange={this.handleOpenTimeChange}
                                            placeholder="Start"
                                            styles={selectStyles}
                                            className="hours start"
                                    />
                                    <Select options={hours}
                                            onChange={this.handleCloseTimeChange}
                                            placeholder="End"
                                            styles={selectStyles}
                                            className="hours end"
                                    />
                                </div>
                                {(this.state.selectedDay && this.state.selectedOpenTime && this.state.selectedCloseTime) ?
                                    <div className="add-button">
                                        <span
                                            onClick={this.handleHoursAdd}
                                            role="button"
                                        >
                                            + Add
                                        </span>
                                    </div>
                                    :
                                    <div className="add-button disabled">
                                        <span
                                            disabled="disabled"
                                            role="button"
                                        >
                                            + Add
                                        </span>
                                    </div>
                                }
                                <div className="selected-hours">
                                    {this.state.selectedOpeningHours.map((oh, i) => {
                                        return (
                                            <div key={i}>
                                                {oh.day.label}: {oh.openTime.label} - {oh.closeTime.label}
                                                <span
                                                    onClick={() => {
                                                        this.handleHoursRemove(oh)
                                                    }}
                                                    role="button"
                                                    className="remove-button"
                                                >
                                                X
                                            </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="error-block">
                                    <small>
                                        {this.state.selectedOpeningHoursMessage}
                                    </small>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="normal"
                            >
                                Done
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
        _backgroundPage: state._backgroundPageReducer._backgroundPage,
        _restaurantInfo: state._restaurantReducer._restaurantInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        _setRestaurantID: (_restaurantID) => {
            dispatch(_setRestaurantID(_restaurantID));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurantModal);
//</editor-fold>
