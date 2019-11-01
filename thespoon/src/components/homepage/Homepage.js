import React, { Component } from 'react';
import Layout from './../layout/Layout.js'


class Homepage extends Component {
    render() {
        return (
            <Layout >
                <div className="homepage-text">
                    <h1>Share your menus</h1>
                    <button className="normal">Get started</button>
                </div>
            </Layout>
        );
    }
}

export default Homepage;