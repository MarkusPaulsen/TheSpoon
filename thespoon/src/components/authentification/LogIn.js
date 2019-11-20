//<editor-fold desc="React Import">
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import paths from '../../constants/paths';
//</editor-fold>
//<editor-fold desc="Redux import">
import {connect} from "react-redux";
import {logIn, failLogIn, successLogIn} from '../../actionCreators/logInRegisterActionCreators';
//</editor-fold>
//<editor-fold desc="RxJs import">
import {bindCallback, throwError, of} from "rxjs";
import {ajax} from "rxjs/ajax";
import {take, map, exhaustMap} from 'rxjs/operators';
//</editor-fold>
//<editor-fold desc="Bootstrap import">
import {Modal, ButtonToolbar, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
//</editor-fold>
import { IconExit, IconEmail, IconPassword } from '../Icons';
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import FormValidator from "../../validation/FormValidator";


class LogIn extends Component {

  //<editor-fold desc="Constructor">
  constructor(props)
  {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username is required'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
      },
    ]);

    /*this.handleSubmit = this.handleSubmit.bind(this);*/
    this.changeRole = this.changeRole.bind(this);

    this.state = {
      username:'',
      password:'',
      isRestaurantOwner: true,
      validation: this.validator.valid(),
      serverMessage: '',
      submitted: false
    };
  }

  //</editor-fold>

  handleSubmit = (event) => {
    event.preventDefault();

    const thisTemp = this;
    of(1)
        .pipe(map((event) => {
          return thisTemp.form.getValues();
        }))
        .pipe(exhaustMap((values) => {
          return bindCallback(this.setState).call(thisTemp, {
            username:values.username,
            password:values.password,
            serverMessage: null
          });
        }))
        .pipe(exhaustMap((event) => {
          return bindCallback(this.setState).call(thisTemp, {
            validation: thisTemp.validator.validate(this.state),
            submitted: true
          });
        }))
        .pipe(exhaustMap((event) => {
          if (thisTemp.state.validation.isValid) {
            thisTemp.props.logIn(thisTemp.state.username, thisTemp.state.isRestaurantOwner);
            return ajax({
              url: paths['restApi']['login'],
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: {
                username: this.state.username,
                password: this.state.password,
                isRestaurantOwner: this.state.isRestaurantOwner,
              }
            })
          }
          else {
            return throwError({ status: 0});
          }
        }))
        .pipe(take(1))
        .subscribe(
            (next) => {
              this.props.successLogIn(next.response.token);
              this.setState(
                  { serverMessage: <Redirect to={{pathname: '/Mainpage/'}}/>}
              );
              this.props.onHide();
            },
            (error) => {
              this.props.failLogIn();
              switch (error.status) {
                case 400:
                  this.setState({ serverMessage: "Invalid username or password" });
                  break;
                case 404:
                  this.setState({ serverMessage: "No connection to the server" });
                  break;
                case 0:
                  this.setState({ serverMessage: "" });
                  break;
                default:
                  this.setState({ serverMessage: "General error" });
                  break;
              }
            }
        );

    /*const values = this.form.getValues();

    const nextFunction = (next) => {
      this.props.successLogIn(next.response.token);
      this.setState(
          { serverMessage: <Redirect to={{pathname: '/Mainpage/'}}/>}
      );
      this.props.onHide();
    };

    const errorFunction = (error) => {
      this.props.failLogIn();
      switch (error.status) {
        case 400:
          this.setState({ serverMessage: "Invalid username or password" });
          break;
        case 404:
          this.setState({ serverMessage: "No connection to the server" });
          break;
        case 0:
          this.setState({ serverMessage: "" });
          break;
        default:
          this.setState({ serverMessage: "General error" });
          break;
      }
    };
    this.setState({
          username:values.username,
          password:values.password,
          serverMessage: null
        }, () => { //because setstate is asynchronus, further action must be taken on callback

          const validation = this.validator.validate(this.state);
          this.setState({
            validation: validation,
            submitted: true
          }, () => {
            if (validation.isValid) {
              this.props.logIn(this.state.username, this.state.isRestaurantOwner);
              ajax({
                url: paths['restApi']['login'],
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: {
                  username: this.state.username,
                  password: this.state.password,
                  isRestaurantOwner: this.state.isRestaurantOwner,
                }
              }).pipe(take(1)).subscribe(nextFunction, errorFunction)
            }
              }
          );
    })*/
  };

  changeRole = (role) => {
    if (role === 1) {
      this.setState({ isRestaurantOwner: false });
    } else {
      this.setState({ isRestaurantOwner: true });
    }
  };

  //<editor-fold desc="Render">
  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :               // then check validity every time we render
        this.state.validation;
    return (
        <Modal.Body>
           <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="modal-wrapper ">
              <Form ref={ (c) => { this.form = c; }} onSubmit={this.handleSubmit}>
                <h2 className="title">Log in</h2>

                <div className="input-field">
                  <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="role" defaultValue={0} onChange={this.changeRole}>
                      <ToggleButton value={0}>Restaurant Owner</ToggleButton>
                      <ToggleButton value={1}>Customer</ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                </div>

                <div className="input-field">
                  <IconEmail />
                  <Input type="username" id="username" name="username" placeholder="Username" id = "loginFormUsername"/>
                </div>
                <div className="error-block">
                  <small>{validation.username.message}</small>
                </div>

                <div className="input-field">
                  <IconPassword />
                  <Input type="password" name="password" placeholder="Password" id = "loginFormPassword"/>
                </div>
                <div className="error-block">
                  <small>{validation.password.message}</small>
                </div>

                <Button type="submit" className="normal">Log in</Button>
                <div className="error-block">
                  <small>{this.state.serverMessage}</small>
                </div>
              </Form>

              <div className="link-wrapper">
                <small>Don't have an account? <FilterLink filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}>Register now</FilterLink></small>
              </div>
            </div>
        </Modal.Body>
    );
  }
  //</editor-fold>

}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (username, password) => dispatch(logIn(username, password)),
    failLogIn: () => dispatch(failLogIn()),
    successLogIn: (token) => dispatch(successLogIn(token))
  };
};

export default connect(null, mapDispatchToProps)(LogIn)
//</editor-fold>
