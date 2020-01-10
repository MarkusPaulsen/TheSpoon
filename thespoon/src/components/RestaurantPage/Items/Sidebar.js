//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setRestaurantInfo} from "../../../actionCreators/RestaurantActionCreators";
//</editor-fold>

//<editor-fold desc="Constants">
import {modals} from "../../../constants/Modals";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconLocationTurqoise, IconHoursTurqoise, IconEditPink} from "../../Icons.js";

//</editor-fold>

class Sidebar extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props)
    }

    //</editor-fold>

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        this.props._setRestaurantInfo(this);
    }

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        return (
            <div className="sidebar-hover">
                <div className="sidebar">
                    <div className="image-setup">
                        <div className="image-wrapper">
                            <div className="image" style={{backgroundImage: `url(${this.props.imageLink})`}}/>
                        </div>
                    </div>
                    <h4 className="title">{this.props.name}</h4>
                    <div className="part">
                        <IconLocationTurqoise/>
                        <ul>
                            <li>{this.props.address}</li>
                            <li>{this.props.city}, {this.props.country}</li>
                        </ul>
                    </div>
                    <div className="part">
                        <IconHoursTurqoise/>
                        <ul>
                            {
                                (typeof (this.props.openingHours) !== "undefined" && this.props.openingHours.length >= 1) ?
                                    this.props.openingHours.map((openingHour) => {
                                        return (
                                            <li>
                                                <span>{openingHour.day}: </span>{openingHour.openTime} - {openingHour.closeTime}
                                            </li>
                                        )
                                    })
                                    :
                                    <li><span>No opening hours defined</span></li>
                            }
                        </ul>
                    </div>
                    <div className="modal-button">
                        <FilterLink
                            modal={modals.SHOW_EDIT_RESTAURANT}
                            restaurantInfo={this.props}
                        >
                            <IconEditPink/>Edit information
                        </FilterLink>
                    </div>
                </div>
                <div className="sidebar-bottom">
                    <button className="wide">
                        <FilterLink
                            modal={modals.SHOW_ADD_MENU}
                            restaurantInfo={this.props}
                        >
                            Create new menu
                        </FilterLink>
                    </button>
                </div>
            </div>
        );
    }

    //</editor-fold>
}

//<editor-fold desc="Redux">

const mapDispatchToProps = (dispatch) => {
    return {
        _setRestaurantInfo: (restaurantInfo) => {
            dispatch(_setRestaurantInfo(restaurantInfo));
        }
    };
};

export default connect(null, mapDispatchToProps)(Sidebar);
//</editor-fold>
