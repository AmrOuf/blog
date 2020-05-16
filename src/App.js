import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import Following from './pages/Following';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import { setLoggedInUser } from './actions/users';
import { fetchBlogs } from './actions/blogs';

const App = ({ setLoggedInUser, dispatch, loggedIn, fetchBlogs }) => {
  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      // await fetchBlogs();
      if (user) {
        setLoggedInUser(user);
      }
    })();
  }, []);

  // useEffect(() => {
  //   console.log(loggedIn);
  // });

  return (
    <Fragment>
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/results" exact component={SearchResults} />
        <Route path="/following" exact component={Following} />
        <Route path="/add-blog" exact component={AddBlog} />
        <Route path="/edit-blog/:blogId" exact component={EditBlog} />
        <Route path="/:pageNumber" exact component={Homepage} />
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
    fetchBlogs: (token) => dispatch(fetchBlogs(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
