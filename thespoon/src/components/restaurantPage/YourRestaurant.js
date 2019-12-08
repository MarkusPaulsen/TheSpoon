//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux import">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs import">
import {bindCallback, zip} from "rxjs";
import {ajax} from "rxjs/ajax";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../constants/paths";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Layout">
import MainLayout from "../layout/MainLayout.js";
//</editor-fold>
//<editor-fold desc="Components">
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import {catchError, exhaustMap} from "rxjs/operators";
import {failLogIn, logIn, successLogIn} from "../../actionCreators/logInActionCreators";
import {setModalVisibilityFilterAction} from "../../actionCreators/modalVisibilityFilterActionCreators";
import {Redirect} from "react-router";
import {setCurrentMenu} from "../../actionCreators/CurrentMenuActionCreators";

//</editor-fold>

class YourRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: {},
            menus: [],
            finishedLoadingRestaurantData: false,
            finishedLoadingMenuData: false
        };
    }

    componentDidMount() {
        const thisTemp = this;
        this.$restaurantdata = ajax({
            url: paths["restApi"]["restaurant"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.props.token}
        }).pipe(
            exhaustMap(values => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    restaurant: values.response
                });
            }),
            catchError((error) => {
                throw error
            })
        ).subscribe((next) => {
            thisTemp.setState({finishedLoadingRestaurantData: true});
        }, (error) => {
            if (error.status === 400) {
                this.props.openRestaurantConfiguration();
            } else {
                thisTemp.setState({finishedLoadingRestaurantData: true});
            }
        });

        this.$menuData = ajax({
            url: paths["restApi"]["menu"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.props.token}
        }).pipe(
            exhaustMap(values => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    menus: values.response
                });
            }),
            catchError((error) => {
                throw error
            })
        ).subscribe((next) => {
            thisTemp.setState({finishedLoadingMenuData: true});
        }, (error) => {
            thisTemp.setState({finishedLoadingMenuData: true});
        });
    }

    componentWillUnmount() {
        this.$restaurantdata.unsubscribe();
        this.$menuData.unsubscribe();
    }

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
                                        />
                                    </div>
                                    <div className="col-sm-8">
                                        <h3 className="title">Your menus</h3>
                                        <div className="no-menus">
                                            <button className="wide">
                                                <FilterLink filter={modalVisibilityFilters.SHOW_ADD_MENU}>
                                                    Create new menu
                                                </FilterLink>
                                            </button>
                                        </div>
                                        {typeof this.state.menus !== "undefined" &&
                                        this.state.menus.length >= 1 ? (
                                            this.state.menus.map(menu => {
                                                return (
                                                    <Menu
                                                        key={menu.menuID}
                                                        id={menu.menuID}
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

const mapDispatchToProps = (dispatch) => {
    return {
        openRestaurantConfiguration: () => {
            dispatch(setModalVisibilityFilterAction(modalVisibilityFilters.SHOW_RESTAURANT_INFORMATION));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(YourRestaurant);
//</editor-fold>
