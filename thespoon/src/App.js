import React from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CustomModal from "./containers/CustomModal";
import YourRestaurantPage from "./components/RestaurantPage/YourRestaurantPage";
import Profile from "./components/ProfilePage/YourProfilePage";
import CustomerMainPage from "./components/MainPage/CustomerMainPage";
import FailPage from "./components/FailPage/FailPage";
import ConsultantHome from "./components/ConsultantPage/ConsultantHome";

function App() {
    return (
        <BrowserRouter>
            {<CustomModal />}
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/YourRestaurant" component={YourRestaurantPage} />
                <Route exact path="/Profile" component={Profile} />
                <Route exact path="/CustomerMain" component={CustomerMainPage} />
                <Route exact path="/Consultant" component={ConsultantHome} />
                <Route component={FailPage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
