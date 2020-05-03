import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/results" exact component={SearchResults} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </Fragment>
  );
}

export default App;
