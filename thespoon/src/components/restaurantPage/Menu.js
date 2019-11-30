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

class Menu extends Component {
    constructor(props) {
        super(props)
    }

    //<editor-fold desc="Render">
    render() {
        return (
            <div className="menu">
                <h4 className="title">Lunch menu: {this.props.name}</h4>
                <div className="description">This is a short description of the menu: {this.props.description}</div>
                <div className="tags">
                    {this.props.tags.map(tag => {
                        return (
                            <div className="tag" key={tag.color}>{tag.name}</div>
                        )})}
                </div>
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_MENU}><IconEditPink/> Edit menu</FilterLink>
                </div>
                <div className="row">
                    <div className="col"><hr/></div>
                        <div className="categoryTitle">DISHES</div>
                    <div className="col"><hr/></div>
                </div>
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_MENU}><IconAddPink/> Add dish</FilterLink>
                </div>

                <div className="row">
                    <div className="col"><hr/></div>
                    <div className="categoryTitle">DRINKS</div>
                    <div className="col"><hr/></div>
                </div>
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_MENU}><IconAddPink/> Add drink</FilterLink>
                </div>
            </div>
        );
    }
    //</editor-fold>
}


export default Menu;