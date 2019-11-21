//<editor-fold desc="React">
import React, {Component} from 'react';
//</editor-fold>

//<editor-fold desc="Constants">
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
//</editor-fold>
//<editor-fold desc="Containers">
import FilterLink from "../../containers/FilterModalLink";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconEditPink} from "../Icons";
//</editor-fold>

class Menu extends Component {
    constructor(props) {
        super(props)
    }

    //<editor-fold desc="Render">
    render() {
        return (
            <div className="menu">
                <h4 className="title">{this.props.name}</h4>
                <div className="description">{this.props.description}</div>
                <div className="tags">
                    {this.props.tags.map(tag => {
                        return (
                            <div className="tag" key={tag}>{tag}</div>
                        )})}
                </div>
                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_MENU}><IconEditPink/> Edit informations</FilterLink>
                </div>
            </div>
        );
    }
    //</editor-fold>
}


export default Menu;