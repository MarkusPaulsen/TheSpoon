import React, {Component} from 'react';
import {IconName, IconLocation, IconBirthday, IconExit, IconBack} from '../Icons';
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';


class EditRestaurantInfoModal extends Component {
    render() {
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="modal-wrapper add-menu">
                    <Form ref={ (c) => { this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2>Edit</h2>
                        <div className="account-type">
                            <h4><span className="role">Restaurant information</span></h4>
                        </div>

                        <div className="input-field">
                            <label>Name</label>
                            <Input type="text" name="restaurantName" placeholder="Restaurant name"/>
                        </div>

                        <div className="input-field">
                            <label>Image</label>
                            <Input type="text" name="image" placeholder="Image"/>
                        </div>

                        <div className="input-field name">
                            <label>Street address</label>
                            <Input type="text" name="city" placeholder="Street address"/>
                        </div>
                        <div className="input-field name">
                            <label>City</label>
                            <Input type="text" name="city" placeholder="City"/>
                        </div>
                        <div className="input-field name">
                            <label>Country</label>
                            <Input type="country" name="country" placeholder="Country"/>
                        </div>

                        <div className="input-field">
                            <label>Opening hours</label>
                            <div className="working-hours">
                                <Input type="text" name="day" placeholder="Day"/>
                                <Input type="time" name="opening-hours"/>
                                <Input type="time" name="closing-hours"/>
                            </div>
                        </div>

                        <div className="input-field">
                            <Input type="tags" name="tags" placeholder="Tags"/>
                        </div>

                        <Button type="submit" className="normal">Save</Button>
                    </Form>
                </div>
            </Modal.Body>
        )
    }
}

export default EditRestaurantInfoModal;