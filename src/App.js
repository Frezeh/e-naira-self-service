/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Commerce from './components/Commerce';
import Commercedeposit from './components/CommerceDeposit';
import CommerceWithdrawal from './components/CommerceWithdrawal';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

function App() {

  const auth = useSelector(state => state.auth);

  let location = useLocation();

  const PrivateRoute = (props) => {
    return auth.isAuthenticated ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location }
        }}
      />
    );
  };

  const PrivateRoute1 = (props) => {
    return !auth.isAuthenticated ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/transactions',
          state: { from: location }
        }}
      />
    );
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Toaster />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Switch>
            <PrivateRoute path='/transactions' component={Commerce} />
            <PrivateRoute path='/transactionsdeposit' component={Commercedeposit} />
            <PrivateRoute path='/transactionswithdrawal' component={CommerceWithdrawal} />
            <PrivateRoute1 path='/' component={Login} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
