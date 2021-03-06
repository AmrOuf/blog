import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../components/Navbar/Navbar';
import BlogFeed from '../components/BlogFeed/BlogFeed';
import { setLoggedInUser } from '../actions/users';
import { fetchFollowingBlogs } from '../actions/blogs';

const Following = ({ history, fetchFollowingBlogs, loggedIn, match }) => {
  const pageNumber = +match.params.pageNumber || 1;
  const pageSize = 5;

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      await fetchFollowingBlogs(user.token);
      if (user) {
        setLoggedInUser(user);
      }
    })();
  });

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <BlogFeed
              pageNumber={pageNumber}
              pageSize={pageSize}
              history={history}
              isInHomepage={false}
            ></BlogFeed>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    blogs: state.blogs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchFollowingBlogs: (token) => dispatch(fetchFollowingBlogs(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Following);
