//<editor-fold desc="React">
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
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
        this.props.setBackgroundPageHere(this);
        this.state = {
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user")
        };
    }

    componentWillUnmount() {
        this.props.setBackgroundPageHere(null);
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    update = () => {
        window.location.reload();
    }

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        if (this.state.token == null
            || this.state.token === "null"
            || this.state.user == null
            || this.state.user === "null") {
            //<editor-fold desc="Render No Token">
            return (
                <Redirect to={{pathname: "/"}}/>
            );
            //</editor-fold>
        } else if (this.state.user === "Restaurant Owner") {
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
        } else if (this.state.user === "Customer") {
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
        } else if (this.state.user === "Consultant") {
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
        } else {
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

    //</editor-fold>

}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => {
    return {
        setBackgroundPageHere: (backgroundPage) => {
            dispatch(setBackgroundPage(backgroundPage));
        }
    };
};

export default connect(null, mapDispatchToProps)(FailPage);

//</editor-fold>