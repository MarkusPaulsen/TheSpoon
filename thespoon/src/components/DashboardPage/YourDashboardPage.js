//<editor-fold desc="React Import">
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom"
//</editor-fold>
//<editor-fold desc="Redux import">
import {connect} from "react-redux";
//</editor-fold>

//<editor-fold desc="Layout">
import MainLayout from "../layout/MainLayout.js"
//</editor-fold>

class YourDashboardPage extends Component {
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
                                        <h1 className="title">This is your dashboard  {this.props.username}</h1>
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
                <Redirect to={{pathname: "/"}}/>
            );
        }
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        username: state.logInReducer.username,
        loginStatus: state.logInReducer.loginStatus
    };
};

export default connect(mapStateToProps, null)(YourDashboardPage);
//</editor-fold>