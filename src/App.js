/* eslint-disable */
// import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Commerce from './components/Commerce';
import Commercedeposit from './components/CommerceDeposit';
import CommerceWithdrawal from './components/CommerceWithdrawal';
import Login from './components/Login';

// const PrivateRoute1 = (props) => {
//   let location = useLocation();
//   const merchantauth = useSelector(state => state.merchantauth);

//   return merchantauth.isAuthenticated ? (
//     <Route {...props} />
//   ) : (
//     <Redirect 
//       to={{
//         pathname: '/login',
//         state: { from: location }
//       }} 
//     />
//   );
// };

function App() {
  useEffect(() => {
    setTimeout(() => {
      // alert('Session timed out')
      localStorage.clear();
    }, 300000)
  })

  const auth = useSelector(state => state.auth);
  const history = useHistory();

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
    <div style={{ backgroundColor: "milk" }}>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Switch>
            {/* <PrivateRoute path='/commerce' component={Commerce}/>
            <PrivateRoute path='/commercedeposit' component={Commercedeposit}/>
            <PrivateRoute path='/commercewithdrawal' component={Commerce}/> */}
            {/* <Route path='/' component={Login}/> */}

          <PrivateRoute path='/transactions' component={Commerce}/>
          <PrivateRoute path='/transactionsdeposit' component={Commercedeposit}/>
          <PrivateRoute path='/transactionswithdrawal' component={CommerceWithdrawal}/>
          <PrivateRoute1 path='/' component={Login}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
