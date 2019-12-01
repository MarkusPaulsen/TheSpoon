//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom"
import {paths} from "../../constants/paths";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, of} from "rxjs";
import {ajax} from "rxjs/ajax";
import {take, exhaustMap} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Button from "react-validation/build/button";
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

//</editor-fold>
//<editor-fold desc="Components">
import Sidebar from "./Sidebar";
import DishItem from "./DishItem";
import DrinkItem from "./DrinkItem";
//</editor-fold>



class Menu extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            serverMessage: ""
        };
    }

    //</editor-fold>
    handleSubmit = (event) => {
        event.preventDefault();

        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return ajax({
                    url: paths["restApi"]["menu"] + "/" + this.props.id,
                    method: "DELETE",
                    headers: {"Content-Type": "application/json", "X-Auth-Token": this.props.token}
                })
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    serverMessage: ""
                });
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    thisTemp.setState(
                        {serverMessage: <Redirect to={{pathname: "/Mainpage"}}/>}
                    );
                }, (error) => {
                    thisTemp.props.failLogIn();
                    switch (error.status) {
                        case 401:
                            thisTemp.setState({serverMessage: "Access denied"});
                            break;
                        case 404:
                            thisTemp.setState({serverMessage: "No connection to the server"});
                            break;
                        case 0:
                            break;
                        default:
                            thisTemp.setState({serverMessage: "General error"});
                            break;
                    }
                }
            );
    };
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

                {/*Item*/}
                <DishItem />
                <DishItem />

                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_ADD_DISH}><IconAddPink/> Add dish</FilterLink>
                </div>

                <div className="row">
                    <div className="col"><hr/></div>
                    <div className="categoryTitle">DRINKS</div>
                    <div className="col"><hr/></div>
                </div>

                {/*Item*/}
                <DrinkItem />
                <DrinkItem />

                <div className="modal-button">
                    <FilterLink filter={modalVisibilityFilters.SHOW_ADD_DRINK}><IconAddPink/> Add drink</FilterLink>
                </div>
            </div>
        );
    }

    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        token: state.logInReducer.token
    };
};

export default connect(mapStateToProps, null)(Menu);
//</editor-fold>
