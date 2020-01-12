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
import {IconEditPink, IconAddPink} from "../../Icons";
//</editor-fold>
//<editor-fold desc="Components">
import MenuItem from "./MenuItem";

//</editor-fold>


class Menu extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);
    }

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        // noinspection JSLint
        return (
            <div className="menu">
                <h4 className="title">{this.props.name}</h4>
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
                <div className="modal-button">
                    <FilterLink
                        modal={modals.SHOW_EDIT_MENU}
                        menu={this.props}
                    >
                        <IconEditPink/>Edit menu
                    </FilterLink>
                </div>
                <div className="row">
                    <div className="col">
                        <hr/>
                    </div>
                    <div className="categoryTitle">DISHES</div>
                    <div className="col">
                        <hr/>
                    </div>
                </div>

                {this.props.menuItems.filter((menuItem) => {
                    return menuItem.type === "dish"
                }).map((dishItem) => {
                    return (
                        <MenuItem name={dishItem.name} description={dishItem.description}
                                  priceEuros={dishItem.priceEuros} tags={dishItem.tags}
                                  imageLink={dishItem.imageLink} type={dishItem.type}
                                  rating={dishItem.rating} menuItemReviews={dishItem.menuItemReviews}
                                  menu={this.props} menuItemID={dishItem.menuItemID}/>
                    );
                })}
                <div className="modal-button">
                    <FilterLink
                        modal={modals.SHOW_ADD_DISH}
                        menu={this.props}
                    ><IconAddPink/> Add dish</FilterLink>
                </div>

                <div className="row">
                    <div className="col">
                        <hr/>
                    </div>
                    <div className="categoryTitle">DRINKS</div>
                    <div className="col">
                        <hr/>
                    </div>
                </div>

                {this.props.menuItems.filter((menuItem) => {
                    return menuItem.type === "drink"
                }).map((drinkItem) => {
                    return (
                        <MenuItem name={drinkItem.name} description={drinkItem.description}
                                  priceEuros={drinkItem.priceEuros} tags={drinkItem.tags}
                                  imageLink={drinkItem.imageLink} type={drinkItem.type}
                                  rating={drinkItem.rating} menuItemReviews={drinkItem.menuItemReviews}
                                  menu={this.props} menuItemID={drinkItem.menuItemID}/>
                    );
                })}
                <div className="modal-button">
                    <FilterLink
                        modal={modals.SHOW_ADD_DRINK}
                        menu={this.props}
                    ><IconAddPink/> Add drink</FilterLink>
                </div>
            </div>
        );
    }

    //</editor-fold>
}

export default Menu;