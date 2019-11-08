import React from 'react';
import { Component } from 'react';
import {IconName, IconLocation, IconBirthday, IconEmail, IconPassword, IconExit, IconBack} from '../Icons';
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import {roles} from "../../constants/roles";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import FormValidator from "../../utils/FormValidator";



class Register extends Component  {
  constructor(props)
  {
    super(props);

      this.validator = new FormValidator([
          {
              field: 'firstname',
              method: 'isEmpty',
              validWhen: false,
              message: 'First name is required.'
          },
          {
              field: 'surname',
              method: 'isEmpty',
              validWhen: false,
              message: 'Surname is required.'
          },
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
          {
              field: 'confirmPassword',
              method: 'isEmpty',
              validWhen: false,
              message: 'Password confirmation is required.'
          },
          {
              field: 'confirmPassword',
              method: this.passwordMatch,
              validWhen: true,
              message: 'Password and password confirmation do not match.'
          }
      ]);

      this.state = {
          firstname:'',
          surname:'',
          nationality:'',
          birthDate:'',
          email:'',
          password:'',
          confirmPassword: '',
          validation: this.validator.valid(),
      }

      this.submitted = false;
      this.handleSubmit = this.handleSubmit.bind(this);
  }

    passwordMatch = (confirmation, state) => (state.password === confirmation)

    handleSubmit = event => {
        event.preventDefault();
        const values = this.form.getValues();

        console.log(values);

        this.setState({
            firstname: values.firstname,
            surname: values.surname,
            nationality:values.nationality,
            birthDate: values.birthDate,
            email:values.email,
            password:values.password,
            confirmPassword: values.confirmPassword
        }, () => { //because setstate is asynchronus, furhter action must be taken on callback

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
            <span className="back"> <FilterLink filter={authentificationModalVisibilityFilters.SHOW_CHOOSE_ROLE}><IconBack /></FilterLink></span>
            <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="sign-up choose-role">
                <Form ref={ (c) => { this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                  <h2>Sign up</h2>
                  <div className="account-type">
                    <h4>as a <span className="role">{this.props.role}</span></h4>
                  </div>

                  <div className="input-field name">
                    <IconName />
                    <Input type="text" id="firstname" name="firstname" placeholder="First name"/>
                    <Input type="text" id="surname" name="surname" placeholder="Surname"/>
                  </div>

                 {this.props.role === roles.CUSTOMER &&
                    <div className="input-field">
                       <IconLocation />
                      <Input type="text" id="nationality" name="nationality" placeholder="Nationality"/>
                    </div>
                 }

                  {this.props.role === roles.CUSTOMER &&
                    <div className="input-field">
                      <IconBirthday />
                      <Input type="date" id="birth-date" name="birthDate"/>
                    </div>
                   }

                  <div className="input-field">
                    <IconEmail />
                    <Input type="email" id="email" name="email" placeholder="E-mail"/>
                  </div>

                  <div className="input-field">
                    <IconPassword />
                    <Input type="password" id="password" name="password" placeholder="Password"/>
                  </div>

                  <div className="input-field">
                    <IconPassword />
                    <Input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm password"/>
                  </div>

                    <div className="error-block">
                        <small>{validation.firstname.message}</small>
                        <small>{validation.surname.message}</small>
                        <small>{validation.email.message}</small>
                        <small>{validation.password.message}</small>
                        <small>{validation.confirmPassword.message}</small>
                    </div>

                  <Button type="submit" className="normal" >Sign up</Button>
                </Form>
                <label className="link-wrapper">
                    <small>Already have an account? <FilterLink filter={authentificationModalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                </label>
            </div>
        </Modal.Body>
    );
  }
}

export default Register;
