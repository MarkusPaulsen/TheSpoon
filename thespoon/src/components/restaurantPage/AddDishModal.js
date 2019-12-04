//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import FormValidator from "../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Icons">
import {IconExit} from "../Icons";
import {bindCallback, of, throwError} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {connect} from "react-redux";
//</editor-fold>


class AddDishModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props)
    {
        super(props);

        this.validator = new FormValidator([
            {
                field: "name",
                method: "isEmpty",
                validWhen: false,
                message: "Dish name is required"
            },
            {
                field: "description",
                method: "isEmpty",
                validWhen: false,
                message: "Description is required"
            },
            {
                field: "price",
                method: "isEmpty",
                validWhen: false,
                message: "Price is required"
            },
            {
                field: "tags",
                method: "isEmpty",
                validWhen: false,
                message: "Tags are required"
            }
        ]);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            description: "",
            price:"",
            imageID:"",
            imageMessage: "",
            tags: "",
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false
        };
    }

    //</editor-fold>

    //<editor-fold desc="Bussiness Logic">
    handleSubmit = event => {
        event.preventDefault();
        const thisTemp = this;

        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    imageID: values.imageID,
                    tags: values.tags,
                    serverMessage: "",
                    submitted: false
                });
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                });
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.setState({serverMessage: "New dish is added"})
                    return ajax({
                        url: "http://localhost:8080/api/user/owner/restaurant/menu/${this.props.menuID}",
                        method: "POST",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.props.token},
                        body: {
                            name: thisTemp.state.name,
                            description: thisTemp.state.description,
                            price: thisTemp.state.price,
                            imageID: thisTemp.imageID,
                            tags: [{"name": thisTemp.state.tags}]
                        }
                    })
                } else {
                    thisTemp.setState({serverMessage: "New dish cannot be added"});
                    return throwError({status: 0});
                }
            }))
            .pipe(take(1))
            .subscribe(
                (next) => {
                    //thisTemp.props.setDishId(reply.response.dishID);
                    thisTemp.props.onHide();
                },
                (error) => {
                    switch (error.status) {
                        case 400:
                            thisTemp.setState({serverMessage: "Access denied"});
                            break;
                        case 404:
                            thisTemp.setState({serverMessage: "No connection to the server"});
                            break;
                        case 0:
                            thisTemp.setState({serverMessage: ""});
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
        let validation = !this.submitted ? this.state.validation : this.validator.validate(this.state);
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="modal-wrapper restaurant-info">
                    <Form ref={(c) => {this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2>Add</h2>
                        <div className="account-type">
                            <h4><span className="role">Dish</span></h4>
                        </div>

                        <div className="input-field">
                            <label>Dish name</label>
                            <Input type="text" name="dishName" placeholder="Dish name"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.name.message}</small>
                        </div>

                        <div className="input-field">
                            <label>Description</label>
                            <Textarea name="description"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.description.message}</small>
                        </div>


                        <div className="input-field">
                            <label>Price in Euro (€)</label>
                            <Input placeholder="Price"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.price.message}</small>
                        </div>

                        <div className="input-field image">
                            <label>Image</label>
                            <input type="file" name="file" id="file" className="inputfile" onChange={this.fileSelectedHandler}/>
                            <label htmlFor="file">+ Upload image</label>
                            {this.state.selectedFile &&
                            <label className="selected-file">
                            <span onClick={this.removeFile}
                                  role="button"
                                  className="remove-button">
                                X
                            </span>
                                {this.state.selectedFile.name }
                            </label>
                            }
                        </div>
                        {/*
                        <div className="error-block">
                            <small>{this.state.imageMessage}</small>
                        </div>
                         */}

                        <div className="input-field">
                            <label>Tags</label>
                            <Input type="tags" name="tags" placeholder="Search"/>
                        </div>
                        <div className="error-block">
                            <small>{validation.tags.message}</small>
                        </div>

                        <Button type="submit" className="normal">Add</Button>
                        <div className="error-block">
                            <small>{this.state.serverMessage}</small>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        )
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        token: state.logInReducer.token
    };
};

export default connect(mapStateToProps, null)(AddDishModal);
//</editor-fold>