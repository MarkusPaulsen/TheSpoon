//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";

//</editor-fold>


class CustomerMainPage extends Component {

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
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else if (this.state.user === "Restaurant Owner") {
            return (
                <Redirect to={{pathname: "/YourRestaurant"}}/>
            );
        } else if (this.state.user === "Customer") {
            return (
                <Redirect to={{pathname: "/CustomerMain"}}/>
            );
        } else if (this.state.user === "Consultant") {
            //<editor-fold desc="Render Customer">
            return (
                <div className="mainpage-banner">
                    <div className="mainpage-text">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h1 className="title">Hello Customer</h1>
                                    <label>You can now log in on you mobile app.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

            //</editor-fold>
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
        _setBackgroundPageHere: (_backgroundPage) => {
            dispatch(_setBackgroundPage(_backgroundPage));
        }
    };
};

export default connect(null, mapDispatchToProps)(CustomerMainPage);

//</editor-fold>