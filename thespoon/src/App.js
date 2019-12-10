import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HomePage from "./components/homepage/Homepage.js";
import MainPage from "./components/mainPage/YourMainPage.js";
import CustomModal from "./containers/CustomModal";
import Dashboard from "./components/DashboardPage/YourDashboardPage.js";
import YourRestaurant from "./components/restaurantPage/YourRestaurantPage.js";
import Profile from "./components/ProfilePage/YourProfilePage.js";
import CustomerPage from "./components/CustomerPage/CustomerPage";
//import Navbar from "./components/layout/Navbar.js"

/* the Spoon app browser */
function App() {
return (
      <BrowserRouter>
          {<CustomModal />}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Mainpage" component={MainPage} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/YourRestaurant" component={YourRestaurant} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/CustomerPage" component={CustomerPage} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
