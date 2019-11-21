//<editor-fold desc="React">
import React, {Component} from 'react';
//</editor-fold>
//<editor-fold desc="Redux import">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs import">
import {ajax} from "rxjs/ajax";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Layout">
import MainLayout from '../layout/MainLayout.js'
//</editor-fold>
//<editor-fold desc="Components">
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Button from "react-bootstrap/Button";
//</editor-fold>

class YourRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: {
                name:"Pizzeria AUUM",
                street:"Piazzale Susa 20129",
                city: "Milano",
                country: "Italy",
                workingHours: [{Monday: [{open: 12, closes: 15}, { open: 19, closes:23} ]},
                    {Tuesday: [{open: 12, closes: 15}, { open: 19, closes:23} ]},
                    {Wednesday: [{ open: 19, closes:23} ]},
                    {Thursday: [{open: 12, closes: 15}, { open: 19, closes:23} ]},
                    {Friday: [ { open: 19, closes:1} ]},
                    {Saturday: [{open: 12, closes: 15}, { open: 19, closes: 2} ]},
                    {Sunday: [{open: 12, closes: 15}, { open: 19, closes:2} ]}],
                image: "https://www.hotel-grandium.cz/files/hotel/dining/Winter_Garden_127.jpg"
            },
            menus: []
        }
    }

    componentDidMount() {
        const thisTemp = this;
        this.menus$ = ajax
            .getJSON('http://localhost:8080/api/user/owner/restaurant/menu')
            .subscribe((next) => {
                thisTemp.setState({menus: next})
            }, (error) => {
                thisTemp.setState({menus: []})
            });
    }

    componentWillUnmount() {
        this.menus$.unsubscribe()
    }


    render() {
        return (
            <MainLayout >
                <div className="mainpage-banner restaurant">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                               <Sidebar name={this.state.restaurant.name}
                                        street={this.state.restaurant.street}
                                        city={this.state.restaurant.city}
                                        country={this.state.restaurant.country}
                                        workingHours={this.state.restaurant.workingHours}
                                        image={this.state.restaurant.image}
                               />
                            </div>
                            <div className="col-sm-8">
                                <h3 className="title">Your menus</h3>
                                <div className="no-menus">
                                    <label>Your restaurant doesn't have any menus yet...</label>
                                    <button className="wide"><FilterLink filter={modalVisibilityFilters.SHOW_ADD_MENU}>Create new menu</FilterLink></button>
                                </div>
                                {this.state.menus.length > 1 ?
                                    this.state.menus.map(menu => {
                                        return (
                                            <Menu key={menu.menuID}
                                                name={menu.name}
                                                tags={menu.tags}
                                                description={menu.description}
                                            />
                                        )})
                                    :
                                    <div className="no-menus">
                                        <label>Your restaurant doesn't have any menus yet...</label>
                                        <button className="wide"><FilterLink filter={modalVisibilityFilters.SHOW_ADD_MENU}>Create new menu</FilterLink></button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export default connect(null, null)(YourRestaurant)