import React, {Component} from 'react';
import MainLayout from '../layout/MainLayout.js'
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import {IconEditPink} from "../Icons";

class YourRestaurant extends Component {
    render() {
        const restaurant = {
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
        }

        const menus = [
            {id: 1, name:"Lunch menu", tags:["Italian", "Pizza"], description:"This is short description of the menu"},
            {id: 2, name:"Dinner menu", tags:["Italian", "Pizza"], description:"This is short description of the menu"}
            ]
        return (
            <MainLayout >
                <div className="mainpage-banner restaurant">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                               <Sidebar name={restaurant.name}
                                        street={restaurant.street}
                                        city={restaurant.city}
                                        country={restaurant.country}
                                        workingHours={restaurant.workingHours}
                                        image={restaurant.image}
                               />
                            </div>
                            <div className="col-sm-8">
                                <h3 className="title">Your menus</h3>
                                <div className="no-menus">
                                    <label>Your restaurant doesn't have any menus yet...</label>
                                    <button className="wide"><FilterLink filter={modalVisibilityFilters.SHOW_ADD_MENU}>Create new menu</FilterLink></button>
                                </div>
                                {menus.length > 1 ?
                                    menus.map(menu => {
                                        return (
                                            <Menu key={menu.id}
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

export default YourRestaurant;