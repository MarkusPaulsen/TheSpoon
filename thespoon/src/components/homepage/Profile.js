import React, { Component } from 'react';
import MainLayout from '../layout/MainLayout.js'
import {authentificationModalVisibilityFilters} from "../../constants/authentificationModalVisibiltyFilters";
import FilterLink from "../../containers/FilterModalLink";


class Profile extends Component {
    render() {
        return (
            <MainLayout >
                <div className="mainpage-banner">
                    <div className="mainpage-text">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h1 className="title">THIS IS YOUR PROFILE PAGE</h1>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </MainLayout>
        );
    }
}

export default Profile;