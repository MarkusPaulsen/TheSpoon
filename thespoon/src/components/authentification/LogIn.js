import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';


class LogIn extends Component {
  render() {
    return (
      <div className="container">
        <h1> The Spoon </h1>
        <form>
          <h5>Log in</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-field">
            <button>Login</button>
          </div>
          <div>
            <Link to="/SignUp">Don't have an account yet? Register now</Link>
          </div>
        </form>
      </div>
    );
  }
}
export default LogIn;

