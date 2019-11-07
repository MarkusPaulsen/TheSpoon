import React, { Component } from 'react';
import Layout from './../layout/Layout.js'


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
                                    <button className="normal">Get started</button>  
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