//<editor-fold desc="React">
import React from 'react';
import {Link} from 'react-router-dom';
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>

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
                            <FilterLink filter={modalVisibilityFilters.SHOW_REGISTER_RESTAURANT_OWNER}>Sign up</FilterLink>
                        </li>
                    </ul>
                </nav> 
            </div>  
        </header>
    );
};

export default Header;