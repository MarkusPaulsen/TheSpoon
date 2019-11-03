import React from 'react';
import { Component } from 'react';
import { IconName, IconLocation, IconBirthday, IconEmail, IconPassword } from './Icons';


class Register extends Component  {

  render() {
    return (
        <form>
          <h2>Sign up</h2>
          <div className="account-type">
            <h4>as a <span className="role">{this.props.role}</span></h4>
          </div>

          <div className="input-field name">
            <IconName />
            <input type="text" id="firstname" name="firstname" placeholder="First name" required/>
          <input type="text" id="surname" name="surname" placeholder="Surname" required/>
          </div>

         {this.props.role == "customer" ? 
            <div className="input-field">
               <IconLocation />
              <input type="text" id="nationality" name="nationality" placeholder="Nationality" required/>
            </div>
          : null }

          {this.props.role == "customer" ? 
            <div className="input-field">
              <IconBirthday />
              <input type="date" id="birth-date" name="birth-date" required/>
            </div>
          : null }

          <div className="input-field">
            <IconEmail />
            <input type="email" id="email" name="email" placeholder="E-mail" required/>
          </div>

          <div className="input-field">
            <IconPassword />
            <input type="password" name="password" id="password" placeholder="Password" required/>
          </div> 

          <div className="input-field">
            <IconPassword />
            <input type="confirm-password" id="confirm-password" name="confirm-password" placeholder="Confirm password" required/>
          </div>
          
          <button type="submit" className="normal">Sign up</button>
        </form>
    );
  }
}

export default Register;