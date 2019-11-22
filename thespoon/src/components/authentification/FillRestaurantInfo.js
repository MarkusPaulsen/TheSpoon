import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {IconName, IconLocation, IconBirthday, IconExit, IconBack} from '../Icons';
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-select'


class FillRestaurantInfo extends Component {

    constructor(props) {
        super(props);

        this.handleChangeDay = this.handleChangeDay.bind(this);
        this.handleChangeStartHour = this.handleChangeStartHour.bind(this);
        this.handleChangeEndHour = this.handleChangeEndHour.bind(this);
        this.addHours = this.addHours.bind(this);
        this.removeHours = this.removeHours.bind(this);
        
        this.state = {
            selectedOpeningHours: [],
            selectedDay: null,
            selectedStartHour: null,
            selectedEndHour: null
        }
    }

    handleChangeDay = (selectedDay) => {
      this.setState({ selectedDay });
    }

    handleChangeStartHour = (selectedStartHour) => {
      this.setState({ selectedStartHour });
    }

     handleChangeEndHour = (selectedEndHour) => {
      this.setState({ selectedEndHour });
    }

    addHours = () => {
        const newOpeningHours =  {
            day: this.state.selectedDay,
            startHour: this.state.selectedStartHour,
            endHour: this.state.selectedEndHour
        }
       
       this.setState({ selectedOpeningHours: [...this.state.selectedOpeningHours, newOpeningHours] });
    }

    removeHours = (openingHour) => {
       this.setState({selectedOpeningHours: this.state.selectedOpeningHours.filter(function(oH) { 
        return oH !== openingHour
        })});
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }


    render() {
        const days = [
          { value: 'monday', label: 'Monday' },
          { value: 'tuesday', label: 'Tuesday' },
          { value: 'wednesday', label: 'Wednesday' },
          { value: 'thursday', label: 'Thursday' },
          { value: 'friday', label: 'Friday' },
          { value: 'saturday', label: 'Saturday' },
          { value: 'sunday', label: 'Sunday' }
        ];

        const hours = [
            { value: '00', label: '00' },
          { value: '01', label: '01' },
          { value: '02', label: '02' },
          { value: '03', label: '03' },
          { value: '04', label: '05' },
          { value: '06', label: '07' },
          { value: '08', label: '09' },
          { value: '10', label: '10' },
          { value: '11', label: '11' },
          { value: '12', label: '12' },
          { value: '13', label: '13' },
          { value: '14', label: '15' },
          { value: '16', label: '17' },
          { value: '18', label: '18' },
          { value: '19', label: '19' },
          { value: '20', label: '20' },
          { value: '21', label: '21' },
          { value: '22', label: '22' },
          { value: '23', label: '23' }
        ];

        const selectStyles = {
          menu: () => ({
            fontSize: 15,
            fontWeight: 500,
            textAlign: "left",
            backgroundColor: "#ffffff"
          })
        }
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
                        <IconName />
                        <label>Name</label>
                        <Input type="restaurantName" name="restaurantName" placeholder="Restaurant name"/>
                    </div>

                    <div className="input-field">
                        <IconLocation />
                        <label>Address</label>
                        <Input type="address" name="address" placeholder="Address"/>
                    </div>

                    <div className="input-field">
                        <IconLocation />
                        <label>City</label>
                        <Input type="city" name="city" placeholder="City"/>
                    </div>

                    <div className="input-field">
                        <IconLocation />
                        <label>Country</label>
                        <Input type="country" name="country" placeholder="Country"/>
                    </div>

                    <div className="input-field opening-hours">
                            <IconBirthday />
                            <label>Openening hours</label>
                        <div className="hours-selector">
                            <Select options={days} 
                                onChange={this.handleChangeDay} 
                                placeholder="Day" 
                                styles={selectStyles} 
                                className="days"/>
                            <Select options={hours} 
                                onChange={this.handleChangeStartHour} 
                                placeholder="Start" 
                                styles={selectStyles} 
                                className="hours start"/>
                            <Select options={hours} 
                                onChange={this.handleChangeEndHour} 
                                placeholder="End" 
                                styles={selectStyles}  
                                className="hours end"/>
                        </div>
                        <div className="add-button"><Button onClick={this.addHours}>+ Add</Button></div>
                        <div className="selected-hours">
                            {this.state.selectedOpeningHours.map((oh,i) => 
                                <div key={i}>
                                    {oh.day.label}: {oh.startHour.label} - {oh.endHour.label}
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

export default FillRestaurantInfo;