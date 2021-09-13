/* eslint-disable */
// import './App.css';
import React from 'react';
import SignIn from './components/Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FiDeposit from './components/FiDeposit';
import FiTransfer from './components/FiTransfer';
import CDeposit from './components/CDeposit';
import CTrans from './components/CTrans';
import Landing from './components/Landing';
import Mdeposit from './components/MDeposit';
import MLanding from './components/MLanding';
import MTrans from './components/MTrans';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function App() {
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
      localStorage.clear();
    }, 120000)
  }, [])

  let location = useLocation();
  const history = useHistory();

  return (
    <div style={{backgroundColor: "milk"}}>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route exact path='/landing' component={Landing} />
            <Route exact path='/mlanding' component={MLanding} />           
            <Route exact path='/commercedepo' component={CDeposit} />
            <Route exact path='/commercetrans' component={CTrans} />
            <Route exact path='/merchantdepo' component={Mdeposit} />
            <Route exact path='/merchanttrans' component={MTrans} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>    </div>
  );
}

export default App;
