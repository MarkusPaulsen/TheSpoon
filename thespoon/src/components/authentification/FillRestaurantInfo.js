//<editor-fold desc="React">
import React, {Component} from 'react';
import Select from 'react-select';
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setRestaurantID} from "../../actionCreators/restaurantActionCreators";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of, throwError} from "rxjs";
import {catchError, exhaustMap, map, take} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {days} from "../../constants/days";
import {hours} from "../../constants/hours";
import {paths} from "../../constants/paths";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit, IconBack} from '../Icons';
import {failLogIn, logIn, successLogIn} from "../../actionCreators/logInActionCreators";
//</editor-fold>



const selectStyles = {
  menu: () => ({
    fontSize: 15,
    fontWeight: 500,
    textAlign: "left",
    backgroundColor: "#ffffff"
  })
};

class FillRestaurantInfo extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //this.validator = new FormValidator([]);


        this.handleChangeDay = this.handleChangeDay.bind(this);
        this.handleChangeOpenTime = this.handleChangeOpenTime.bind(this);
        this.handleChangeCloseTime = this.handleChangeCloseTime.bind(this);
        this.addHours = this.addHours.bind(this);
        this.removeHours = this.removeHours.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            selectedFile: null,
            selectedOpeningHours: [],
            selectedDay: null,
            selectedOpenTime: null,
            selectedCloseTime: null,
            name: "",
            imageID: "",
            address: "",
            city: "",
            country: "",
            restaurantName: "",
            imageMessage: "",
            serverMessage: ""
        }
    }
    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleChangeDay = (selectedDay) => {
      this.setState({ selectedDay });
    };

    handleChangeOpenTime = (selectedOpenTime) => {
      this.setState({ selectedOpenTime });
    };

     handleChangeCloseTime = (selectedCloseTime) => {
      this.setState({ selectedCloseTime });
    };

    addHours = () => {
        const newOpeningHours =  {
            day: this.state.selectedDay,
            openTime: this.state.selectedOpenTime,
            closeTime: this.state.selectedCloseTime
        };
       
       this.setState({ selectedOpeningHours: [...this.state.selectedOpeningHours, newOpeningHours] });
    };

    removeHours = (openingHour) => {
        this.setState({selectedOpeningHours: this.state.selectedOpeningHours.filter(oH => {
          return oH !== openingHour
        })});
    };

    fileSelectedHandler = (event) => {
        const thisTemp = this;
        thisTemp.setState({ imageMessage: "", selectedFile: null });
        let file = event.target.files[0];
        if(["image/png","image/jpeg"].includes(file.type)) {
            let reader = new FileReader();
            thisTemp.setState({serverMessage: "Image upload is processing"});
            reader.onload = (readerEvent) => {
                ajax({
                    url: paths["restApi"]["image"],
                    method: "POST",
                    headers: {"Content-Type": file.type},
                    body: readerEvent.target.result
                })
                    .pipe(take(1))
                    .subscribe((reply) => {
                        thisTemp.setState({ imageID: reply.response.imageID, selectedFile: file});
                    }, () => {
                        thisTemp.setState({ imageMessage: (file.name + " could not be uploaded.")});
                    });
            };
            reader.onerror = () => {
                thisTemp.setState({ imageMessage: (file.name + " could not be read.")});
            };
            reader.readAsText(file);
        }
        else {
            //thisTemp.setState({ imageMessage: (file.type + " is not supported.\n Please use image/png or image/jpeg.")});
            // \n does not work in a state
            thisTemp.setState({ imageMessage: ("Please use .jpeg or .png format")});
        }
    };

    removeFile = () => {
      this.setState({ selectedFile: null })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(this.setState).call(thisTemp, {
                    address: values.address,
                    city: values.city,
                    country: values.country,
                    restaurantName: values.restaurantName,
                    serverMessage: ""
                });
            }))
            .pipe(exhaustMap(() => {
                return ajax({
                    url: "https://nominatim.openstreetmap.org/search?q="
                        + thisTemp.state.address
                        + "+" + thisTemp.state.city
                        + "+" + thisTemp.state.country
                        + "&format=json",
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                });
            }))
            .pipe(exhaustMap((osmData) => {
                console.log(osmData)
                if (Array.isArray(osmData.response) && osmData.response.length > 0) {
                    thisTemp.setState({serverMessage: "Restaurant information post is processing"});
                    return ajax({
                        url: paths['restApi']['restaurant'],
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
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
                        }
                    })
                }
                else {
                    return throwError({ status: 0});
                }
            }), catchError(error => {
                return throwError({ status: error.status});
            }))
            .pipe(take(1))
            .subscribe(
                (reply) => {
                    thisTemp.props.setRestaurantID(reply.response.restaurantID)
                    thisTemp.props.onHide();
                },
                (error) => {
                    switch (error.status) {
                        case 400:
                            this.setState({ serverMessage: "Invalid username or password" });
                            break;
                        case 404:
                            this.setState({ serverMessage: "No connection to the server" });
                            break;
                        case 0:
                            this.setState({ serverMessage: "" });
                            break;
                        default:
                            this.setState({ serverMessage: "General error" });
                            break;
                    }
                }
            );
    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        return (
            <Modal.Body>
                <div className="modal-wrapper restaurant-info">
                    <Form ref={ (c) => { this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2>Sign up</h2>
                    <div className="account-type">
                        <h4>as a <span className="role">{this.props.role}</span></h4>
                    </div>

                    <div className="input-field">
                        <label>Name</label>
                        <Input type="text" name="restaurantName" placeholder="Restaurant name"/>
                    </div>

                    <div className="input-field image">
                        <label>Image</label>
                        <input type="file" name="file" id="file" className="inputfile" onChange={this.fileSelectedHandler}/>
                        <label htmlFor="file">+ Upload image</label>
                        {this.state.selectedFile && 
                          <label className="selected-file">
                            <span onClick={this.removeFile} 
                                role="button"
                                className="remove-button">
                                X
                            </span>
                            {this.state.selectedFile.name }
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

                    <div className="input-field">
                        <label>City</label>
                        <Input type="text" name="city" placeholder="City"/>
                    </div>

                    <div className="input-field">
                        <label>Country</label>
                        <Input type="text" name="country" placeholder="Country"/>
                    </div>

                    <div className="input-field opening-hours">
                            <label>Openening hours</label>
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
                        { (this.state.selectedDay && this.state.selectedOpenTime && this.state.selectedCloseTime) ?
                          <div className="add-button"><span onClick={this.addHours} role="button">+ Add</span></div>
                          :
                           <div className="add-button disabled"><span disabled="disabled" role="button">+ Add</span></div>
                        }
                        <div className="selected-hours">
                            {this.state.selectedOpeningHours.map((oh,i) => 
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
                    </div>

                    <Button type="submit" className="normal">Done</Button>
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
        username: state.username,
        email: state.email,
        name: state.name,
        surname: state.surname,
        password: state.password
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRestaurantID: (restaurantID) => dispatch(setRestaurantID(restaurantID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FillRestaurantInfo);
//</editor-fold>