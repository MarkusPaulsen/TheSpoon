//<editor-fold desc="React Import">
import React, {Component} from "react";
import {Redirect} from "react-router-dom"
//</editor-fold>
//<editor-fold desc="Redux import">
import {connect} from "react-redux";
//</editor-fold>

class CustomerPage extends Component {
    //<editor-fold desc="Render">
    render() {
        if(typeof this.props.loginStatus != "undefined" && this.props.loginStatus === "logged in"){
            return (
                <div className="mainpage-banner">
                    <div className="mainpage-text">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h1 className="title">{this.props.username}, you are a customer. Please download and use the phone application here:</h1>
                                    <img src="/images/exampleQR.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, null)(CustomerPage);
//</editor-fold>