//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>


import Button from "react-validation/build/button";


class ReviewItem extends Component {
    constructor(props){
        super(props);
    }

    render () {
        return (
            <div className="reviewItem">
                <div className="receipt-photo">
                    <div className="image-wrapper">
                        <div className="image" style={{backgroundImage: `url(${this.props.imageLink})`}}/>
                    </div>
                </div>
                <div className="mainContent">
                    <h4 className="menuName">Lunch Menu</h4>
                    <div className="itemName">Pizza Margherita</div>
                    <div className="itemName">Hummus & Avocado Toast</div>
                    <div className="review-validation">
                        <Button className="review-button decline" color="grey">decline</Button>
                        <Button className="review-button">accept</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReviewItem;