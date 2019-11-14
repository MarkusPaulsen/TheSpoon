import React from 'react';
import { Link } from 'react-router-dom';
import { IconName } from '../Icons.js';
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
                            <text>Dashboard</text>
                        </li>
                        <li>
                            <text>Your Restaurant</text>
                        </li>
                        <li>
                            <IconName/>
                            <Link to="/Profile" className="main-nav-links">Your Profile</Link>
                        </li>
                    </ul>
                </nav> 
            </div>  
        </header>
    );
}

export default MainHeader;