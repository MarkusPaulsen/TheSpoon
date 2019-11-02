import React, { useState } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconName, IconLocation, IconBirthday, IconEmail, IconPassword, IconExit } from './Icons';
import { Modal, Button } from 'react-bootstrap';



class SignUpChooseUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showChooseUserModal: false,
            setShow: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose = () => {
        this.setState({
            showChooseUserModal: false,
        });

    };

    handleShow = () => {
        this.setState({
            showChooseUserModal: true,
        });

    };

    render() {
        return(
            <>
                <label variant="primary" onClick={this.handleShow}>Sign Up</label>

                <Modal show={this.state.showChooseUserModal} onHide={this.handleClose}
                    backdrop="static" centered>
                    <Modal.Body>
                        <button className="exit" onClick={this.handleClose}><IconExit /></button>
                        <div className="choose-user">
                            <form>
                                <h2>Sign up</h2>
                                <button className="wide">
                                    <Link to={{
                                        pathname: '/signup',
                                        state: 'restaurant owner'
                                    }}>restauran owner</Link>
                                </button>
                                <button className="wide">
                                    <Link to={{
                                        pathname: '/signup',
                                        state: 'customer'
                                    }}>Customer</Link>
                                </button>
                            </form>
                            <label>
                                Already have an account? <Link to="/LogIn">Log in</Link>
                            </label>
                        </div>
                    </Modal.Body>  
                </Modal>
            </>
        );
    }
}

export default SignUpChooseUser;
