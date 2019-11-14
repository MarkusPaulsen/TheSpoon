import React from 'react';
import { Link } from 'react-router-dom';
import { IconNameDark, IconDashboard, IconYourRestaurant} from '../Icons.js';
import {authentificationModalVisibilityFilters} from "../../constants/modalVisibiltyFilters";


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
                            <Link to="/Dashboard"><IconDashboard/>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/YourRestaurant"><IconYourRestaurant/>Your Restaurant</Link>
                        </li>
                        <li>
                            <Link to="/Profile"><IconNameDark/>Your Profile</Link>
                        </li>
                    </ul>
                </nav> 
            </div>  
        </header>
    );
}

export default MainHeader;