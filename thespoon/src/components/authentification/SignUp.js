import React, { useState } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconName, IconLocation, IconBirthday, IconEmail, IconPassword, IconExit } from './Icons';
import {Modal,Button} from 'react-bootstrap';


class SignUp extends Component  {

  render() {
    return (
      <div className="user-handle">
        <form>
          <h2>Sign up</h2>
          <div className="account-type">
            <h4>as a {this.props.location.state}</h4>
          </div>
          <div className="input-field">
            <label htmlFor="firstname"><IconName /></label>
            <input type="firstname" id="firstname" name="firstname" placeholder="First name" />
            <input type="surname" id="surname" name="surname" placeholder="Surname"/>
          </div>
          <div className="input-field">
            <label htmlFor="nationality"><IconLocation /></label>
            <input type="nationality" id="nationality" name="nationality" placeholder="Nationality" />
          </div>
          <div className="input-field">
            <label htmlFor="birth-date"><IconBirthday /></label>
            <input type="date" id="birth-date" name="birth-date"/>
          </div>
          <div className="input-field">
            <label htmlFor="email"><IconEmail /></label>
            <input type="email" id="email" name="email" placeholder="E-mail" />
          </div>
          <div className="input-field">
            <label htmlFor="password"><IconPassword /></label>
            <input type="password" name="password" id="password"/>
          </div> 
          <div className="input-field">
            <label htmlFor="confirm-password"><IconPassword /></label>
            <input type="confirm-password" id="confirm-password" name="confirm-password" placeholder="Confirm password"/>
          </div>
          <div className="input-field">
            <button type="submit" className="normal">Sign up</button>
          </div>
        </form>
        <div>
          Already have an account? <Link to="/LogIn">Log in</Link>
        </div>
      </div>
    );
  }
}

  /*const[show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
  <Button variant="primary" onClick={handleShow}>
    Launch demo modal
      </Button>

  <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <div className="user-handle">
            <button onClick={handleClose}><IconExit /></button>
          <form>
            <h2>Sign up</h2>
            <div className="account-type">
              <h4>as a restaurant owner</h4>
            </div>
            <div className="input-field">
              <label for="firstname"><IconName /></label>
              <input type="firstname" id="firstname" name="firstname" placeholder="First name" />
              <input type="surname" id="surname" name="surname" placeholder="Surname" />
            </div>
            <div className="input-field">
              <label for="nationality"><IconLocation /></label>
              <input type="nationality" id="nationality" name="nationality" placeholder="Nationality" />
            </div>
            <div className="input-field">
              <label for="birth-date"><IconBirthday /></label>
              <input type="date" id="birth-date" name="birth-date" />
            </div>
            <div className="input-field">
              <label for="email"><IconEmail /></label>
              <input type="email" id="email" name="email" placeholder="E-mail" />
            </div>
            <div className="input-field">
              <label for="password"><IconPassword /></label>
              <input type="password" name="password" id="password" />
            </div>
            <div className="input-field">
              <label for="confirm-password"><IconPassword /></label>
              <input type="confirm-password" id="confirm-password" name="confirm-password" placeholder="Confirm password" />
            </div>
            <div className="input-field">
              <button type="submit" className="normal">Sign up</button>
            </div>
            <div>
              Already have an account? <Link to="/LogIn">Log in</Link>
            </div>
          </form>
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}*/

export default SignUp;
