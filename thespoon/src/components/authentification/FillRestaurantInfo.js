//<editor-fold desc="React">
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "react-router";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {logIn, failLogIn, successLogIn} from '../../actionCreators/logInRegisterActionCreators';
//</editor-fold>
import {IconName, IconLocation, IconBirthday, IconExit, IconBack} from '../Icons';
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-select';
import {days} from "../../constants/days";
import {hours} from "../../constants/hours";
import {bindCallback, of, throwError} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
//<editor-fold desc="RxJs">
import {ajax} from "rxjs/ajax";
//</editor-fold>
import paths from "../../constants/paths";



const selectStyles = {
  menu: () => ({
    fontSize: 15,
    fontWeight: 500,
    textAlign: "left",
    backgroundColor: "#ffffff"
  })
}

class FillRestaurantInfo extends Component {

    constructor(props) {
        super(props);

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
            address: "",
            city: "",
            country: "",
            restaurantName: "",
            serverMessage: ""
        }
    }

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
      this.setState({ selectedFile: event.target.files[0]})
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
            .subscribe(() => {
                console.log(thisTemp.state)
            });

            /*
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.props.logIn(thisTemp.state.username, thisTemp.state.isRestaurantOwner);
                    return ajax({
                        url: paths['restApi']['login'],
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: {
                            username: this.state.username,
                            password: this.state.password,
                            isRestaurantOwner: true,
                        }
                    })
                }
                else {
                    return throwError({ status: 0});
                }
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    this.props.successLogIn(next.response.token);
                    this.setState(
                        { serverMessage: <Redirect to={{pathname: '/Mainpage/'}}/>}
                    );
                    this.props.onHide();
                },
                (error) => {
                    this.props.failLogIn();
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
            );*/
    };


    render() {

        return (
            <Modal.Body>
                <span className="back"> <FilterLink filter={modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}><IconBack /></FilterLink></span>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
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

                    <Button type="submit" className="normal">Sign up</Button>
                    </Form>
                    <div className="link-wrapper">
                        <small>Already have an account? <FilterLink filter={modalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                    </div>
                </div>
            </Modal.Body>
        )
    }
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

export default connect(mapStateToProps, null)(FillRestaurantInfo);
//</editor-fold>