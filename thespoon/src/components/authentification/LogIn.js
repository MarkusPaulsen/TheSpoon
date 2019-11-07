import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconExit, IconEmail, IconPassword } from '../Icons';
import { Modal } from 'react-bootstrap';
import Register from './Register';
import FilterLink from "../../containers/FilterModalLink";
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";

class LogIn extends Component {

  render() {
    return (
        <Modal.Body>
           <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="sign-up">
              <form>
                <div className="login-title">
                  <h2 className="title">Log In</h2>
                </div>
                <div className="input-field">
                  <IconEmail />
                  <input type="email" id="email" name="email" placeholder="E-mail" required />
                </div>

                <div className="input-field">
                  <IconPassword />
                  <input typer="password" id="password" name="password" placeholder="Password" required/>
                </div>

                <button type="submit" className="normal">Log in</button>
              </form>
              <label className="link-wrapper">
                <small>Don't have an account? <FilterLink filter={authentificationModalVisibilityFilters.SHOW_CHOOSE_ROLE}>Register now</FilterLink></small>
              </label>
            </div>
        </Modal.Body>
    );
  }
}
export default LogIn;
