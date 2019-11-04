import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconExit, IconEmail, IconPassword } from './Icons';
import { Modal } from 'react-bootstrap';
import Register from './Register';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
    };
    this.handleShowLoginForm = this.handleShowLoginForm.bind(this);
  }

  handleShowLoginForm = () => {
    this.setState({
      showLogin: true
    })
  }

  handleCloseLoginForm = () => {
    this.setState({
      showLogin: false
    })
  }

  render() {
    return (
      <>
      <label onClick={this.handleShowLoginForm}>LogIn</label>
        <Modal show={this.state.showLogin} onHide={this.handleCloseLoginForm} centered>
          <Modal.Body>
            <div className="account-type">
            <form>
              <button className="exit" onClick={this.handleCloseLoginForm}><IconExit /></button>
              <h2>Log In</h2>

              <div className="input-field">
                <IconEmail />
                <input type="email" id="email" name="email" placeholde="E-mail" required />
              </div>

              <div className="input-field">
                <IconPassword />
                <input typer="password" id="password" name="password" placeholde="Password" required/>
              </div>

              <button type="submit" className="normal">Log in</button>
            </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default LogIn;
