import React, { Fragment, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';

import Navbar from '../components/Navbar/Navbar';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import ProfileBody from '../components/ProfileBody/ProfileBody';
import { fetchUser } from '../actions/users';
import { setBlogs } from '../actions/blogs';

const useStyles = makeStyles((theme) => ({
  pt: {
    paddingTop: theme.spacing(6),
  },
  mt: {
    marginTop: theme.spacing(4),
  },
}));

const Profile = ({
  users,
  loggedIn,
  fetchUser,
  blogs,
  setBlogs,
  match,
  history,
}) => {
  const classes = useStyles();
  const id = match.params.id;
  let [viewedUser, setViewedUser] = useState({
    blogs: [],
    user: {},
  });

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    (async () => {
      if (loggedInUser) {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: { Authorization: loggedInUser.token },
        });
        setViewedUser(data);
        // setBlogs(viewedUser.blogs);
      }
    })();
  }, []);

  // console.log(viewedUser);

  // console.log(blogs);

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container className={classes.pt}>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <ProfileHeader
              viewedId={id}
              viewedUser={viewedUser}
              loggedInUser={loggedInUser}
            ></ProfileHeader>
            <Divider className={classes.mt} variant="middle" />
            <ProfileBody
              viewedUser={viewedUser}
              history={history}
            ></ProfileBody>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs,
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
  setBlogs: (blogs) => dispatch(setBlogs(blogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
