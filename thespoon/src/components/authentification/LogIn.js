//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {paths} from "../../constants/paths";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {logIn, failLogIn, successLogIn} from "../../actionCreators/logInActionCreators";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, throwError, of} from "rxjs";
import {ajax} from "rxjs/ajax";
import {take, map, exhaustMap} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit, IconName, IconEmail, IconPassword} from '../Icons';
//</editor-fold>



class LogIn extends Component {

  //<editor-fold desc="Constructor">
  constructor(props)
  {
    super(props);

    this.validator = new FormValidator([
      {
        field: "username",
        method: "isEmpty",
        validWhen: false,
        message: "Username is required"
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required."
      },
    ]);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username:'',
      password:'',
      validation: this.validator.valid(),
      serverMessage: "",
      submitted: false
    };
  }

  //</editor-fold>

  //<editor-fold desc="Business Logic">
  handleSubmit = (event) => {
    event.preventDefault();

    const thisTemp = this;
    of(1)
        .pipe(map(() => {
          return thisTemp.form.getValues();
        }))
        .pipe(exhaustMap((values) => {
          return bindCallback(thisTemp.setState).call(thisTemp, {
            username:values.username,
            password:values.password
          });
        }))
        .pipe(exhaustMap(() => {
          return bindCallback(thisTemp.setState).call(thisTemp, {
            validation: thisTemp.validator.validate(thisTemp.state),
            submitted: true,
            serverMessage: ""
          });
        }))
        .pipe(exhaustMap(() => {
          if (thisTemp.state.validation.isValid) {
            thisTemp.props.logIn(thisTemp.state.username);
            thisTemp.setState({serverMessage: "Login is processing"});
            return ajax({
              url: paths["restApi"]["login"],
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: {
                username: thisTemp.state.username,
                password: thisTemp.state.password,
                isRestaurantOwner: true,
              }
            })
          }
          else {
            return throwError({status: 0});
          }
        }))
        .pipe(take(1))
        .subscribe(
            (next) => {
              thisTemp.props.successLogIn(next.response.token);
              thisTemp.setState(
                  {serverMessage: <Redirect to={{pathname: "/Mainpage/"}}/>}
              );
              thisTemp.props.onHide();
            }, (error) => {
              thisTemp.props.failLogIn();
              switch (error.status) {
                case 400:
                  thisTemp.setState({serverMessage: "Invalid username or password" });
                  break;
                case 404:
                  thisTemp.setState({serverMessage: "No connection to the server" });
                  break;
                case 0:
                  thisTemp.setState({serverMessage: "" });
                  break;
                default:
                  thisTemp.setState({serverMessage: "General error" });
                  break;
              }
            }
        );
  };
  //</editor-fold>

  //<editor-fold desc="Render">
  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :               // then check validity every time we render
        this.state.validation;
    return (
        <Modal.Body>
           <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="modal-wrapper ">
              <Form ref={(c) => {this.form = c; }} onSubmit={this.handleSubmit}>
                <h2 className="title">Log in</h2>

                <div className="input-field">
                  <IconName />
                  <Input type="username" name="username" placeholder="Username" id = "loginFormUsername"/>
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
                <small>Don"t have an account? <FilterLink filter={modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}>Register now</FilterLink></small>
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
    logIn: (username) => dispatch(logIn(username)),
    failLogIn: () => dispatch(failLogIn()),
    successLogIn: (token) => dispatch(successLogIn(token))
  };
};

export default connect(null, mapDispatchToProps)(LogIn)
//</editor-fold>
