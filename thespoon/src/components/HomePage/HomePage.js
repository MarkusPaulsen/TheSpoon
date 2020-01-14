//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
//</editor-fold>

//<editor-fold desc="Constants">
import {roles} from "../../constants/Roles";
import {modals} from "../../constants/Modals";
//</editor-fold>
//<editor-fold desc="Containers">
import Layout from "../Layout/Layout"
import FilterLink from "../../containers/FilterModalLink";

//</editor-fold>


class HomePage extends Component {

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
            //<editor-fold desc="Render Null">
            // noinspection JSLint
            return (
                <Layout>
                    <div className="homepage-banner">
                        <div className="homepage-text">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h1 className="title">Share your menus</h1>
                                        <button className="normal">
                                            <FilterLink
                                                modal={modals.SHOW_CHOOSE_ROLE}
                                            >
                                                Get started
                                            </FilterLink>
                                        </button>
                                        <p><FilterLink
                                            modal={modals.SHOW_CHOOSE_CONSULTANT}
                                        >
                                           Are you a consultant?
                                        </FilterLink></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
            //</editor-fold>
        } else {
            switch (this.state.user) {
                case roles["RESTAURANT_OWNER"]:
                    return (
                        <Redirect to={{pathname: "/YourRestaurant"}}/>
                    );
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
        _setBackgroundPage: (_backgroundPage) => {
            dispatch(_setBackgroundPage(_backgroundPage));
        }
    };
};

export default connect(null, mapDispatchToProps)(HomePage);

//</editor-fold>