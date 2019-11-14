import React from 'react';
import { Link } from 'react-router-dom';
import { IconName, IconDashboard, IconYourRestaurant} from '../Icons.js';
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";


import FilterLink from "../../containers/FilterModalLink";

const MainHeader = () => {
    return (
        <header className="main-header">
            <div className="container">
                <nav>
                    <Link to="/" className="logo">
                        <img className="site-logo" src="/images/thespoon_logo_black.png" alt="logo" />
                    </Link>
                    <ul>
                        <li>
                            <IconDashboard/>
                            <Link to="/Dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <IconYourRestaurant/>
                            <Link to="/YourRestaurant">Your Restaurant</Link>
                        </li>
                        <li>
                            <IconName/>
                            <Link to="/Profile">Your Profile</Link>
                        </li>
                    </ul>
                </nav> 
            </div>  
        </header>
    );
}

export default MainHeader;