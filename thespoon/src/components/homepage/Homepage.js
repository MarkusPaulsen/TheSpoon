//<editor-fold desc="React Import">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux import">
import {connect} from "react-redux";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Layout">
import Layout from "./../layout/Layout.js"
//</editor-fold>


class Homepage extends Component {
    //<editor-fold desc="Render">
    render() {
        if(typeof this.props.loginStatus != "undefined" && this.props.loginStatus === "logged in"){
            return(
                <Redirect to={{pathname: "/Mainpage/"}}/>
            );
        }
        else {
            return (
                <Layout >
                    <div className="homepage-banner">
                        <div className="homepage-text">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h1 className="title">Share your menus</h1>
                                        <button className="normal"><FilterLink filter={modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}>Get started</FilterLink></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        }
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        loginStatus: state.logInReducer.loginStatus
    };
};

export default connect(mapStateToProps, null)(Homepage);
//</editor-fold>