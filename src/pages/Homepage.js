import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../components/Navbar/Navbar';
import BlogFeed from '../components/BlogFeed/BlogFeed';
import AddBlogForm from '../components/AddBlogForm/AddBlogForm';
import { fetchBlogs } from '../actions/blogs';

const Homepage = ({ history, fetchBlogs, blogs }) => {
  useEffect(() => {
    (async () => {
      await fetchBlogs();
      // console.log(blogs);
    })();
  }, []);
  // console.log(blogs);
  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <AddBlogForm></AddBlogForm>
            <BlogFeed></BlogFeed>
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
  fetchBlogs: () => dispatch(fetchBlogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
