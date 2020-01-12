//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
//</editor-fold>

//<editor-fold desc="Constants">
import {roles} from "../../constants/Roles";
//</editor-fold>
//<editor-fold desc="Containers">
import MainLayout from "../Layout/MainLayout.js";

//</editor-fold>


class YourProfilePage extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);

        this.state = {
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user")
        }
    }

    //</editor-fold>

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        this.props._setBackgroundPageHere(this);
        this.setState({
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user")
        });

    };

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    update = () => {
        window.location.reload();
    };

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        if (this.state.token == null
            || this.state.token === "null"
            || this.state.user == null
            || this.state.user === "null") {
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else {
            switch (this.state.user) {
                case roles["RESTAURANT_OWNER"]:
                    //<editor-fold desc="Render Restaurant Owner">
                    if (false) {
                        return (
                            <MainLayout>
                                <div className="mainpage-banner restaurant">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <h1>Loading...</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MainLayout>
                        );
                    } else {
                        return (
                            <MainLayout>
                                <div className="mainpage-banner">
                                    <div className="mainpage-text">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <h1 className="title">This is your profile
                                                        page {this.props.username}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </MainLayout>
                        );
                    }

                //</editor-fold>
                case roles["CUSTOMER"]:
                    return (
                        <Redirect to={{pathname: "/CustomerMain"}}/>
                    );
                case roles["CONSULTANT"]:
                    return (
                        <Redirect to={{pathname: "/Consultant"}}/>
                    );
                default:
                    return (
                        <Redirect to={{pathname: "/ThisShouldNotHaveHappened"}}/>
                    );
            }
        }
    }

    //</editor-fold>

}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => {
    return {
        _setBackgroundPageHere: (_backgroundPage) => {
            dispatch(_setBackgroundPage(_backgroundPage));
        }
    };
};

export default connect(null, mapDispatchToProps)(YourProfilePage);

//</editor-fold>