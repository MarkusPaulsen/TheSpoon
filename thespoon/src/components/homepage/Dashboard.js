//<editor-fold desc="React Import">
import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
//</editor-fold>
//<editor-fold desc="Redux import">
import {connect} from "react-redux";
//</editor-fold>

//<editor-fold desc="Layout">
import MainLayout from '../layout/MainLayout.js'
//</editor-fold>

class Dashboard extends Component {
    //<editor-fold desc="Render">
    render() {
        if(typeof this.props.loginStatus != "undefined" && this.props.loginStatus === "logged in"){
            return (
                <MainLayout >
                    <div className="mainpage-banner">
                        <div className="mainpage-text">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h1 className="title">This is your dashboard {this.props.role ? "Restaurant owner" : "Customer"} {this.props.username}</h1>
                                        <Link to="/" className="logo">
                                            <text>Back to Homepage</text>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainLayout>
            );
        }
        else {
            return(
                <Redirect to={{pathname: '/'}}/>
            );
        }
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        role: state.logInRegisterReducer.role,
        username: state.logInRegisterReducer.username,
        loginStatus: state.logInRegisterReducer.loginStatus
    };
};

export default connect(mapStateToProps, null)(Dashboard);
//</editor-fold>