//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconEditPink, IconAddPink} from "../Icons";
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
        return (
            <div className="menu">
                <h4 className="title">Lunch menu: {this.props.name}</h4>
                <div className="description">This is a short description of the menu: {this.props.description}</div>
                <div className="tags">
                    {this.props.tags.map(tag => {
                        return (
                            <div className="tag" key={tag.color}>
                                {tag.name}
                            </div>
                        );
                    })}
                </div>
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_MENU} currentMenu={this.props}><IconEditPink/> Edit menu</FilterLink>
                </div>
                <div className="row">
                    <div className="col"><hr/></div>
                        <div className="categoryTitle">DISHES</div>
                    <div className="col"><hr/></div>
                </div>

                {this.props.menuItems.filter(menuItem => menuItem.type === "dish").map(dishItem => {
                    return (
                        <MenuItem name={dishItem.name} description={dishItem.description}
                                  priceEuros={dishItem.priceEuros} tags={dishItem.tags}
                                  imageLink={dishItem.imageLink} type={dishItem.type}/>
                    );
                })}
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_ADD_DISH} currentMenu={this.props}><IconAddPink/> Add dish</FilterLink>
                </div>

                <div className="row">
                    <div className="col"><hr/></div>
                    <div className="categoryTitle">DRINKS</div>
                    <div className="col"><hr/></div>
                </div>

                {this.props.menuItems.filter(menuItem => menuItem.type === "drink").map(drinkItem => {
                    return (
                        <MenuItem name={drinkItem.name} description={drinkItem.description}
                                   priceEuros={drinkItem.priceEuros} tags={drinkItem.tags}
                                   imageLink={drinkItem.imageLink} type={drinkItem.type}/>
                    );
                })}
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_ADD_DRINK} currentMenu={this.props}><IconAddPink/> Add drink</FilterLink>
                </div>
            </div>
        );
    }

    //</editor-fold>
}

export default Menu;
