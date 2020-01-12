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
    }

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        // noinspection JSLint
        return (
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
                        {this.props.tags && this.props.tags.map((tag) => {
                            return (
                                <div className="tag" key={tag.color}>
                                    {tag.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="price">{parseFloat(this.props.priceEuros).toFixed(2)}€</div>
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
                <div>
                    <p>{this.props.menuItemReviews.rating}</p>
                    {this.props.menuItemReviews.reviews.map((review) => {
                        return (
                            <div>
                                <p>{review.username}:</p>
                                <p>{("*").repeat(review.rating)}</p>
                                <p>{review.content}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }

    //</editor-fold>
}

export default MenuItem;
