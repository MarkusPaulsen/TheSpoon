import React, { Component } from 'react';
import { IconExit, IconEmail, IconPassword } from '../Icons';
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { required, email } from "../../validation/validators";
import FormValidator from "../../validation/FormValidator";

class LogIn extends Component {
  constructor(props)
  {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'E-mail is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
      },
    ]);

    this.state = {
      email:'',
      password:'',
      validation: this.validator.valid(),
    }

    this.submitted = false;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    const values = this.form.getValues();

    this.setState({
          email:values.email,
          password:values.password,
        }, () => { //because setstate is asynchronus, further action must be taken on callback

          const validation = this.validator.validate(this.state);
          this.setState({ validation });
          this.submitted = true;

          if (validation.isValid) {
            console.log("you passed our validation");
            this.props.onHide();
          }
        }
    );
  }

  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :               // then check validity every time we render
        this.state.validation
    return (
        <Modal.Body>
           <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="sign-up">
              <Form ref={ (c) => { this.form = c; }} onSubmit={this.handleSubmit}>
                <div className="login-title">
                  <h2 className="title">Log In</h2>
                </div>
                <div className="input-field">
                  <IconEmail />
                  <Input type="email" id="email" name="email" placeholder="E-mail"/>
                </div>

                <div className="input-field">
                  <IconPassword />
                  <Input typer="password" name="password" placeholder="Password" />
                </div>

                <div className="error-block">
                  <small>{validation.email.message}</small>
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
