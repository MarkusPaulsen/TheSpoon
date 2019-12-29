import React from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import HomePage from "./components/HomePage/Homepage.js";
import CustomModal from "./containers/CustomModal";
import Dashboard from "./components/DashboardPage/YourDashboardPage.js";
import YourRestaurantPage from "./components/RestaurantPage/YourRestaurantPage.js";
import Profile from "./components/ProfilePage/YourProfilePage.js";
import CustomerMainPage from "./components/MainPage/CustomerMainPage";
//import Navbar from "./components/layout/Navbar.js"

/* the Spoon app browser */
const NoMatch = ({ location }) => {
    console.log(location)
    return(<h1>Fail</h1>);
};

function App() {
return (
      <BrowserRouter>
          {<CustomModal />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/YourRestaurant" component={YourRestaurantPage} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/CustomerMain" component={CustomerMainPage} />
            <Route component={NoMatch}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
