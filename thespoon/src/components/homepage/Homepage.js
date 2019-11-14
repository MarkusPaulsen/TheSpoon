import React, { Component } from 'react';
import Layout from './../layout/Layout.js'
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import FilterLink from "../../containers/FilterModalLink";
import { Link } from 'react-router-dom';


class Homepage extends Component {
    render() {
        return (
            <Layout >
                <div className="homepage-banner">
                    <div className="homepage-text">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h1 className="title">Share your menus</h1>
                                    <button className="normal"><FilterLink filter={authentificationModalVisibilityFilters.SHOW_CHOOSE_ROLE}>Get started</FilterLink></button>
                                    <Link to="/Mainpage" className="test">
                                        <u>
                                        <text color="#FFF"> TEST GO TO MAIN PAGE WITHOUT Log in</text>
                                        </u>
                                    </Link>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </Layout>
        );
    }
}

export default Homepage;