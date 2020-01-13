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
            // noinspection JSLint
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else {
            switch (this.state.user) {
                case roles["RESTAURANT_OWNER"]:
                    return (
                        <Redirect to={{pathname: "/YourRestaurant"}}/>
                    );
                case roles["CUSTOMER"]:
                    //<editor-fold desc="Render Customer">
                    return (
                        <div className="mainpage-banner customer">
                            <div className="container">
                                <h1 className="title">Hello Customer</h1>
                                <label>You can now log in on you mobile app.</label>
                                <img src="/images/qr-code.png"/>
                            </div>
                        </div>
                    );
                //</editor-fold>
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

export default connect(null, mapDispatchToProps)(CustomerMainPage);

//</editor-fold>