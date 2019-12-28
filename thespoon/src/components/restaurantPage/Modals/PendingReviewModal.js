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

        //<editor-fold desc="Handler Function Registration">
        this.update = this.update.bind(this);
        //</editor-fold>

        this.state = {
            token: window.localStorage.getItem("token"),
            reviews: null,
            reviewsMessage: null,
            toUpdate: false
        };
    }

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
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
                        reviewsMessage: ""
                    });
                },
                (error) => {
                    switch (error.name) {
                        case "AjaxTimeoutError":
                            thisTemp.setState({
                                reviews: [],
                                reviewsMessage: "" + "The request timed out.",
                            });
                            break;
                        case "InternalError":
                        case "AjaxError":
                            if (error.status === 0 && error.response === "") {
                                thisTemp.setState({
                                    reviews: [],
                                    reviewsMessage: "There is no connection to the server."
                                });
                            } else if (error.status === 400) {
                                thisTemp.setState({
                                    reviews: [],
                                    reviewsMessage: ""
                                });
                            } else {
                                thisTemp.setState({
                                    reviews: [],
                                    reviewsMessage: error.response
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
    }

    componentWillUnmount() {
        this.$reviews.unsubscribe();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.toUpdate) {
            this.setState({toUpdate: false});
            this.componentWillUnmount();
            this.componentDidMount();
        }
    }

    //</editor-fold>

    //<editor-fold desc="Business Logic">
    update() {
        this.setState({toUpdate: true});
        this.forceUpdate()
    }

    //</editor-fold>



    //<editor-fold desc="Render">
    render() {
        if((this.state.token == null || this.state.token === "null") || this.props.backgroundPage == null) {
            return(<p>Something went wrong.</p>);
        }
        return (
            <Modal.Body>
                <button className="exit" onClick={this.props.onHide}><IconExit /></button>
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
        )
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