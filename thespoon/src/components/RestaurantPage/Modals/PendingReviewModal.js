//<editor-fold desc="React">
import React, {Component} from "react";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
//</editor-fold>
//<editor-fold desc="RxJs">
import {ajax} from "rxjs/ajax";
//</editor-fold>
//<editor-fold desc="Bootstrap">
import {Modal} from "react-bootstrap";
//</editor-fold>
//<editor-fold desc="Validator">
import Form from "react-validation/build/form";
import FormValidator from "../../../validation/FormValidator";
//</editor-fold>

//<editor-fold desc="Constants">
import {paths} from "../../../constants/paths";
import {timeout} from "../../../constants/timeout";
//</editor-fold>
//<editor-fold desc="Icons">
import {IconExit} from "../../Icons";
//</editor-fold>
//<editor-fold desc="Items">
import ReviewItem from "../Items/ReviewItem";
//</editor-fold>

class PendingReviewModal extends Component {
    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        //<editor-fold desc="Validator">
        this.validator = new FormValidator([]);

        //</editor-fold>

        //<editor-fold desc="Handler Function Registration">
        this.update = this.update.bind(this);

        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            validation: this.validator.valid(),
            serverMessage: "",
            submitted: false,
            reviews: null
        };
    }

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        //<editor-fold desc="Mount Reviews Observable">
        const thisTemp = this;
        this.$reviews = ajax({
            url: paths["restApi"]["review"],
            method: "GET",
            headers: {"X-Auth-Token": thisTemp.state.token},
            timeout: timeout,
            responseType: "text"
        })
            .subscribe(
                (next) => {
                    let response = JSON.parse(next.response);
                    thisTemp.setState({
                        reviews: response,
                        serverMessage: ""
                    });
                },
                (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({
                                reviews: [],
                                serverMessage: "" + "The request timed out.",
                            });
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({
                                    reviews: [],
                                    serverMessage: "There is no connection to the server."
                                });
                            } else if (error.status === 400) {
                                thisTemp.setState({
                                    reviews: [],
                                    serverMessage: ""
                                });
                            } else {
                                thisTemp.setState({
                                    reviews: [],
                                    serverMessage: error.response
                                });
                            }
                            break;
                        default:
                            console.log(error);
                            thisTemp.setState({
                                reviews: [],
                                restaurantMessage: "Something is not like it is supposed to be."
                            });
                            break;
                    }
                }
            );

        //</editor-fold>
    }

    componentWillUnmount() {
        //<editor-fold desc="Unmount Reviews Observable">
        this.$reviews.unsubscribe();

        //</editor-fold>
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    update() {
        window.location.reload();
    }

    //</editor-fold>



    //<editor-fold desc="Render">
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        if(this.props.backgroundPage == null) {
            return(<p>Something went wrong.</p>);
        } else if(this.state.token == null || this.state.token === "null" ) {
            return(<p>Something went wrong.</p>);
        } else {
            //<editor-fold desc="Render Token">
            if(this.state.reviews == null) {
                return (
                    <Modal.Body>
                        <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                        <p>Loading...</p>
                    </Modal.Body>
                );
            } else {
                return (
                    <Modal.Body>
                        <button className="exit" onClick={this.props.onHide}><IconExit /></button>
                        <div className="error-block">
                            <small>{this.state.serverMessage}</small>
                        </div>
                        <div className="modal-wrapper add-menu">
                            <Form ref={(c) => {this.form = c; }} onSubmit={(e) => this.handleSubmit(e)}>
                                <h2>Pending Reviews</h2>
                                {this.state.reviews != null &&
                                this.state.reviews.length >= 1 ? (
                                    this.state.reviews.map(review => {
                                        return (
                                            <ReviewItem
                                                reviewID={review.reviewID}
                                                receiptPhotoLink={review.receiptPhotoLink}
                                                menuName={review.menuName}
                                                menuItemNames={review.menuItemNames}
                                                pendingReviewModal={this}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className="no-menus">
                                        <label>
                                            Your restaurant doesnt have any reviews yet...
                                        </label>
                                    </div>
                                )}
                            </Form>
                        </div>
                    </Modal.Body>
                );
            }
            //</editor-fold>
        }
    }
    //</editor-fold>
}

//<editor-fold desc="Redux">
const mapStateToProps = (state) => {
    return {
        backgroundPage: state.backgroundPageReducer.backgroundPage
    };
};

export default connect(mapStateToProps, null)(PendingReviewModal);
//</editor-fold>