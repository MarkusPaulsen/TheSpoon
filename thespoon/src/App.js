import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/homepage/Homepage.js';
import LogIn from './components/authentification/LogIn.js';
//import Navbar from './components/layout/Navbar.js'

/* the Spoon app browser */
function App() {
return (
      <BrowserRouter>
          {/*<Navbar />*/}
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={LogIn} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
