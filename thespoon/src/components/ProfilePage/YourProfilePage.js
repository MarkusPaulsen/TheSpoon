//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
//</editor-fold>

//<editor-fold desc="Layout">
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
        this.props.setBackgroundPageHere(this);
        this.state = {
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user")
        };

    };

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
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else if (this.state.user === "Restaurant Owner") {
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
                                            <h1 className="title">This is your profile page {this.props.username}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainLayout>
                );
            }

            //</editor-fold>
        } else if (this.state.user === "Customer") {
            return (
                <Redirect to={{pathname: "/CustomerMain"}}/>
            );
        } else if (this.state.user === "Consultant") {
            return (
                <Redirect to={{pathname: "/Consultant"}}/>
            );
        } else {
            return (
                <Redirect to={{pathname: "/ThisShouldNotHaveHappened"}}/>
            );
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

export default connect(null, mapDispatchToProps)(YourProfilePage);

//</editor-fold>