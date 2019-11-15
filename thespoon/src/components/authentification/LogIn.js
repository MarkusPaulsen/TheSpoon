import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { ajax } from 'rxjs/ajax';
import paths from '../../constants/paths';
import { IconExit, IconEmail, IconPassword } from '../Icons';
import {Modal, ButtonToolbar, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
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
      serverMessage: ''
    };

    this.submitted = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeRole = this.changeRole.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const values = this.form.getValues();

    this.setState({
          username:values.username,
          password:values.password
        }, () => { //because setstate is asynchronus, further action must be taken on callback

          this.setState({ serverMessage: null });
          const validation = this.validator.validate(this.state);
          this.setState({ validation });
          this.submitted = true;

          const thisTemp = this;
          if (validation.isValid) {
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
                (next) => {
                  thisTemp.setState({ serverMessage: "Login is processing..." });
                },
                (error) => {
                  switch (error.status) {
                    case 400:
                        thisTemp.setState({ serverMessage: "Invalid username or password" });
                        break;
                    case 404:
                        thisTemp.setState({ serverMessage: "No connection to the server" });
                        break;
                    default:
                        thisTemp.setState({ serverMessage: "General error" });
                        break;
                  }
                },
                (complete) => {
                  thisTemp.setState({ serverMessage: <Redirect to={{pathname: '/Mainpage/'}}/>});
                  thisTemp.props.onHide();
                }
          )}
    })};

  changeRole = (role) => {
    if (role === 1) {
      this.setState({ isRestaurantOwner: false });
    } else {
      this.setState({ isRestaurantOwner: true });
    }
  };

  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :               // then check validity every time we render
        this.state.validation
    return (
        <Modal.Body>
           <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="modal-wrapper ">
              <Form ref={ (c) => { this.form = c; }} onSubmit={this.handleSubmit}>
                <h2 className="title">Log in</h2>

                <div className="input-field">
                  <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="role" defaultValue={0} onChange={this.changeRole}>
                      <ToggleButton value={0}>Restaurant Owner</ToggleButton>
                      <ToggleButton value={1}>Customer</ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
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
                  <small>{this.state .serverMessage}</small>
                </div>

                <Button type="submit" className="normal">Log in</Button>
              </Form>

              <div className="link-wrapper">
                <small>Don't have an account? <FilterLink filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}>Register now</FilterLink></small>
              </div>
            </div>
        </Modal.Body>
    );
  }
}
export default LogIn;
