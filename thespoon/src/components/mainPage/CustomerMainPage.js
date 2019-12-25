//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";

//</editor-fold>

class CustomerMainPage extends Component {
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
        this.setState({
                token: window.localStorage.getItem("token"),
                restaurantOwner: window.localStorage.getItem("restaurantOwner"),
                toUpdate: false
            },
            () => {
            });
    }

    componentWillUnmount() {
        this.setState({
                token: null,
                restaurantOwner: null,
                toUpdate: false
            },
            () => {
            });
        this.props.setBackgroundPageHere(null);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.toUpdate) {
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
        if (this.state.token == null || this.state.token === "null") {
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else if (this.state.restaurantOwner === "true") {
            return (
                <Redirect to={{pathname: "/YourRestaurant/"}}/>
            );
        } else {
            return (
                <div className="mainpage-banner">
                    <div className="mainpage-text">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h1 className="title">Hello {this.props.username}</h1>
                                    <label>You can now log in on you mobile app.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(null, mapDispatchToProps)(CustomerMainPage);
//</editor-fold>