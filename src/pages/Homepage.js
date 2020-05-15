import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../components/Navbar/Navbar';
import BlogFeed from '../components/BlogFeed/BlogFeed';
import AddBlogForm from '../components/AddBlogForm/AddBlogForm';
import { setLoggedInUser } from '../actions/users';
import { fetchBlogs } from '../actions/blogs';

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
  },
}));

const Homepage = ({ history, fetchBlogs, loggedIn, match }) => {
  const classes = useStyles();
  const pageNumber = +match.params.pageNumber || 1;
  const pageSize = 5;

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      // await fetchBlogs(user.token);
      await fetchBlogs(pageNumber - 1, pageSize);
      if (user) {
        setLoggedInUser(user);
      }
    })();
  }, []);

  const handleClickOpen = () => {
    history.replace('/add-blog');
  };

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
            ></BlogFeed>
          </Grid>
        </Grid>
      </Container>
      <Fab
        className={classes.addBtn}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
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
  fetchBlogs: (pageNumber, pageSize) =>
    dispatch(fetchBlogs(pageNumber, pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
