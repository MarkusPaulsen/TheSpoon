import React, { Component } from 'react';
import { ajax } from 'rxjs/ajax';
import paths from '../../constants/paths';
import { IconExit, IconEmail, IconPassword } from '../Icons';
import {Modal, DropdownButton, Dropdown} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import FormValidator from "../../validation/FormValidator";

class LogIn extends Component {
  constructor(props)
  {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username is required'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
      },
    ]);

    this.state = {
      username:'',
      password:'',
      isRestaurantOwner: true,
      validation: this.validator.valid(),
    }

    this.submitted = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.activateIsRestaurantOwner = this.activateIsRestaurantOwner.bind(this);
    this.deactivateIsRestaurantOwner = this.activateIsRestaurantOwner.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const values = this.form.getValues();

    this.setState({
          username:values.username,
          password:values.password,
          isRestaurantOwner: true,
        }, () => { //because setstate is asynchronus, further action must be taken on callback

          const validation = this.validator.validate(this.state);
          this.setState({ validation });
          this.submitted = true;

          if (validation.isValid) {
            let thisTemp = this;
            console.log(this.state);
            ajax({
              url: paths['restApi']['login'],
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: {
                username: this.state.username,
                password: this.state.password,
                isRestaurantOwner: this.state.isRestaurantOwner,
              }
            }).subscribe(
                function (next) {
                  console.log("Ajax step");
                },
                function (error) {
                  alert("Wrong username or password");
                },
                function (complete) {
                  console.log("you passed our validation");
                  thisTemp.props.onHide();
                }
            );
          }
        }
    );
  };

  activateIsRestaurantOwner = () => {
    this.setState({ isRestaurantOwner: true })
  };

  deactivateIsRestaurantOwner = () => {
    this.setState({ isRestaurantOwner: false })
  };

  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :               // then check validity every time we render
        this.state.validation
    return (
        <Modal.Body>
           <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="sign-up">
              <Form ref={ (c) => { this.form = c; }} onSubmit={this.handleSubmit}>
                <h2 className="title">Log in</h2>
                <div className="input-field">
                  <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item onClick={this.activateIsRestaurantOwner}>Restaurant Owner</Dropdown.Item>
                    <Dropdown.Item onClick={this.deactivateIsRestaurantOwner}>Customer</Dropdown.Item>
                  </DropdownButton>
                </div>

                <div className="input-field">
                  <IconEmail />
                  <Input type="username" id="username" name="username" placeholder="Username"/>
                </div>

                <div className="input-field">
                  <IconPassword />
                  <Input type="password" name="password" placeholder="Password" />
                </div>

                <div className="error-block">
                  <small>{validation.username.message}</small>
                  <small>{validation.password.message}</small>
                </div>

                <Button type="submit" className="normal">Log in</Button>
              </Form>

              <label className="link-wrapper">
                <small>Don't have an account? <FilterLink filter={authentificationModalVisibilityFilters.SHOW_CHOOSE_ROLE}>Register now</FilterLink></small>
              </label>
            </div>
        </Modal.Body>
    );
  }
}
export default LogIn;
