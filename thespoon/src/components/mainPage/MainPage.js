import React, { Component } from 'react';
import MainLayout from '../layout/MainLayout.js'
import {authentificationModalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import FilterLink from "../../containers/FilterModalLink";
import { Link } from 'react-router-dom';


class MainPage extends Component {
    render() {
        return (
            <MainLayout >
                <div className="mainpage-banner">
                    <div className="mainpage-text">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <h1 className="title">This is the main page</h1>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </MainLayout>
        );
    }
}

export default MainPage;