//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux import">
import { connect } from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs import">
import { bindCallback, zip } from "rxjs";
import { ajax } from "rxjs/ajax";
//</editor-fold>

//<editor-fold desc="Constants">
import { modalVisibilityFilters } from "../../constants/modalVisibiltyFilters";
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
//</editor-fold>

class YourRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      menus: [],
      finishedLoading: false
    };
  }

  componentDidMount() {
    const thisTemp = this;
    this.data$ = zip(
      ajax({
          url: "/api/user/owner/restaurant",
          method: "GET",
          headers: {"X-Auth-Token": thisTemp.props.token}
      }),
      ajax({
          url: "/api/user/owner/restaurant/menu",
          method: "GET",
          headers: {"X-Auth-Token": thisTemp.props.token}
      })
    )
      .pipe(
        exhaustMap(values => {
          return bindCallback(thisTemp.setState).call(thisTemp, {
            restaurant: values[0].response,
            menus: values[1].response
          });
        }),
          catchError((error) => {
              throw error
          })
      ).subscribe((next) => {
          thisTemp.setState({finishedLoading: true});
        }, (error) => {
          console.log(error);
          thisTemp.setState({finishedLoading: true});
        })
  }

  componentWillUnmount() {
    this.data$.unsubscribe();
  }

  render() {
    if(typeof this.props.loginStatus != "undefined" && this.props.loginStatus === "logged in") {
      if (!this.state.finishedLoading) {
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
                      this.state.menus.length > 1 ? (
                          this.state.menus.map(menu => {
                            return (
                                <Menu
                                    key={menu.menuID}
                                    id={menu.menuID}
                                    name={menu.name}
                                    tags={menu.tags}
                                    description={menu.description}
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
      return(
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

export default connect(mapStateToProps, null)(YourRestaurant);
//</editor-fold>
