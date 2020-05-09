import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import ProfileBody from '../components/ProfileBody/ProfileBody';
import { fetchUser } from '../actions/users';

const useStyles = makeStyles((theme) => ({
  pt: {
    paddingTop: theme.spacing(6),
  },
  mt: {
    marginTop: theme.spacing(4),
  },
}));

const Profile = async ({ users, loggedIn, fetchUser, match, history }) => {
  const classes = useStyles();
  const id = match.params.id;

  // this (1) should be the logged in user id
  const loggedInUser = loggedIn;
  let viewedUser = null;
  if (loggedIn.token) {
    // fetch viewedUser
    viewedUser = await fetchUser(id);
    console.log(viewedUser);
  }

  return (
    <Fragment>
      <Navbar history={history}></Navbar>
      <Container className={classes.pt}>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            {/* <ProfileHeader
              viewedId={match.params.id}
              viewedUser={viewedUser}
              loggedInUser={loggedInUser}
            ></ProfileHeader> */}
            <Divider className={classes.mt} variant="middle" />
            {/* <ProfileBody></ProfileBody> */}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
