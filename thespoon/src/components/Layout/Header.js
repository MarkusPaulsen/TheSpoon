//<editor-fold desc="React">
import React from "react";
import {Link} from "react-router-dom";
//</editor-fold>

//<editor-fold desc="Constants">
import {modals} from "../../constants/Modals";
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
                        <img className="site-logo" src="/images/thespoon_logo_white.png" alt="logo"/>
                    </Link>
                    <ul>
                        <li>
                            <FilterLink
                                modal={modals.SHOW_LOGIN}
                            >
                                Log in
                            </FilterLink>
                        </li>
                        <li>
                            <FilterLink
                                modal={modals.SHOW_CHOOSE_ROLE}
                            >
                                Sign up
                            </FilterLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;