import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/homepage/Homepage.js';
import MainPage from './components/homepage/MainPage.js';
import Profile from './components/homepage/Profile.js';
import SignUpModal from "./containers/AuthentficationModal";
//import Navbar from './components/layout/Navbar.js'

/* the Spoon app browser */
function App() {
return (
      <BrowserRouter>
          {<SignUpModal />}
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/Mainpage' component={MainPage} />
            <Route exact path='/Profile' component={Profile} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
