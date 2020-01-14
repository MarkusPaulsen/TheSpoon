//<editor-fold desc="React">
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
//</editor-fold>

//<editor-fold desc="Constants">
import {roles} from "../../constants/Roles";
//</editor-fold>
//<editor-fold desc="Containers">
import MainLayout from "../Layout/MainLayout";

//</editor-fold>


class FailPage extends Component {

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
        this.props._setBackgroundPage(this);
        this.setState({
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user")
        });
    }

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
            //<editor-fold desc="Render No Token">
            // noinspection JSLint
            return (
                <Redirect to={{pathname: "/"}}/>
            );
            //</editor-fold>
        } else {
            switch (this.state.user) {
                case roles["RESTAURANT_OWNER"]:
                    //<editor-fold desc="Render Restaurant Owner">
                    return (
                        <MainLayout>
                            <div className="mainpage-banner restaurant">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h1 className="title">Something went wrong.</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MainLayout>
                    );
                //</editor-fold>
                case roles["CUSTOMER"]:
                    //<editor-fold desc="Render Customer">
                    return (
                        <div className="mainpage-banner">
                            <div className="mainpage-text">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h1 className="title">Something went wrong.</h1>
                                            <Link to="/CustomerMain">Go to Customer Main Page</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                //</editor-fold>
                case roles["CONSULTANT"]:
                    //<editor-fold desc="Render Consultant">
                    return (
                        <div className="mainpage-banner">
                            <div className="mainpage-text">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h1 className="title">Something went wrong.</h1>
                                            <Link to="/">Go to Consultant Main Page</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                //</editor-fold>
                default:
                    //<editor-fold desc="Render Fail">
                    return (
                        <div className="mainpage-banner">
                            <div className="mainpage-text">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h1 className="title">Something went wrong.</h1>
                                            <Link to="/">Go to Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                //</editor-fold>
            }
        }
    }

    //</editor-fold>

}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => {
    return {
        _setBackgroundPage: (_backgroundPage) => {
            dispatch(_setBackgroundPage(_backgroundPage));
        }
    };
};

export default connect(null, mapDispatchToProps)(FailPage);

//</editor-fold>