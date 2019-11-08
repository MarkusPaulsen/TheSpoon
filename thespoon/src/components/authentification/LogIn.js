import React, { Component } from 'react';
import { IconExit, IconEmail, IconPassword } from '../Icons';
import {Modal} from "react-bootstrap";
import FilterLink from "../../containers/FilterModalLink";
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { required, email } from "./../../utils/validators";

class LogIn extends Component {

  render() {
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
                  <Input type="email" id="email" name="email" placeholder="E-mail" validations={[ required ]} />
                </div>


                <div className="input-field">
                  <IconPassword />
                  <Input typer="password" id="password" name="password" placeholder="Password" validations={[ required ]}/>
                </div>

                <button type="submit" className="normal">Log in</button>
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
