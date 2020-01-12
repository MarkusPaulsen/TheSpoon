import React, {Component} from "react";
import Header from "./Header"

class Layout extends Component {
    render() {
        // noinspection JSLint
        return (
            <div className="site-wrapper">
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;