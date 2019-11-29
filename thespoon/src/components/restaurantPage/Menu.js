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
import Form from 'react-validation/build/form';
import Button from 'react-validation/build/button';
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
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            serverMessage: "ASDF"
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
                <h4 className="title">{this.props.name} {this.props.id}</h4>
                <div className="description">{this.props.description}</div>
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
                    <FilterLink filter={modalVisibilityFilters.SHOW_EDIT_MENU} currentMenuId={this.props.id}>
                        <IconEditPink/> Edit informations
                    </FilterLink>
                    <Form ref={(c) => {this.form = c; }} onSubmit={this.handleSubmit}>
                        <Button type="submit" className="normal">Delete</Button>
                        <div className="error-block">
                            <small>{this.state.serverMessage}</small>
                        </div>
                    </Form>
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
