import React, {Component} from "react";
import ConsultantHeader from "./ConsultantHeader"

class ConsultantLayout extends Component {
    render() {
        // noinspection JSLint
        return (
            <div className="site-wrapper">
                <ConsultantHeader/>
                {this.props.children}
            </div>
        );
    }
}

export default ConsultantLayout;