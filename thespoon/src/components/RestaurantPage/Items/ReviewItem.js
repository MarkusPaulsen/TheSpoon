//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="RxJs">
import {of} from "rxjs";
import {ajax} from "rxjs/ajax";
import {take, exhaustMap} from "rxjs/operators";
//</editor-fold>
//<editor-fold desc="Validator">
import Button from "react-validation/build/button";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/paths";
import {timeout} from "../../../constants/timeout";
//</editor-fold>


class ReviewItem extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.handleDecline = this.handleDecline.bind(this);
        this.handleAccept = this.handleAccept.bind(this);

        this.state = {
            token: window.localStorage.getItem("token")
        };
    }
    //</editor-fold>

    //<editor-fold desc="Bussiness Logic">
    handleDecline = (event) => {
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return ajax({
                    url: paths["restApi"]["review"] + "/" + this.props.reviewID,
                    method: "POST",
                    headers: {"Content-Type": "application/json", "X-Auth-Token": this.state.token},
                    body: {
                        isApproved: false
                    },
                    timeout: timeout,
                    responseType: "text"
                })
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    thisTemp.props.pendingReviewModal.update();
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessage: "The request timed out."});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessage: "No connection to the server."});
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

    handleAccept = (event) => {
        event.preventDefault();
        const thisTemp = this;
        of(1)
            .pipe(exhaustMap(() => {
                return ajax({
                    url: paths["restApi"]["review"] + "/" + this.props.reviewID,
                    method: "POST",
                    headers: {"Content-Type": "application/json", "X-Auth-Token": this.state.token},
                    body: {
                        isApproved: true
                    },
                    timeout: timeout,
                    responseType: "text"
                })
            }))
            .pipe(take(1))
            .subscribe(
                () => {
                    thisTemp.props.pendingReviewModal.update();
                }, (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({serverMessage: "The request timed out."});
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({serverMessage: "No connection to the server."});
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
    render () {
        return (
            <div className="reviewItem">
                <div className="receipt-photo">
                    <div className="image-wrapper">
                        <div className="image" style={{backgroundImage: `url(${this.props.receiptPhotoLink})`}}/>
                    </div>
                </div>
                <div className="mainContent">
                    <h4 className="menuName">{this.props.menuName}</h4>
                    {typeof this.props.menuItemNames != null &&
                    this.props.menuItemNames.length >= 1 ? (
                        this.props.menuItemNames.map(menuItemName => {
                            return (
                                <div className="itemName">{menuItemName.menuItemName}</div>
                            );
                        })
                    ) : (
                        <div className="no-menus">
                            <label>
                                This menu doesnt have any menu items yet...
                            </label>
                        </div>
                    )}
                    <div className="review-validation">
                        <Button type="button" className="review-button decline" color="grey" onClick={this.handleDecline}>decline</Button>
                        <Button type="button" className="review-button" onClick={this.handleAccept}>accept</Button>
                    </div>
                </div>
            </div>
        )
    }
    //</editor-fold>
}

export default ReviewItem;