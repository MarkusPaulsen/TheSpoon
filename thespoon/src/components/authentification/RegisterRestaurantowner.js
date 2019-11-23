//<editor-fold desc="React">
import React, {Component} from 'react';
import {Redirect} from "react-router-dom"
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setModalVisibilityFilterAction} from "../../actions/modalVisibilityFilterActions";
import {failLogIn, logIn, register, successLogIn} from "../../actionCreators/logInRegisterActionCreators";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of, throwError} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconName, IconEmail, IconPassword, IconExit, IconBack} from '../Icons';
import Button from "react-validation/build/button";
import {ajax} from "rxjs/ajax";
import paths from "../../constants/paths";
//</editor-fold>



class RegisterRestaurantowner extends Component  {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

          this.validator = new FormValidator([{
              field: 'email',
              method: 'isEmpty',
              validWhen: false,
              message: 'E-mail is required.'
          }, {
              field: 'email',
              method: 'isEmail',
              validWhen: true,
              message: 'That is not a valid email.'
          }, {
              field: 'username',
              method: 'isEmpty',
              validWhen: false,
              message: 'Username is required.'
          }, {
              field: 'name',
              method: 'isEmpty',
              validWhen: false,
              message: 'Name is required.'
          },
          {
              field: 'surname',
              method: 'isEmpty',
              validWhen: false,
              message: 'Surname is required.'
          }, {
              field: 'password',
              method: 'isEmpty',
              validWhen: false,
              message: 'Password is required.'
          }, {
              field: 'confirmPassword',
              method: 'isEmpty',
              validWhen: false,
              message: 'Password confirmation is required.'
          }, {
              field: 'confirmPassword',
              method: this.passwordMatch,
              validWhen: true,
              message: 'Confirm password has to be identical to the password.'
          }]);

      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
          email:'',
          username: '',
          name:'',
          surname:'',
          password:'',
          confirmPassword: '',
          validation: this.validator.valid(),
          serverMessage: '',
          submitted: false
      };
  }
    //</editor-fold>

    //<editor-fold desc="Business Logic">
    passwordMatch = (confirmation, state) => (state.password === confirmation);

    handleSubmit = event => {
        event.preventDefault();

        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(this.setState).call(thisTemp, {
                    email:values.email,
                    username: values.username,
                    name: values.name,
                    surname: values.surname,
                    password:values.password,
                    confirmPassword: values.confirmPassword,
                    serverMessage: null
                });
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(this.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(this.state),
                    submitted: true
                });
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    return ajax({
                        url: paths['restApi']['login'],
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: {
                            username: this.state.username,
                            password: this.state.password,
                            isRestaurantOwner: true,
                        }
                    })
                }
                else {
                    return throwError({ status: 0});
                }
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    console.log(this.state)
                    this.props.register(
                        thisTemp.state.username,
                        thisTemp.state.email,
                        thisTemp.state.name,
                        thisTemp.state.surname,
                        thisTemp.state.password
                    );
                    this.props.changeToShowRestaurantInformation();
                },
                () => {}
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
            <span className="back"> <FilterLink filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}><IconBack /></FilterLink></span>
            <button className="exit" onClick={this.props.onHide}><IconExit /></button>
            <div className="modal-wrapper ">
                <Form ref={ (c) => { this.form = c; }} onSubmit={this.handleSubmit}>
                    <h2>Sign up</h2>
                    <div className="account-type">
                        <h4>as a <span className="role">{this.props.role}</span></h4>
                    </div>

                    <div className="input-field">
                        <IconEmail />
                        <Input type="email" name="email" placeholder="E-mail"/>
                    </div>
                    <div className="error-block">
                        <small>{validation.email.message}</small>
                    </div>

                    <div className="input-field">
                        <IconName />
                        <Input type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className="error-block">
                        <small>{validation.username.message}</small>
                    </div>

                    <div className="input-field name">
                        <IconName />
                        <Input type="text" name="name" placeholder="Name"/>
                        <Input type="text" name="surname" placeholder="Surname"/>
                    </div>
                    <div className="error-block">
                        <small>{validation.name.message}</small>
                        <small>{validation.surname.message}</small>
                    </div>

                    <div className="input-field">
                        <IconPassword />
                        <Input type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="error-block">
                        <small>{validation.password.message}</small>
                    </div>

                    <div className="input-field">
                        <IconPassword />
                        <Input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm password"/>
                    </div>
                    <div className="error-block">
                        <small>{validation.confirmPassword.message}</small>
                    </div>

                    <Button type="submit" className="normal">Log in</Button>
                    {/*<button className="normal">
                        <FilterLink filter={modalVisibilityFilters.SHOW_RESTAURANT_INFORMATION}>Continue</FilterLink>
                    </button>*/}
                    <div className="error-block">
                        <small>{this.state.serverMessage}</small>
                    </div>

                </Form>
                <div className="link-wrapper">
                    <small>Already have an account? <FilterLink filter={modalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink></small>
                </div>
            </div>
        </Modal.Body>
    );
  }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => ({
    logIn: (username, password) => dispatch(logIn(username, password)),
    failLogIn: () => dispatch(failLogIn()),
    successLogIn: (token) => dispatch(successLogIn(token))
    changeToShowRestaurantInformation: () => dispatch(setModalVisibilityFilterAction(modalVisibilityFilters.SHOW_RESTAURANT_INFORMATION)),
    register: (username, email, name, surname, password) => dispatch(register(username, email, name, surname, password))
});

export default connect(null, mapDispatchToProps)(RegisterRestaurantowner);
//</editor-fold>
