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
      email: '',
      password:''
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
      <label onClick={this.handleShowLoginForm}>Log in</label>
        <Modal show={this.state.showLogin} onHide={this.handleCloseLoginForm} centered>
          <Modal.Body>
          <button className="exit" onClick={this.handleCloseLoginForm}><IconExit /></button>
            <div className="sign-up">
            <form>
              <div className="login-title">
                <h2>Log in</h2>
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

              <label>
                Don't have an account? <Link to="/">Register now</Link>
              </label>
            </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default LogIn;
