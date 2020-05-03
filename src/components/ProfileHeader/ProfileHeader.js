import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import EditProfileForm from '../EditProfileForm/EditProfileForm';

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
}));

const ProfileHeader = ({ history }) => {
  const classes = useStyles();

  console.log(history);

  return (
    <Fragment>
      <Grid container className={classes.center}>
        <Grid item xs={6} className={classes.mb}>
          <Typography variant="h4">Amr Ouf</Typography>
        </Grid>
        <Grid item xs={6} className={classes.mb}>
          <EditProfileForm></EditProfileForm>
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
            108
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Followers
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" display="block">
            142
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Following
          </Typography>
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

export default connect(mapStateToProps)(ProfileHeader);
