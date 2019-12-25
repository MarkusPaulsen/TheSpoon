import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HomePage from "./components/HomePage/Homepage.js";
import MainPage from "./components/MainPage/YourMainPage.js";
import CustomModal from "./containers/CustomModal";
import Dashboard from "./components/DashboardPage/YourDashboardPage.js";
import YourRestaurantPage from "./components/RestaurantPage/YourRestaurantPage.js";
import Profile from "./components/ProfilePage/YourProfilePage.js";
import CustomerMainPage from "./components/MainPage/CustomerMainPage";
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
            <Route exact path="/YourRestaurant" component={YourRestaurantPage} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/CustomerMain" component={CustomerMainPage} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
