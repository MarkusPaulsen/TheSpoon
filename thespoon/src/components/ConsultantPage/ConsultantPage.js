//<editor-fold desc="React">
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
//</editor-fold>
//<editor-fold desc="Redux">
import {connect} from "react-redux";
import {_setBackgroundPage} from "../../actionCreators/BackgroundPageActionCreator";
//</editor-fold>

//<editor-fold desc="Constants">
import {roles} from "../../constants/Roles";
import ConsultantLayout from "../Layout/ConsultantLayout";
import {ajax} from "rxjs/ajax";
import {paths} from "../../constants/Paths";
import {timeouts} from "../../constants/Timeouts";

//</editor-fold>


class ConsultantPage extends Component {

    //<editor-fold desc="Constructor">
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);

        /*this.state = {
            token: window.localStorage.getItem("token"),
            user: window.localStorage.getItem("user"),
            //<editor-fold desc="State Restaurant">
            statistics: null,
            statisticsMessage: ""
            //</editor-fold>
        };*/

        this.state = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhYRW1pbGlvWHgiLCJpYXQiOjE1Nzg5NDA0NjIsImV4cCI6MTU3OTExMzI2Mn0.irAKBqiTValqAbvRaO2mlENcdcVV-t3jl_cHDC-FCSI",
            user: "Consultant",
            //<editor-fold desc="State Restaurant">
            statistics: null,
            statisticsMessage: "",
            $statistics: null,
            //</editor-fold>
        };
    }
    //</editor-fold>

    //<editor-fold desc="Component Lifecycle">
    componentDidMount() {
        //<editor-fold desc="Mount Temporary This">
        const thisTemp = this;
        //</editor-fold>
        this.props._setBackgroundPage(this);
        this.setState({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhYRW1pbGlvWHgiLCJpYXQiOjE1Nzg5NDA0NjIsImV4cCI6MTU3OTExMzI2Mn0.irAKBqiTValqAbvRaO2mlENcdcVV-t3jl_cHDC-FCSI",
            user: "Consultant",
            //<editor-fold desc="Mount Restaurant Data Observable">
            $statistics: ajax({
                url: paths["restApi"]["statistics"],
                method: "GET",
                headers: {"X-Auth-Token": thisTemp.state.token},
                timeout: timeouts,
                responseType: "text"
            })
                .subscribe(
                    (next) => {
                        let response = JSON.parse(next.response);
                        thisTemp.setState({
                            statistics: response,
                            statisticsMessage: ""
                        });
                    },
                    (error) => {
                        console.log(error);
                        switch (error.name) {
                            case "AjaxTimeoutError":
                                thisTemp.setState({
                                    statistics: {},
                                    statisticsMessage: "" + "The request timed out.",
                                });
                                break;
                            case "InternalError":
                            case "AjaxError":
                                if (
                                    error.status === 0
                                    && error.response === ""
                                ) {
                                    thisTemp.setState({
                                        statistics: {},
                                        statisticsMessage: "There is no connection to the server."
                                    });
                                } else if (
                                    error.status === 404
                                    && error.response === "No restaurant associated to this account found."
                                ) {
                                    this.props._openAddRestaurantModal();
                                    thisTemp.setState({
                                        statistics: {},
                                        statisticsMessage: ""
                                    });
                                } else {
                                    thisTemp.setState({
                                        statistics: {},
                                        statisticsMessage: error.response
                                    });
                                }
                                break;
                            default:
                                console.log(error);
                                thisTemp.setState({
                                    statistics: {},
                                    statisticsMessage: "Something is not like it is supposed to be."
                                });
                                break;
                        }
                    }
                ),
            //</editor-fold>
        });
    };
    //</editor-fold>

    componentWillUnmount() {
        //<editor-fold desc="Unmount Restaurant Observable">
        if (this.state.$statistics != null) {
            this.state.$statistics.unsubscribe();
        }
        //</editor-fold>
    }

    //<editor-fold desc="Business Logic">
    update = () => {
        window.location.reload();
    };

    //</editor-fold>

    //<editor-fold desc="Render">
    render() {
        console.log(this.state)
        if (this.state.token == null
            || this.state.token === "null"
            || this.state.user == null
            || this.state.user === "null") {
            // noinspection JSLint
            return (
                <Redirect to={{pathname: "/"}}/>
            );
        } else {
            switch (this.state.user) {
                case roles["RESTAURANT_OWNER"]:
                    return (
                        <Redirect to={{pathname: "/YourRestaurant"}}/>
                    );
                case roles["CUSTOMER"]:
                    //<editor-fold desc="Render Customer">
                    return (
                        <Redirect to={{pathname: "/CustomerMain"}}/>
                    );
                //</editor-fold>
                case roles["CONSULTANT"]:
                    return (
                        <ConsultantLayout>
                            <div className="mainpage-banner customer">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12"><h3 className="title">Hello Consultant</h3></div>
                                    </div>
                                    {this.state.statistics &&
                                        <>
                                            <div className="row">
                                                {this.state.statistics.totalRegisteredCustomers &&
                                                <div className="row">
                                                    <div className="col-lg-12"><p className="stat">Total registered customers: {this.state.statistics.totalRegisteredCustomers}</p></div>
                                                </div>
                                                }
                                            </div>
                                            <div className="row">
                                                {this.state.statistics.customersPerGender &&
                                                <div className="col-lg-6">
                                                    <h5>Customers per Gender</h5>
                                                    <table className="table table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Gender</th>
                                                            <th scope="col">Number of Customers</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.statistics.customersPerGender && (
                                                            this.state.statistics.customersPerGender.map((stat) =>
                                                                stat.gender &&
                                                                <tr>
                                                                    <th>{stat.gender}</th>
                                                                    <th>{stat.numberOfCustomers}</th>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                }
                                                {this.state.statistics.customersPerAgeRange &&
                                                <div className="col-lg-6">
                                                    <h5>Customers per Age Range</h5>
                                                    <table className="table table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Age Range</th>
                                                            <th scope="col">Number of Customers</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.statistics.customersPerAgeRange.map((stat) =>
                                                            stat.ageRange &&
                                                            <tr>
                                                                <th>{stat.ageRange}</th>
                                                                <th>{stat.numberOfCustomers}</th>
                                                            </tr>
                                                        )
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                }
                                            </div>
                                            <div className="row">
                                                {this.state.statistics.customersPerNationality &&
                                                <div className="col-lg-4">
                                                    <h5>Customers per Nationality</h5>
                                                    <table className="table table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Nationality</th>
                                                            <th scope="col">Number of Customers</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.statistics.customersPerNationality.map((stat) =>
                                                            stat.nationality &&
                                                            <tr>
                                                                <th>{stat.nationality}</th>
                                                                <th>{stat.numberOfCustomers}</th>
                                                            </tr>
                                                        )
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                }
                                                {this.state.statistics.numberOfSearchesPerWord &&
                                                <div className="col-lg-4">
                                                    <h5>Number of Searches per Word</h5>
                                                    <table className="table table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Word</th>
                                                            <th scope="col">Number of Searches</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.statistics.numberOfSearchesPerWord.map((stat) =>
                                                            stat.word &&
                                                            <tr>
                                                                <th>{stat.word}</th>
                                                                <th>{stat.numberOfSearches}</th>
                                                            </tr>
                                                        )
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                }
                                                {this.state.statistics.menusWithRatings &&
                                                <div className="col-lg-4">
                                                    <h5>Ratings of the Menu</h5>
                                                    <table className="table table-striped">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Menu</th>
                                                            <th scope="col">Average Rate</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.statistics.menusWithRatings.map((stat) =>
                                                            stat.menuName &&
                                                            <tr>
                                                                <th>{stat.menuName}</th>
                                                                <th>{stat.rating}</th>
                                                            </tr>
                                                        )
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                }
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        </ConsultantLayout>
                    )
                default:
                    return (
                        <Redirect to={{pathname: "/ThisShouldNotHaveHappened"}}/>
                    );
            }
        }

    }

    //</editor-fold>

}

//<editor-fold desc="Redux">
const mapDispatchToProps = (dispatch) => {
    return {
        _setBackgroundPage: (_backgroundPage) => {
            dispatch(_setBackgroundPage(_backgroundPage));
        },
    };
};

export default connect(null, mapDispatchToProps)(ConsultantPage);

//</editor-fold>