//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="RxJs">
import {ajax} from "rxjs/ajax";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
//</editor-fold>

//<editor-fold desc="Icons">
import {IconExit} from "../Icons";
import {bindCallback, of, throwError} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";
import {connect} from "react-redux";
//</editor-fold>


class AddMenuModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            description: "",
            tags: "",
            serverMessage: "",
            submitted: false
        };
    }

    //</editor-fold>

    //<editor-fold desc="Bussiness Logic">
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
                    description: values.description,
                    tags: values.tags,
                    serverMessage: null
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
                        url: "http://localhost:8080/api/user/owner/restaurant/menu",
                        method: "POST",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.props.token},
                        body: {
                            name: thisTemp.state.name,
                            description: thisTemp.state.description,
                            tags: [{"name": thisTemp.state.tags, "color": "#FFFFFF"}]
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
                        <h2 className="title">Create menu</h2>

                        <div className="input-field">
                            <label>Name</label>
                            <Input type="text" name="name" placeholder="Name"/>
                        </div>

                        <div className="input-field">
                            <label>Description</label>
                            <Textarea name="description"/>
                        </div>


                        <div className="input-field">
                            <label>Tags</label>
                            <Input type="tags" name="tags" placeholder="Search"/>
                        </div>

                        <Button type="submit" className="normal">Create</Button>
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

export default connect(mapStateToProps, null)(AddMenuModal);
//</editor-fold>