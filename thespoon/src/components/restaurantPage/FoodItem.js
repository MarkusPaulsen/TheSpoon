//<editor-fold desc="React">
import React, {Component} from "react";
import {paths} from "../../constants/paths";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>

//</editor-fold>
//<editor-fold desc="Icons">
import {IconEditGrey} from "../Icons";
//</editor-fold>


class FoodItem extends Component {
    constructor(props){
        super(props);
    }

    render () {
        return (
            <div className="foodItem">
                <div className="image-setup">
                    <div className="image-wrapper">Image here</div>
                </div>
                <div className="mainContent">
                    <h5 className="foodItemName">Pepperoni pizza</h5>
                    <div className="description">Delicious pizza with pepperoni & cheese</div>
                    <div className="tags">tag1</div>
                </div>
                <div className="price">9€</div>
                <div className="editIcon">
                    <IconEditGrey/>
                </div>
            </div>
        )
    }
}

export default FoodItem;