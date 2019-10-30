import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LogIn from './components/authentification/LogIn.js';
import SignUp from './components/authentification/SignUp.js';
//import Navbar from './components/layout/Navbar.js'

/* the Spoon app browser */
function App() {
return (
    <BrowserRouter>
      <div className="App">
        {/*<Navbar />*/}
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route exact path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
