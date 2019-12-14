//<editor-fold desc="React">
import React, {Component} from "react";
import Select from "react-select";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setRestaurantID, setRestaurantName} from "../../../actionCreators/restaurantActionCreators";
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
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/paths";
import {days} from "../../../constants/days";
import {hours} from "../../../constants/hours";
import {timeout} from "../../../constants/timeout";
import {IconExit} from "../../Icons";
//</editor-fold>


const selectStyles = {
    menu: () => ({
        fontSize: 15,
        fontWeight: 500,
        textAlign: "left",
        backgroundColor: "#ffffff"
    })
};

class EditRestaurantModal extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);
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
        } /*{
            field: "country",
            method: "isAlpha",
            validWhen: true,
            message: "Only alphabetic countries are allowed."
        }*/]);
        this.handleChangeDay = this.handleChangeDay.bind(this);
        this.handleChangeOpenTime = this.handleChangeOpenTime.bind(this);
        this.handleChangeCloseTime = this.handleChangeCloseTime.bind(this);
        this.addHours = this.addHours.bind(this);
        this.removeHours = this.removeHours.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            address: "",
            city: "",
            country: "",
            selectedOpeningHours: [],
            selectedOpeningHoursMessage: "",
            selectedDay: null,
            selectedOpenTime: null,
            selectedCloseTime: null,
            selectedFile: null,
            imageID: 0,
            imageMessage: "",
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false
        }
    }
    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleChangeDay = (selectedDay) => {
        this.setState({selectedDay});
    };

    handleChangeOpenTime = (selectedOpenTime) => {
        this.setState({selectedOpenTime});
    };

    handleChangeCloseTime = (selectedCloseTime) => {
        this.setState({selectedCloseTime});
    };

    addHours = () => {
        const newOpeningHours = {
            day: this.state.selectedDay,
            openTime: this.state.selectedOpenTime,
            closeTime: this.state.selectedCloseTime
        };
        this.setState({selectedOpeningHours: [...this.state.selectedOpeningHours, newOpeningHours]});
    };

    removeHours = (openingHour) => {
        this.setState({
            selectedOpeningHours: this.state.selectedOpeningHours.filter(oH => {
                return oH !== openingHour
            })
        });
    };

    fileSelectedHandler = (event) => {
        const thisTemp = this;
        thisTemp.setState({imageID: 0, selectedFile: null, imageMessage: "", serverMessage: ""});
        let file = event.target.files[0];
        if (["image/png", "image/jpeg"].includes(file.type)) {
            let formData = new FormData();
            formData.append("image", file);
            let reader = new FileReader();
            reader.onload = () => {
                ajax({
                    url: paths["restApi"]["image"],
                    method: "PUT",
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
                                            imageMessage: file.name + " could not be uploaded, as " + error.response ,
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

    removeFile = () => {
        this.setState({selectedFile: null})
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
                    address: values.address,
                    city: values.city,
                    country: values.country
                });
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: "",
                    selectedOpeningHoursMessage: "",
                    imageMessage: "",
                });
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

            }))
            .pipe(exhaustMap((osmData) => {
                if (Array.isArray(osmData.response) && osmData.response.length > 0) {
                    thisTemp.setState({serverMessage: "Restaurant information publication is processed"});
                    return ajax({
                        url: paths["restApi"]["restaurant"]+ "/" + this.props.restaurant.restaurantID,
                        method: "PUT",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": thisTemp.props.token},
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
                        timeout: timeout,
                        responseType: "text"
                    })
                } else {
                    thisTemp.setState({serverMessage: "Location data cannot be calculated"});
                    return throwError({status: 0});
                }
            }), catchError(error => {
                return throwError({status: error.status});
            }))
            .subscribe(
                    (next) => {
                        let response = JSON.parse(next.response);
                        thisTemp.props.setRestaurantID(response.restaurantID);
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
        console.log("here restaurant info")
        console.log(this.props)
        console.log("here state")
        console.log(this.state)
        let validation = this.submitted ?                         // if the form has been submitted at least once
            this.validator.validate(this.state) :               // then check validity every time we render
            this.state.validation;
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="modal-wrapper restaurant-info">
                    <Form ref={(c) => {
                        this.form = c;
                    }} onSubmit={this.handleSubmit}>
                        <h2>Configure restaurant data</h2>

                        <div className="input-field">
                            <label>Restaurant name</label>
                            <Input type="text" name="name"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.name.message}</small>
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
                            <label>Address</label>
                            <Input type="text" name="address" placeholder="Address"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.address.message}</small>
                        </div>

                        <div className="input-field">
                            <label>City</label>
                            <Input type="text" name="city" placeholder="City"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.city.message}</small>
                        </div>

                        <div className="input-field">
                            <label>Country</label>
                            <Input type="text" name="country" placeholder="Country"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.country.message}</small>
                        </div>


                        <div className="input-field opening-hours">
                            <label>Opening hours</label>
                            <div className="hours-selector">
                                <Select options={days}
                                        onChange={this.handleChangeDay}
                                        placeholder="Day"
                                        styles={selectStyles}
                                        className="days"/>
                                <Select options={hours}
                                        onChange={this.handleChangeOpenTime}
                                        placeholder="Start"
                                        styles={selectStyles}
                                        className="hours start"/>
                                <Select options={hours}
                                        onChange={this.handleChangeCloseTime}
                                        placeholder="End"
                                        styles={selectStyles}
                                        className="hours end"/>
                            </div>
                            {(this.state.selectedDay && this.state.selectedOpenTime && this.state.selectedCloseTime) ?
                                <div className="add-button"><span onClick={this.addHours} role="button">+ Add</span>
                                </div>
                                :
                                <div className="add-button disabled"><span disabled="disabled"
                                                                           role="button">+ Add</span></div>
                            }
                            <div className="selected-hours">
                                {this.state.selectedOpeningHours.map((oh, i) =>
                                    <div key={i}>
                                        {oh.day.label}: {oh.openTime.label} - {oh.closeTime.label}
                                        <span onClick={() => this.removeHours(oh)}
                                              role="button"
                                              className="remove-button">
                                        X
                                    </span>
                                    </div>)
                                }
                            </div>
                            <div className="error-block">
                                <small>{this.state.selectedOpeningHoursMessage}</small>
                            </div>
                        </div>

                        <Button type="submit" className="normal">Done</Button>
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
        currentRestaurantInformation: state.restaurantReducer.currentRestaurantInformation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRestaurantID: (restaurantID) => dispatch(setRestaurantID(restaurantID)),
        setRestaurantName: (name)=> dispatch(setRestaurantName(name))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurantModal);
//</editor-fold>
