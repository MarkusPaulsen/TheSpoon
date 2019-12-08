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
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../constants/paths";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../Icons";
import {bindCallback, of, throwError} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {connect} from "react-redux";
//</editor-fold>


class EditRestaurantInfoModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            imageID: 0,
            address: "",
            city: "",
            country: "",
            description:"",
            serverMessage: "",
            submitted: false
        };
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    handleSubmit = (event) => {
        event.preventDefault();

        const thisTemp = this;
        of(1)
            .pipe(map(() => {
                return thisTemp.form.getValues();
            }))
            .pipe(exhaustMap((values) => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    name: values.name,
                    address: values.address,
                    city: values.city,
                    country: values.country,
                    imageID: values.imageID,
                    openingHours: values.openingHours,
                    serverMessage: "",
                });
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    submitted: true
                });
            }))
            .pipe(exhaustMap(() => {
                if (true) {
                    return ajax({
                        url: paths["restApi"]["restaurant"],
                        method: "POST",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.props.token},
                        body: {
                            name: thisTemp.state.name,
                            address: thisTemp.state.address,
                            city: thisTemp.state.city,
                            country: thisTemp.state.country,
                            latitude: 0,
                            longitude: 0,
                            imageID: thisTemp.state.imageID,
                            openingHours: []
                        }
                    })
                } else {
                    return throwError({status: 0});
                }
            }))
            .pipe(take(1))
            .subscribe(
                () => {
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
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                <div className="modal-wrapper add-menu">
                    <Form ref={(c) => {this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2>Edit</h2>
                        <div className="account-type">
                            <h4><span className="role">Restaurant information</span></h4>
                        </div>

                        <div className="input-field">
                            <label>Name</label>
                            <Input type="text" name="name" placeholder="Name"/>
                        </div>

                        <div className="input-field name">
                            <label>Address</label>
                            <Input type="text" name="address" placeholder="Address"/>
                        </div>

                        <div className="input-field name">
                            <label>City</label>
                            <Input type="text" name="city" placeholder="City"/>
                        </div>

                        <div className="input-field name">
                            <label>Country</label>
                            <Input type="country" name="country" placeholder="Country"/>
                        </div>

                        <div className="input-field">
                            <label>Image</label>
                            <Input type="text" name="image" placeholder="Image"/>
                        </div>

                        <div className="input-field">
                            <label>Opening hours</label>
                            <div className="working-hours">
                                <Input type="text" name="day" placeholder="Day"/>
                                <Input type="time" name="opening-hours"/>
                                <Input type="time" name="closing-hours"/>
                            </div>
                        </div>

                        <Button type="submit" className="normal">Save</Button>
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

export default connect(mapStateToProps, null)(EditRestaurantInfoModal);
//</editor-fold>