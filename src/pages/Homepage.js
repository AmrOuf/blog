import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from '../components/Navbar/Navbar';
import BlogFeed from '../components/BlogFeed/BlogFeed';
import AddBlogForm from '../components/AddBlogForm/AddBlogForm';

const Homepage = ({ history }) => {
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
  };
};

export default connect(mapStateToProps)(Homepage);
