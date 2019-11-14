import React, {Component} from "react";
import FilterLink from "../../containers/FilterModalLink";
import {modalVisibilityFilters} from "../../constants/modalVisibiltyFilters";
import {IconEditPink} from "../Icons";

class Menu extends Component {
    constructor(props) {
        super(props)
    }

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
}


export default Menu;