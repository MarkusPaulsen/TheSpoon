import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconExit, IconBack } from './Icons';
import { Modal } from 'react-bootstrap';
import Register from './Register';



class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showChooseRole: false,
            showRegister: false,
            role: ''
        };
        this.handleCloseChooseRole = this.handleCloseChooseRole.bind(this);
        this.handleShowChooseRole = this.handleShowChooseRole.bind(this);
        this.handleShowRegister = this.handleShowRegister.bind(this);
        this.handleCloseSignUpForm = this.handleCloseRegister.bind(this);
        this.handleBackToRoleChoosing = this.handleBackToRoleChoosing.bind(this);
    }

    handleCloseChooseRole = () => {
        this.setState({
            showChooseRole: false,
        });

    };

    handleShowChooseRole = () => {
        this.setState({
            showChooseRole: true,
        });

    };

    handleShowRegister = (e, role) => {
        e.preventDefault();
       
        this.setState({
            showChooseRole: false,
            showRegister: true,
            role: role
        });
    }

    handleCloseRegister = () => {
        this.setState({
            showRegister: false,
            role: ''
        });
    }

    handleBackToRoleChoosing = () => {
        this.setState({
            showRegister: false,
            showChooseRole: true,
            role: ''
        });
    }

    render() {
        return(
            <>
                <label onClick={this.handleShowChooseRole}>Sign Up</label>

                <Modal show={this.state.showChooseRole} onHide={this.handleCloseChooseRole} centered>
                    <Modal.Body>
                        <button className="exit" onClick={this.handleCloseChooseRole}><IconExit /></button>
                        <div className="sign-up choose-role">
                            <form>
                                <h2>Sign up</h2>
                                <button className="wide" onClick={(e) => this.handleShowRegister(e, "restaurant owner")}>Restaurant owner</button>
                                <button className="wide" onClick={(e) => this.handleShowRegister(e, "customer")}>Customer</button>       
                            </form>
                            <label>
                                Already have an account? <Link to="/">Log in</Link>
                            </label>
                        </div>
                    </Modal.Body>  
                </Modal>


                <Modal show={this.state.showRegister} onHide={this.handleCloseRegister} centered>
                    <Modal.Body>
                        <button className="exit" onClick={this.handleCloseRegister}><IconExit /></button>
                        <span className="back" onClick={this.handleBackToRoleChoosing}><IconBack /></span>
                        <div className="sign-up">
                            <Register role={this.state.role}/>
                            <label>
                                Already have an account? <Link to="/">Log in</Link>
                            </label>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default SignUp;
