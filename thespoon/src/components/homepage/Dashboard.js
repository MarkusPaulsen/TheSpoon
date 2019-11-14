import React, { Component } from 'react';
import MainLayout from '../layout/MainLayout.js'
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import FilterLink from "../../containers/FilterModalLink";
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <MainLayout >
                <div className="mainpage-banner">
                    <div className="mainpage-text">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h1 className="title">THIS IS YOUR DASHBOARD</h1>
                                    <Link to="/" className="logo">
                                        <text>Back to Homepage</text>
                                    </Link>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </MainLayout>
        );
    }
}

export default Dashboard;