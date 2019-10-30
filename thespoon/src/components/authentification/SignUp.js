import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';


class SignUp extends Component {
  render() {
    return (
      <div className="container">
        <h1> The Spoon </h1>
        <form>
          <h5>Sign up</h5>
          <div className="account-type">
            <div>
            <label>Are you a restaurant owner</label>
            </div>
            <div className="radio-buttons">
              <label>Yes or No ? (radio buttons)</label>
            </div>
          </div>
          <div className="input-field">
            <label>Firstname</label>
            <input type="firstname" id="firstname" />
          </div>
          <div className="input-field">
            <label>Lastname</label>
            <input type="surname" id="surname" />
          </div>
          <div className="input-field">
            <label>Nationality</label>
            <input type="nationality" id="nationality" />
          </div>
          <div className="input-field">
            <label>Date of birth</label>
            <input type="email" id="email" />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-field">
            <label>Confirm password</label>
            <input type="confirmPassword" id="confirmPassword" />
          </div>
          <div className="input-field">
            <button>Sign up</button>
          </div>
          <div>
            <Link to="/LogIn">Already have an account? Log in</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
