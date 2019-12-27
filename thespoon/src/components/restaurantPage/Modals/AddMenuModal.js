//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="RxJs">
import {bindCallback, fromEvent, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catchError, exhaustMap, map, take, bufferTime, filter, distinctUntilChanged} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/paths";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
import {timeout} from "../../../constants/timeout";
import TagItem from "../Items/TagItem";

//</editor-fold>


class AddMenuModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.validator = new FormValidator([{
            field: "name",
            method: "isEmpty",
            validWhen: false,
            message: "Name is required."
        }, /*{
            field: "name",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Name is required to be alphanumeric."
        },*/ {
            field: "name",
            method: (name) => {
                return name.length >= 1
            },
            validWhen: true,
            message: "Name is required to be longer or equal 1 characters."
        }, {
            field: "description",
            method: "isEmpty",
            validWhen: false,
            message: "Description name is required."
        }, /*{
            field: "description",
            method: "isAlphanumeric",
            validWhen: true,
            message: "Description is required to be alphanumeric."
        },*/ {
            field: "description",
            method: (description) => {
                return description.length >= 1
            },
            validWhen: true,
            message: "Description is required to be longer or equal 1 characters."
        }]);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);

        this.state = {
            name: "",
            description: "",
            availableTags: [],
            serverMessageFinishedLoadingAvailableTags:"",
            finishedLoadingAvailableTags: false,
            autocompleteTags: [],
            chosenTags: [],
            tagsMessage: "",
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false,
            toUpdate: false
        };
    }

    //</editor-fold>

    componentDidMount() {
        const thisTemp = this;

        this.$availableTags = ajax({
            url: paths["restApi"]["tag"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.props.token},
            timeout: timeout,
            responseType: "text"
        })
            .pipe(
                exhaustMap((next) => {
                    let response = JSON.parse(next.response);
                    return bindCallback(thisTemp.setState).call(thisTemp, {
                        availableTags: response
                    });
                }),
                catchError((error) => {
                    throw error
                }))
            .subscribe(
                () => {
                    thisTemp.setState({serverMessageFinishedLoadingAvailableTags: "", finishedLoadingAvailableTags: true});
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessageFinishedLoadingAvailableTags: ""  +"The request timed out.", finishedLoadingAvailableTags: true});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessageFinishedLoadingAvailableTags: "There is no connection to the server.", finishedLoadingAvailableTags: true});
                            } else if (error.status === 400) {
                                this.props.openRestaurantConfiguration();
                                thisTemp.setState({serverMessageFinishedLoadingAvailableTags: "", finishedLoadingAvailableTags: true});
                            } else {
                                thisTemp.setState({serverMessageFinishedLoadingAvailableTags: error.response, finishedLoadingAvailableTags: true});
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({serverMessageFinishedLoadingAvailableTags: "Something is not like it is supposed to be.", finishedLoadingAvailableTags: true});
                            break;
                    }
                }
            );

        this.$tags = fromEvent(document.getElementById("tagInput"), "input")
            .pipe(map((event) => {
                return event.target.value
            }))
            .pipe(bufferTime(1000))
            .pipe(map((valueArray) => {
                if(valueArray.length >= 1){
                    return valueArray[valueArray.length-1]
                }
                else {
                    return null
                }
            }))
            .pipe(filter((value) => {
                return value != null
            }))
            .pipe(distinctUntilChanged())
            .pipe(map((value) => {
                if(value.length >= 1) {
                    return thisTemp.state.availableTags.filter((availableTag) => {
                        return availableTag.startsWith(value)
                    })
                }
                else {
                    return []
                }
            }))
            .subscribe(
                (next) => {
                    thisTemp.setState({
                        autocompleteTags: next,
                        tagsMessage: ""
                    });
                },
                (error) => {
                    console.log(error);
                    thisTemp.setState({
                        autocompleteTags: [],
                        tagsMessage: "Something is not like it is supposed to be."
                    });
                }
            );
    }

    componentWillUnmount() {
        this.$availableTags.unsubscribe();
        this.$tags.unsubscribe();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.toUpdate) {
            this.setState({toUpdate: false});
            this.componentWillUnmount()
            this.componentDidMount()
        }
    }


    update() {
        this.setState({toUpdate: true});
        this.forceUpdate()
    }

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
                    description: values.description
                });
            }))
            .pipe(exhaustMap(() => {
                return bindCallback(thisTemp.setState).call(thisTemp, {
                    validation: thisTemp.validator.validate(thisTemp.state),
                    submitted: true,
                    serverMessage: ""
                });
            }))
            .pipe(exhaustMap(() => {
                if (thisTemp.state.validation.isValid) {
                    thisTemp.setState({serverMessage: "Menu is created"});
                    return ajax({
                        url: paths["restApi"]["menu"],
                        method: "POST",
                        headers: {"Content-Type": "application/json", "X-Auth-Token": this.props.token},
                        body: {
                            name: thisTemp.state.name,
                            description: thisTemp.state.description,
                            tags: thisTemp.state.chosenTags
                        },
                        timeout: timeout,
                        responseType: "text"
                    })
                } else {
                    return throwError({
                        name: "InternalError",
                        status: 0,
                        response: null
                    });
                }
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    thisTemp.props.currentRestaurantPage.setState({toUpdate: true});
                    thisTemp.props.currentRestaurantPage.forceUpdate();
                    thisTemp.props.onHide();
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessage: "The request timed out."});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessage: "There is no connection to the server."});
                            } else {
                                thisTemp.setState({serverMessage: error.response});
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({serverMessage: "Something is not like it is supposed to be."});
                            break;
                    }
                }
            );
    };
    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        let validation = this.state.submitted ? this.validator.validate(this.state) : this.state.validation;
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit/></button>
                <div className="modal-wrapper add-menu">
                    <Form ref={(c) => {
                        this.form = c;
                    }} onSubmit={(e) => this.handleSubmit(e)}>
                        <h2 className="title">Create menu</h2>

                        <div className="input-field">
                            <label>Name</label>
                            <Input type="text" name="name" placeholder="Name"/>
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
                            <label>Available Tags</label>
                            <input id="tagInput" type="text" name="tags" placeholder="Search"/>
                            <ul>
                                {this.state.autocompleteTags.map((tag) => {
                                    return (<TagItem tag={tag} modal={this} added={false}/>);
                                })}
                            </ul>
                        </div>

                        <div className="input-field">
                            <label>Chosen Tags</label>
                            <ul>
                                {this.state.chosenTags.map((tag) => {
                                    return (<TagItem tag={tag} modal={this} added={true}/>);
                                })}
                            </ul>
                        </div>

                        <div className="error-block">
                            <small>{this.state.tagsMessage}</small>
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
        token: state.logInReducer.token,
        currentRestaurantPage: state.currentMenuReducer.currentRestaurantPage
    };
};

export default connect(mapStateToProps, null)(AddMenuModal);
//</editor-fold>
