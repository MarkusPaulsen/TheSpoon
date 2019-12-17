//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback} from "rxjs";
import {ajax} from "rxjs/ajax";
import {exhaustMap, catchError} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setModalVisibilityFilterAction} from "../../actionCreators/modalVisibilityFilterActionCreators";
import {setRestaurantInformation} from "../../actionCreators/restaurantActionCreators";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../constants/paths";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import {timeout} from "../../constants/timeout"
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Layout">
import MainLayout from "../layout/MainLayout.js";
//</editor-fold>
//<editor-fold desc="Components">
import Sidebar from "./Items/Sidebar";
import Menu from "./Items/Menu";
import {setCurrentRestaurantPage} from "../../actionCreators/CurrentMenuActionCreators";
//</editor-fold>

class YourRestaurantPage extends Component {
    constructor(props) {
        super(props);

        // this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);

        this.state = {
            restaurant: {},
            menus: [],
            serverMessageFinishedLoadingRestaurantData:"",
            serverMessageFinishedLoadingMenuData:"",
            finishedLoadingRestaurantData: false,
            finishedLoadingMenuData: false,
            toUpdate: false
        };
    }

    componentDidMount() {
        const thisTemp = this;
        this.$restaurantdata = ajax({
            url: paths["restApi"]["restaurant"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.props.token},
            timeout: timeout,
            responseType: "text"
        })
            .pipe(
                exhaustMap((next) => {
                    let response = JSON.parse(next.response);
                    return bindCallback(thisTemp.setState).call(thisTemp, {
                        restaurant: response
                    });
                }),
                catchError((error) => {
                    throw error
                }))
            .subscribe(
                () => {
                    thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "", finishedLoadingRestaurantData: true});
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessageFinishedLoadingRestaurantData: ""  +"The request timed out.", finishedLoadingRestaurantData: true});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "There is no connection to the server.", finishedLoadingRestaurantData: true});
                            } else if (error.status === 400) {
                                this.props.openRestaurantConfiguration();
                                thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "", finishedLoadingRestaurantData: true});
                            } else {
                                thisTemp.setState({serverMessageFinishedLoadingRestaurantData: error.response, finishedLoadingRestaurantData: true});
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "Something is not like it is supposed to be.", finishedLoadingMenuData: true});
                            break;
                    }
                }
            );

        this.$menuData = ajax({
            url: paths["restApi"]["menu"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.props.token},
            timeout: timeout,
            responseType: "text"
        })
            .pipe(
                exhaustMap((next) => {
                    let response = JSON.parse(next.response);
                    return bindCallback(thisTemp.setState).call(thisTemp, {
                        menus: response
                    });
                }),
                catchError((error) => {
                    throw error
                }))
            .subscribe(
                () => {
                    thisTemp.setState({serverMessageFinishedLoadingMenuData: "", finishedLoadingMenuData: true});
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessageFinishedLoadingMenuData: "The request timed out.", finishedLoadingMenuData: true});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessageFinishedLoadingMenuData: "There is no connection to the server.", finishedLoadingMenuData: true});
                            } else {
                                thisTemp.setState({serverMessageFinishedLoadingMenuData: error.response, finishedLoadingMenuData: true});
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({serverMessageFinishedLoadingMenuData: "Something is not like it is supposed to be.", finishedLoadingMenuData: true});
                            break;
                    }
                }
            );
    }

    componentWillUnmount() {
        this.$restaurantdata.unsubscribe();
        this.$menuData.unsubscribe();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        if(this.state.toUpdate) {

            this.setState({toUpdate: false});

            this.$restaurantdata.unsubscribe();
            this.$menuData.unsubscribe();



            const thisTemp = this;
            this.$restaurantdata = ajax({
                url: paths["restApi"]["restaurant"],
                method: "GET",
                headers: {"X-Auth-Token": thisTemp.props.token},
                timeout: timeout,
                responseType: "text"
            })
                .pipe(
                    exhaustMap((next) => {
                        let response = JSON.parse(next.response);
                        return bindCallback(thisTemp.setState).call(thisTemp, {
                            restaurant: response
                        });
                    }),
                    catchError((error) => {
                        throw error
                    }))
                .subscribe(
                    () => {
                        thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "", finishedLoadingRestaurantData: true});
                    }, (error) => {
                        switch (error.name) {
                            case "AjaxTimeoutError":
                                thisTemp.setState({serverMessageFinishedLoadingRestaurantData: ""  +"The request timed out.", finishedLoadingRestaurantData: true});
                                break;
                            case "InternalError":
                            case "AjaxError":
                                if (error.status === 0 && error.response === "") {
                                    thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "There is no connection to the server.", finishedLoadingRestaurantData: true});
                                } else if (error.status === 400) {
                                    this.props.openRestaurantConfiguration();
                                    thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "", finishedLoadingRestaurantData: true});
                                } else {
                                    thisTemp.setState({serverMessageFinishedLoadingRestaurantData: error.response, finishedLoadingRestaurantData: true});
                                }
                                break;
                            default:
                                console.log(error);
                                thisTemp.setState({serverMessageFinishedLoadingRestaurantData: "Something is not like it is supposed to be.", finishedLoadingMenuData: true});
                                break;
                        }
                    }
                );

            this.$menuData = ajax({
                url: paths["restApi"]["menu"],
                method: "GET",
                headers: {"X-Auth-Token": thisTemp.props.token},
                timeout: timeout,
                responseType: "text"
            })
                .pipe(
                    exhaustMap((next) => {
                        let response = JSON.parse(next.response);
                        return bindCallback(thisTemp.setState).call(thisTemp, {
                            menus: response
                        });
                    }),
                    catchError((error) => {
                        throw error
                    }))
                .subscribe(
                    () => {
                        thisTemp.setState({serverMessageFinishedLoadingMenuData: "", finishedLoadingMenuData: true});
                    }, (error) => {
                        switch (error.name) {
                            case "AjaxTimeoutError":
                                thisTemp.setState({serverMessageFinishedLoadingMenuData: "The request timed out.", finishedLoadingMenuData: true});
                                break;
                            case "InternalError":
                            case "AjaxError":
                                if (error.status === 0 && error.response === "") {
                                    thisTemp.setState({serverMessageFinishedLoadingMenuData: "There is no connection to the server.", finishedLoadingMenuData: true});
                                } else {
                                    thisTemp.setState({serverMessageFinishedLoadingMenuData: error.response, finishedLoadingMenuData: true});
                                }
                                break;
                            default:
                                console.log(error);
                                thisTemp.setState({serverMessageFinishedLoadingMenuData: "Something is not like it is supposed to be.", finishedLoadingMenuData: true});
                                break;
                        }
                    }
                );
        }
    }


    update() {
        this.setState({toUpdate: true});
        this.forceUpdate()
    }

    //componentWillUpdate(nextProps, nextState, nextContext) {
    //}

    render() {
        if (typeof this.props.loginStatus != "undefined" && this.props.loginStatus === "logged in") {
            if (!this.state.finishedLoadingRestaurantData || !this.state.finishedLoadingMenuData) {
                return <p>Loading...</p>;
            } else {
                return (
                    <MainLayout>
                        <div className="mainpage-banner restaurant">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Sidebar
                                            name={this.state.restaurant.name}
                                            address={this.state.restaurant.address}
                                            city={this.state.restaurant.city}
                                            country={this.state.restaurant.country}
                                            imageLink={this.state.restaurant.imageLink}
                                            openingHours={this.state.restaurant.openingHours}
                                            currentRestaurantPage={this}
                                        />
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="error-block">
                                            <small>{this.state.serverMessageFinishedLoadingRestaurantData}</small>
                                        </div>
                                        <div className="error-block">
                                            <small>{this.state.serverMessageFinishedLoadingMenuData}</small>
                                        </div>
                                        <h3 className="title">Your menus</h3>
                                        <div className="no-menus">
                                            <h4>Your menu has pending reviews...</h4>
                                            <button className="wide">
                                                <FilterLink filter={modalVisibilityFilters.SHOW_PENDING_REVIEW} currentRestaurantPage={this}>
                                                    See Reviews
                                                </FilterLink>
                                            </button>
                                        </div>
                                        {typeof this.state.menus !== "undefined" &&
                                        this.state.menus.length >= 1 ? (
                                            this.state.menus.map(menu => {
                                                return (
                                                    <Menu
                                                        key={menu.menuID}
                                                        menuID={menu.menuID}
                                                        name={menu.name}
                                                        tags={menu.tags}
                                                        description={menu.description}
                                                        menuItems={menu.menuItems}
                                                        currentRestaurantPage={this}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <div className="no-menus">
                                                <label>
                                                    Your restaurant doesnt have any menus yet...
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainLayout>
                );
            }
        } else {
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        }
    }
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        token: state.logInReducer.token,
        loginStatus: state.logInReducer.loginStatus
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openRestaurantConfiguration: () => {
            dispatch(setRestaurantInformation(ownProps));
            dispatch(setModalVisibilityFilterAction(modalVisibilityFilters.SHOW_ADD_RESTAURANT));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourRestaurantPage);
//</editor-fold>
