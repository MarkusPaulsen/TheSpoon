//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
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
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);

        this.state = {
            token: window.localStorage.getItem("token"),
            restaurantOwner: window.localStorage.getItem("restaurantOwner"),
            toUpdate: false
        }
    }

    //</editor-fold>

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        this.props.setBackgroundPageHere(this);
    }

    componentWillUnmount() {
        this.props.setBackgroundPageHere(null);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.toUpdate) {
            this.setState({
                toUpdate: false
            });
            this.componentWillUnmount();
            this.componentDidMount();
        }
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    update() {
        this.setState({toUpdate: true});
        this.forceUpdate()
    }

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        if (this.state.token == null
            || this.state.token === "null"
            || this.state.restaurantOwner == null
            || this.state.restaurantOwner === "null") {
            return (
                <Layout>
                    <div className="homepage-banner">
                        <div className="homepage-text">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h1 className="title">Share your menus</h1>
                                        <button className="normal"><FilterLink
                                            filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}>Get started</FilterLink>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        } else if (this.state.restaurantOwner === "false") {
            return (
                <Redirect to={{pathname: "/CustomerMain"}}/>
            );
        } else {
            return (
                <Redirect to={{pathname: "/YourRestaurant"}}/>
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

export default connect(null, mapDispatchToProps)(Homepage);
//</editor-fold>