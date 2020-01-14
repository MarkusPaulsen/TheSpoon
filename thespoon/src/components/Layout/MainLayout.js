import React, {Component} from "react";
import MainHeader from "./MainHeader"

class Layout extends Component {
    render() {
        // noinspection JSLint
        return (
            <div className="site-wrapper">
                <MainHeader/>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;