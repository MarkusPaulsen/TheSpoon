import React, {Component} from "react";
import {Link} from "react-router-dom";
import {IconNameDark, IconYourRestaurant} from "../Icons.js";
import FilterLink from "../../containers/FilterModalLink";
import {modals} from "../../constants/Modals";
import $ from "jquery";


class ConsultantHeader extends Component {

    componentDidMount() {
        $("#mainnav-toggle").click(() => {
            $("nav").toggleClass("active");
        });
    }

    render() {
        // noinspection JSLint
        return (
            <header className="main-header">
                <div className="container">
                    <nav>
                        <Link to="/" className="logo">
                            <img className="site-logo" src="/images/thespoon_logo_black.png" alt="logo"/>
                        </Link>
                        <ul>
                            <li>
                                <FilterLink modal={modals.SHOW_LOGOUT}>Log out</FilterLink>
                            </li>
                        </ul>
                        <a id="mainnav-toggle" href="#">
                            <span className="hamburger"></span>
                        </a>
                    </nav>
                </div>
            </header>
        );
    }
};

export default ConsultantHeader;