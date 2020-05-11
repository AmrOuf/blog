import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import EditProfileForm from '../EditProfileForm/EditProfileForm';
import { editUser } from '../../actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  center: {
    textAlign: 'center',
  },
  mb: {
    marginBottom: theme.spacing(3),
  },
  hidden: {
    display: 'none',
  },
}));

const ProfileHeader = ({
  viewedUser,
  loggedInUser,
  loggedIn,
  viewedId,
  editUser,
}) => {
  const classes = useStyles();
  let followBtn = null;
  let editProfileBtn = null;

  const handleFollow = () => {
    loggedInUser.following.push(viewedUser.id);
    viewedUser.followers++;
    editUser(loggedInUser.id, loggedInUser);
    editUser(viewedUser.id, viewedUser);

    followBtn = (
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleUnfollow}
      >
        Unfollow
      </Button>
    );
  };

  const handleUnfollow = () => {
    let filtered = loggedInUser.following.filter((id) => id !== viewedUser.id);
    loggedInUser.following = filtered;
    viewedUser.followers--;
    editUser(loggedInUser.id, loggedInUser);
    editUser(viewedUser.id, viewedUser);

    followBtn = (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleFollow}
      >
        Follow
      </Button>
    );
  };

  if (loggedInUser && loggedInUser.id === viewedUser.id) {
    followBtn = null;
    editProfileBtn = (
      <EditProfileForm loggedInUser={loggedInUser}></EditProfileForm>
    );
  } else if (loggedInUser && loggedInUser.following.includes(viewedUser.id)) {
    editProfileBtn = null;
    // already following
    followBtn = (
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleUnfollow}
      >
        Unfollow
      </Button>
    );
  } else {
    editProfileBtn = null;
    // not following
    followBtn = (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleFollow}
      >
        Follow
      </Button>
    );
  }

  const following = viewedUser.user.following
    ? viewedUser.user.following.length
    : 0;

  let blogCount = 0;
  // console.log(loggedIn);
  if (loggedIn.user && loggedIn.user._id === viewedUser.user._id) {
    blogCount = loggedIn.blogs.length;
  } else {
    blogCount = viewedUser.blogs ? viewedUser.blogs.length : 0;
  }

  return (
    <Fragment>
      <Grid container className={classes.center}>
        <Grid item xs={12} className={classes.mb}>
          <Typography variant="h4">
            {viewedUser.user.firstName} {viewedUser.user.lastName}
          </Typography>
        </Grid>
        {/* <Grid item xs={6} className={classes.mb}>
          {editProfileBtn}
        </Grid> */}

        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            {blogCount}
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Posts
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            {viewedUser.user.followers}
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Followers
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            {following}
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Following
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {followBtn}
        </Grid>
      </Grid>
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

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (id, user) => dispatch(editUser(id, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
