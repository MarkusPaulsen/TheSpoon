//<editor-fold desc="React">
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom"
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
//</editor-fold>

//<editor-fold desc="Layout">
import MainLayout from "../layout/MainLayout.js"
import {ajax} from "rxjs/ajax";
import {paths} from "../../constants/paths";
import {timeout} from "../../constants/timeout";
//</editor-fold>

class YourDashboardPage extends Component {
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
    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        this.props.setBackgroundPageHere(this);

    };

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
                <Redirect to={{pathname: "/"}}/>
            );
        } else if(this.state.restaurantOwner === "false") {
            return (
                <Redirect to={{pathname: "/CustomerMain"}}/>
            );
        } else {
            return (
                <MainLayout >
                    <div className="mainpage-banner">
                        <div className="mainpage-text">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h1 className="title">This is your dashboard</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainLayout>
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

export default connect(null, mapDispatchToProps)(YourDashboardPage);
//</editor-fold>