import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/homepage/Homepage.js';
import MainPage from './components/homepage/MainPage.js';
import SignUpModal from "./containers/AuthentficationModal";
import Dashboard from './components/homepage/Dashboard.js';
import YourRestaurant from './components/homepage/YourRestaurant.js';
import Profile from './components/homepage/Profile.js';
//import Navbar from './components/layout/Navbar.js'

/* the Spoon app browser */
function App() {
return (
      <BrowserRouter>
          {<CustomModal />}
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/Mainpage' component={MainPage} />
            <Route exact path='/Dashboard' component={Dashboard} />
            <Route exact path='/YourRestaurant' component={YourRestaurant} />
            <Route exact path='/Profile' component={Profile} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
