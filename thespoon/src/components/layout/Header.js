import React from 'react';
import { Link } from 'react-router-dom';
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";


import FilterLink from "../../containers/FilterModalLink";

const Header = () => {
    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="logo">
                        <img className="site-logo" src="/images/thespoon_logo_white.png" alt="logo" />
                    </Link>
                    <ul>
                        <li>
                            <FilterLink filter={modalVisibilityFilters.SHOW_LOGIN}>Log in</FilterLink>
                        </li>
                        <li>
                            <FilterLink filter={modalVisibilityFilters.SHOW_CHOOSE_ROLE}>Sign up</FilterLink>
                        </li>
                    </ul>
                </nav> 
            </div>  
        </header>
    );
}

export default Header;