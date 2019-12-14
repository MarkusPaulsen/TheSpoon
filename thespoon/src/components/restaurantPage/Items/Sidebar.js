//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconLocationTurqoise, IconHoursTurqoise, IconEditPink} from "../../Icons.js";
//</editor-fold>

class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    //<editor-fold desc="Render">
    render() {
        return (
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
                            (typeof(this.props.openingHours) !== "undefined" && this.props.openingHours.length >= 1) ?
                                this.props.openingHours.map((openingHour) => {
                                    return (
                                        <li><span>{openingHour.day}: </span>{openingHour.openTime} - {openingHour.closeTime}</li>
                                    )})
                                :
                                <li><span>No opening hours defined</span></li>
                        }
                    </ul>
                </div>
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_RESTAURANT} currentRestaurantInformation={this.props} currentRestaurantPage={this.props.currentRestaurantPage}><IconEditPink/>Edit information</FilterLink>
                </div>
            </div>
        );
    }
    //</editor-fold>
}

export default Sidebar;