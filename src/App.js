import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import { setLoggedInUser } from './actions/users';

const App = ({ setLoggedInUser, loggedIn }) => {
  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        await setLoggedInUser(user);
      }
    })();
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/results" exact component={SearchResults} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedInUser: (user) => dispatch(setLoggedInUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
