import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/homepage/Homepage.js';
import LogIn from './components/authentification/LogIn.js';
import SignUpModal from "./containers/AuthentficationModal";
//import Navbar from './components/layout/Navbar.js'

/* the Spoon app browser */
function App() {
return (
      <BrowserRouter>
          {<SignUpModal />}
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/' component={LogIn} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
