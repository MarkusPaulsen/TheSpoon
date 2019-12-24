//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router";
//</editor-fold>
//<editor-fold desc="RxJs">
import {ajax} from "rxjs/ajax";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {setModalVisibilityFilterAction} from "../../actionCreators/modalVisibilityFilterActionCreators";
import {setCurrentRestaurantInformation} from "../../actionCreators/restaurantActionCreators";
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
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);

        this.state = {
            restaurant: null,
            menus: null,
            restaurantMessage: "",
            menusMessage: "",
            toUpdate: false
        };
    }

    //</editor-fold>

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        this.props.setRestaurantPageHere(this);
        const thisTemp = this;
        this.$restaurant = ajax({
            url: paths["restApi"]["restaurant"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.props.token},
            timeout: timeout,
            responseType: "text"
        })
            .subscribe(
                (next) => {
                    let response = JSON.parse(next.response);
                    thisTemp.props.setRestaurantHere(response);
                    thisTemp.setState({
                        restaurant: response,
                        restaurantMessage: ""
                    });
                },
                (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({
                                restaurant: {},
                                restaurantMessage: "" + "The request timed out.",
                            });
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({
                                    restaurant: {},
                                    restaurantMessage: "There is no connection to the server."
                                });
                            } else if (error.status === 400) {
                                this.props.openAddRestaurantModal();
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
            );

        this.$menus = ajax({
            url: paths["restApi"]["menu"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.props.token},
            timeout: timeout,
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
            );
    }

    componentWillUnmount() {
        this.$restaurant.unsubscribe();
        this.$menus.unsubscribe();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.toUpdate) {
            this.setState({toUpdate: false});
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
        if (this.props.loginStatus !== "logged in") {
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else if (this.state.restaurant == null || this.state.menus == null) {
            return (
                <p>Loading...</p>
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
                                        <h4>Your menu has pending reviews...</h4>
                                        <button className="wide">
                                            <FilterLink filter={modalVisibilityFilters.SHOW_PENDING_REVIEW}>
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
    }

    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        token: state.logInReducer.token,
        loginStatus: state.logInReducer.loginStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRestaurantPageHere: (currentRestaurantPage) => {
            dispatch(setCurrentRestaurantPage(currentRestaurantPage));
        },
        setRestaurantHere: (currentRestaurantInformation) => {
            dispatch(setCurrentRestaurantInformation(currentRestaurantInformation));
        },
        openAddRestaurantModal: () => {
            dispatch(setModalVisibilityFilterAction(modalVisibilityFilters.SHOW_ADD_RESTAURANT));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourRestaurantPage);
//</editor-fold>
