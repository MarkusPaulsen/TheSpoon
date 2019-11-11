import React, {Component} from 'react';
import {IconName, IconLocation, IconBirthday, IconExit, IconBack} from '../Icons';
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';


class FillRestaurantInfo extends Component {
    render() {
        return (
            <Modal.Body>
                <span className="back"> <FilterLink filter={authentificationModalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}><IconBack /></FilterLink></span>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="sign-up">
                    <Form ref={ (c) => { this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2>Sign up</h2>
                    <div className="account-type">
                        <h4>as a <span className="role">{this.props.role}</span></h4>
                    </div>

                    <div className="input-field">
                        <IconName />
                        <Input type="restaurantName" name="restaurantName" placeholder="Restaurant name"/>
                    </div>

                    <div className="input-field">
                        <IconLocation />
                        <Input type="address" name="address" placeholder="Address"/>
                    </div>

                    <div className="input-field name">
                        <IconLocation />
                        <Input type="city" name="city" placeholder="City"/>
                        <Input type="country" name="country" placeholder="Country"/>
                    </div>

                    <div className="input-field name">
                        <IconBirthday />
                        <Input type="time" name="opening-hours"/>
                        <Input type="time" name="opening-hours"/>
                    </div>

                    <div className="input-field">
                        <IconLocation />
                        <Input type="tags" name="tags" placeholder="Tags"/>
                    </div>

                    <Button type="submit" className="normal">Sign up</Button>
                    </Form>
                    <label className="link-wrapper">
                        <small>Already have an account? <FilterLink filter={authentificationModalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                    </label>
                </div>
            </Modal.Body>
        )
    }
}

export default FillRestaurantInfo;