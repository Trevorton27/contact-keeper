import React, {Fragment} from 'react';
import Navbar from './Components/Layout/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import PrivateRoute from './Components/routing/PrivateRoute';

import ContactState from './Context/Contact/ContactState';
import AuthState from './Context/auth/AuthState';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import AlertState from './Context/alert/AlertState';
import Alerts from './Components/Layout/Alerts';
import './App.css';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ()  => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
              </Switch>
            </div>
          </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
