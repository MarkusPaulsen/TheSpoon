//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="RxJs">
import {ajax} from "rxjs/ajax";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
import {_setModal} from "../../actionCreators/ModalActionCreators";
import {_setRestaurantInfo} from "../../actionCreators/RestaurantActionCreators";
//</editor-fold>

//<editor-fold desc="Constants">
import {roles} from "../../constants/Roles";
import {paths} from "../../constants/Paths";
import {modals} from "../../constants/Modals";
import {timeouts} from "../../constants/Timeouts"
//</editor-fold>
//<editor-fold desc="Containers">
import MainLayout from "../Layout/MainLayout.js";
import FilterLink from "../../containers/FilterModalLink";
import Sidebar from "./Items/Sidebar";
import Menu from "./Items/Menu";
//</editor-fold>


class YourRestaurantPage extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);

        this.state = {
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user"),
            //<editor-fold desc="State Restaurant">
            restaurant: null,
            restaurantMessage: "",
            $restaurant: null,
            //</editor-fold>
            //<editor-fold desc="State Menu">
            menus: null,
            menusMessage: "",
            $menu: null
            //</editor-fold>
        };
    }

    //</editor-fold>

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        //<editor-fold desc="Mount Temporary This">
        const thisTemp = this;
        //</editor-fold>
        this.props._setBackgroundPage(this);
        this.setState({
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user"),
            //<editor-fold desc="Mount Restaurant Data Observable">
            $restaurant: ajax({
                url: paths["restApi"]["restaurant"],
                method: "GET",
                headers: {"X-Auth-Token": thisTemp.state.token},
                timeout: timeouts,
                responseType: "text"
            })
                .subscribe(
                    (next) => {
                        let response = JSON.parse(next.response);
                        thisTemp.props._setRestaurantInfo(response);
                        thisTemp.setState({
                            restaurant: response,
                            restaurantMessage: ""
                        });
                    },
                    (error) => {
                        console.log(error);
                        switch (error.name) {
                            case "AjaxTimeoutError":
                                thisTemp.setState({
                                    restaurant: {},
                                    restaurantMessage: "" + "The request timed out.",
                                });
                                break;
                            case "InternalError":
                            case "AjaxError":
                                if (
                                    error.status === 0
                                    && error.response === ""
                                ) {
                                    thisTemp.setState({
                                        restaurant: {},
                                        restaurantMessage: "There is no connection to the server."
                                    });
                                } else if (
                                    error.status === 404
                                    && error.response === "No restaurant associated to this account found."
                                ) {
                                    this.props._openAddRestaurantModal();
                                    thisTemp.setState({
                                        restaurant: {},
                                        restaurantMessage: ""
                                    });
                                } else {
                                    thisTemp.setState({
                                        restaurant: {},
                                        restaurantMessage: error.response
                                    });
                                }
                                break;
                            default:
                                console.log(error);
                                thisTemp.setState({
                                    restaurant: {},
                                    restaurantMessage: "Something is not like it is supposed to be."
                                });
                                break;
                        }
                    }
                ),
            //</editor-fold>
            //<editor-fold desc="Mount Menu Data Observable">
            $menus: ajax({
                url: paths["restApi"]["menu"],
                method: "GET",
                headers: {"X-Auth-Token": thisTemp.state.token},
                timeout: timeouts,
                responseType: "text"
            })
                .subscribe(
                    (next) => {
                        let response = JSON.parse(next.response);
                        thisTemp.setState({
                            menus: response,
                            menusMessage: ""
                        });
                    },
                    (error) => {
                        switch (error.name) {
                            case "AjaxTimeoutError":
                                thisTemp.setState({
                                    menus: [],
                                    menusMessage: "The request timed out."
                                });
                                break;
                            case "InternalError":
                            case "AjaxError":
                                if (error.status === 0 && error.response === "") {
                                    thisTemp.setState({
                                        menus: [],
                                        menusMessage: "There is no connection to the server."
                                    });
                                } else {
                                    thisTemp.setState({
                                        menus: [],
                                        menusMessage: error.response
                                    });
                                }
                                break;
                            default:
                                console.log(error);
                                thisTemp.setState({
                                    menus: [],
                                    menusMessage: "Something is not like it is supposed to be."
                                });
                                break;
                        }
                    }
                )
            //</editor-fold>
        });
    };

    componentWillUnmount() {
        //<editor-fold desc="Unmount Menus Observable">
        if (this.state.$menu != null){
            this.state.$menu.unsubscribe();
        }
        //</editor-fold>
        //<editor-fold desc="Unmount Restaurant Observable">
        if (this.state.$restaurant != null) {
            this.state.$restaurant.unsubscribe();
        }
        //</editor-fold>
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
                    //<editor-fold desc="Render Restaurant Owner">
                    if (this.state.restaurant == null || this.state.menus == null) {
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
                                                />
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="error-block">
                                                    <small>{this.state.restaurantMessage}</small>
                                                </div>
                                                <div className="error-block">
                                                    <small>{this.state.menusMessage}</small>
                                                </div>
                                                <h3 className="title">Your menus</h3>
                                                <div className="no-menus">
                                                    <button className="wide">
                                                        <FilterLink modal={modals.SHOW_PENDING_REVIEW}>
                                                            See Reviews
                                                        </FilterLink>
                                                    </button>
                                                </div>
                                                {typeof this.state.menus !== "undefined" &&
                                                this.state.menus.length >= 1 ? (
                                                    this.state.menus.map((menu) => {
                                                        return (
                                                            <Menu
                                                                key={menu.menuID}
                                                                menuID={menu.menuID}
                                                                name={menu.name}
                                                                tags={menu.tags}
                                                                description={menu.description}
                                                                menuItems={menu.menuItems}
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
                    //</editor-fold>
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
        },
        //<editor-fold desc="Redux Restaurant">
        _setRestaurantInfo: (_restaurantInformation) => {
            dispatch(_setRestaurantInfo(_restaurantInformation));
        },
        _openAddRestaurantModal: () => {
            dispatch(_setModal(modals.SHOW_ADD_RESTAURANT));
        }
        //</editor-fold>
    };
};

export default connect(null, mapDispatchToProps)(YourRestaurantPage);
//</editor-fold>
