//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>

//<editor-fold desc="Constants">
import {modals} from "../../../constants/Modals";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconEditGrey} from "../../Icons";

//</editor-fold>


class MenuItem extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleOpen = this.handleOpen.bind(this);
    }
    //</editor-fold>

    handleOpen() {
        this.setState({
            open: !this.state.open
        });
    };



    //<editor-fold desc="Render">
    render() {
        // noinspection JSLint
        return (
            <div className="menu-item-wrapper">
                <div className="foodItem">
                    <div className="image-setup">
                        <div className="image-wrapper">
                            <div className="image" style={{backgroundImage: `url(${this.props.imageLink})`}}/>
                        </div>
                    </div>
                    <div className="mainContent">
                        <h5 className="foodItemName">{this.props.name}</h5>
                        <div className="description">{this.props.description}</div>
                        <div className="tags">
                            {this.props.tags && this.props.tags.map((tag) =>
                                <div className="tag" style={{backgroundColor: tag.color}}>
                                    {tag.name}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="price">{parseFloat(this.props.priceEuros).toFixed(2)}€</div>
                </div>
                <div className="edit-button">
                    <FilterLink
                        modal={this.props.type === "dish"
                            ? modals.SHOW_EDIT_DISH
                            : modals.SHOW_EDIT_DRINK}
                        menu={this.props.menu}
                        menuItem={this.props}
                    >
                        <IconEditGrey/>
                    </FilterLink>
                </div>
                {this.props.menuItemReviews &&
                <div
                    className="arrow-wrapper"
                > {this.state.open ? <span onClick={this.handleOpen}>Hide reviews<i className="fa fa-chevron-up"></i></span> : <span onClick={this.handleOpen}>Show reviews<i
                    className="fa fa-chevron-down"></i></span>}
                </div>
                }

                <div className={"ratings" + (this.state.open ? " open" : " closed")}>
                    {this.props.menuItemReviews.rating > 0 && <p className="total-rating">Total score: <i className="fa fa-star"></i> {this.props.menuItemReviews.rating}</p>}
                    {this.props.menuItemReviews.reviews.map((review) =>
                        <div className="rating">
                            <h6>{review.username}:</h6>
                            <p> {[...Array(parseInt(review.rating))].map((x, i) => (<i className="fa fa-star"></i>))}</p>
                            <p>{review.content}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    //</editor-fold>
}

export default MenuItem;
