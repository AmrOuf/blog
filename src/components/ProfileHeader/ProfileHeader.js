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

const ProfileHeader = ({ viewedUser, loggedInUser, viewedId, editUser }) => {
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

  if (loggedInUser.id === viewedUser.id) {
    followBtn = null;
    editProfileBtn = <EditProfileForm></EditProfileForm>;
  } else if (loggedInUser.following.includes(viewedUser.id)) {
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

  return (
    <Fragment>
      <Grid container className={classes.center}>
        <Grid item xs={6} className={classes.mb}>
          <Typography variant="h4">
            {viewedUser.firstName} {viewedUser.lastName}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.mb}>
          {editProfileBtn}
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            8
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Posts
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            {viewedUser.followers}
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Followers
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            {viewedUser.following.length}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (id, user) => dispatch(editUser(id, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
